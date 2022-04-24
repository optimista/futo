import { useModel } from '@futo-ui/hooks'

import { LoginForm } from 'user'

import { focusLayoutDecorator } from 'storybook/utils'

const LoginFormStory = {
  component: LoginForm,
  title: 'user/LoginForm',
  argTypes: { user: { control: { type: null } } },
  decorators: [focusLayoutDecorator],
  parameters: { layout: "fullscreen" }
}

const Default = args => {
  const user = useModel({ photoURL: "" });
  return <LoginForm {...args} user={user} />
}

Default.parameters = {
  docs: {
    iframeHeight: 760,
    inlineStories: false,
    transformSource: src => src.replace(/[\s]*user={{[\s\S]*?}}[\s]*/g, " user={user} "), 
  }
}

export { LoginFormStory as default, Default } 
