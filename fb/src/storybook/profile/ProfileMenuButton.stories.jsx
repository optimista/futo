import { Settings } from '@mui/icons-material'

import { ProfileMenuButton } from 'profile'
import { AuthContext } from 'user/AuthProvider'

const ProfileMenuButtonStory = {
  component: ProfileMenuButton,
  title: 'profile/ProfileMenuButton',
  argTypes: { avatar: { control: { type: null } } },
  decorators: [
    Story => (
      <AuthContext.Provider value={{ isReady: true, isLoggedIn: true, profile: { photoURL: "/mockup-avatar.jpg" } }}>
        <Story />
      </AuthContext.Provider>
    )
  ],
}

const Default = args => <ProfileMenuButton {...args} />
const Icon = Default.bind({});

Icon.args = {
  avatar: <Settings />
}

Icon.parameters = {
  docs: { source: { transform: src => src.replace('[object Object]', 'Settings') } }
}

export { ProfileMenuButtonStory as default, Default, Icon } 
