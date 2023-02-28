const USER_ERRORS = {
  "en": {
    // ACTION CODE: pages/account/confirm.js
    "auth/expired-action-code":               "The link to reset your password has unfortunately expired. Maybe try to send another one?",
    "auth/invalid-action-code":               "This link to reset your password is unfortunately not valid. Maybe try to send another one?",

    // pages/join.js
    "auth/operation-not-allowed":             "It seems that authentication/registration through an e-mail is temporarily suspended. Please, try again in a few moments. Thank you for patience!",
   
    // ACCOUNT: base/user/useLoginModel.js
    "auth/too-many-requests":                 "Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.", // login
    
    // ACCOUNT: account/reset.js
    "auth/too-many-requests-reset":           "Resetting the password has been temporarily disabled due to many attempts. You can try resetting your password again later.", // account/reset 
    
    // ACCOUNT: base/user/useLoginModel.js + pages/account/reset.js
    "auth/user-disabled":                     "This account has been disabled.", // login
    "auth/user-not-found":                    "Sorry, we couldn't find an account with this e-mail address.", // login, reset

    // EMAIL: pages/join.js + base/user/useLoginModel.js + pages/account/reset.js
    "auth/email-already-in-use":              "Email address is already in use! You might be registered in here already.", // join
    "auth/invalid-email":                     "Please, enter your e-mail address in valid format (e.g. name@domain.com).", // join, login, reset
    "user/email-empty":                       "Please, enter your e-mail.", // join, reset
    "user/email-without-at":                  "An e-mail address must contain a single \"@\"", // join, reset
    "user/email-invalid-domain":              "The domain portion of the e-mail is invalid (the part after the \"@\").", // join, reset

    // PASSWORD: pages/join.js + pages/account/confirm.js + base/profile/Profile.js + base/user/useLoginModel.js
    "user/password-short":                    "Your password has to be at least 6 characters long.", // join, confirm 
    "auth/wrong-password":                    "The password you entered is unfortunately not correct.", // base/profile/Profile.js 
    "auth/wrong-password-login":              "Incorrect password. If you forgot your password, follow the link below!", // login

    // USERNAME: pages/join.js
    "user/username-empty":                    "Please, enter your username.",
    "user/username-long":                     "Username can't have more than 16 characters.", 
    "user/username-characters":               "Username can only contain alphanumeric characters, underscores '_' or dots '.'",
    "user/username-consecutive":              "Username can't contain two '.' or '_' characters in a row.",
    "user/username-begin-end":                "Username can't start or end with '_' or '.'",
    "user/username-exists":                   "Unfortunately, such username already exists :( Maybe pick another one?",

    // Reauthentication of `base/profile/Profile.js`
    "auth/user-mismatch":                     "The e-mail does not correspond to the one you use.",

    // Rest of titles
    "user/registration-not-successful/title": "Registration not successful",
  },
  "es": {
    // ACTION CODE: pages/account/confirm.js
    "auth/expired-action-code":               "Lamentablemente, el enlace para restablecer su contraseña ha caducado. ¿Tal vez intente enviar otro?",
    "auth/invalid-action-code":               "Lamentablemente, este enlace para restablecer su contraseña no es válido. ¿Tal vez intente enviar otro?",

    // pages/join.js
    "auth/operation-not-allowed":             "Parece que la autenticación/registro a través de un correo electrónico está temporalmente suspendida. Por favor, inténtalo de nuevo en unos momentos. ¡Gracias por su paciencia!",
   
    // ACCOUNT: base/user/useLoginModel.js
    "auth/too-many-requests":                 "El acceso a esta cuenta se ha inhabilitado temporalmente debido a muchos intentos fallidos de inicio de sesión. Puede restaurarlo inmediatamente restableciendo su contraseña o puede volver a intentarlo más tarde.", // login
    
    // ACCOUNT: account/reset.js
    "auth/too-many-requests-reset":           "El restablecimiento de la contraseña se ha desactivado temporalmente debido a muchos intentos. Puede intentar restablecer su contraseña nuevamente más tarde.", // account/reset 
    
    // ACCOUNT: base/user/useLoginModel.js + pages/account/reset.js
    "auth/user-disabled":                     "Esta cuenta ha sido deshabilitada.", // login
    "auth/user-not-found":                    "Lo sentimos, no pudimos encontrar una cuenta con este correo electrónico.", // login, reset

    // EMAIL: pages/join.js + base/user/useLoginModel.js + pages/account/reset.js
    "auth/email-already-in-use":              "¡Correo electrónico ya está en uso! Es posible que ya estés registrado aquí.", // join
    "auth/invalid-email":                     "Por favor, introduzca su correo e. en un formato válido (nombre@dominio.com).", // join, login, reset
    "user/email-empty":                       "Por favor introduzca su correo electrónico.", // join, reset
    "user/email-without-at":                  "Una dirección de correo electrónico debe contener una sola \"@\"", // join, reset
    "user/email-invalid-domain":              "La parte del dominio del correo electrónico no es válida (la parte después de \"@\").", // join, reset

    // PASSWORD: pages/join.js + pages/account/confirm.js + base/profile/Profile.js + base/user/useLoginModel.js
    "user/password-short":                    "Su contraseña debe tener al menos 6 caracteres.", // join, confirm 
    "auth/wrong-password":                    "Desafortunadamente, la contraseña que ingresó no es correcta.", // base/profile/Profile.js 
    "auth/wrong-password-login":              "Contraseña incorrecta. Si olvidaste tu contraseña, ¡siga el enlace de abajo!", // login

    // USERNAME: pages/join.js
    "user/username-empty":                    "Por favor, introduzca su nombre de usuario.",
    "user/username-long":                     "El nombre de usuario no puede tener más de 16 caracteres.", 
    "user/username-characters":               "El nombre de usuario solo puede contener caracteres alfanuméricos, guiones bajos '_' o puntos '.'",
    "user/username-consecutive":              "El nombre de usuario no puede contener dos '.' o '_' caracteres seguidos.",
    "user/username-begin-end":                "El nombre de usuario no puede comenzar ni terminar con '_' o '.'",
    "user/username-exists":                   "Desafortunadamente, ese nombre de usuario ya existe :( ¿Quizás elegir otro?",

    // Reauthentication of `base/profile/Profile.js`
    "auth/user-mismatch":                     "El correo electrónico no se corresponde con el que utilizas.",

    // Rest of titles
    "user/registration-not-successful/title": "Registro fallido",
  }
}

export default USER_ERRORS;
