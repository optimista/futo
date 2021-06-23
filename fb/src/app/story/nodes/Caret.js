import { empty, focus } from '@futo-ui/utils'
import { Add, ImageOutlined } from '@material-ui/icons'
import { Box } from '@material-ui/core'
import { useEffect, useRef } from 'react'

import { ContentEditable, IconButton, ImageInput } from 'core'
import { useDispatch, useState } from 'story/context'

const getPlaceholder = state => {
  const n = state.story.order.length;
  switch(true) {
    case n === 1: return "Title";
    case n <= 2: return "My story starts...";
    case n <= 4: return "Keep writing";
    case n <= 7: return "You're are doing well";
    case n <= 12: return "Don't forget to review";
    default: return "Time for conclusion?";
  }
}

const Caret = props => {
  const dispatch = useDispatch(),
        state = useState(),
        caretRef = useRef(null),
        { content } = state.story.nodes[state.caret.key];

  useEffect(() => { if (state.caret.pending) {
    focus(caretRef.current, state.caret.offset); dispatch({ type: "caret-focus-finish" }); }}, [state.caret.pending]);

  const handleBlur = () => dispatch({ type: "CARET_BLUR" });
  const handleChange = e => dispatch({ type: "CARET_CHANGE", content: e.target.value });
  const handleLoad = e => dispatch({ type: "CARET_IMAGE_LOAD", content: e.target.result });

  const handleKeyDown = e => {
    if (e.key === "Enter") { e.preventDefault(); if (!empty(content)) {
      const { startOffset, endOffset } = window.getSelection().getRangeAt(0);
      dispatch({ type: "CARET_ENTER", startOffset, endOffset });
    }} 
  }

  const handleToggle = () => dispatch({ type: "CARET_TOGGLE" });

  return (
    <>
      { empty(content) && <IconButton color="secondary" onClick={handleToggle} onMouseDown={e => e.preventDefault()} sx={{ left: -5, position: "absolute", top: "50%", transform: "translate(-100%, -50%)" + (state.caret.fold ? "" : "rotate(-45deg)"), transition: "transform 0.5s" }}><Add /></IconButton> }
      <ContentEditable html={content} onBlur={handleBlur} onChange={handleChange} onKeyDown={handleKeyDown} placeholder={getPlaceholder(state)} ref={caretRef} sx={state.caret.fold ? {} : { opacity: 0, pointerEvents: "none" }} {...props} />
      <Box onMouseDown={e => e.preventDefault()} sx={{ position: "absolute", top: "50%", transform: "translate(0, -50%)", ...(state.caret.fold ? { opacity: 0, pointerEvents: "none" } : {}) }}>
        <ImageInput component={IconButton} onLoad={handleLoad} sx={{ position: "absolute", top: "50%", transform: "translate(0, -50%)" }}><ImageOutlined /></ImageInput>
      </Box> 
    </>
  )
}

export default Caret;
