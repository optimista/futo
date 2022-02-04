import { StoreProvider } from 'story/context'
import { useReducer } from 'story/core'

import { transformStore } from 'storybook/story/utils'

const StoreProviderStory = {
  component: StoreProvider,
  title: 'story/context/StoreProvider',
  argTypes: {
    children: { control: { type: null } },
    value: { control: { type: null } }
  }
}

const Default = args => {
  const [state,] = useReducer();
  return <StoreProvider value={state} {...args} />
}

Default.parameters = {
  docs: { transformSource: transformStore }
}

export { StoreProviderStory as default, Default } 
