import { empty } from '@futo-ui/utils'
import { RouterContext } from "next/dist/shared/lib/router-context"
import { useEffect } from 'react'

import { DispatchProvider, StoreProvider } from 'story/context'
import { StoryContainer, useReducer } from 'story/core'

import { transformSource } from 'storybook/story/utils'

const StoryContainerStory = {
  component: StoryContainer,
  title: 'story/core/StoryContainer',
  argTypes: { children: { control: { type: null } } },
  decorators: [
    (Story, { viewMode }) =>
      <div style={{ height: viewMode === 'docs' ? 400 : "100vh", transform: 'scale(1)' }}>
        <RouterContext.Provider value={{ query: { id: "s1" } }}><Story /></RouterContext.Provider>
      </div>
  ],
  parameters: { layout: "fullscreen" }
}

const Default = args => {
  const [state, dispatch] = useReducer();
  
  useEffect(() => dispatch({ type: "story-load", story: { nodes: { "x1": { content: "Node #1" } }, positions: { "x1": { x: 100, y: 50 } }}}), []);

  return empty(state.story.nodes) ? <></> : 
    <DispatchProvider value={dispatch}>
      <StoreProvider value={state}>
        <StoryContainer {...args} />
      </StoreProvider>
    </DispatchProvider>
}

Default.parameters = { docs: { transformSource } }

export { StoryContainerStory as default, Default } 
