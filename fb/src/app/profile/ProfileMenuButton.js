import { useDialog, useMenu } from '@futo-ui/hooks'
import { ExitToAppSharp, HistoryEdu } from '@mui/icons-material'
import { Badge, Button, Dialog, Link, ListItemIcon, ListItemText, MenuItem } from '@mui/material'
import { getAuth, signOut } from 'firebase/auth'
import PropTypes from 'prop-types'

import { IconButton, Menu } from 'core'
import { ProfileAvatar } from 'profile'
import { LoginForm, useLoginModel } from 'user'
import { useAuth } from 'user'

/**
 * - Button that opens a [`@mui/Dialog`](https://mui.com/api/dialog) with [`user/LoginForm`](/docs/user-loginform--default).
 * - Props of the [`@mui/Button`](https://mui.com/api/button) are also available.
 */
const LoginDialogButton = ({ children = "log in", ...props }) => {
  const user = useLoginModel({ success: () => dialog.close() }),
        dialog = useDialog(user);

  return (
    <>
      <Button onClick={dialog.open} {...props}>{children}</Button>
      <Dialog onClose={dialog.close} open={dialog.isOpen}><LoginForm user={user} /></Dialog>
    </>
  )
} 

LoginDialogButton.propTypes = {
  /**
   * The content of the button.
   * @default "log in"
   */
  children: PropTypes.node,
};

/**
 * - Button that opens a user's [`core/Menu`](/docs/core-menu--default).
 * - Shows `LoginDialogButton` if user is not logged in.
 * - Integrates links to stories, profile & option to log out.
 */
const ProfileMenuButton = ({ avatar }) => {
  const auth = useAuth(),
        menu = useMenu();

  if (!auth.isReady) return <></>
  if (auth.isReady && !auth.isLoggedIn) return <LoginDialogButton />;

  const handleLogout = () => { menu.close(); signOut(getAuth()); }

  const invisible = !auth.isLoggedIn || !auth.profile || Boolean(auth?.profile?.displayName);

  return (
    <>
      <Badge badgeContent={1} invisible={invisible} overlap="circular" variant="small">
        <IconButton onClick={menu.open} TooltipProps={{ hide: menu.isOpen, title: "Account" }}>
          {avatar || <ProfileAvatar />}
        </IconButton>
      </Badge>
      <Menu arrow anchorEl={menu.el} onClose={menu.close} open={menu.isOpen} placement="end">
        <MenuItem component={Link} href="/stories">
          <ListItemIcon>
            <HistoryEdu />
          </ListItemIcon>
          <ListItemText primary="Stories" />
        </MenuItem>
        <MenuItem component={Link} href={"/" + auth.profile?.username}>
          <ListItemIcon>
            <Badge badgeContent={1} invisible={invisible} overlap="circular" variant="dot">
              <ProfileAvatar sx={{ height: t => t.spacing(3), width: t => t.spacing(3) }} />
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

ProfileMenuButton.propTypes = {
  /**
   * Determines which avatar / icon is being used in the button. 
   * @default <ProfileAvatar />
   */
  avatar: PropTypes.node, 
};

export { ProfileMenuButton as default, LoginDialogButton };
