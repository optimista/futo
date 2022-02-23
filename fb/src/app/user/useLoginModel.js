import { useModel } from '@futo-ui/hooks'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

import { useLocale } from 'core/utils/i18n'
import { userErrorMessage } from 'user'

const useLoginModel = ({ success = () => {} } = { success: () => {} }) => {
  const locale = useLocale(), user = useModel({ email: "", password: "" }, {
          onSubmit: () => signInWithEmailAndPassword(getAuth(), user.email, user.password)
            .then(success)
            .catch(err => user.fail(userErrorMessage(err.code + (err.code === "auth/wrong-password" ? "-login" : ""), locale)))
        });

  return user;
}

export default useLoginModel;
