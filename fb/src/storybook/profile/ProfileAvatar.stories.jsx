import { withReactContext } from 'storybook-react-context'

import { ProfileAvatar } from 'profile'
import { AuthContext } from 'user/AuthProvider'

const ProfileAvatarStory = {
  component: ProfileAvatar,
  title: 'profile/ProfileAvatar',
  argTypes: { src: { table: { defaultValue: { summary: "null" } } } },
  decorators: [
    withReactContext({
      Context: AuthContext,
      initialState: { profile: { photoURL: "/mockup-avatar.jpg" } },
    }),
  ],
}

const Default = args => <ProfileAvatar {...args} />
const EmptySrc = Default.bind({}); 

EmptySrc.args = {
  src: ""
}

export { ProfileAvatarStory as default, Default, EmptySrc } 
