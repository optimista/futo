import { isfunction } from '@futo-ui/utils'

const DEFAULT_LOCALE = "en";

class NonExistentItem extends Error {
  constructor(message = "", ...args) {
    super(message, ...args);
    this.message = message;
  }
}

const l = (k, dict, locale, arg) => {
  if (!locale) return undefined;
  const val = (dict[locale] || dict[locale.split("-")[0]] || dict[DEFAULT_LOCALE])[k];
  if (!val) throw new NonExistentItem("l: There is no item for key '"+k+"'");
  return isfunction(val) ? val(arg) : val; 
}

export default l;
