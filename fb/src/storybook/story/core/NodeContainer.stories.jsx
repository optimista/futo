import { empty } from '@futo-ui/utils'
import { useEffect } from 'react'

import { DispatchProvider, StoreProvider } from 'story/context'
import { NodeContainer, useReducer } from 'story/core'
import { Text } from 'story/nodes'

import { transformSource } from 'storybook/story/utils'

const NodeContainerStory = {
  component: NodeContainer,
  title: 'story/core/NodeContainer',
  decorators: [
    (Story, { viewMode }) =>
      <div style={{ height: viewMode === 'docs' ? 400 : "100vh", transform: 'scale(1)' }}>
        <Story />
      </div>
  ],
  parameters: { layout: "fullscreen" }
}

const Default = args => {
  const [state, dispatch] = useReducer();
  
  useEffect(() => dispatch({ type: "story-load", story: { nodes: { "x1": { content: "Node #1" } }, positions: { "x1": { x: 468, y: 188 }}}}), []);

  return empty(state.story.nodes) ? <></> : 
    <DispatchProvider value={dispatch}>
      <StoreProvider value={state}>
        <NodeContainer {...args}>
          <Text id="x1" />
        </NodeContainer>
      </StoreProvider>
    </DispatchProvider>
}

Default.args = {
  id: "x1"
}

Default.parameters = {
  docs: { transformSource }
}

export { NodeContainerStory as default, Default } 
