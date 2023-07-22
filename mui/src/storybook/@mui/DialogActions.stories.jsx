import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'

import { centerDecorator } from 'storybook/utils'

DialogActions.__docgenInfo = { description: "- For more see: [`DialogActions`](https://mui.com/api/dialog-actions)\n- We use only following props:" }

const DialogActionsStory = {
  component: DialogActions,
  title: '@mui/DialogActions',
  argTypes: {
    children: { control: { type: null } },
    classes: { table: { disable: true } },
    disableSpacing: { table: { disable: true } },
    sx: { table: { disable: true } },
  },
  decorators: [centerDecorator()],
  parameters: { layout: "fullscreen" }
}

const Default = args =>
  <Dialog disablePortal disableScrollLock hideBackdrop open sx={{ position: "relative", zIndex: 0 }}>
    <DialogTitle>Dialog</DialogTitle>
    <DialogContent>Are you happy with the style of the dialog?</DialogContent>
    <DialogActions {...args}><Button variant="outlined">No</Button><Button>Yes</Button></DialogActions>
  </Dialog>

export { DialogActionsStory as default, Default } 
