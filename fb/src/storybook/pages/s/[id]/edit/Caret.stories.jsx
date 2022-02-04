import { empty } from '@futo-ui/utils'
import { useEffect } from 'react'

import { Caret } from 'pages/s/[id]/edit'
import { DispatchProvider, StoreProvider } from 'story/context'
import { useReducer } from 'story/core'

import { transformSource } from 'storybook/story/utils'

const CaretStory = {
  component: Caret,
  title: 'pages/s/[id]/edit/Caret',
  decorators: [Story => <div style={{ position: "relative" }}><Story /></div>]
}

const Default = args => {
  // Reducer
  const [state, dispatch] = useReducer();

  useEffect(() => { 
    dispatch({ type: "story-load", story: { nodes: { "x1": { content: "abc" } } }})
    dispatch({ type: "caret-focus", key: "x1" })
  }, []);

  return ( 
    <DispatchProvider value={dispatch}>
      <StoreProvider value={state}>
        { empty(state.story.nodes) && !state.caret.key ? <></> : <Caret {...args} /> }
      </StoreProvider>
    </DispatchProvider>
  )
}

Default.parameters = {
  docs: { transformSource }
}

export { CaretStory as default, Default } 