import { useModel } from '@futo-ui/hooks'

import { LoginDialogButton } from 'profile/ProfileMenuButton'

import { transformUser } from 'storybook/user/utils'

const LoginDialogButtonStory = {
  component: LoginDialogButton,
  title: 'profile/ProfileMenuButton/LoginDialogButton',
  argTypes: { user: { control: { disable: true } } }
}

const Default = args => {
  const user = useModel();
  return <LoginDialogButton {...args} user={user} />
}

Default.parameters = {
  docs: { souorce: { transform: transformUser } },
  nextRouter: {
    path: "/s/[id]/edit",
    asPath: "/s/L4sprNhGq2HX5pldzJJ1/edit",
    query: { id: "L4sprNhGq2HX5pldzJJ1" },
  }
}

export { LoginDialogButtonStory as default, Default } 
