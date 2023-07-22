import { empty } from '@futo-ui/utils'
import { useEffect } from 'react'

import { TextEditable } from 'app/s/[id]/edit/page'
import { DispatchProvider, StoreProvider } from 'story/context'
import { useReducer } from 'story/core'

import { transform } from 'storybook/story/utils'

const TextEditableStory = {
  component: TextEditable,
  title: 'app/s/[id]/edit/TextEditable',
  argTypes: { id: { control: { type: null } } },
  decorators: [Story => <div style={{ position: "relative" }}><Story /></div>]
}

const Default = args => {
  // Reducer
  const [state, dispatch] = useReducer();

  useEffect(() => dispatch({ type: "story-load", story: { id: "s1", nodes: { "x1": { content: "Something" } } }}), []);

  return empty(state.story.nodes) && !state.caret.key ? <></> : 
    <DispatchProvider value={dispatch}>
      <StoreProvider value={state}>
        <TextEditable {...args} />
      </StoreProvider>
    </DispatchProvider>
}

Default.args = {
  id: "x1"
}

Default.parameters = {
  docs: { source: { transform } }
}

export { TextEditableStory as default, Default } 
