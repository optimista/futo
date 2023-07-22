import { AppBar, Button, Toolbar, Typography } from '@mui/material'

import { NAMES } from 'core/i18n'

import { centerDecorator } from 'storybook/utils'

AppBar.__docgenInfo = { description: "- For more see: [`AppBar`](https://mui.com/api/app-bar)\n- We use only following props:" }

const AppBarStory = {
  component: AppBar,
  title: '@mui/AppBar',
  argTypes: {
    children: { control: { type: "text" } },
    classes: { table: { disable: true } },
    color: { table: { disable: true } },
    enableColorOnDark: { table: { disable: true } },
    position: { table: { disable: true } },
    sx: { table: { disable: true } },
  },
  decorators: [centerDecorator()],
  parameters: { layout: "padded" }
}

const Default = ({ children, ...args }) =>
  <AppBar position="relative" {...args}>
    <Toolbar>
      <Typography sx={{ flexGrow: 1 }}>{children}</Typography>
      <Button>Log in</Button>
    </Toolbar>
  </AppBar>;

Default.args = {
  children: NAMES.ccname
}

export { AppBarStory as default, Default } 
