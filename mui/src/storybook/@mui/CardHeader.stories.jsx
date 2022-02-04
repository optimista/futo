import { Avatar, Card, CardContent, CardHeader, IconButton } from '@mui/material'
import { MoreHoriz } from '@mui/icons-material'

CardHeader.__docgenInfo.description = "- For more see: [`CardHeader`](https://mui.com/api/card-header)\n- We use only following props:"

import CardStory from './Card.stories' 

const CardHeaderStory = {
  component: CardHeader,
  title: '@mui/CardHeader',
  argTypes: {
    action: { control: { type: null } },
    avatar: { control: { type: null } },
    classes: { table: { disable: true } },
    component: { table: { disable: true } },
    disableTypography: { table: { disable: true } },
    subheader: { table: { disable: true } },
    subheaderTypographyProps: { table: { disable: true } },
    sx: { table: { disable: true } },
    title: { control: { type: "text" } },
    titleTypographyProps: { table: { disable: true } },
  },
  decorators: CardStory.decorators
}

const PostCard = args => 
  <Card>
    <CardHeader {...args} />
    <CardContent sx={{ pl: 9, pt: 0 }}>This is my post</CardContent>
  </Card>

PostCard.args = {
  action: <IconButton color="secondary"><MoreHoriz /></IconButton>,
  avatar: <Avatar />,
  title: "John Doe"
}

PostCard.parameters = {
  docs: { transformSource: src => src.replace('[object Object]', 'MoreHoriz') }
}

PostCard.storyName = "PostCard"

export { CardHeaderStory as default, PostCard } 
