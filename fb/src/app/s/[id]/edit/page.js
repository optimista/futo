'use client';

import { useStateRef } from '@futo-ui/hooks'
import { delay, empty, equal, focus, isfunction, keys, max, offset } from '@futo-ui/utils'
import { Alert, Box, Snackbar } from '@mui/material'
import { refType } from '@mui/utils'
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'
import { useRouter } from 'next/navigation'
import { Component, createRef, forwardRef, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

import { Loading, Logo } from 'core'
import { Stories } from 'core/fb/colls'
import { FixedLayout } from 'core/layouts'
import { I, l, useLocale } from 'core/utils/i18n'
import { ProfileMenuButton } from 'profile'
import { Node, StoryContainer, useReducer } from 'story/core'
import { DispatchProvider, StoreProvider, useDispatch, useState } from 'story/context'
import { Text } from 'story/nodes'
import { storyPath } from 'story/utils'
import { useAuth } from 'user'

/**
 * - Allows us to redirect if user is not authorized. 
 */
const Authorize = ({ children, fallback, if: iff = true, ready = true, redirect }) => {
  const auth = useAuth(), router = useRouter(), isAuthorized = () => isfunction(iff) ? iff(auth) : iff;
  useEffect(() => { if (redirect && auth.isReady && ready && !isAuthorized()) router.replace(redirect);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.isLoggedIn, auth.isReady, ready]);
  return <>{auth.isReady && ready && isAuthorized() ? children : (fallback || null)}</>; 
}

Authorize.propTypes = {
  /**
   * Contents which will display if user is authorized. 
   */
  children: PropTypes.node,
  
  /**
   * Contents which will display while we are authorizing (fetching all data to authorize) 
   */
  fallback: PropTypes.node,
  
  /**
   * A boolean value or a function that returns a boolean which determines whether the viewer is authorized or not.
   */
  if: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),

  /**
   * Determines whether we are ready to check if user is authorized. Usually allows us to wait for all necessary information to fetch before making a decision. 
   * @default true
   */
  ready: PropTypes.bool,

  /**
   * URL to which we redirect if user is not authorized. 
   */ 
  redirect: PropTypes.string,
};

class ContentEditableBase extends Component {
  constructor(props) {
    super(props);
    this.ref = props.innerRef || createRef();
    this.handleBlur = this.handleBlur.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    const { current } = this.ref;
    return current.innerText !== nextProps.html || !equal(this.props.sx, nextProps.sx);
  }
  componentDidUpdate() { const el = this.ref.current; if (this.props.html !== el.innerText) el.innerText = this.props.html; }
  handleBlur(e) { const { onBlur } = this.props; onBlur && onBlur(e); }
  handleInput(e) {
    const { onChange } = this.props, { innerText } = e.target;
    // Remove <br /> added if content is empty, see: https://github.com/st-h/ember-content-editable/issues/92#issuecomment-495228204
    if (empty(innerText)) { const firstChild = this.ref.current.childNodes[0]; firstChild && firstChild.remove(); } 
    onChange && onChange({ target: { value: e.target.innerText } }); }
  handleKeyDown(e) { const { onKeyDown } = this.props; onKeyDown && onKeyDown(e); }
  handlePaste(e) { e.preventDefault();
    var text = (e.originalEvent || e).clipboardData.getData('text/plain');
    document.execCommand("insertText", false, text);
  }

  render() {
    const { html = "", innerRef, onBlur, onKeyDown, placeholder, sx, ...props } = this.props;
    return <Box component="span" contentEditable dangerouslySetInnerHTML={{ __html: html }} onBlur={this.handleBlur} onInput={this.handleInput} onKeyDown={this.handleKeyDown} onPaste={this.handlePaste} placeholder={placeholder} ref={this.ref} sx={{ cursor: "text", display: "inline-block", minWidth: 1, outline: "none", "&:empty::before": { color: "#aaaaaa", content: "attr(placeholder)" }, ...sx }} {...props} />;
  }
}

/**
 * - React component for a div with editable contents 
 * - Inspired by [`react-contenteditable`](https://github.com/lovasoa/react-contenteditable) package
 */
