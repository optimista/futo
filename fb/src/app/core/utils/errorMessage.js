import { ERRORS } from 'core/locales'

const errorMessage = (err = {}, initTitle) => {
  let title = initTitle;
  switch(err.code) {
    case "auth/network-request-failed":
    case "unavailable":
      title = ERRORS["auth/network-request-failed/title"];
      break;
  } 

  let message;
  switch(err.code) {
    case "unavailable":
      message = ERRORS["auth/network-request-failed"];
      break;
    default:
      message = ERRORS[err.code] || ERRORS["something-wrong"];
      break;
  }
  
  return { "main": { title, message } }
}

export default errorMessage;
