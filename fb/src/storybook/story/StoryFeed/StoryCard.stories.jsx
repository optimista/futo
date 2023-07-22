import { getDocs, limit, orderBy, query } from 'firebase/firestore'

import { Stories } from 'core/fb/colls'
import { StoryCard } from 'story/StoryFeed'

import { centerDecorator } from 'storybook/utils'

const StoryCardStory = {
  component: StoryCard,
  title: 'story/StoryFeed/StoryCard',
  argTypes: { story: { control: { type: null } } },
  decorators: [centerDecorator()],
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
    story: { iframeHeight: 183, inline: false }
  }
}

export { StoryCardStory as default, Default } 
