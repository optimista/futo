import { useModel } from '@futo-ui/hooks'

import { ProfileDialog } from 'pages/[username]'
import { dialog } from 'storybook/@mui/utils'

const ProfileDialogStory = {
  component: ProfileDialog,
  title: 'pages/[username]/Profile/ProfileDialog',
  argTypes: { profile: { control: { type: null } } },
  parameters: { layout: "fullscreen" }
}

const Default = args => {
  const profile = useModel({ photoURL: "" });
  return <ProfileDialog {...dialog} {...args} profile={profile} />
}

Default.args = {
  open: true 
}

Default.parameters = { docs: { transformSource: src => src.replace(/profile={{[\s\S]*?}}/g, "profile={profile}") } }

export { ProfileDialogStory as default, Default } 
