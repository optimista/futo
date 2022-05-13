import { isfunction } from '@futo-ui/utils'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import { useEffect } from 'react'

import { useAuth } from 'user'

/**
 * - Allows us to redirect if user is not authorized. 
 */
const Authorize = ({ children, fallback, if: iff = true, ready = true, redirect }) => {
  const auth = useAuth(), router = useRouter(), isAuthorized = () => isfunction(iff) ? iff(auth) : iff;
  useEffect(() => { if (redirect && auth.isReady && ready && !isAuthorized()) router.replace(redirect); }, [auth.isLoggedIn, auth.isReady, ready]);
  return <>{auth.isReady && ready && isAuthorized() ? children : (fallback || null)}</>; 
}

Authorize.propTypes = {
  /**
   * Contents which will display if user is authorized. 
   */
  children: PropTypes.node,
  
  /**
   * Contents which will display while we are authorizing (fetching all data to authorize) 
   */
  fallback: PropTypes.node,
  
  /**
   * A boolean value or a function that returns a boolean which determines whether the viewer is authorized or not.
   */
  if: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),

  /**
   * Determines whether we are ready to check if user is authorized. Usually allows us to wait for all necessary information to fetch before making a decision. 
   * @default true
   */
  ready: PropTypes.bool,

  /**
   * URL to which we redirect if user is not authorized. 
   */ 
  redirect: PropTypes.string,
};

export default Authorize;
