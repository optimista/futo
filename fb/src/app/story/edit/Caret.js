import { base64, empty, focus } from '@futo-ui/utils'
import { Add, ImageOutlined } from '@material-ui/icons'
import { Box } from '@material-ui/core'
import { useEffect, useRef } from 'react'
import { v4 } from 'uuid'

import { ContentEditable, IconButton, ImageInput } from 'core'
import { firebase } from 'core/utils'
import { useAutosave, useDispatch, useState } from 'story/context'
import { getPlaceholder } from 'story/edit'
import { newNodeEnterActions } from 'story/state'

const Caret = props => {
  const autosave = useAutosave(),
        dispatch = useDispatch(),
        state = useState(),
        caretRef = useRef(null),
        { content } = state.story.nodes[state.caret.key];

  useEffect(() => { if (state.caret.pending) {
    focus(caretRef.current, state.caret.offset); dispatch({ type: "CARET_FOCUSED" }); }}, [state.caret.pending]);

  const handleBlur = () => state.caret.fold && dispatch(state => {
    const keymap = { [state.caret.key]: empty(state.story.nodes[state.caret.key].content) };
    return [{ type: "CARET_BLUR" }, { type: "NODES_REMOVE", keymap }, { type: "VIEW_REMOVE", keymap }];
  });

  const handleChange = e => {
    dispatch(state => ({ type: "NODE_EDIT", key: state.caret.key, value: e.target.value }));
    autosave.dispatch({ type: "TRIGGER" });
  }

  const handleImageLoad = e => {
    const { key } = state.caret;
    dispatch([{ type: "NODE_IMAGE", key, value: e.target.result }, { type: "VIEW_SHOW", keys: [key] }, { type: "CARET_BLUR" }, { type: "CARET_FOLD" }, { type: "VIEW_PRESENT_TRIGGER", key }]);

    if (base64(e.target.result, Caret.IMAGE_TYPES)) {
      const ref = firebase.storage().ref("stories/"+state.story.id+"/nodes/"+key).child(v4()), upload = ref.putString(e.target.result, "data_url");
      upload.on("state_changed",
        () => {}, // TODO: snapshot => console.log(snapshot.bytesTransferred / snapshot.totalBytes),
        () => {}, // TODO: handle err => {}
        () => upload.snapshot.ref.getDownloadURL().then(downloadURL => {
          dispatch({ type: "NODE_EDIT", key, value: downloadURL });
          autosave.dispatch({ type: "TRIGGER" });
        })
      );
    }
  } 

  const handleKeyDown = e => {
    if (e.key === "Enter") { if (empty(content)) { e.preventDefault(); } else {
      const { startOffset, endOffset } = window.getSelection().getRangeAt(0);
      dispatch(state => [{ type: "NODE_EDIT", key: state.caret.key, value: content.slice(0, startOffset) },
        ...newNodeEnterActions(state, state.caret.key, { content: content.slice(endOffset) })])
    }} 
  }

  const handleToggle = () =>
    dispatch(state => [{ type: "CARET_TOGGLE" }, ...(state.caret.fold ? [] : [{ type: "CARET_FOCUS", key: state.caret.key }])]);

  return (
    <>
      { empty(content) && <IconButton color="secondary" onClick={handleToggle} onMouseDown={e => e.preventDefault()} sx={{ left: -5, position: "absolute", top: "50%", transform: "translate(-100%, -50%)" + (state.caret.fold ? "" : "rotate(-45deg)"), transition: "transform 0.5s" }}><Add /></IconButton> }
      <ContentEditable html={content} onBlur={handleBlur} onChange={handleChange} onKeyDown={handleKeyDown} placeholder={getPlaceholder(state)} ref={caretRef} sx={state.caret.fold ? {} : { opacity: 0, pointerEvents: "none" }} {...props} />
      <Box onMouseDown={e => e.preventDefault()} sx={{ position: "absolute", top: "50%", transform: "translate(0, -50%)", ...(state.caret.fold ? { opacity: 0, pointerEvents: "none" } : {}) }}>
        <ImageInput component={IconButton} onLoad={handleImageLoad} types={Caret.IMAGE_TYPES}><ImageOutlined /></ImageInput>
      </Box>
    </>
  )
}

Caret.IMAGE_TYPES = ["image/gif", "image/jpeg", "image/png", "image/webp"];

export default Caret;
