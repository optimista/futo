const USER_ERRORS = {
  // ACTION CODE: pages/account/confirm.js
  "auth/expired-action-code":               "The link to reset your password has unfortunately expired. Maybe try to send another one?",
  "auth/invalid-action-code":               "This link to reset your password is unfortunately not valid. Maybe try to send another one?",

  // pages/join.js
  "auth/operation-not-allowed":             "It seems that authentication/registration through an e-mail is temporarily suspended. Please, try again in a few moments. Thank you for patience!",
 
  // ACCOUNT: app/user/useLoginModel.js + pages/account/reset.js
  "auth/user-disabled":                     "This account has been disabled.", // login
  "auth/user-not-found":                    "Sorry, we couldn't find an account with this e-mail address.", // login, reset

  // EMAIL: pages/join.js + app/user/useLoginModel.js + pages/account/reset.js
  "auth/email-already-in-use":              "Email address is already in use! You might be registered in here already.", // join
  "auth/invalid-email":                     "Please, enter your e-mail address in valid format (e.g. name@domain.com).", // join, login, reset
  "user/email-empty":                       "Please, enter your e-mail.", // join, reset
  "user/email-without-at":                  "An e-mail address must contain a single @", // join, reset
  "user/email-invalid-domain":              "The domain portion of the e-mail is invalid (the part after the @).", // join, reset

  // PASSWORD: pages/join.js + pages/account/confirm.js + app/profile/Profile.js + app/user/useLoginModel.js
  "user/password-short":                    "Your password has to be at least 6 characters long.", // join, confirm 
  "auth/wrong-password":                    "The password you entered is unfortunately not correct.", // app/profile/Profile.js 
  "auth/wrong-password-login":              "Incorrect password. If you forgot your password, follow the link below!", // login

  // USERNAME: pages/join.js
  "user/username-empty":                    "Please, enter your username.",
  "user/username-long":                     "Username can't have more than 16 characters.", 
  "user/username-characters":               "Username can only contain alphanumeric characters, underscores '_' or dots '.'",
  "user/username-consecutive":              "Username can't contain two '.' or '_' characters in a row.",
  "user/username-begin-end":                "Username can't start or end with '_' or '.'",
  "user/username-exists":                   "Unfortunately, such username already exists :( Maybe pick another one?",

  // Reauthentication of `app/profile/Profile.js`
  "auth/user-mismatch":                     "The e-mail does not correspond to the one you use.",

  // Rest of titles
  "user/registration-not-successful/title": "Registration not successful",
}

export default USER_ERRORS;
