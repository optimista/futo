import { PostFeed } from 'post'

const PostFeedStory = {
  component: PostFeed,
  title: 'post/PostFeed',
  parameters: { layout: "padded" }
}

const Default = args => <PostFeed {...args} />

export { PostFeedStory as default, Default } 
