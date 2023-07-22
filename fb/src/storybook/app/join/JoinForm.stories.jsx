import { JoinForm } from 'app/join/page'

import { focusLayoutDecorator } from 'storybook/utils'

const JoinFormStory = {
  component: JoinForm,
  title: 'app/join/JoinForm',
  decorators: [focusLayoutDecorator],
  parameters: { layout: "fullscreen" }
}

const Default = args => <JoinForm {...args} />

Default.parameters = {
  docs: {
    story: { iframeHeight: 760, inline: false },
  }
}

export { JoinFormStory as default, Default } 
