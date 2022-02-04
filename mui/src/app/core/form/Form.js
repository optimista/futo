import { Alert, AlertTitle, Box } from '@mui/material'
import PropTypes from 'prop-types'

import { FormProvider } from 'core/form'

/**
 * - Form is an overlaid component for forms that integrates `useModel` from `@futo-ui/hooks`
 */
const Form = ({ actions, actionsJustify, model, children, sx }) => 
  <FormProvider value={model}>
    <Box component="form" noValidate onSubmit={model.handleSubmit} sx={sx}>
      <Box sx={{ boxSizing: "border-box", pt: 3, pb: 4 }}>
        { model.error && <Alert sx={{ justifyContent: model.error.title && "normal" }}>{model.error.title && <AlertTitle>{model.error.title}</AlertTitle>}{model.error.message}</Alert> }
        { children }
      </Box>
      <Box sx={{ alignItems: "center", display: "flex", justifyContent: actionsJustify || "flex-end", '> button:not(:first-of-type)': actionsJustify ? {} : { ml: 2 } }}>
        { actions }
      </Box>
    </Box>
  </FormProvider>

Form.propTypes = {
  /**
   * The actions to display in the end of the form (usually [`<Submit>`](/docs/core-form-submit--default) button)
   */
  actions: PropTypes.node,

  /**
   * Align actions in the form values `justifyContent` property 
   * @default 'flex-end'
   */
  actionsJustify: PropTypes.oneOf(['flex-end', 'space-between']),
  
  /**
   * Content of the `Form`, usually the includes sub-components like `Field`.
   */
  children: PropTypes.node,
  
  /**
   * Instance of `useModel` hook from `@futo-ui/hooks`
   */
  model: PropTypes.object.isRequired,
  
  /**
   * The @mui system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

export default Form;
