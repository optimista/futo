import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'

import { centerDecorator } from 'storybook/utils'

DialogContent.__docgenInfo.description = "- For more see: [`DialogContent`](https://mui.com/api/dialog-content)\n- We use only following props:"

const DialogContentStory = {
  component: DialogContent,
  title: '@mui/DialogContent',
  argTypes: {
    children: { control: { type: "text" } },
    classes: { table: { disable: true } },
    dividers: { table: { disable: true } },
    sx: { table: { disable: true } },
  },
  decorators: [centerDecorator()],
  parameters: { layout: "fullscreen" }
}

const Default = ({ children, ...args }) =>
  <Dialog disablePortal disableScrollLock hideBackdrop open sx={{ position: "relative", zIndex: 0 }}>
    <DialogTitle>Dialog</DialogTitle>
    <DialogContent {...args}>{children}</DialogContent>
    <DialogActions><Button variant="outlined">No</Button><Button>Yes</Button></DialogActions>
  </Dialog>

Default.args = {
  children: "Are you happy with the style of the dialog?"
}

export { DialogContentStory as default, Default } 
