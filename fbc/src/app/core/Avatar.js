import { Avatar as MuiAvatar, Link, Skeleton } from '@material-ui/core'

import { useAuth } from 'auth'

const Avatar = ({ height = 40, href, skeleton, src, sx, width = 40, ...props }) => {
  const auth = useAuth();

  if (skeleton || (src === undefined && !(auth.isReady && auth.profile))) return <Skeleton sx={{ height, width, ...sx }} variant="circular" />;

  const muiAvatarProps = sx => ({
    "aria-label": "profile-picture", 
    ...(src ? { src } : { src: auth.profile.photoURL, title: auth.profile.displayName }),
    sx: { height, width, ...sx },
    ...props
  });

  return href ?
    <Link href={href || "/" + auth.profile.username} sx={sx} underline="none">
      <MuiAvatar {...muiAvatarProps()} />
    </Link>
    :
    <MuiAvatar {...muiAvatarProps(sx)} />
}

export default Avatar;
