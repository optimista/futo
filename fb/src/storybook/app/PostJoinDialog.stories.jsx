import { PostJoinDialog } from 'app/page'
import { dialog } from 'storybook/@mui/utils'

const PostJoinDialogStory = {
  component: PostJoinDialog,
  title: 'app/page/PostJoinDialog',
  parameters: { layout: "fullscreen" }
}

const Default = args => <PostJoinDialog {...dialog} {...args} />

Default.args = {
  open: true
}

export { PostJoinDialogStory as default, Default } 
