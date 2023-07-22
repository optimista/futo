import { Avatar, Card, CardActions, CardContent, CardHeader, IconButton, Typography } from '@mui/material'
import { MoreHoriz } from '@mui/icons-material'

import { sx } from './utils'

Card.__docgenInfo = { description: "- For more see: [`Card`](https://mui.com/api/card)\n- We use only following props:" }

const CardStory = {
  component: Card,
  title: '@mui/Card',
  argTypes: {
    children: { control: { type: null } },
    classes: { table: { disable: true } },
    raised: { table: { disable: true } },
    sx
  },
  decorators: [
    (Story) => (<div style={{ minWidth: 400 }}>
      <Story />
    </div>)
  ]
}

const PostCard = args => 
  <Card {...args}>
    <CardHeader action={<IconButton color="secondary"><MoreHoriz /></IconButton>} avatar={<Avatar />} title="John Doe" />
    <CardContent sx={{ pl: 9, pt: 0 }}>This is my post</CardContent>
  </Card>

PostCard.parameters = {
  docs: { source: { transform: src => src.replace('[object Object]', 'MoreHoriz') } }
}

PostCard.storyName = "PostCard"
 
const StoryCard = args =>
  <Card {...args}>
    <CardContent><Typography variant="h6">Story</Typography></CardContent>
    <CardActions><IconButton color="secondary"><MoreHoriz /></IconButton></CardActions>
  </Card> 

StoryCard.args = {
  sx: { borderWidth: "1px 0", display: "flex", justifyContent: "space-between" }
}

StoryCard.parameters = {
  docs: { source: { transform: src => src.replace('[object Object]', 'MoreHoriz') } }
}

StoryCard.storyName = "StoryCard"

export { CardStory as default, PostCard, StoryCard } 
