import { AppBar, Button, Container, Link, Skeleton, Toolbar, Typography } from '@material-ui/core'
import { Settings } from '@material-ui/icons'

import { Logo } from 'core'
import { ProfileAvatar, ProfileMenuButton } from 'profile'
import { useAuth } from 'user'

const ProfileButton = () => { 
  const auth = useAuth();

  if (!auth.profile) return <Skeleton height={34} sx={{ borderRadius: 34, mr: 2 }} variant="rectangular" width={150} />

  return (
    <Button component={Link} href={"/" + auth.profile.username} startIcon={<ProfileAvatar sx={{ height: t => t.spacing(4), width: t => t.spacing(4) }} />} sx={{ borderRadius: 17, mr: 1, pl: 0.5, pr: 2, py: 0.125, textTransform: "none" }} variant="text">
      {auth.profile.displayName || "Your profile"}
    </Button>
  )
};

const PageLayout = ({ children, maxWidth }) => {
  const auth = useAuth();

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Logo sx={{ height: t => t.spacing(4), width: t => t.spacing(4) }} />
          <Typography sx={{ flexGrow: 1, letterSpacing: 5, px: 2 }}><Link href="/" underline="none">myapp</Link></Typography>
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

export default PageLayout;
