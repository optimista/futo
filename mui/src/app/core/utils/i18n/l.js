const DEFAULT_LOCALE = "en";

const l = (k, dict, locale = DEFAULT_LOCALE) => (dict[locale] || dict[locale.split("-")[0]])[k];

export default l;
