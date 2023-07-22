import { fetchSignInMethodsForEmail, getAuth } from 'firebase/auth'
import { doc, getDoc } from "firebase/firestore"

import { Usernames } from 'core/fb/colls'

const emailFormatAt = email => email.match(/@/);
const emailFormatDomain = email => email.match(/@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/); 

const emailExistence = email => fetchSignInMethodsForEmail(getAuth(), email).then(methods => 0 < methods.length);
const emailUniqueness = email => fetchSignInMethodsForEmail(getAuth(), email).then(methods => 0 === methods.length);

const usernameFormatCharacters = username => username.match(/^[a-zA-Z0-9._]*$/);
const usernameFormatNoConsecutive = username => !username.match(/[._]{2}/);
const usernameFormatNoBeginEnd = username => !username.match(/^[._]/) && !username.match(/[._]$/);

const usernameUniqueness = username => getDoc(doc(Usernames, username)).then(doc => !doc.exists()); 

export { emailFormatAt, emailFormatDomain, emailExistence, emailUniqueness, usernameFormatCharacters, usernameFormatNoConsecutive, usernameFormatNoBeginEnd, usernameUniqueness }
