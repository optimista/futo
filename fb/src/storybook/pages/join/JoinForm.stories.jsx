import { JoinForm } from 'pages/join'

import { focusLayoutDecorator } from 'storybook/utils'

const JoinFormStory = {
  component: JoinForm,
  title: 'pages/join/JoinForm',
  decorators: [focusLayoutDecorator],
  parameters: { layout: "fullscreen" }
}

const Default = args => <JoinForm {...args} />

Default.parameters = {
  docs: {
    iframeHeight: 760,
    inlineStories: false,
  }
}

export { JoinFormStory as default, Default } 
