import { useModel } from '@futo-ui/hooks'

import { firebase } from 'utils'

const useLoginForm = () => {
  const user = useModel({ email: "", password: "" });

  function handleSubmit(e, callback) {
    e.preventDefault();
    firebase.auth().signInWithEmailAndPassword(user.email, user.password).then(callback);
  }

  return [user, handleSubmit];
}

export default useLoginForm;
