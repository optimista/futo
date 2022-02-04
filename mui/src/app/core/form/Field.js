import { CircularProgress, TextField } from '@mui/material'
import { Check, Clear } from '@mui/icons-material'
import PropTypes from 'prop-types'

import { useForm } from 'core/form'

/**
 * - Integrates `useModel` from `@futo-ui/hooks`
 * - Props of the [`@mui/TextField`](https://mui.com/api/text-field) component are also available.
 */
const Field = ({ helperText, label, name, onKeyDown, ...props }) => {
  const model = useForm();

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

Field.propTypes = {
  /**
   * The helper text content.
   */
  helperText: PropTypes.string,

  /**
   * The label content.
   */
  label: PropTypes.string,
  
  /**
   * Name attribute of the `input` element.
   */
  name: PropTypes.string,
  
  /**
   * Callback fired when the key is pressed.
   */
  onKeyDown: PropTypes.func,
};

export default Field;
