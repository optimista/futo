import { useModel } from '@futo-ui/hooks'
import { dialog } from 'storybook/@mui/utils'

import { PostDialog } from 'post'
import { AuthContext } from 'user/AuthProvider'

import { centerDecorator } from 'storybook/utils'

const PostDialogStory = {
  component: PostDialog,
  title: 'post/PostDialog',
  argTypes: { post: { control: { type: null } } },
  parameters: { layout: "fullscreen" },
  decorators: [
    centerDecorator(),
    Story => (
      <AuthContext.Provider value={{ profile: { photoURL: "/mockup-avatar.jpg" } }}>
        <Story />
      </AuthContext.Provider>
    )
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
  docs: { source: { transform: src => src.replace(/post={{[\s\S]*?}}/g, "post={post}") } }
}

export { PostDialogStory as default, Default } 
