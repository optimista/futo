import { useModel } from '@futo-ui/hooks'
import { dialog } from 'storybook/@mui/utils'

import { PostDialog } from 'post'

const PostDialogStory = {
  component: PostDialog,
  title: 'post/PostDialog',
  argTypes: { post: { control: { type: null } } },
  parameters: { layout: "fullscreen" }
}

const Default = args => {
  const post = useModel({ photoURL: "" });
  return <PostDialog {...dialog} {...args} post={post} />
}

Default.args = {
  open: true
}

Default.parameters = {
  docs: { transformSource: src => src.replace(/post={{[\s\S]*?}}/g, "post={post}") } 
}

export { PostDialogStory as default, Default } 
