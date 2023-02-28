import PropTypes from 'prop-types'
import { createContext } from 'react'

const StoreContext = createContext({});

/**
 * - Provides story reducer's `state` method. 
 * - Props of the [`Context.Provider`](https://reactjs.org/docs/context.html#contextprovider) are also available.
 */
const StoreProvider = props => <StoreContext.Provider {...props} />

StoreProvider.propTypes = { 
  /**
   * The content of the component.
   */
  children: PropTypes.node,

  /**
   * The story reducer's `state` method. 
   */
  value: PropTypes.object.isRequired
}

export { StoreProvider as default, StoreContext };
