import { Badge, Button as MuiButton, IconButton } from '@mui/material'
import { Person } from '@mui/icons-material'

import { radio } from './utils'

Badge.__docgenInfo = { description: "- For more see: [`Badge`](https://mui.com/api/badge)\n- We use only following props:" }

const BadgeStory = {
  component: Badge,
  title: '@mui/Badge',
  args: {
  },
  argTypes: {
    anchorOrigin: { table: { disable: true } },
    badgeContent: { control: { type: "text" } },
    children: { control: { type: null } },
    classes: { table: { disable: true } },
    color: { table: { disable: true } },
    component: { table: { disable: true } },
    components: { table: { disable: true } },
    componentsProps: { table: { disable: true } },
    max: { table: { disable: true } },
    overlap: { table: { defaultValue: { summary: "'rectangular'" } } },
    showZero: { table: { disable: true } },
    sx: { table: { disable: true } },
    variant: radio(["dot", "small", "standard"], "standard"),
  },
}

const Default = args =>
  <Badge {...args}>
    <IconButton><Person /></IconButton>
  </Badge>

const Button = args =>
  <Badge {...args}>
    <MuiButton variant="outlined">Edit profile</MuiButton>
  </Badge>

Default.args = {
  badgeContent: "1",
  overlap: "circular",
  variant: "small"
}

Default.parameters = {
  docs: { source: { transform: src => src.replace('[object Object]', 'Person') } }
}

Button.args = {
  badgeContent: "1",
}

export { BadgeStory as default, Default, Button } 
