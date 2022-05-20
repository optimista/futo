import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'

import { centerDecorator } from 'storybook/utils'

DialogTitle.__docgenInfo.description = "- For more see: [`DialogTitle`](https://mui.com/api/dialog-title)\n- We use only following props:"

const DialogTitleStory = {
  component: DialogTitle,
  title: '@mui/DialogTitle',
  argTypes: {
    children: { control: { type: "text" } },
    classes: { table: { disable: true } },
    sx: { table: { disable: true } },
  },
  decorators: [centerDecorator()],
  parameters: { layout: "fullscreen" }
}

const Default = ({ children, ...args }) =>
  <Dialog disablePortal disableScrollLock hideBackdrop open sx={{ position: "relative", zIndex: 0 }}>
    <DialogTitle {...args}>{children}</DialogTitle>
    <DialogContent>Are you happy with the style of the dialog?</DialogContent>
    <DialogActions><Button variant="outlined">No</Button><Button>Yes</Button></DialogActions>
  </Dialog>

Default.args = {
  children: "Dialog"
}

export { DialogTitleStory as default, Default } 
