import { Card, CardActions, CardContent, IconButton, Typography } from '@mui/material'
import { MoreHoriz } from '@mui/icons-material'

import CardStory from './Card.stories' 

CardActions.__docgenInfo.description = "- For more see: [`CardActions`](https://mui.com/api/card-actions)\n- We use only following props:"

const CardActionsStory = {
  component: CardActions,
  title: '@mui/CardActions',
  argTypes: {
    children: { control: { type: null } },
    classes: { table: { disable: true } },
    disableSpacing: { table: { disable: true } },
    sx: { table: { disable: true } },
  },
  decorators: CardStory.decorators
}

const StoryCard = args =>
  <Card sx={{ borderWidth: "1px 0", display: "flex", justifyContent: "space-between" }}>
    <CardContent><Typography variant="h6">Story</Typography></CardContent>
    <CardActions {...args}><IconButton color="secondary"><MoreHoriz /></IconButton></CardActions>
  </Card>

StoryCard.parameters = {
  docs: { transformSource: src => src.replace('[object Object]', 'MoreHoriz') }
}

StoryCard.storyName = "StoryCard"

export { CardActionsStory as default, StoryCard } 
