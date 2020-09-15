import { useForm, useModel } from '@futo-ui/hooks'

import { firebase } from 'utils'

const useLoginForm = ({ callback }) => {
  const user = useModel({ email: "", password: "" });
  const form = useForm({
    action: () => firebase.auth().signInWithEmailAndPassword(user.email, user.password),
    callback,
    error: err => {
      switch(err.code) {
        case "auth/invalid-email":  user.setErrors({ "email": "Please, enter your e-mail address in valid format (e.g. yourname@example.com)." }); break;
        case "auth/user-disabled":  user.setErrors({ "email": "Sorry, this account has been disabled." }); break;
        case "auth/user-not-found": user.setErrors({ "email": "Sorry, we couldn't find an account with this e-mail address." }); break;
        case "auth/wrong-password": user.setErrors({ "password": "Sorry, this password isn't correct. If you forgot your password, follow the link below!" }); break;
      }
    }
  });

  return [form, user];
}

export default useLoginForm;
