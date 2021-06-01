import { IconButton as MuiIconButton } from '@material-ui/core'

import { Tooltip } from 'core'

const IconButton = ({ children, hideTooltip, tooltip, TooltipProps, ...props }) => {
  const renderIconButton = <MuiIconButton {...props}>{children}</MuiIconButton>;
  return tooltip ? <Tooltip hide={hideTooltip} title={tooltip} {...TooltipProps}>{renderIconButton}</Tooltip> : renderIconButton;
}

export default IconButton
