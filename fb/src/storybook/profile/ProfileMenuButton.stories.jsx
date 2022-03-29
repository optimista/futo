import { Settings } from '@mui/icons-material'
import { withReactContext } from 'storybook-react-context'

import { ProfileMenuButton } from 'profile'
import { AuthContext } from 'user/AuthProvider'

const ProfileMenuButtonStory = {
  component: ProfileMenuButton,
  title: 'profile/ProfileMenuButton',
  argTypes: { avatar: { control: { type: null } } },
  decorators: [
    withReactContext({
      Context: AuthContext,
      initialState: { isReady: true, isLoggedIn: true, profile: { photoURL: "/mockup-avatar.jpg" } },
    }),
  ],
}

const Default = args => <ProfileMenuButton {...args} />
const Icon = Default.bind({});

Icon.args = {
  avatar: <Settings />
}

Icon.parameters = {
  docs: { transformSource: src => src.replace('[object Object]', 'Settings') }
}

export { ProfileMenuButtonStory as default, Default, Icon } 
