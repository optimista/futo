import { firebase } from 'core/utils'
import { Usernames } from 'profile'

const emailFormatAt = email => email.match(/@/);
const emailFormatDomain = email => email.match(/@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/); 

const emailExistence = email => firebase.auth().fetchSignInMethodsForEmail(email).then(methods => 0 < methods.length);
const emailUniqueness = email => firebase.auth().fetchSignInMethodsForEmail(email).then(methods => 0 === methods.length);

const usernameFormatCharacters = username => username.match(/^[a-zA-Z0-9._]*$/);
const usernameFormatNoConsecutive = username => !username.match(/[._]{2}/);
const usernameFormatNoBeginEnd = username => !username.match(/^[._]/) && !username.match(/[._]$/);

const usernameUniqueness = username => Usernames.doc(username).get().then(doc => !doc.exists); 

export { emailFormatAt, emailFormatDomain, emailExistence, emailUniqueness, usernameFormatCharacters, usernameFormatNoConsecutive, usernameFormatNoBeginEnd, usernameUniqueness }
