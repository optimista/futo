import { nondraggable } from '@futo-ui/utils'
import { useEffect } from 'react'

import { useDispatch, useState } from 'story/context'
import { NodeContainer, StoryContainer, TextContainer, useGrabbing } from 'story/view'

const StoryViewer = props => {
  const dispatch = useDispatch(), state = useState();

  useEffect(() => dispatch({ type: "VIEW_PRESENT_TRIGGER" }), []);
  useGrabbing();
  
  const renderNode = key => {
    const { content, width } = state.story.nodes[key];
    switch(state.story.nodes[key].type) {
      case "image": return <img src={content} style={{ display: "block", ...nondraggable }} width={width} />;
      default: return <TextContainer>{state.story.nodes[key].content}</TextContainer>;
    }
  }

  return (
    <StoryContainer {...props}>
      { state.story.order.map(key => 
        <NodeContainer key={key} id={key}>
          {renderNode(key)}
        </NodeContainer>
      )}
    </StoryContainer>
  )
}

export default StoryViewer;
