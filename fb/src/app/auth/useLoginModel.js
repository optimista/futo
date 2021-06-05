import { useModel } from '@futo-ui/hooks'

import { firebase, firebaseError } from 'utils'

const useLoginModel = ({ success = () => {} } = { success: () => {} }) => {
  const user = useModel({ email: "", password: "" }, {
          onSubmit: () => firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then(success)
            .catch(err => user.fail(firebaseError(err.code === "auth/wrong-password" ? { ...err, code: err.code + "-login" } : err)))
        });

  return user;
}

export default useLoginModel;
