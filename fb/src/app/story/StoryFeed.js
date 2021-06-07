import { Feed } from 'core'
import { Stories, StoryCard } from 'story'

const StoryFeed = props =>
  <Feed Item={({ item, ...props }) => <StoryCard story={item} {...props} />} collection={Stories} orderBy="editedAt" {...props} />

export default StoryFeed;
