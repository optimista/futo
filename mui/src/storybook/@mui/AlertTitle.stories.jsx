import { Alert, AlertTitle } from '@mui/material'

AlertTitle.__docgenInfo.description = "- For more see: [`AlertTitle`](https://mui.com/api/alert-title)\n- We use only following props:"

const AlertTitleStory = {
  component: AlertTitle,
  title: '@mui/AlertTitle',
  argTypes: {
    children: { control: { type: "text" } },
    classes: { table: { disable: true } },
    sx: { table: { disable: true } },
  },
}

const Default = args => <Alert><AlertTitle {...args} />Check your connection maybe? Or try again in a bit?</Alert>;

Default.args = {
  children: "Registration not successful"
}

export { AlertTitleStory as default, Default } 
