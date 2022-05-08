import { empty } from '@futo-ui/utils'
import { useEffect } from 'react'

import { DispatchProvider, StoreProvider } from 'story/context'
import { Node, useReducer } from 'story/core'
import { Text } from 'story/nodes'

import { heightDecorator, transformSource } from 'storybook/story/utils'

const NodeStory = {
  component: Node,
  title: 'story/core/Node',
  decorators: [heightDecorator],
  parameters: { layout: "fullscreen" }
}

const Default = args => {
  const [state, dispatch] = useReducer();
  
  useEffect(() => dispatch({ type: "story-load", story: { id: "s1", nodes: { "x1": { content: "Node #1" } }, positions: { "x1": { x: 468, y: 188 }}}}), []);

  return empty(state.story.nodes) ? <></> : 
    <DispatchProvider value={dispatch}>
      <StoreProvider value={state}>
        <Node {...args}>
          <Text id="x1" />
        </Node>
      </StoreProvider>
    </DispatchProvider>
}

Default.args = {
  id: "x1"
}

Default.parameters = {
  docs: { transformSource }
}

export { NodeStory as default, Default } 
