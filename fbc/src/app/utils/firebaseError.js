import { ERRORS } from 'locales'

const firebaseError = (err = {}, initTitle) => {
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
    case "auth/network-request-failed":
    case "unavailable":
    default:
      key = "main";
      break;
  }

  let title = initTitle;
  switch(err.code) {
    case "auth/network-request-failed":
    case "unavailable":
      title = ERRORS["title/network-request-failed"];
      break;
  } 

  let message;
  switch(err.code) {
    case "auth/too-many-requests":     // LoginForm
    case "auth/weak-password":         // pages/join.js // I never encountered it (I tried "password")
      message = err.message;
      break;
    case "auth/network-request-failed":
    case "unavailable":
      message = ERRORS["auth/network-request-failed"];
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
      message = ERRORS[err.code] || ERRORS["futo/something-wrong"];
      break;
  }
  
  return { [key]: { title, message } }
}

export default firebaseError;
