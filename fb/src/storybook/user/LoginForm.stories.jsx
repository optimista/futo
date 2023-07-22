import { useModel } from '@futo-ui/hooks'

import { LoginForm } from 'user'

import { focusLayoutDecorator } from 'storybook/utils'
import { transformUser } from 'storybook/user/utils'

const LoginFormStory = {
  component: LoginForm,
  title: 'user/LoginForm',
  argTypes: { user: { control: { type: null } } },
  decorators: [focusLayoutDecorator],
  parameters: { layout: "fullscreen" }
}

const Default = args => {
  const user = useModel();
  return <LoginForm {...args} user={user} />
}

Default.parameters = {
  docs: {
    story: { iframeHeight: 760, inline: false },
    source: { transform: transformUser }
  }
}

export { LoginFormStory as default, Default } 
