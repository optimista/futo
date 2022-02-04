import { StoryFeed } from 'pages/stories'

const StoryFeedStory = {
  component: StoryFeed,
  title: 'pages/stories/StoryFeed',
  parameters: { layout: "padded" }
}

const Default = args => <StoryFeed {...args} />

export { StoryFeedStory as default, Default } 
