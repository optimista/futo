import { LoadingButton } from '@mui/lab'
import { Refresh } from '@mui/icons-material'
import PropTypes from 'prop-types'

import { useForm } from 'core/form'
import { l, useLocale } from 'core/utils/i18n'

const dict = {
  en: {
    "Try again": "Try again"
  },
  es: {
    "Try again": "Intente de nuevo"
  }
}

/**
 * - Integrates `useModel` from `@futo-ui/hooks`
 * - Props of the [`@mui/LoadingButton`](https://mui.com/api/loading-button) component are also available.
 */
const Submit = ({ children, ...props }) => {
  const locale = useLocale(), model = useForm();
  return <LoadingButton loading={model.isSending} startIcon={model.isFail && <Refresh />} type="submit" {...props}>{ model.isFail ? l("Try again", dict, locale) : children }</LoadingButton>;
}

Submit.propTypes = {
  /**
   * The content of the component.
   */
  children: PropTypes.node,
};

export default Submit;
