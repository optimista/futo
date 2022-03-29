import { LoadingButton } from '@mui/lab'

import { radio } from './utils'

LoadingButton.__docgenInfo.description = "- For more see: [`LoadingButton`](https://mui.com/api/loading-button) ([`Button`](https://mui.com/api/button)).\n- We use only following props:"

const LoadingButtonStory = {
  component: LoadingButton,
  title: '@mui/LoadingButton',
  args: {
    loading: true,
  },
  argTypes: {
    children: { control: { type: "text" } },
    classes: { table: { disable: true } },
    color: radio(["primary", "error"], "primary"),
    disabled: { table: { disable: true } },
    loadingIndicator: { table: { disable: true } },
    loadingPosition: { table: { disable: true } },
    sx: { table: { disable: true } },
    variant: { table: { disable: true } },
  }
}

const Default = args => <LoadingButton {...args} />
  
Default.args = {
  children: "Loading"
}

export { LoadingButtonStory as default, Default } 
