import { PostJoinDialog } from 'pages/index'
import { dialog } from 'storybook/@mui/utils'

const PostJoinDialogStory = {
  component: PostJoinDialog,
  title: 'pages/index/PostPrompt/PostJoinDialog',
  parameters: { layout: "fullscreen" }
}

const Default = args => <PostJoinDialog {...dialog} {...args} />

Default.args = {
  open: true
}

export { PostJoinDialogStory as default, Default } 
