import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'

import { dialog, radio } from './utils'

import { centerDecorator } from 'storybook/utils'

Dialog.__docgenInfo = { description: "- For more see: [`Dialog`](https://mui.com/api/dialog)\n- We use only following props:" }

const DialogStory = {
  component: Dialog,
  title: '@mui/Dialog',
  argTypes: {
    "aria-describedby": { table: { disable: true } },
    "aria-labelledby": { table: { disable: true } },
    BackdropComponent: { table: { disable: true } },
    children: { control: { type: null } },
    classes: { table: { disable: true } },
    disableEscapeKeyDown: { table: { disable: true } },
    disablePortal: { table: { disable: true } },
    disableScrollLock: { table: { disable: true } },
    fullScreen: { table: { disable: true } },
    fullWidth: { table: { defaultValue: { summary: "true" } } },
    hideBackdrop: { table: { disable: true } },
    maxWidth: radio(["xs", "sm"], "xs"),
    onBackdropClick: { table: { disable: true } },
    open: { table: { defaultValue: { summary: "false" } } },
    PaperComponent: { table: { disable: true } },
    PaperProps: { table: { disable: true } },
    scroll: { table: { disable: true } },
    sx: { table: { disable: true } },
    TransitionComponent: { table: { disable: true } },
    transitionDuration: { table: { disable: true } },
    TransitionProps: { table: { disable: true } },
  },
  decorators: [centerDecorator()],
  parameters: { layout: "fullscreen" }
}

const Default = args =>
  <Dialog {...dialog} {...args}>
    <DialogTitle>Dialog</DialogTitle>
    <DialogContent>Are you happy with the style of the dialog?</DialogContent>
    <DialogActions><Button variant="outlined">No</Button><Button>Yes</Button></DialogActions>
  </Dialog>

export { DialogStory as default, Default } 
