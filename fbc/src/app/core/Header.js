import { useModal, useMenu } from '@futo-ui/hooks'
import { AppBar, Badge, Button, Dialog, Link, ListItemIcon, ListItemText, MenuItem, Skeleton, Toolbar, Typography } from '@material-ui/core'
import { ExitToAppSharp, Settings } from '@material-ui/icons'
import { forwardRef } from 'react'

import { LoginForm, useAuth, useLoginModel } from 'auth'
import { Avatar, IconButton, Menu } from 'core'
import { firebase } from 'utils'

const AccountMenu = () => {
  const auth = useAuth(),
        menu = useMenu();

  const handleLogout = () => {
    menu.close();
    firebase.auth().signOut();
  }

  const invisible = !auth || !auth.profile || Boolean(auth?.profile?.displayName);

  return (
    <>
      <Badge badgeContent={1} color="error" invisible={invisible} overlap="circular" variant="small">
        <IconButton aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={menu.open} hideTooltip={menu.isOpen} tooltip="Account">
          <Settings />
        </IconButton>
      </Badge>
      <Menu arrow anchorEl={menu.el} onClose={menu.close} open={menu.isOpen} placement="end">
        <MenuItem component={Link} href={"/" + auth?.profile?.username}>
          <ListItemIcon>
            <Badge badgeContent={1} color="error" invisible={invisible} overlap="circular" variant="dot">
              <Avatar height={24} width={24} />
            </Badge>
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <ExitToAppSharp />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </MenuItem>
      </Menu>
    </>
  )
}

const LoginDialog = ({ user, ...props })=>
  <Dialog {...props}>
    <LoginForm user={user} />
  </Dialog>

const ProfileButton = () => { 
  const auth = useAuth();

  if (!auth || !auth.profile) return <Skeleton height={34} sx={{ borderRadius: 34, mr: 2 }} variant="rectangular" width={150} />

  return (
    <Button component={Link} href={"/" + auth.profile.username} startIcon={<Avatar sx={{ height: t => t.spacing(4), width: t => t.spacing(4) }} />} sx={{ borderRadius: 17, mr: 1, pl: 0.5, pr: 2, py: 0.125, textTransform: "none" }} variant="text">
      {auth.profile.displayName || "Your profile"}
    </Button>
  )
}

const Header = forwardRef(({}, ref) => {
  const auth = useAuth(),
        dialog = useModal(false), 
        user = useLoginModel({ success: dialog.close });

  return (
    <>
      <AppBar position="fixed" ref={ref}>
        <Toolbar>
          <Avatar alt="name" href="/" src="/name.png" sx={{ height: t => t.spacing(4), width: t => t.spacing(4) }} />
          <Typography sx={{ flexGrow: 1, letterSpacing: 5, px: 2 }}><Link href="/" underline="none">name</Link></Typography>
          { !auth && <Button onClick={dialog.open}>log in</Button> } 
          { auth && <ProfileButton /> }
          { auth && <AccountMenu /> }
        </Toolbar>
      </AppBar>
      { !auth && <LoginDialog onClose={dialog.close} open={dialog.isOpen} user={user} /> }
    </>
  )
})

export default Header;
