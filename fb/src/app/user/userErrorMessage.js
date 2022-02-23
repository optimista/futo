import { errorMessage } from 'core/utils'
import { l } from 'core/utils/i18n'
import { USER_ERRORS } from 'user/i18n'

const userErrorMessage = (key, locale) => {
  let field;
  switch(key) {
    case "auth/email-already-in-use":  // pages/join.js
    case "auth/invalid-email":         // pages/join.js, LoginForm, pages/account/reset.js
    case "auth/user-disabled":         // LoginForm 
    case "auth/user-mismatch":         // ProfileDeleteDialog 
    case "auth/user-not-found":        // LoginForm
      field = "email";
      break;
    case "auth/wrong-password":        // ProfileDeleteDialog 
    case "auth/wrong-password-login":  // LoginForm
    case "auth/weak-password":         // pages/join.js // I never encountered it (I tried "password")
      field = "password";
      break;
    default:
      field = "main"
      break;
  }

  let message;
  switch(key) {
    case "auth/weak-password":         // pages/join.js // I never encountered it (I tried "password")
      message = l("user/password-short", USER_ERRORS, locale);
      break;
    case "auth/email-already-in-use":  // pages/join.js
    case "auth/invalid-email":         // pages/join.js, LoginForm, pages/account/reset.js
    case "auth/user-disabled":         // LoginForm 
    case "auth/user-mismatch":         // ProfileDeleteDialog 
    case "auth/user-not-found":        // LoginForm
    case "auth/operation-not-allowed": // pages/join.js
    case "auth/too-many-requests":     // LoginForm
    case "auth/wrong-password":        // ProfileDeleteDialog 
    case "auth/wrong-password-login":  // LoginForm
    default:
      message = l(key, USER_ERRORS, locale);
      break;
  }
 
  return message ? { [field]: { message } } : errorMessage({ key, locale });
}

export default userErrorMessage;
