import { Avatar, Card, CardActions, CardContent, CardHeader, IconButton, Typography } from '@mui/material'
import { MoreHoriz } from '@mui/icons-material'

import CardStory from './Card.stories' 
import { sx } from './utils'

CardContent.__docgenInfo.description = "- For more see: [`CardContent`](https://mui.com/api/card-content)\n- We use only following props:"

const CardContentStory = {
  component: CardContent,
  title: '@mui/CardContent',
  argTypes: {
    children: { control: { type: "text" } },
    classes: { table: { disable: true } },
    component: { table: { disable: true } },
    sx
  },
  decorators: CardStory.decorators
}

const PostCard = ({ children, ...args })=> 
  <Card>
    <CardHeader action={<IconButton color="secondary"><MoreHoriz /></IconButton>} avatar={<Avatar />} title="John Doe" />
    <CardContent {...args}>{children}</CardContent>
  </Card>

PostCard.args = {
  children: "This is my post",
  sx: { pl: 9, pt: 0 }
}

PostCard.parameters = {
  docs: { transformSource: src => src.replace('[object Object]', 'MoreHoriz') }
}

PostCard.storyName = "PostCard"
 
const StoryCard = args =>
  <Card sx={{ borderWidth: "1px 0", display: "flex", justifyContent: "space-between" }}>
    <CardContent {...args}><Typography variant="h6">Story</Typography></CardContent>
    <CardActions><IconButton color="secondary"><MoreHoriz /></IconButton></CardActions>
  </Card>

StoryCard.parameters = {
  docs: { transformSource: src => src.replace('[object Object]', 'MoreHoriz') }
}

StoryCard.storyName = "StoryCard"

export { CardContentStory as default, PostCard, StoryCard } 
