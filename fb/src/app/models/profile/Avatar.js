import { useAuth } from 'auth'
import { Avatar as AvatarBase } from 'core'

const Avatar = ({ src = null, ...props }) => {
  const auth = useAuth();
  if (src !== null) return <AvatarBase src={src} {...props} />;
  return <AvatarBase ready={Boolean(auth.profile)} src={auth.profile?.photoURL} {...props} />
}

export default Avatar;
