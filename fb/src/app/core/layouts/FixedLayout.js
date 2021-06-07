import { Toolbar } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

import { Logo } from 'core'
import { ProfileMenuButton } from 'profile'

const useStyles = makeStyles(() => ({
  toolbar: {
    height: 0,
    minHeight: "auto",
    position: "fixed",
    top: 32,
    transform: "translate(0, -50%)"
  }
}))

const FixedLayout = ({ children, toolbarLeft, toolbarRight }) => {
  const classes = useStyles();

  // Last save: 13 minutes ago
  return (
    <>
      { children }
      <Toolbar className={classes.toolbar} disableGutters sx={{ left: 24 }}> 
        <Logo />
        { toolbarLeft }
      </Toolbar>
      <Toolbar className={classes.toolbar} disableGutters sx={{ right: 24 }}>
        { toolbarRight }
        <ProfileMenuButton />
      </Toolbar>
    </>
  )
}

export default FixedLayout;
