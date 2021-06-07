import { useMenu, useModal, useModel } from '@futo-ui/hooks'
import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Link, ListItemIcon, ListItemText, MenuItem, TextField, Typography } from '@material-ui/core'
import { AddOutlined, DeleteOutlined, EditOutlined, MoreHoriz, Person, Send } from '@material-ui/icons' 

import { Avatar, IconButton, Menu } from 'core'
import { Field, Form, Submit } from 'core/form'
import { PageLayout } from 'core/layouts'
import { errorMessage } from 'core/utils'
import { presence } from 'core/validators'
import { USER_ERRORS } from 'user/locales'
import { emailFormatAt, emailFormatDomain, emailUniqueness }  from 'user/validators'

const MockupForm = ({ children }) => {
  const form = useModel({ email: "" }, {
          validation: {
            generalError: err => {
              const { title, message } = errorMessage(err).main; 
              return { main: { title: title || USER_ERRORS["user/registration-not-successful/title"], message } };
            },
            asyncValidators: {
              email: { f: emailUniqueness, message: USER_ERRORS["auth/email-already-in-use"] },
            },
            syncValidators: { email: [
              { f: presence, message: USER_ERRORS["user/email-empty"] },
              { f: emailFormatAt, message: USER_ERRORS["user/email-without-at"] },
              { f: emailFormatDomain, message: USER_ERRORS["user/email-invalid-domain"] },
            ]},
          },
          onSubmit: () => setTimeout(() => form.fail(errorMessage()), 1000)
        });

  return (
    <>
      <Typography variant="h5">Return to your stories</Typography>
      <Typography variant="h5">Log into your account.</Typography>
      <Form model={form} actions={<Submit>log in</Submit>}>
        <Field name="email" />
        { children }
      </Form>
    </>
  )
}

