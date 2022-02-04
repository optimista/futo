import { Link } from '@mui/material'
import PropTypes from 'prop-types'

import { Avatar } from 'core'
import { NAMES } from 'core/locales'

/**
 * - Integrates [`@mui/Link`](https://mui.com/api/link) to home & shows logo of the project. 
 * - Props of the [`core/Avatar`](/docs/core-avatar--default) component are also available.
 */
const Logo = props => 
  <Link href="/" underline="none">
    <Avatar alt={NAMES.ccname} src={"/"+NAMES.name+".png"} {...props} />
  </Link>

Logo.propTypes = {
  /**
   * The @mui system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

export default Logo;
