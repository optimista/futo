import { LoginDialogButton } from 'profile/ProfileMenuButton'

const LoginDialogButtonStory = {
  component: LoginDialogButton,
  title: 'profile/ProfileMenuButton/LoginDialogButton',
}

const Default = args => <LoginDialogButton {...args} />

Default.parameters = {
  nextRouter: {
    path: "/s/[id]/edit",
    asPath: "/s/L4sprNhGq2HX5pldzJJ1/edit",
    query: { id: "L4sprNhGq2HX5pldzJJ1" },
  }
}

export { LoginDialogButtonStory as default, Default } 
