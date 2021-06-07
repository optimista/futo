import { Avatar } from 'core'
import { useAuth } from 'user'

const ProfileAvatar = ({ src = null, ...props }) => {
  const auth = useAuth();
  if (src !== null) return <Avatar src={src} {...props} />;
  return <Avatar ready={Boolean(auth.profile)} src={auth.profile?.photoURL} {...props} />
}

export default ProfileAvatar;
