import { empty, focus } from '@futo-ui/utils'
import { Add } from '@material-ui/icons'
import { Box } from '@material-ui/core'
import { useEffect, useRef } from 'react'

import { ContentEditable, IconButton } from 'core'
import { useAutosave, useDispatch, useState } from 'models/story/context'
import { getPlaceholder, ImageButton } from 'models/story/edit'
import { newNodeEnterActions } from 'models/story/state'

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
        <ImageButton />
      </Box>
    </>
  )
}

export default Caret;
