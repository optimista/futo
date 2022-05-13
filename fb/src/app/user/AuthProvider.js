import { getAuth, onIdTokenChanged } from 'firebase/auth'
import { doc, onSnapshot } from 'firebase/firestore'
import nookies from 'nookies'
import PropTypes from 'prop-types'
import { createContext, useEffect, useState } from 'react'

import { Profiles } from 'profile'

const AuthContext = createContext({ user: null });

/**
 * - Obtains & provides destructured `auth` object, `profile` of the currently logged in user, flag `isLoggedIn` whether user is actually logged in & flag `isReady` that determines whether we already fetched the `auth` object.
 */
const AuthProvider = ({ children }) => {
  const firebaseAuth = getAuth(),
        [auth, setAuth] = useState(null),
        [profile, setProfile] = useState(null),
        [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(firebaseAuth, async auth => {
      setAuth(auth); setIsReady(true);
      nookies.set(undefined, 'token', auth ? await auth.getIdToken() : "", { path: '/' });
    });
    return () => unsubscribe();
  }, []);
  
  useEffect(() => {
    if (auth) {
      // I believe we can add `profile.data() &&` condition because it's either auth & profile.data() or nothing
      const unsubscribe = onSnapshot(doc(Profiles, auth.uid), profile => profile.data() && setProfile(profile.data()));
      return () => unsubscribe();
    } else {
      setProfile(null);
    }
  }, [auth]);

  return <AuthContext.Provider value={{ ...auth, isLoggedIn: Boolean(auth), isReady, profile }}>{children}</AuthContext.Provider>
}

AuthProvider.propTypes = { 
  /**
   * The content of the component.
   */
  children: PropTypes.node,
}

export { AuthProvider as default, AuthContext };
