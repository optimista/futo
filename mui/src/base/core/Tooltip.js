import { Tooltip as MuiTooltip } from '@mui/material'
import PropTypes from 'prop-types';

/**
 * - Allows controlled hiding without the [need of handlers & state](https://mui.com/components/tooltips/#controlled-tooltips). 
 * - Props of the [`@mui/Tooltip`](https://mui.com/api/tooltip) component are also available.
 */
const Tooltip = ({ children, hide = false, ...props }) =>
  <MuiTooltip componentsProps={hide ? { popper: { style: { display: "none" } } } : {}}{...props}>
    {children}
  </MuiTooltip>

Tooltip.propTypes = {
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * If true, the tooltip is forcefully hidden.
   */
  hide: PropTypes.bool,
};

export default Tooltip;
