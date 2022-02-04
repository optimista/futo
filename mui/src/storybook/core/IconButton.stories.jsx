import { Avatar as MuiAvatar } from '@mui/material'
import { Person } from '@mui/icons-material'

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

Default.args = {
  TooltipProps: { hide: false, title: "Account" }
};

Default.parameters = {
  docs: { transformSource: src => src.replace('[object Object]', 'Person') }
}

Avatar.args = {
  TooltipProps: { hide: false, title: "Account" }
};

Primary.args = {
  TooltipProps: { hide: false, title: "Account" },
};

Primary.parameters = {
  docs: { transformSource: src => src.replace('[object Object]', 'Person') }
}

Secondary.args = {
  color: "secondary",
  TooltipProps: { hide: false, title: "Account" }
};

Secondary.parameters = {
  docs: { transformSource: src => src.replace('[object Object]', 'Person') }
}

export { IconButtonStory as default, Default, Primary, Secondary, Avatar } 
