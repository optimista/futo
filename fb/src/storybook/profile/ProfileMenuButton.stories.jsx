import { Settings } from '@mui/icons-material'

import { ProfileMenuButton } from 'profile'

const ProfileMenuButtonStory = {
  component: ProfileMenuButton,
  title: 'profile/ProfileMenuButton',
  argTypes: { avatar: { control: { type: null } } },
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
