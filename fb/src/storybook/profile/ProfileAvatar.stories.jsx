import { ProfileAvatar } from 'profile'
import { AuthContext } from 'user/AuthProvider'

const ProfileAvatarStory = {
  component: ProfileAvatar,
  title: 'profile/ProfileAvatar',
  argTypes: { src: { table: { defaultValue: { summary: "null" } } } },
  decorators: [
    Story => (
      <AuthContext.Provider value={{ profile: { photoURL: "/mockup-avatar.jpg" } }}>
        <Story />
      </AuthContext.Provider>
    )
  ],
}

const Default = args => <ProfileAvatar {...args} />
const EmptySrc = Default.bind({}); 

EmptySrc.args = {
  src: ""
}

export { ProfileAvatarStory as default, Default, EmptySrc } 
