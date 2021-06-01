import { empty, nondraggable } from '@futo-ui/utils'
import { useEffect } from 'react'

import { useAutosave, useDispatch, useState } from 'models/story/context'
import { Caret, TextFocusable } from 'models/story/edit'
import { clientToCoors, newNodeActions, newNodeEnterActions } from 'models/story/state'
import { NodeContainer, StoryContainer, useGrabbing } from 'models/story/view'

const StoryEditor = props => {
  const autosave = useAutosave(), dispatch = useDispatch(), state = useState();

  const handleMouseUp = e => e.currentTarget === e.target &&
    dispatch(state => state.grab.dragged ? [] : newNodeActions(state, clientToCoors(state, { x: e.clientX, y: e.clientY }))) 
 
  useEffect(() => !empty(state.render.container) && dispatch(state => newNodeEnterActions(state)), [empty(state.render.container)]);
  
  useGrabbing({ onMouseMoveDispatch: ({ handle, key, deltas }) => {
    switch(handle) {
      case "node": return [{ type: "NODE_MOVE", key, ...deltas }];
      default: return [];
    }
  }, onMouseUp: ({ handle }) => handle === "node" && autosave.dispatch({ type: "TRIGGER" }) })

  const renderNode = key => {
    const { content, width } = state.story.nodes[key];
    switch(state.story.nodes[key].type) {
      case "image": return <img src={content} style={{ display: "block", ...nondraggable }} width={width} />;
      default: return state.caret.key === key ? <Caret /> : <TextFocusable id={key}>{content}</TextFocusable>;
    }
  }

  return (
    <StoryContainer onMouseUp={handleMouseUp} sx={{ cursor: "pointer" }} {...props}>
      { state.story.order.map(key => 
        <NodeContainer grabbable={state.caret.key !== key} key={key} id={key}>
          {renderNode(key)}
        </NodeContainer>
      )}
    </StoryContainer>
  )
}

export default StoryEditor;
