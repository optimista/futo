import { useEffect, useState } from 'react'

import { AuthContext } from 'auth'
import { Profiles } from 'models/profile'
import { firebase } from 'utils'

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null),
        [profile, setProfile] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(auth => setAuth(auth));
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

  return <AuthContext.Provider value={auth && { ...auth, profile }}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
