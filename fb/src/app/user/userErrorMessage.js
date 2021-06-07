import { errorMessage } from 'core/utils'
import { USER_ERRORS } from 'user/locales'

const userErrorMessage = (err = {}, title) => {
  let key;
  switch(err.code) {
    case "auth/email-already-in-use":  // pages/join.js
    case "auth/invalid-email":         // pages/join.js, LoginForm, pages/account/reset.js
    case "auth/user-disabled":         // LoginForm 
    case "auth/user-mismatch":         // ProfileDeleteDialog 
    case "auth/user-not-found":        // LoginForm
      key = "email";
      break;
    case "auth/wrong-password":        // ProfileDeleteDialog 
    case "auth/wrong-password-login":  // LoginForm
    case "auth/weak-password":         // pages/join.js // I never encountered it (I tried "password")
      key = "password";
      break;
    default:
      key = "main"
      break;
  }

  let message;
  switch(err.code) {
    case "auth/too-many-requests":     // LoginForm
    case "auth/weak-password":         // pages/join.js // I never encountered it (I tried "password")
      message = err.message;
      break;
    case "auth/email-already-in-use":  // pages/join.js
    case "auth/invalid-email":         // pages/join.js, LoginForm, pages/account/reset.js
    case "auth/user-disabled":         // LoginForm 
    case "auth/user-mismatch":         // ProfileDeleteDialog 
    case "auth/user-not-found":        // LoginForm
    case "auth/operation-not-allowed": // pages/join.js
    case "auth/wrong-password":        // ProfileDeleteDialog 
    case "auth/wrong-password-login":  // LoginForm
    default:
      message = USER_ERRORS[err.code];
      break;
  }
  
  return message ? errorMessage(err, title) : { [key]: { message, title } };
}

export default userErrorMessage;
