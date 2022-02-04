import { LoadingButton } from '@mui/lab'
import { Refresh } from '@mui/icons-material'
import PropTypes from 'prop-types'

import { useForm } from 'core/form'

/**
 * - Integrates `useModel` from `@futo-ui/hooks`
 * - Props of the [`@mui/LoadingButton`](https://mui.com/api/loading-button) component are also available.
 */
const Submit = ({ children, ...props }) => {
  const model = useForm();
  return <LoadingButton loading={model.isSending} startIcon={model.isFail && <Refresh />} type="submit" {...props}>{ model.isFail ? "Try again" : children }</LoadingButton>
}

Submit.propTypes = {
  /**
   * The content of the component.
   */
  children: PropTypes.node,
};

export default Submit;
