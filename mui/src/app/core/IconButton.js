import { sxu } from '@futo-ui/utils'
import { IconButton as MuiIconButton } from '@mui/material'
import PropTypes from 'prop-types';
import { forwardRef } from 'react'

import { Tooltip } from 'core'

/**
 * - Includes [`core/Tooltip`](/docs/core-tooltip--default).
 * - Props of the [`@mui/IconButton`](https://mui.com/api/icon-button/) component are also available.
 */
const IconButton = forwardRef(({ children, flat = false, TooltipProps, sx, ...props }, ref) => {
  const renderIconButton = <MuiIconButton ref={ref} sx={sxu(flat ? { transition: t => t.transitions.create('color', { duration: t.transitions.duration.shortest }), '&:hover': { backgroundColor: "transparent" } } : {}, sx)} {...props}>{children}</MuiIconButton>;
  return TooltipProps?.title ? <Tooltip {...TooltipProps}>{renderIconButton}</Tooltip> : renderIconButton;
});

IconButton.propTypes = {
  /**
   * The content of the component.
   */
  children: PropTypes.node.isRequired,

  /**
   * Determines whether we show `backgroundColor` on hover or not (also adds transition for color if not). 
   * @default false
   */
  flat: PropTypes.bool,
  
  /**
   * The @mui system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),

  /**
   * Props applied to the [`core/Tooltip`](/docs/core-tooltip--default) component.
   */
  TooltipProps: PropTypes.object,
};

export default IconButton