const ContentEditable = forwardRef((props, ref) => <ContentEditableBase innerRef={ref} {...props} />);
ContentEditable.displayName = "ContentEditable";
ContentEditable.propTypes = {
  /**
   * The content / value of the `contenteditable` element.
   * @default ""
   */
  html: PropTypes.string,

  /**
   * Pass a ref to the `contenteditable` element.
   */
  innerRef: refType,

  /**
   * Callback fired when the `contenteditable` is blurred.
   */
  onBlur: PropTypes.func,

  /**
   * Callback fired when the key is down.
   */
  onKeyDown: PropTypes.func,
 
  /**
   * The short hint displayed in the `contenteditable` element before the user enters a value.
   */
  placeholder: PropTypes.string,

  /**
   * The @mui system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

const CARET = {
  "en": {
    "Start writing...": "Start writing..."
  },
  "es": {
    "Start writing...": "Empieza a escribir..."
  }
}

/**
 * - Shows the textual content of the node in editable way.
 * - Integrates generative placeholder, focusing, dispatches on blur, change & image load, splitting on enter & toggling between menu & writing. 
 */
const Caret = () => {
  const dispatch = useDispatch(), state = useState(), caretRef = useRef(null), locale = useLocale(),
        { content } = state.story.nodes[state.caret.key];

  useEffect(() => { if (state.caret.pending) {
    focus(caretRef.current, state.caret.offset); dispatch({ type: "caret-focus-finish" }); }},
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state.caret.pending]);

  const handleBlur = () => { if (empty(content)) dispatch({ type: "story-node-remove", key: state.caret.key }); dispatch({ type: "caret-blur" }); }
  const handleChange = e => { dispatch({ type: "story-node-change", key: state.caret.key, content: e.target.value }); setTimeout(() => dispatch({ type: "autosave-trigger" }), 1000); }

  return <ContentEditable html={content} onBlur={handleBlur} onChange={handleChange} placeholder={l("Start writing...", CARET, locale)} ref={caretRef} />
}

/**
 * - Obtains and shows the content of [`story/nodes/Text`](/docs/story-nodes-text--default) node.
 * - Integrates switching to edit mode & editing itself if node is being edited.
 */
const TextEditable = ({ id: key }) => {
  const dispatch = useDispatch(), state = useState();

  const handleMouseUp = e => e.button === 0 &&
    dispatch({ type: "caret-focus", key, offset: offset({ x: e.clientX, y: e.clientY }) });

  return key === state.caret.key ? <Caret /> : <Text id={key} onMouseUp={handleMouseUp} sx={{ cursor: "pointer" }} />;
};

TextEditable.propTypes = {
  /**
   * Identifier for the node to obtain `content`.
   */
  id: PropTypes.string, 
};

const STORY_EDIT_PAGE = {
  "en": {
    "Saving...": "Saving...",
    "Saved.": "Saved."
  },
  "es": {
    "Saving...": "Guardando...",
    "Saved.": "Guardado."
  }
}

const StoryEditPage = ({ params: { id } = {} } = { params: {} }) => {
  // Reducer
  const [state, dispatch] = useReducer();
    
  // Autosave
  const router = useRouter(), story = useStateRef(state.story).current, timer = useRef(null);
  useEffect(() => {
    let ignore = false;
    if (state.autosave.pending) {
      clearTimeout(timer.current);
      timer.current = setTimeout(() => { if (!ignore) {
        dispatch({ type: "autosave-notification-show" });
        setDoc(doc(Stories, id), { ...story, editedAt: serverTimestamp() }).then(() => !ignore && dispatch({ type: "autosave-success" })).then(() => delay(5000)).then(() => dispatch({ type: "autosave-notification-hide" }))
      }}, 2000); }
    return () => ignore = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.autosave.trigger]);
  
  // Loader
  useEffect(() => { if (id) getDoc(doc(Stories, id)).then(doc => doc.exists() ? dispatch({ type: "story-load", story: doc.data() }) : router.replace("/"), () => router.replace("/"))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
 
  // Handlers
  const handleContainerMouseUp = e => {
    if (e.currentTarget === e.target) {
      const key = max(keys(state.story.nodes).map(k => parseInt(k)).concat([0])) + 1 + "n"; 
      dispatch({ type: "story-node-add", key, x: e.clientX, y: e.clientY });
      dispatch({ type: "caret-focus", key });
    }
  }
 
  return (
    <FixedLayout toolbarLeft={<Logo />} toolbarRight={<ProfileMenuButton />}>
      <Authorize if={auth => auth.uid === state.story.profileId} fallback={<Loading />} ready={Boolean(state.story.profileId)} redirect={storyPath(state.story)}>
        <DispatchProvider value={dispatch}>
          <StoreProvider value={state}>
            <StoryContainer onMouseUp={handleContainerMouseUp} sx={{ cursor: "pointer" }}>
              <Snackbar open={state.autosave.notification}> 
                <Alert severity={state.autosave.pending ? "info" : "success"} variant="outlined">
                  <I dict={STORY_EDIT_PAGE} k={state.autosave.pending ? "Saving..." : "Saved."} />
                </Alert>
              </Snackbar>
              { keys(state.story.nodes).map(key => 
                <Node id={key} key={key}>
                  <TextEditable id={key} />
                </Node>
              )}
            </StoryContainer>
          </StoreProvider>
        </DispatchProvider>
      </Authorize>
    </FixedLayout>
  )
}

export { StoryEditPage as default, Authorize, Caret, ContentEditable, TextEditable };
