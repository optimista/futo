import { ProfileAvatar } from 'profile'

const ProfileAvatarStory = {
  component: ProfileAvatar,
  title: 'profile/ProfileAvatar',
  argTypes: {
    src: { table: { defaultValue: { summary: "null" } } }
  }
}

const Default = args => <ProfileAvatar {...args} />
const EmptySrc = Default.bind({}); 

EmptySrc.args = {
  src: ""
}

export { ProfileAvatarStory as default, Default, EmptySrc } 
