import { useModal, useMenu } from '@futo-ui/hooks'
import { Badge, Button, Dialog, Link, ListItemIcon, ListItemText, MenuItem } from '@material-ui/core'
import { ExitToAppSharp } from '@material-ui/icons'

import { LoginForm, useAuth, useLoginModel } from 'auth'
import { Avatar, IconButton, Menu } from 'core'
import { firebase } from 'utils'

const AccountMenuButton = ({ children }) => {
  const auth = useAuth(),
        menu = useMenu();

  const handleLogout = () => {
    menu.close();
    firebase.auth().signOut();
  }

  const invisible = !auth.isLoggedIn || !auth.profile || Boolean(auth?.profile?.displayName);

  return (
    <>
      <Badge badgeContent={1} color="error" invisible={invisible} overlap="circular" variant="small">
        <IconButton aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={menu.open} hideTooltip={menu.isOpen} tooltip="Account">
          {children}
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

const LoginDialogButton = ({ children, ...props }) => {
  const dialog = useModal(false), 
        user = useLoginModel({ success: dialog.close });

  return (
    <>
      <Button onClick={dialog.open} {...props}>{ children || "log in" }</Button>
      <Dialog onClose={dialog.close} open={dialog.isOpen}><LoginForm user={user} /></Dialog>
    </>
  )
} 

const AccountOrLoginButton = ({ accountIcon }) => {
  const auth = useAuth();
  return auth.isReady && (auth.isLoggedIn ? <AccountMenuButton>{accountIcon || <Avatar />}</AccountMenuButton> : <LoginDialogButton />);
}

export default AccountOrLoginButton;
