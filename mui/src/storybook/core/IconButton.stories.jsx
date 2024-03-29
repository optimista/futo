import { Person } from '@mui/icons-material'
import { Avatar as MuiAvatar } from '@mui/material'

import { IconButton } from 'core'

const IconButtonStory = {
  component: IconButton,
  title: 'core/IconButton',
  argTypes: {
    children: { control: { type: null } },
    TooltipProps: { type: "object" }
  }
}

const Default = args => <IconButton {...args}><Person /></IconButton>;
const Avatar = args => <IconButton {...args}><MuiAvatar /></IconButton>;
const Primary = Default.bind({}); 
const Secondary = Default.bind({});

const transform = src => src.replace('[object Object]', 'Person');

Default.args = {
  TooltipProps: { hide: false, title: "Account" }
};

Default.parameters = {
  docs: { source: { transform } }
}

Avatar.args = {
  TooltipProps: { hide: false, title: "Account" }
};

Primary.args = {
  TooltipProps: { hide: false, title: "Account" },
};

Primary.parameters = {
  docs: { source: { transform } }
}

Secondary.args = {
  color: "secondary",
  TooltipProps: { hide: false, title: "Account" }
};

Secondary.parameters = {
  docs: { source: { transform } }
}

export { IconButtonStory as default, Default, Primary, Secondary, Avatar } 
