import { useEffect, useState } from 'react'

import { firebase } from 'utils'

const useFirebaseAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => setUser(user));
    return () => unsubscribe();
  });

  return user;
}

export default useFirebaseAuth;
