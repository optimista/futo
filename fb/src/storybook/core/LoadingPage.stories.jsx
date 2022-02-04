import { LoadingPage } from 'core'

const LoadingPageStory = {
  component: LoadingPage,
  title: 'core/LoadingPage',
  argTypes: {
    children: { control: { type: "text" } }
  },
  parameters: { layout: "fullscreen" }
}

const Default = args => <LoadingPage {...args} />

Default.args = {
  children: "Ready"
}

export { LoadingPageStory as default, Default } 
