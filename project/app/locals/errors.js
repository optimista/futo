const errors = {
  "auth/email-already-in-use":  "Email address is already in use! You might be registered in here already.", // join
  "auth/expired-action-code":   "The link to reset your password has unfortunately expired.", // reset
  "auth/invalid-action-code":   "This link to reset your password is unfortunately not valid.", // reset
  "auth/invalid-email":         "Please, enter your e-mail address in valid format (e.g. yourname@example.com).", // join, login
  "auth/operation-not-allowed": "Registration of new members is temporarily suspended. Please, try again in a few moments. Thank you for patience!", // join
  "auth/user-disabled":         "Sorry, this account has been disabled.", // login
  "auth/user-not-found":        "Sorry, we couldn't find an account with this e-mail address.", // login, reset
  "auth/wrong-password":        "Sorry, this password isn't correct. If you forgot your password, follow the link below!" // login
}

export default errors;
