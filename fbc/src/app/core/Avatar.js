import { Avatar as MuiAvatar, Link, Skeleton } from '@material-ui/core'

import { useAuth } from 'auth'

const Avatar = ({ height = 40, href, skeleton, src, sx, width = 40, ...props }) => {
  const auth = useAuth();
  
  skeleton = skeleton === undefined && src === undefined ? (!auth || !auth.profile) : skeleton; // default prop | when skeleton is undefined it doesn't mean it's false

  const AvatarComponent = skeleton ? <Skeleton variant="circular" sx={{ height, width, ...sx }} /> : <MuiAvatar aria-label="profile-picture" src={src ?? auth?.profile?.photoURL} sx={{ height, width, ...sx }} title={auth?.profile?.displayName} {...props} /> ;

  return !href || skeleton ? AvatarComponent : <Link href={href || "/" + auth?.profile?.username} underline="none">{AvatarComponent}</Link>;
}

export default Avatar;
