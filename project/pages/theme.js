import { useDialog, useMenu } from '@futo-ui/hooks'
import { Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, Link, MenuItem, TextField, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { ExpandMore, Person, Send } from '@material-ui/icons' 

import { Menu } from 'core'
import { PageLayout } from 'layouts'

const useStyles = makeStyles(theme => ({
  container: { padding: theme.spacing(5), textAlign: "center" }
}))

function Theme() {
  const [dialogOpen, handleDialogOpen, handleDialogClose] = useDialog();
  const [menuPrimaryAnchorEl, menuPrimaryOpen, handleMenuPrimaryOpen, handleMenuPrimaryClose] = useMenu();
  const [menuSecondaryAnchorEl, menuSecondaryOpen, handleMenuSecondaryOpen, handleMenuSecondaryClose] = useMenu();

  const classes = useStyles();
  return (
    <PageLayout>
      <Container className={classes.container}>
        <Grid container alignItems="flex-start" justify="center" spacing={5}>
          <Grid container item xs={12} md={6} alignItems="center" justify="center" spacing={3}>
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
            <Grid container item xs={12} alignItems="center" justify="center" spacing={2}>
              <Grid item xs={12}><Typography variant="h6">Buttons / Links</Typography></Grid>
              <Grid item xs={12} sm={6}><Button onClick={handleDialogOpen} variant="contained" startIcon={<Send />}>Icon Start</Button></Grid>
              <Grid item xs={12} sm={6}><Button onClick={handleDialogOpen} variant="contained" endIcon={<Send />}>Icon End</Button></Grid>
              <Grid item xs={12} sm={6}><Button onClick={handleDialogOpen} variant="contained">Contained</Button></Grid>
              <Grid item xs={12} sm={6}><Button onClick={handleDialogOpen} variant="outlined">Outlined</Button></Grid>
              <Grid item xs={12} sm={6}><Button onClick={handleDialogOpen} variant="text">Text</Button></Grid>
              <Grid item xs={12} sm={6}><Link href="/theme">Link</Link></Grid>
              <Grid item xs={12} sm={6}><IconButton onClick={handleMenuPrimaryOpen}><Person /></IconButton></Grid>
              <Grid item xs={12} sm={6}><IconButton onClick={handleMenuSecondaryOpen} color="secondary"><ExpandMore /></IconButton></Grid>
              <Grid item xs={12} sm={6}></Grid>
            </Grid>
            <Grid container item xs={12} alignItems="center" justify="center" spacing={2}>
              <Grid item xs={12}><Typography variant="h6">Fields</Typography></Grid> 
              <Grid item xs={12} sm={6}><TextField placeholder="fill me in..." variant="standard" /></Grid>
              <Grid item xs={12} sm={6}><TextField placeholder="fill me in..." variant="outlined" /></Grid>
              <Grid item xs={12} sm={6}><TextField placeholder="fill me in..." variant="filled" /></Grid>
              <Grid item xs={12} sm={6}></Grid>
            </Grid>
          </Grid>

        </Grid>

        <Dialog onClose={handleDialogClose} open={dialogOpen} aria-labelledby="dialog-title">
          <DialogTitle id="dialog-title">
            <Typography variant="h5">UX Feedback</Typography>
          </DialogTitle>
          <DialogContent>Are you happy with the style of the dialog?</DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} variant="outlined">No</Button>
            <Button onClick={handleDialogClose}>Yes</Button>
          </DialogActions>
        </Dialog>

        <Menu id="menu-appbar" anchorEl={menuPrimaryAnchorEl} open={menuPrimaryOpen} onClose={handleMenuPrimaryClose} arrow>
          <MenuItem>Item #1</MenuItem>
          <MenuItem>Item #2</MenuItem>
          <MenuItem>Item #3</MenuItem>
        </Menu>

        <Menu id="menu-appbar" anchorEl={menuSecondaryAnchorEl} open={menuSecondaryOpen} onClose={handleMenuSecondaryClose}>
          <MenuItem>Item #1</MenuItem>
          <MenuItem>Item #2</MenuItem>
          <MenuItem>Item #3</MenuItem>
        </Menu>

      </Container>
    </PageLayout>
  )
}

export default Theme
