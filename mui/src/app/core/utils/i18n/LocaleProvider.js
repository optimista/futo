import PropTypes from 'prop-types'
import { createContext, useEffect, useState } from 'react'

const LocaleContext = createContext();

/**
 * - Provides dictionary for nested [`I`](/docs/core-utils-i18n-i--default) components.
 * - Props of the [`Context.Provider`](https://reactjs.org/docs/context.html#contextprovider) are also available.
 */
const LocaleProvider = props => {
  const [locale, setLocale] = useState();
  useEffect(() => setLocale(window.navigator.language), []);
  return <LocaleContext.Provider value={locale} {...props} />;
}

LocaleProvider.propTypes = { 
  /**
   * The content of the component.
   */
  children: PropTypes.node,
}

export { LocaleProvider as default, LocaleContext };
