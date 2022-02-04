import { DiscardDialog } from 'post/PostDialog'

import { dialog } from 'storybook/@mui/utils'

const DiscardDialogStory = {
  component: DiscardDialog,
  title: 'post/PostDialog/DiscardDialog',
  parameters: { layout: "padded" }
}

const Default = args => <DiscardDialog {...dialog} {...args} />

Default.args = {
  open: true
}

export { DiscardDialogStory as default, Default } 
