import { useModel } from '@futo-ui/hooks'
import { dialog } from 'storybook/@mui/utils'
import { withReactContext } from 'storybook-react-context'

import { PostDialog } from 'post'
import { AuthContext } from 'user/AuthProvider'

const PostDialogStory = {
  component: PostDialog,
  title: 'post/PostDialog',
  argTypes: { post: { control: { type: null } } },
  parameters: { layout: "fullscreen" },
  decorators: [
    withReactContext({
      Context: AuthContext,
      initialState: { profile: { photoURL: "/mockup-avatar.jpg" } },
    }),
  ],
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
