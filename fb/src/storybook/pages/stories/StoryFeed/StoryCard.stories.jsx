import { getDocs, limit, orderBy, query } from 'firebase/firestore'

import { StoryCard } from 'pages/stories'
import { Stories } from 'story'

const StoryCardStory = {
  component: StoryCard,
  title: 'pages/stories/StoryFeed/StoryCard',
  argTypes: { story: { control: { type: null } } },
  parameters: { layout: "padded" }
}

const Default = (args, { loaded: { stories } }) => {
  const story = stories.docs.map(doc => doc.data())[0];
  return <StoryCard story={story} {...args} />
}

Default.loaders = [
  async () => ({
    stories: await getDocs(query(Stories, orderBy("editedAt", "asc"), limit(1)))
  }),
];

// Patch for loaders (see: https://github.com/storybookjs/storybook/issues/12726)
Default.parameters = {
  docs: {
    inlineStories: false,
    iframeHeight: 183
  }
}

export { StoryCardStory as default, Default } 
