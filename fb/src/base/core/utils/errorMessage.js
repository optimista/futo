import { ERRORS } from 'core/i18n'
import { l } from 'core/utils/i18n'

const errorMessage = ({ key, locale, title }) => {
  switch(key) {
    case "auth/network-request-failed":
    case "unavailable":
      title = l("auth/network-request-failed/title", ERRORS, locale);
      break;
  } 

  let message;
  switch(key) {
    case "unavailable":
      message = l("auth/network-request-failed", ERRORS, locale);
      break;
    default:
      try { message = l(key, ERRORS, locale) } catch { message = l("something-wrong", ERRORS, locale); }
      break;
  }
  
  return { "main": { title, message } }
}

export default errorMessage;
