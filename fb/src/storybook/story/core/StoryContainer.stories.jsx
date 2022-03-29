import { empty } from '@futo-ui/utils'
import { useEffect } from 'react'

import { DispatchProvider, StoreProvider } from 'story/context'
import { NodeContainer, StoryContainer, useReducer } from 'story/core'
import { Text } from 'story/nodes'

import { heightDecorator, transformSource } from 'storybook/story/utils'

const StoryContainerStory = {
  component: StoryContainer,
  title: 'story/core/StoryContainer',
  argTypes: { children: { control: { type: null } } },
  decorators: [heightDecorator],
  parameters: { layout: "fullscreen" }
}

const Default = args => {
  const [state, dispatch] = useReducer();
  
  useEffect(() => dispatch({ type: "story-load", story: { id: "s1", nodes: { "x1": { content: "Node #1" } }, positions: { "x1": { x: 100, y: 50 } }}}), []);

  return empty(state.story.nodes) ? <></> : 
    <DispatchProvider value={dispatch}>
      <StoreProvider value={state}>
        <StoryContainer {...args}>
          <NodeContainer id="x1">
            <Text id="x1" />
          </NodeContainer>
        </StoryContainer>
      </StoreProvider>
    </DispatchProvider>
}

Default.parameters = { docs: { transformSource } }

export { StoryContainerStory as default, Default } 
