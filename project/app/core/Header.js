import { useDialog, useMenu } from '@futo-ui/hooks'
import { AppBar, Avatar, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Link, MenuItem, Toolbar, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Person } from '@material-ui/icons'
import { forwardRef } from 'react'

import { useFirebaseAuth } from 'auth'
import { LoginDialog } from 'auth/login'
import { Menu } from 'core'
import { firebase } from 'utils'

const useStyles = makeStyles(theme => ({
  title: { flexGrow: 1, letterSpacing: 5, padding: theme.spacing(0, 2) }
}))

const AccountMenu = () => {
  const [anchorEl, isOpen, handleOpen, handleClose] = useMenu();

  const handleLogout = () => {
    handleClose();
    firebase.auth().signOut();
  }

  return (
    <>
      <IconButton aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleOpen}>
        <Person />
      </IconButton>
      <Menu arrow anchorEl={anchorEl} onClose={handleClose} open={isOpen}>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  )
}

const Header = forwardRef(({ login }, ref) => {
  const user = useFirebaseAuth();
  const [open, handleOpen, handleClose] = useDialog(false); 

  const classes = useStyles();
  return (
    <>
      <AppBar position="fixed" ref={ref}>
        <Toolbar>
          <Link href="/"><Avatar alt="test" src="/test.png" /></Link>
          <Typography className={classes.title}><Link href="/" underline="none">test</Link></Typography>
          { !user && <Button onClick={handleOpen} variant="outlined">log in</Button> } 
          { user && <AccountMenu /> }
        </Toolbar>
      </AppBar>
      { !user && <LoginDialog onClose={handleClose} open={open} /> }
    </>
  )
})

export default Header;
