import { Grid, Link, List, ListItem, ListItemIcon, ListItemText, useMediaQuery } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import { HistoryEdu, HomeOutlined, LockOutlined, PaletteOutlined, PersonOutlined, PersonAddOutlined } from '@material-ui/icons'
import { makeStyles } from '@material-ui/styles'

import { useAuth } from 'auth'
import { Tooltip } from 'core'
import { PageLayout } from 'layouts'

const useStyles = makeStyles(theme => ({
  drawer: {
    [theme.breakpoints.up('md')]: { width: 200 },
    [theme.breakpoints.down('md')]: { width: theme.spacing(7.5) }
  },
  content: {
    [theme.breakpoints.up('md')]: { width: "calc(100% - 200px)" },
    [theme.breakpoints.down('md')]: { width: "calc(100% - "+theme.spacing(7.5)+")" }
  }
}));

const DrawerItem = ({ children, href, Icon, ...props }) => {
  const theme = useTheme(),
        mdUp = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <ListItem button component={Link} href={href} {...props}>
      <Tooltip hide={mdUp} title={children}>
        <ListItemIcon sx={{ my: 1 }}><Icon fontSize="large" /></ListItemIcon>
      </Tooltip>
      <ListItemText primary={children} sx={{ display: { xs: "none", md: "block" }, fontSize: "1.15rem", ml: 0.5 }} />
    </ListItem>
  )
}

const FeedLayout = ({ children, ...props }) => {
  const auth = useAuth();

  const classes = useStyles();
  return (
    <PageLayout maxWidth="md" {...props}>
      <Grid container spacing={0} sx={{ justifyContent: "center" }}>
        <Grid item className={classes.drawer}>
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
        <Grid item className={classes.content}>
          {children}
        </Grid>
      </Grid>
    </PageLayout>
  )
}

export default FeedLayout;
