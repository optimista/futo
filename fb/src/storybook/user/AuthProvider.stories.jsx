import { AuthProvider } from 'user'

const AuthProviderStory = {
  component: AuthProvider,
  title: 'user/AuthProvider',
  argTypes: {
    children: { control: { type: null } }
  }
}

const Default = args => <AuthProvider {...args} />

export { AuthProviderStory as default, Default } 
