import { IconButton as MuiIconButton } from '@mui/material'
import PropTypes from 'prop-types';

import { Tooltip } from 'core'

/**
 * - Includes [`core/Tooltip`](/docs/core-tooltip--default).
 * - Props of the [`@mui/IconButton`](/docs/mui-iconbutton--default) component are also available.
 */
const IconButton = ({ children, TooltipProps, ...props }) => {
  const renderIconButton = <MuiIconButton {...props}>{children}</MuiIconButton>;
  return TooltipProps?.title ? <Tooltip {...TooltipProps}>{renderIconButton}</Tooltip> : renderIconButton;
}

IconButton.propTypes = {
  /**
   * The content of the component.
   */
  children: PropTypes.node.isRequired,
  /**
   * Props applied to the [`core/Tooltip`](?path=/docs/core-tooltip--default) component.
   */
  TooltipProps: PropTypes.object,
};

export default IconButton
