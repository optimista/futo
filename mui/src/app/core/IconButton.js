import { IconButton as MuiIconButton } from '@material-ui/core'

import { Tooltip } from 'core'

const IconButton = ({ children, hideTooltip, tooltip, TooltipProps, ...props }) =>
  <Tooltip hide={hideTooltip} title={tooltip} {...TooltipProps}>
    <MuiIconButton {...props}>
      {children}
    </MuiIconButton>
  </Tooltip>

export default IconButton
