import { Tooltip as MuiTooltip } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

const useStyles = makeStyles(() => ({ popper: { opacity: 0, pointerEvents: "none" } }));

const Tooltip = ({ children, classes: classesProp, hide, ...props }) => {
  const classes = useStyles();
  return (
    <MuiTooltip classes={{ popper: hide ? classes.popper : undefined, ...classesProp }} {...props}>
      {children}
    </MuiTooltip>
  )
}

Tooltip.propTypes = {
  /**
   * Determines whether tooltip is hidden (not controlled) - made to control interference with e.g. Menus / Popovers / Poppers.
   */
  hide: PropTypes.bool,
  /**
   * The rest of props from MuiTooltip 
   */
  ...MuiTooltip.propTypes
};

export default Tooltip;
