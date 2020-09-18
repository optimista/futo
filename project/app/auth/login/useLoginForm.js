import { useForm, useModel } from '@futo-ui/hooks'

import { errors } from 'locals'
import { firebase } from 'utils'

const useLoginForm = ({ callback }) => {
  const user = useModel({ email: "", password: "" });
  const form = useForm({ action: ({ fail, complete }) => {
    firebase.auth().signInWithEmailAndPassword(user.email, user.password).then(() => {
      complete(); callback();
    }).catch(err => {
      fail();
      switch(err.code) {
        case "auth/wrong-password":
          user.setErrors({ "password": errors[err.code] });
          break;
        case "auth/invalid-email": 
        case "auth/user-disabled": 
        case "auth/user-not-found":
          user.setErrors({ "email": errors[err.code] });
          break;
      }
    });
  }});

  return [form, user];
}

export default useLoginForm;
