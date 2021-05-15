import { Alert, AlertTitle, Box } from '@material-ui/core'

import { FormContext } from 'core/form'

const Form = ({ actions, actionsJustify, model, children }) => 
  <FormContext.Provider value={model}>
    <form noValidate onSubmit={model.handleSubmit}>
      <Box sx={{ boxSizing: "border-box", pt: 3, pb: 4 }}>
        { model.error && <Alert sx={{ justifyContent: model.error.title && "normal" }}>{model.error.title && <AlertTitle>{model.error.title}</AlertTitle>}{model.error.message}</Alert> }
        { children }
      </Box>
      <Box sx={{ alignItems: "center", display: "flex", justifyContent: actionsJustify || "flex-end", '> button:not(:first-of-type)': actionsJustify ? {} : { ml: 2 } }}>
        { actions }
      </Box>
    </form>
  </FormContext.Provider>

export default Form;
