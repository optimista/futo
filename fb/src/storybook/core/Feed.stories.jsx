import { Skeleton } from '@mui/material'

import { Feed } from 'core'
import { Stories } from 'story'
import { storyTitle } from 'story/utils'

const FeedStory = {
  component: Feed,
  title: 'core/Feed',
  argTypes: {
    collection: { control: { type: null } },
    Item: { table: { defaultValue: { summary: "(item, key) => null" } } },
    profileId: { control: { type: null } },
    sortBy: { control: { type: null } }
  }
}

const Default = args => <Feed collection={Stories} {...args} />

Default.args = {
  Item: (story, key) => story ? <div key={key}>{storyTitle(story)}</div> : <Skeleton key={key} width={120} />,
  sortBy: "editedAt"
}

Default.parameters = {
  docs: { transformSource: src => src.replace(/\[object Object\]/g, "Stories").replace("() => {}", "story => story ? <div>{storyTitle(story)}</div> : <Skeleton width={120} />") }
}

export { FeedStory as default, Default } 
