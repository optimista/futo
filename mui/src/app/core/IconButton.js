import { IconButton as MuiIconButton } from '@mui/material'
import PropTypes from 'prop-types';
import { forwardRef } from 'react'

import { Tooltip } from 'core'

/**
 * - Includes [`core/Tooltip`](/docs/core-tooltip--default).
 * - Props of the [`@mui/IconButton`](https://mui.com/api/icon-button/) component are also available.
 */
const IconButton = forwardRef(({ children, TooltipProps, ...props }, ref) => {
  const renderIconButton = <MuiIconButton ref={ref} {...props}>{children}</MuiIconButton>;
  return TooltipProps?.title ? <Tooltip {...TooltipProps}>{renderIconButton}</Tooltip> : renderIconButton;
});

IconButton.propTypes = {
  /**
   * The content of the component.
   */
  children: PropTypes.node.isRequired,
  /**
   * Props applied to the [`core/Tooltip`](/docs/core-tooltip--default) component.
   */
  TooltipProps: PropTypes.object,
};

export default IconButton
