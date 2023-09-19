'use client';

import PropTypes from 'prop-types'
import { createContext } from 'react'

const IContext = createContext();

/**
 * - Provides dictionary for nested [`I`](/docs/core-utils-i18n-i--default) components. 
 * - Props of the [`Context.Provider`](https://reactjs.org/docs/context.html#contextprovider) are also available.
 */
const IProvider = props => <IContext.Provider {...props} />

IProvider.propTypes = { 
  /**
   * The content of the component.
   */
  children: PropTypes.node,

  /**
   * The dictionary 
   */
  value: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.func, PropTypes.objectOf(PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.func]))])).isRequired,
}

export { IProvider as default, IContext };
