import { useReducer } from 'react'

import { DispatchProvider } from 'story/context'

const DispatchProviderStory = {
  component: DispatchProvider,
  title: 'story/context/DispatchProvider',
  argTypes: { children: { control: { type: null } } }
}

const Default = args => {
  const [, dispatch] = useReducer();
  return <DispatchProvider value={dispatch} {...args} />
}

Default.parameters = {
  docs: { transformSource: src => src.replace('() => {}', 'dispatch') }
}

export { DispatchProviderStory as default, Default } 
