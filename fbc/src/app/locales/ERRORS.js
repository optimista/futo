const ERRORS = {
  // ACTION CODE: pages/account/confirm.js
  "auth/expired-action-code":          "The link to reset your password has unfortunately expired. Maybe try to send another one?",
  "auth/invalid-action-code":          "This link to reset your password is unfortunately not valid. Maybe try to send another one?",

  // pages/join.js
  "auth/operation-not-allowed":        "It seems that authentication/registration through an e-mail is temporarily suspended. Please, try again in a few moments. Thank you for patience!",
 
  // ACCOUNT: app/auth/LoginForm.js + pages/account/reset.js
  "auth/user-disabled":                "This account has been disabled.", // login
  "auth/user-not-found":               "Sorry, we couldn't find an account with this e-mail address.", // login, reset

  // EMAIL: pages/join.js + app/auth/LoginForm.js + pages/account/reset.js
  "auth/email-already-in-use":         "Email address is already in use! You might be registered in here already.", // join
  "auth/invalid-email":                "Please, enter your e-mail address in valid format (e.g. name@domain.com).", // join, login, reset
  "futo/email-empty":                  "Please, enter your e-mail.", // join, reset
  "futo/email-without-at":             "An e-mail address must contain a single @", // join, reset
  "futo/email-invalid-domain":         "The domain portion of the e-mail is invalid (the part after the @).", // join, reset

  // PASSWORD: pages/join.js + pages/account/confirm.js + ProfileDeleteDialog + app/auth/LoginForm.js
  "futo/password-short":               "Your password has to be at least 6 characters long.", // join, confirm 
  "auth/wrong-password":               "The password you entered is unfortunately not correct.", // ProfileDeleteDialog 
  "auth/wrong-password-login":         "Incorrect password. If you forgot your password, follow the link below!", // login

  // USERNAME: pages/join.js
  "futo/username-empty":               "Please, enter your username.",
  "futo/username-long":                "Username can't have more than 16 characters.", 
  "futo/username-characters":          "Username can only contain alphanumeric characters, underscores '_' or dots '.'",
  "futo/username-consecutive":         "Username can't contain two '.' or '_' characters in a row.",
  "futo/username-begin-end":           "Username can't start or end with '_' or '.'",
  "futo/username-exists":              "Unfortunately, such username already exists :( Maybe pick another one?",

  // DISPLAYNAME: app/profiles/useProfileDialog.js
  "futo/displayname-empty":            "Please, enter your name.", // useProfileDialog.js

  // Reauthentication of `ProfileDeleteDialog`
  "auth/user-mismatch":                "The e-mail does not correspond to the one you use.",

  // Anywhere
  "title/network-request-failed":      "No internet connection",
  "auth/network-request-failed":       "Check your network settings and try again maybe?",

  "futo/something-wrong":              "Yikes! Something went wrong. Check your connection maybe? Or try again in a bit?", 

  // Rest of titles
  "title/registration-not-successful": "Registration not successful",
}

export default ERRORS;
