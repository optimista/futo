import { useModel } from '@futo-ui/hooks'

import { firebase } from 'core/utils'
import { userErrorMessage } from 'user'

const useLoginModel = ({ success = () => {} } = { success: () => {} }) => {
  const user = useModel({ email: "", password: "" }, {
          onSubmit: () => firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then(success)
            .catch(err => user.fail(userErrorMessage(err.code === "auth/wrong-password" ? { ...err, code: err.code + "-login" } : err)))
        });

  return user;
}

export default useLoginModel;
