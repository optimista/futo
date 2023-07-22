import { useModel } from '@futo-ui/hooks'

import { ProfileDeleteDialog } from 'pages/[username]/ProfilePage'
import { dialog } from 'storybook/@mui/utils'

import { centerDecorator } from 'storybook/utils'

const ProfileDeleteDialogStory = {
  component: ProfileDeleteDialog,
  title: 'pages/[username]/ProfileDeleteDialog',
  argTypes: { user: { control: { type: null } } },
  decorators: [centerDecorator()],
  parameters: { layout: "fullscreen" }
}

const Default = args => {
  const user = useModel({ email: "" });
  return <ProfileDeleteDialog {...dialog} user={user} {...args} />
}

Default.args = {
  open: true,
}

Default.parameters = { docs: { source: { transform: src => src.replace(/user={{[\s\S]*?}}/g, "user={user}") } } }

export { ProfileDeleteDialogStory as default, Default } 
