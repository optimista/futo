import { useContext } from 'react'

import { AuthContext } from 'user'

const useAuth = () => useContext(AuthContext);

export default useAuth;
