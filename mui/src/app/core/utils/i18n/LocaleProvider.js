import { createContext, useEffect, useState } from 'react'

const LocaleContext = createContext();

const LocaleProvider = props => {
  const [locale, setLocale] = useState();
  useEffect(() => setLocale(window.navigator.language), []);
  return <LocaleContext.Provider value={locale} {...props} />;
}

export { LocaleProvider as default, LocaleContext };
