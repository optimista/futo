import { useModel } from '@futo-ui/hooks'

import { LoginForm } from 'user'

const LoginFormStory = {
  component: LoginForm,
  title: 'user/LoginForm',
  argTypes: { user: { control: { type: null } } }
}

const Default = args => {
  const user = useModel({ photoURL: "" });
  return <LoginForm {...args} user={user} />
}

Default.parameters = { docs: { transformSource: src => src.replace(/[\s]*user={{[\s\S]*?}}[\s]*/g, " user={user} ") } }

export { LoginFormStory as default, Default } 
