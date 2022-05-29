import { useModel } from '@futo-ui/hooks'

import { ProfileDeleteDialog } from 'pages/[username]'
import { dialog } from 'storybook/@mui/utils'

import { centerDecorator } from 'storybook/utils'

const ProfileDeleteDialogStory = {
  component: ProfileDeleteDialog,
  title: 'pages/[username]/Profile/ProfileDialog/ProfileDeleteDialog',
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

Default.parameters = { docs: { transformSource: src => src.replace(/user={{[\s\S]*?}}/g, "user={user}") } }

export { ProfileDeleteDialogStory as default, Default } 