const Theme = () => {
  const primary = useMenu(),
        secondary = useMenu(),
        ternary = useMenu(),
        primaryRight = useMenu(),
        secondaryRight = useMenu(),
        ternaryRight = useMenu(),
        dialog = useModal();

  return (
    <PageLayout>
      <Grid container spacing={5} sx={{ alignItems: "flex-start" }}>
        <Grid container item xs={12} md={6} spacing={3} sx={{ alignItems: "center" }}>
          <Grid item xs={12}><Typography variant="h5">Typography</Typography></Grid>
          <Grid item xs={12}><Typography variant="h1">Title #1</Typography></Grid>
          <Grid item xs={12} sm={6}><Typography variant="h2">Title #2</Typography></Grid>
          <Grid item xs={12} sm={6}><Typography variant="h3">Title #3</Typography></Grid>
          <Grid item xs={12} sm={4}><Typography variant="h4">Title #4</Typography></Grid>
          <Grid item xs={12} sm={4}><Typography variant="h5">Title #5</Typography></Grid>
          <Grid item xs={12} sm={4}><Typography variant="h6">Title #6</Typography></Grid>
          <Grid item xs={12} sm={6}><Typography variant="subtitle1">Subtitle #1</Typography></Grid>
          <Grid item xs={12} sm={6}><Typography variant="subtitle2">Subtitle #2</Typography></Grid>

          <Grid item xs={12} md={4}><Typography variant="button">Button</Typography></Grid>
          <Grid item xs={12} md={4}><Typography variant="caption">caption</Typography></Grid>
          <Grid item xs={12} md={4}><Typography variant="overline">overline</Typography></Grid>

          <Grid item xs={12}>
            <Typography align="justify" variant="body1">Body #1: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultrices metus ex, a lobortis purus aliquet quis. Nam ac fermentum sapien, eu pretium lacus. Praesent non erat sed lorem posuere faucibus. Aliquam varius mi id placerat auctor. Aenean at sem felis. Vivamus gravida consectetur varius. Vivamus sed neque ultricies sapien ornare fringilla. Donec ac leo ullamcorper, auctor ante et, interdum libero. Donec pulvinar dolor felis, a condimentum purus faucibus vel. Vestibulum tristique tincidunt nibh, a condimentum magna facilisis consectetur. Integer velit leo, commodo nec facilisis nec, porta a mauris. Suspendisse egestas varius massa, at rutrum elit auctor in.</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography align="justify" variant="body2">Body #2: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultrices metus ex, a lobortis purus aliquet quis. Nam ac fermentum sapien, eu pretium lacus. Praesent non erat sed lorem posuere faucibus. Aliquam varius mi id placerat auctor. Aenean at sem felis. Vivamus gravida consectetur varius. Vivamus sed neque ultricies sapien ornare fringilla. Donec ac leo ullamcorper, auctor ante et, interdum libero. Donec pulvinar dolor felis, a condimentum purus faucibus vel. Vestibulum tristique tincidunt nibh, a condimentum magna facilisis consectetur. Integer velit leo, commodo nec facilisis nec, porta a mauris. Suspendisse egestas varius massa, at rutrum elit auctor in.</Typography>
          </Grid>
        </Grid>

        <Grid container item xs={12} md={6} spacing={5}>
          <Grid container item xs={12} spacing={2} sx={{ alignItems: "center" }}>
            <Grid item xs={12}><Typography variant="h6">Buttons / Links</Typography></Grid>
            <Grid item xs={12} sm={6}><Button onClick={dialog.open} variant="contained" startIcon={<Send />}>Icon Start</Button></Grid>
            <Grid item xs={12} sm={6}><Button onClick={dialog.open} variant="contained" endIcon={<Send />}>Icon End</Button></Grid>
            <Grid item xs={12} sm={4}><Button onClick={dialog.open} variant="contained">Contained</Button></Grid>
            <Grid item xs={12} sm={4}><Button onClick={dialog.open} variant="outlined">Outlined</Button></Grid>
            <Grid item xs={12} sm={4}><Button onClick={dialog.open} disabled>Disabled</Button></Grid>
            <Grid item xs={12} sm={4}><Button component={Link} href="/" variant="contained">Contained Link</Button></Grid>
            <Grid item xs={12} sm={4}><Button component={Link} href="/" variant="outlined">Outlined Link</Button></Grid>
            <Grid item xs={12} sm={4}><Button component={Link} href="/" disabled>Disabled Link</Button></Grid>
            <Grid item xs={12} sm={4}><Button onClick={dialog.open} variant="text">Text</Button></Grid>
            <Grid item xs={12} sm={4}><Button component={Link} href="/" variant="text">Text Link</Button></Grid>
            <Grid item xs={12} sm={4}><Link href="/theme">Link</Link></Grid>
            <Grid item xs={12} sm={4}><IconButton onClick={primary.open} hideTooltip={primary.isOpen} tooltip="Account"><Avatar /></IconButton></Grid>
            <Grid item xs={12} sm={4}><IconButton onClick={secondary.open} hideTooltip={secondary.isOpen} tooltip="Account"><Person /></IconButton></Grid>
            <Grid item xs={12} sm={4}><IconButton onClick={ternary.open} color="secondary" hideTooltip={ternary.isOpen} tooltip="More"><MoreHoriz /></IconButton></Grid>
            <Grid item xs={12} sm={4}><Box sx={{ textAlign: "right" }}><IconButton onClick={primaryRight.open} hideTooltip={primaryRight.isOpen} tooltip="Account"><Avatar /></IconButton></Box></Grid>
            <Grid item xs={12} sm={4}><Box sx={{ textAlign: "right" }}><IconButton onClick={secondaryRight.open} hideTooltip={secondaryRight.isOpen} tooltip="Account"><Person /></IconButton></Box></Grid>
            <Grid item xs={12} sm={4}><Box sx={{ textAlign: "right" }}><IconButton onClick={ternaryRight.open} color="ternary" hideTooltip={ternaryRight.isOpen} tooltip="More"><MoreHoriz /></IconButton></Box></Grid>
            <Grid item xs={12} sm={6}></Grid>
          </Grid>
          <Grid container item xs={12} spacing={2} sx={{ alignItems: "center" }}>
            <Grid item xs={12}><Typography variant="h6">Fields</Typography></Grid> 
            <Grid item xs={12}><TextField helperText="helperText" label="label" placeholder="fill me in..." variant="standard" /></Grid>
            <Grid item xs={12}><TextField helperText="helperText" label="label" placeholder="fill me in..." variant="outlined" /></Grid>
            <Grid item xs={12}><TextField helperText="helperText" label="label" placeholder="fill me in..." variant="filled" InputProps={{ margin: "dense" }} /></Grid>
            <Grid item xs={12}></Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Container maxWidth="xs">
            <MockupForm />
          </Container>
        </Grid>
        <Grid item xs={6}>
          <Container maxWidth="xs">
            <MockupForm>
              <Field name="password" type="password" />
              <Field name="name" />
              <Field name="bio" multiline />
              <Field name="team" label="Your favourite football team" />
            </MockupForm>
          </Container>
        </Grid>
        <Grid item xs={6}>
          <Dialog disableAutoFocus disableEnforceFocus disablePortal disableScrollLock hideBackdrop open sx={{ position: "static" }}>
            <MockupForm />
          </Dialog>
        </Grid>
        <Grid item xs={6}>
          <Dialog disableAutoFocus disableEnforceFocus disablePortal disableScrollLock hideBackdrop open sx={{ position: "static" }}>
            <MockupForm>
              <Field name="password" type="password" />
              <Field name="name" />
              <Field name="bio" multiline />
              <Field name="team" label="Your favourite football team" />
            </MockupForm>
          </Dialog>
        </Grid>
      </Grid>

      <Dialog onClose={dialog.close} open={dialog.isOpen} aria-labelledby="dialog-title">
        <DialogTitle id="dialog-title">
          <Typography variant="h5">UX Feedback</Typography>
        </DialogTitle>
        <DialogContent>Are you happy with the style of the dialog?</DialogContent>
        <DialogActions>
          <Button onClick={dialog.close} variant="outlined">No</Button>
          <Button onClick={dialog.close}>Yes</Button>
        </DialogActions>
      </Dialog>

      <Menu id="menu-appbar" anchorEl={primary.el} open={primary.isOpen} onClose={primary.close} arrow>
        <MenuItem>
          <ListItemIcon><AddOutlined /></ListItemIcon>
          <ListItemText primary="Item #1" />
        </MenuItem>
        <MenuItem>
          <ListItemIcon><EditOutlined /></ListItemIcon>
          <ListItemText primary="Item #2" />
        </MenuItem>
        <MenuItem>
          <ListItemIcon><DeleteOutlined /></ListItemIcon>
          <ListItemText primary="Item #3" />
        </MenuItem>
      </Menu>
      <Menu id="menu-appbar" anchorEl={secondary.el} open={secondary.isOpen} onClose={secondary.close} arrow>
        <MenuItem>
          <ListItemIcon><AddOutlined /></ListItemIcon>
          <ListItemText primary="Item #1" />
        </MenuItem>
        <MenuItem>
          <ListItemIcon><EditOutlined /></ListItemIcon>
          <ListItemText primary="Item #2" />
        </MenuItem>
        <MenuItem>
          <ListItemIcon><DeleteOutlined /></ListItemIcon>
          <ListItemText primary="Item #3" />
        </MenuItem>
      </Menu>
      <Menu id="menu-appbar" anchorEl={ternary.el} open={ternary.isOpen} onClose={ternary.close}>
        <MenuItem>Item #1</MenuItem>
        <MenuItem>Item #2</MenuItem>
        <MenuItem>Item #3</MenuItem>
      </Menu>
      <Menu id="menu-appbar" anchorEl={primaryRight.el} open={primaryRight.isOpen} onClose={primaryRight.close} arrow placement="end">
        <MenuItem>Item #1</MenuItem>
        <MenuItem>Item #2</MenuItem>
        <MenuItem>Item #3</MenuItem>
      </Menu>
      <Menu id="menu-appbar" anchorEl={secondaryRight.el} open={secondaryRight.isOpen} onClose={secondaryRight.close} arrow placement="end">
        <MenuItem>Item #1</MenuItem>
        <MenuItem>Item #2</MenuItem>
        <MenuItem>Item #3</MenuItem>
      </Menu>
      <Menu id="menu-appbar" anchorEl={ternaryRight.el} open={ternaryRight.isOpen} onClose={ternaryRight.close} placement="end">
        <MenuItem>
          <ListItemIcon><AddOutlined /></ListItemIcon>
          <ListItemText primary="Item #1" />
        </MenuItem>
        <MenuItem>
          <ListItemIcon><EditOutlined /></ListItemIcon>
          <ListItemText primary="Item #2" />
        </MenuItem>
        <MenuItem>
          <ListItemIcon><DeleteOutlined /></ListItemIcon>
          <ListItemText primary="Item #3" />
        </MenuItem>
      </Menu>
    </PageLayout>
  )
}

export default Theme
