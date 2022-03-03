import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import { useEffect } from 'react'

import { useAuth } from 'user'

/**
 * - Allows us to redirect if user is not authorized. 
 */
const Authorize = ({ children, fallback, ready = true, redirect, uid }) => {
  const auth = useAuth(), router = useRouter(), isAuthorized = uid ? auth.uid === uid : auth.isLoggedIn;
  useEffect(() => redirect && auth.isReady && ready && !isAuthorized && router.replace(redirect), [auth.isLoggedIn, auth.isReady, ready]);
  return auth.isReady && ready && isAuthorized ? children : (fallback || null); 
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
   * Determines whether we are ready to check if user is authorized. Usually allows us to wait for all necessary information to fetch before making a decision. 
   * @default true
   */
  ready: PropTypes.bool,

  /**
   * URL to which we redirect if user is not authorized. 
   */ 
  redirect: PropTypes.string,

  /**
   * Optional identifier that determines that the user has to be of the same identifier in order to be authorized. Without it, being logged in is enough.
   */
  uid: PropTypes.string,
};

export default Authorize;
