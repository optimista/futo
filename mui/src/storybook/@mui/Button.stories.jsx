import { Send } from '@mui/icons-material'
import { Button } from '@mui/material'

import { radio, sx } from './utils'

Button.__docgenInfo = { description: "- For more see: [`Button`](https://mui.com/api/button)\n- We use only following props:" }

const ButtonStory = {
  component: Button,
  title: '@mui/Button',
  argTypes: {
    children: { control: { type: "text" } },
    classes: { table: { disable: true } },
    color: radio(["primary", "error"], "primary"),
    component: { table: { disable: true } },
    disabled: { table: { defaultValue: { summary: "false" } } },
    disableElevation: { table: { disable: true } },
    disableFocusRipple: { table: { disable: true } },
    disableRipple: { table: { disable: true } },
    endIcon: { table: { disable: true } },
    fullWidth: { table: { disable: true } },
    onClick: { control: { type: null }, description: "Optional click handler", table: { type: { summary: "func" } } },
    size: radio(["medium", "large"], "medium"),
    startIcon: { control: { type: null } },
    sx,
    variant: radio(["contained", "outlined", "text"], "contained"),
  },
}

const Default = args => <Button {...args} />;
const Contained = Default.bind({});
const Disabled = Default.bind({});
const NegativeAction = Default.bind({});
const IconStart = Default.bind({});
const Link = Default.bind({});
const Outlined = Default.bind({});
const Text = Default.bind({});

Contained.args = {
  children: "Contained",
};

Default.args = {
  children: "Default",
};

Disabled.args = {
  children: "Disabled",
  disabled: true
};

IconStart.args = {
  children: "Icon Start",
  startIcon: <Send />
};

IconStart.parameters = {
  docs: { source: { transform: src => src.replace('[object Object]', 'Send') } }
}

Link.args = {
  children: "Link",
  href: "/"
};

NegativeAction.args = {
  children: "Delete",
  color: "error",
  variant: "outlined"
};

Outlined.args = {
  children: "Outlined",
  variant: "outlined"
};

Text.args = {
  children: "Text",
  variant: "text"
};

export { ButtonStory as default, Default, Contained, Disabled, IconStart, Link, NegativeAction, Outlined, Text } 
