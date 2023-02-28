import { useContext } from 'react'

import { AuthContext } from 'user/AuthProvider'

const useAuth = () => useContext(AuthContext);

export default useAuth;
