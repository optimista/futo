import { useEffect, useState } from 'react'

import { Profiles } from 'profile'
import { firebase } from 'core/utils'
import { AuthContext } from 'user'

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null),
        [profile, setProfile] = useState(null),
        [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(auth => { setAuth(auth); setIsReady(true); });
    return () => unsubscribe();
  }, []);
  
  useEffect(() => {
    if (auth) {
      // I believe we can add `profile.data() &&` condition because it's either auth & profile.data() or nothing
      const unsubscribe = Profiles.doc(auth.uid).onSnapshot(profile => profile.data() && setProfile(profile.data()));
      return () => unsubscribe();
    } else {
      setProfile(null);
    }
  }, [auth]);

  return <AuthContext.Provider value={{ ...auth, isLoggedIn: Boolean(auth), isReady, profile }}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
