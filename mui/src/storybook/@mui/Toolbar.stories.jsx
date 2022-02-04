import { Button, Toolbar, Typography } from '@mui/material'

import { NAMES } from 'core/locales'

import AppBarStory from './AppBar.stories'

Toolbar.__docgenInfo.description = "- For more see: [`Toolbar`](https://mui.com/api/toolbar)\n- We use only following props:"

const ToolbarStory = {
  component: Toolbar,
  title: '@mui/Toolbar',
  argTypes: {
    children: { control: { type: "text" } },
    classes: { table: { disable: true } },
    component: { table: { disable: true } },
    disableGutters: { table: { defaultValue: { summary: "false" } } },
    sx: { table: { disable: true } },
    variant: { table: { disable: true } }
  },
  decorators: AppBarStory.decorators,
  parameters: AppBarStory.parameters,
}

const Default = ({ children, ...args }) =>
  <Toolbar {...args}>
    <Typography sx={{ flexGrow: 1 }}>{children}</Typography>
    <Button>Log in</Button>
  </Toolbar>

Default.args = {
  children: NAMES.ccname
}

export { ToolbarStory as default, Default } 
