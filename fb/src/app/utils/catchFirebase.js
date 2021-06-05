import { ERRORS } from 'locales'

const catchFirebase = fail => err => {
  switch(err.code) {
    case "auth/invalid-email":         // pages/join.js, useLoginModel, pages/account/reset.js
    case "auth/user-not-found":        // useLoginModel
      fail({ email: ERRORS[err.code] });
      break;
    case "auth/email-already-in-use":  // pages/join.js
    case "auth/operation-not-allowed": // pages/join.js
    case "auth/user-disabled":         // useLoginModel 
      fail({ email: err.message });
      break;
    case "auth/wrong-password":        // useLoginModel
      fail({ password: ERRORS[err.code] });
      break;
    case "auth/weak-password":         // pages/join.js // I never encountered it (I tried "password")
      fail({ password: err.message });
      break;
    default:
      fail(ERRORS["futo/something-wrong"]); // anywhere
      break;
  }
}

export default catchFirebase;
