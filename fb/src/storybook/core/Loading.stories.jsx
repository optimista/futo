import { Loading } from 'core'

const LoadingStory = {
  component: Loading,
  title: 'core/Loading',
  parameters: { layout: "fullscreen" }
}

const Default = args => <Loading {...args} />

export { LoadingStory as default, Default } 
