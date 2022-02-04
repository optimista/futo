import { HistoryEdu, HomeOutlined, LockOutlined, PaletteOutlined, PersonOutlined, PersonAddOutlined, Settings } from '@mui/icons-material'
import { AppBar, Button, Container, Grid, Link, List, ListItemButton, ListItemIcon, ListItemText, Skeleton, Toolbar, Typography, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import PropTypes from 'prop-types'

import { Logo, Tooltip } from 'core'
import { NAMES } from 'core/locales'
import { ProfileAvatar, ProfileMenuButton } from 'profile'
import { useAuth } from 'user'

/**
 * - [`@mui/Button`](https://mui.com/api/button) to profile with [`profile/ProfileAvatar`](/docs/profile-profileavatar--default) & name of the user. 
 * - Integrates [`@mui/Skeleton`](https://mui.com/api/skeleton)
 */
const ProfileButton = () => { 
  const auth = useAuth();

  if (!auth.profile) return <Skeleton height={34} sx={{ borderRadius: 34, mr: 2 }} variant="rectangular" width={150} />

  return (
    <Button href={"/" + auth.profile.username} startIcon={<ProfileAvatar sx={{ height: t => t.spacing(4), width: t => t.spacing(4) }} />} sx={{ borderRadius: 17, mr: 1, pl: 0.5, pr: 2, py: 0.125, textTransform: "none" }} variant="text">
      {auth.profile.displayName || "Your profile"}
    </Button>
  )
};

/**
 * - Adds [`@mui/AppBar`](https://mui.com/api/app-bar) (~Header) to the page with logo, title and [`profile/ProfileMenuButton`](/docs/profile-profilemenubutton--default).
 */
const PageLayout = ({ children, maxWidth }) => {
  const auth = useAuth();

  return (
    <>
      <AppBar>
        <Toolbar>
          <Logo sx={{ height: t => t.spacing(4), width: t => t.spacing(4) }} />
          <Typography sx={{ flexGrow: 1, letterSpacing: 5, px: 2 }}><Link href="/" underline="none">{NAMES.name}</Link></Typography>
          { auth.isLoggedIn && <ProfileButton /> }
          <ProfileMenuButton avatar={<Settings />} />
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Container maxWidth={maxWidth} sx={{ py: 4 }}>
        {children || <></>}
      </Container>
    </>
  )
}

PageLayout.propTypes = {
  /**
   * The contents of the [`core/layouts/PageLayout`](/docs/core-layouts-pagelayout--default).
   */
  children: PropTypes.node,

  /**
   * Determines the max-width of the contents inside [`core/layouts/PageLayout`](/docs/core-layouts-pagelayout--default).
   * @default 'lg'
   */
  maxWidth: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', false]),
};

/**
 * - One [`@mui/ListItemButton`](https://mui.com/api/list-item-button) for the aside drawer in the [`core/layouts/FeedLayout`](/docs/core-layouts-feedlayout--default)
 */
const DrawerItem = ({ children, href, Icon, ...props }) => {
  const theme = useTheme(),
        mdUp = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <ListItemButton component={Link} href={href} {...props}>
      <Tooltip hide={mdUp} title={children}>
        <ListItemIcon sx={{ my: 1 }}><Icon fontSize="large" /></ListItemIcon>
      </Tooltip>
      <ListItemText primary={children} sx={{ display: { xs: "none", md: "block" }, fontSize: "1.15rem", ml: 0.5 }} />
    </ListItemButton>
  )
}

DrawerItem.propTypes = {
  /**
   * The title of the drawer item. 
   */
  children: PropTypes.string,
  
  /**
   * Indicates the [`@mui/ListItemButton`](https://mui.com/api/list-item-button) destination. 
   */
  href: PropTypes.string,

  /**
   * The icon to display in the drawer item. 
   */ 
  Icon: PropTypes.elementType,
};

/**
 * - Adds a responsive aside drawer to a [`core/Feed`](/docs/core-feed--default).
 * - Props of the [`core/layouts/PageLayout`](/docs/core-layouts-pagelayout--default) component are also available.
 */
const FeedLayout = ({ children, ...props }) => {
  const auth = useAuth();

  return (
    <PageLayout maxWidth="md" {...props}>
      <Grid container spacing={0} sx={{ justifyContent: "center" }}>
        <Grid item sx={{ width: t => ({ xs: t.spacing(7.5), md: 200 }) }}>
          <List>
            <DrawerItem href="/" Icon={HomeOutlined}>Home</DrawerItem>
            <DrawerItem href={"/" + auth?.profile?.username} Icon={PersonOutlined} disabled={!auth.isLoggedIn}>Profile</DrawerItem>
            <DrawerItem href="/stories" Icon={HistoryEdu} disabled={!auth.isLoggedIn}>Stories</DrawerItem>
          </List>
          <List>
            <DrawerItem href="/join" Icon={PersonAddOutlined}>Join</DrawerItem>
            <DrawerItem href="/login" Icon={LockOutlined}>Login</DrawerItem>
            <DrawerItem href="/theme" Icon={PaletteOutlined}>Theme</DrawerItem>
          </List>
        </Grid>
        <Grid item sx={{ width: t => ({ xs: "calc(100% - "+t.spacing(7.5)+")", md: "calc(100% - 200px)" }) }}>
          {children}
        </Grid>
      </Grid>
    </PageLayout>
  )
}

FeedLayout.propTypes = {
  /**
   * The main content of the layout component.
   */
  children: PropTypes.node,
};

export { FeedLayout as default, DrawerItem, PageLayout, ProfileButton };