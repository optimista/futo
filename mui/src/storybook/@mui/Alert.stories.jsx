import { Alert } from '@mui/material'

import { radio, sx } from './utils'

Alert.__docgenInfo.description = "- For more see: [`Alert`](https://mui.com/api/alert)\n- We use only following props:"

const AlertStory = {
  component: Alert,
  title: '@mui/Alert',
  argTypes: {
    action: { table: { disable: true } },
    children: { control: { type: "text" } },
    classes: { table: { disable: true } },
    closeText: { table: { disable: true } },
    color: { table: { disable: true } },
    icon: { table: { disable: true } },
    iconMapping: { table: { disable: true } },
    onClose: { table: { disable: true } },
    role: { table: { disable: true } },
    severity: radio(["error", "info", "success"], "error"),
    sx,
    variant: radio(["outlined", "standard"], "standard")
  },
}

const Default = args => <Alert {...args} />;
const Notification = Default.bind({}); 
const Info = Default.bind({}); 
const Success = Default.bind({}); 

Default.args = {
  children: "No internet connection"
}

Notification.args = {
  children: "Saving...",
  severity: "info",
  variant: "outlined"
}

Info.args = {
  children: "This is a prototype",
  severity: "info"
}

Success.args = {
  children: "Registration has been successful!",
  severity: "success"
}

export { AlertStory as default, Default, Notification, Info, Success } 
