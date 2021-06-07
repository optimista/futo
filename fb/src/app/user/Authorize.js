import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { Loading } from 'core'
import { useAuth } from 'user'

const Authorize = ({ children, ready = true, redirect = "/", uid }) => {
  const auth = useAuth(), router = useRouter(), isAuthorized = uid ? auth.uid === uid : auth.isLoggedIn;
  useEffect(() => auth.isReady && ready && !isAuthorized && router.replace(redirect || "/"), [auth.isReady, ready]);
  return <Loading ready={auth.isReady && ready && isAuthorized}>{children}</Loading>
}

export default Authorize;
