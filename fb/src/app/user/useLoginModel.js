import { useModel } from '@futo-ui/hooks'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

import { userErrorMessage } from 'user'

const useLoginModel = ({ success = () => {} } = { success: () => {} }) => {
  const user = useModel({ email: "", password: "" }, {
          onSubmit: () => signInWithEmailAndPassword(getAuth(), user.email, user.password)
            .then(success)
            .catch(err => user.fail(userErrorMessage(err.code === "auth/wrong-password" ? { ...err, code: err.code + "-login" } : err)))
        });

  return user;
}

export default useLoginModel;
