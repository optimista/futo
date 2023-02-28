import PropTypes from 'prop-types'
import { createContext } from 'react'

const DispatchContext = createContext(() => {});

/**
 * - Provides story reducer's `dispatch` method. 
 * - Props of the [`Context.Provider`](https://reactjs.org/docs/context.html#contextprovider) are also available.
 */
const DispatchProvider = props => <DispatchContext.Provider {...props} />

DispatchProvider.propTypes = { 
  /**
   * The content of the component.
   */
  children: PropTypes.node,

  /**
   * The story reducer's dispatch method. 
   */
  value: PropTypes.func.isRequired
}

export { DispatchProvider as default, DispatchContext };
