import { PostPrompt } from 'pages/index'

const PostPromptStory = {
  component: PostPrompt,
  title: 'pages/index/PostPrompt',
  decorators: [
    Story => <div style={{ width: 644 }}><Story /></div>
  ],
}

const Default = args => <PostPrompt {...args} />

export { PostPromptStory as default, Default } 
