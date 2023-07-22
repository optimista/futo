import { useModel } from '@futo-ui/hooks'

import { ProfileDialog } from 'pages/[username]/ProfilePage'
import { dialog } from 'storybook/@mui/utils'

import { centerDecorator } from 'storybook/utils'

const ProfileDialogStory = {
  component: ProfileDialog,
  title: 'pages/[username]/ProfileDialog',
  argTypes: { profile: { control: { type: null } } },
  decorators: [centerDecorator()],
  parameters: { layout: "fullscreen" }
}

const Default = args => {
  const profile = useModel({ photoURL: "" });
  return <ProfileDialog {...dialog} {...args} profile={profile} />
}

Default.args = {
  open: true 
}

Default.parameters = { docs: { source: { transform: src => src.replace(/profile={{[\s\S]*?}}/g, "profile={profile}") } } }

export { ProfileDialogStory as default, Default } 
