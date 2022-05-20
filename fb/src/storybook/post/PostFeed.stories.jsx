import { PostFeed } from 'post'

import { centerDecorator } from 'storybook/utils'

const PostFeedStory = {
  component: PostFeed,
  title: 'post/PostFeed',
  decorators: [centerDecorator()],
  parameters: { layout: "padded" }
}

const Default = args => <PostFeed {...args} />

export { PostFeedStory as default, Default } 
