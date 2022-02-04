import { Skeleton } from '@mui/material'

import { Feed } from 'core'
import { Posts } from 'post'

const FeedStory = {
  component: Feed,
  title: 'core/Feed',
  argTypes: {
    collection: { control: { type: null } },
    Item: { control: { type: null }, table: { defaultValue: { summary: "({ item }) => null" } } },
    profileId: { control: { type: null } },
    sortBy: { control: { type: null } }
  }
}

const Default = args => <Feed collection={Posts} {...args} />

Default.args = {
  Item: ({ item }) => item ? <div>{item.content}</div> : <Skeleton width={120} />
}

Default.parameters = {
  docs: { transformSource: src => src.replace(/\[object Object\]/g, "Posts").replace("() => {}", "({ item }) => item ? <div>{item.content}</div> : <Skeleton width={120} />") }
}

export { FeedStory as default, Default } 
