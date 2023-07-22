import { empty } from '@futo-ui/utils'
import { useEffect } from 'react'

import { Caret } from 'app/s/[id]/edit/page'
import { DispatchProvider, StoreProvider } from 'story/context'
import { useReducer } from 'story/core'

import TextEditableStory from 'storybook/app/s/[id]/edit/TextEditable.stories.jsx'
import { transform } from 'storybook/story/utils'

const CaretStory = {
  component: Caret,
  title: 'app/s/[id]/edit/Caret',
  decorators: TextEditableStory.decorators
}

const Default = args => {
  // Reducer
  const [state, dispatch] = useReducer();

  useEffect(() => { 
    dispatch({ type: "story-load", story: { id: "s1", nodes: { "x1": { content: "abc" } } }})
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
  docs: { source: { transform } }
}

export { CaretStory as default, Default } 
