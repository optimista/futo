import { empty } from '@futo-ui/utils'
import { Avatar as MuiAvatar, Skeleton } from '@material-ui/core'
import Image from 'next/image'

const Avatar = ({ ready = true, src, ...props }) => {
  const emptyAvatar = <MuiAvatar {...props} />;
  if (!ready) return <Skeleton variant="circular">{emptyAvatar}</Skeleton>;
  return empty(src) ? emptyAvatar : <MuiAvatar {...props}><Image layout="fill" src={src} /></MuiAvatar>;
}

export default Avatar;
