import { Avatar as MuiAvatar, IconButton } from '@mui/material'
import { Person } from '@mui/icons-material'

import { radio, sx } from './utils'

IconButton.__docgenInfo.description = "- For more see: [`IconButton`](https://mui.com/api/icon-button)\n- We use only following props:"

const IconButtonStory = {
  component: IconButton,
  title: '@mui/IconButton',
  argTypes: {
    children: { control: { type: null }, table: { type: { summary: "node", detail: null } } },
    classes: { table: { disable: true } },
    color: radio(["primary", "secondary"], "primary"),
    disabled: { table: { disable: true } },
    disableFocusRipple: { table: { disable: true } },
    disableRipple: { table: { disable: true } },
    edge: { table: { disable: true } },
    onClick: { control: { type: null }, description: "Optional click handler", table: { type: { summary: "func" } } },
    onMouseDown: { control: { type: null }, description: "Optional mousedown handler", table: { type: { summary: "func" } } },
    size: { table: { disable: true } },
    sx
  },
}

const Default = args => <IconButton {...args}><Person /></IconButton>;
const Avatar = args => <IconButton {...args}><MuiAvatar /></IconButton>;
const Primary = Default.bind({});
const Secondary = Default.bind({});

Default.parameters = {
  docs: { transformSource: src => src.replace('[object Object]', 'Person') }
}

Primary.parameters = {
  docs: { transformSource: src => src.replace('[object Object]', 'Person') }
}

Secondary.args = {
  color: "secondary",
};

Secondary.parameters = {
  docs: { transformSource: src => src.replace('[object Object]', 'Person') }
}

export { IconButtonStory as default, Default, Avatar, Primary, Secondary } 
