import PropTypes from 'prop-types'

import { Avatar } from 'core'
import { useAuth } from 'user'

/**
 * - If `src` not given, fetches & shows the [`core/Avatar`](/docs/core-avatar--default) of currently logged in user.
 * - Props of the [`core/Avatar`](/docs/core-avatar--default) are also available.
 */
const ProfileAvatar = ({ src = null, ...props }) => {
  const auth = useAuth();
  if (src !== null) return <Avatar src={src} {...props} />;
  return <Avatar ready={Boolean(auth.profile)} src={auth.profile?.photoURL} {...props} />
}

ProfileAvatar.propTypes = {
  /**
   * The `src` attribute for the [`core/Avatar`](/docs/core-avatar--default) component. If `null`, shows the [`core/Avatar`](/docs/core-avatar--default) of currently logged in user.
   * @default null
   */
  src: PropTypes.string,
};

export default ProfileAvatar;
