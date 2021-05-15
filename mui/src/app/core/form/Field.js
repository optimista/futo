import { CircularProgress, TextField } from '@material-ui/core'
import { Check, Clear } from '@material-ui/icons'
import { useContext } from 'react'

import { FormContext } from 'core/form'

const Field = ({ helperText, label, name, onKeyDown, ...props }) => {
  const model = useContext(FormContext);

  const endAdornment = name => {
    switch(true) {
      case model.isValidating(name): return <CircularProgress size={16} sx={{ ml: "2px", mr: "3px" }} />
      case model.isValidated(name) && model.errors.has(name): return <Clear fontSize="small" />
      case model.isValidated(name) && !model.errors.has(name): return <Check fontSize="small" />
    }
  }

  const handleKeyDown = e => e.key === 'Enter' && (!props.multiline || e.metaKey) ? model.handleSubmit(e) : (onKeyDown && onKeyDown(e));

  return <TextField error={model.errors.has(name)} helperText={helperText ?? model.errors[name]?.message} inputRef={model.refs[name]} InputProps={{ endAdornment: model.validatesInline(name) && endAdornment(name) }} label={label ?? name} onChange={model.handleChange(name)} onKeyDown={handleKeyDown} value={model[name]} {...props} />
}

export default Field;
