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
    severity: radio(["error", "success"], "error"),
    sx,
    variant: { table: { disable: true } }
  },
}

const Default = args => <Alert {...args} />;
const Success = Default.bind({}); 

Default.args = {
  children: "No internet connection"
}

Success.args = {
  children: "Registration has been successful!",
  severity: "success"
}

export { AlertStory as default, Default, Success } 
