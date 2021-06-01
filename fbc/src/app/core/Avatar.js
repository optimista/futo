import { Avatar as MuiAvatar, Link, Skeleton } from '@material-ui/core'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import { useAuth } from 'auth'

const Avatar = ({ height = 40, href, skeleton, src, sx = {}, width = 40, ...props }) => {
  const auth = useAuth(), [loaded, setLoaded] = useState(false);

  useEffect(() => !src && auth.profile && !auth.profile?.photoURL && handleLoad(), [auth.profile]);

  const handleLoad = () => setLoaded(true);

  const AvatarProps = sx => ({
    "aria-label": "profile-picture",
    sx: { height, ...(loaded ? {} : { position: "fixed", opacity: 0, height: "0 !important", width: "0 !important" }), width, ...sx },
    ...(sx ? props : {})
  })

  const renderAvatar = sx =>
    src || auth.profile?.photoURL ?
      <MuiAvatar title={src ? null : auth.profile?.displayName} {...AvatarProps(sx)}>
        <Image layout="fill" onLoad={handleLoad} src={src || auth.profile?.photoURL} />
      </MuiAvatar>
      :
      <MuiAvatar title={auth.profile?.displayName} {...AvatarProps(sx)} />

  const renderContent = sx => 
    skeleton || (src === undefined && !(auth.isReady && auth.profile)) ?
      renderSkeleton(sx)
      :
      <>
        {renderAvatar()}
        {renderSkeleton(loaded ? { display: "none" } : sx)}
      </>

  const renderSkeleton = sx => 
    <Skeleton sx={{ height, width, ...sx }} variant="circular" />

  return href ?
    <Link href={href || "/" + auth.profile.username} sx={sx} underline="none" {...props}>
      {renderContent()}
    </Link>
    :
    renderContent(sx)
}

export default Avatar;
