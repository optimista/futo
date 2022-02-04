import PropTypes from 'prop-types'
import { createContext } from 'react'

const FormContext = createContext({});

/**
 * - Provides instance of `useModel` from `@futo-ui/hooks`
 * - Props of the [`Context.Provider`](https://reactjs.org/docs/context.html#contextprovider) are also available.
 */
const FormProvider = props => <FormContext.Provider {...props} />;

FormProvider.propTypes = { 
  /**
   * The content of the component.
   */
  children: PropTypes.node,

  /**
   * The instance of the `useModel` hook for the current `<Form />`
   */
  value: PropTypes.object.isRequired
}


export { FormProvider as default, FormContext };
