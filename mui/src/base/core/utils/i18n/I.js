import { Skeleton } from '@mui/material'
import PropTypes from 'prop-types'

import { l, useDict, useLocale } from 'core/utils/i18n'

/**
 * - Translates key from a provider dictionary into an active locale. 
 * - Props of the [`@mui/Skeleton`](https://mui.com/api/skeleton/) are also available.
 */
const I = ({ arg, dict: argDict, k, lines = 1, ...props }) => {
  const udict = useDict(), dict = argDict || udict, locale = useLocale();
  return k && locale ? l(k, dict, locale, arg) : <>{[...Array(lines).keys()].map((_, key) => <Skeleton key={key} {...props} />)}</>;
}

I.propTypes = { 
  /**
   * The dictionary from which we acquire translations. 
   */
  arg: PropTypes.any,

  /**
   * The dictionary from which we acquire translations. 
   */
  dict: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.func, PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.func]))])),
  
  /**
   * A key for a particular translation. 
   */
  k: PropTypes.string,
  
  /**
   * The number of lines for [`@mui/Skeleton`](https://mui.com/api/skeleton/)
   * @default 1
   */
  lines: PropTypes.number,
  
  /**
   * Width of the skeleton.
   * Useful when the skeleton is inside an inline element with no width of its own.
   */
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
}

export default I;
