import { PostPrompt } from 'app/page'

const PostPromptStory = {
  component: PostPrompt,
  title: 'app/page/PostPrompt',
  decorators: [
    Story => <div style={{ width: 644 }}><Story /></div>
  ],
}

const Default = args => <PostPrompt {...args} />

export { PostPromptStory as default, Default } 
