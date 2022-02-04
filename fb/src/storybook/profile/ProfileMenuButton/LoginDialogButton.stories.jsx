import { LoginDialogButton } from 'profile/ProfileMenuButton'

const LoginDialogButtonStory = {
  component: LoginDialogButton,
  title: 'profile/ProfileMenuButton/LoginDialogButton',
  argTypes: { children: { control: { type: "text" } } }
}

const Default = args => <LoginDialogButton {...args} />

export { LoginDialogButtonStory as default, Default } 
