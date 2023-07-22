import PropTypes from 'prop-types'
import { forwardRef } from 'react'

import { Avatar } from 'core'
import { useAuth } from 'user'

/**
 * - If `src` not given, fetches & shows the [`core/Avatar`](/docs/core-avatar--default) of currently logged in user.
 * - Props of the [`core/Avatar`](/docs/core-avatar--default) are also available.
 */
const ProfileAvatar = forwardRef(({ src = null, ...props }, ref) => {
  const auth = useAuth();
  if (src !== null) return <Avatar src={src} {...props} />;
  return <Avatar alt={auth.profile?.displayName || "@" + auth.profile?.username} ready={Boolean(auth.profile)} ref={ref} src={auth.profile?.photoURL} {...props} />
})

ProfileAvatar.propTypes = {
  /**
   * The `src` attribute for the [`core/Avatar`](/docs/core-avatar--default) component. If `null`, shows the [`core/Avatar`](/docs/core-avatar--default) of currently logged in user.
   * @default null
   */
  src: PropTypes.string,
};

export default ProfileAvatar;
