import { ClickAwayListener, Fade, MenuList, Paper, Popper } from '@mui/material'
import { HTMLElementType } from '@mui/utils';
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

const ARROW_WIDTH = 10;

/**
 * - Adds arrow & precise positioning 
 * - Inspired by [`Menu`](http://mui.com/api/menu), but done with [`Popper`](http://mui.com/api/popper)
 */
const Menu = ({ arrow = false, anchorEl, children, onClose = () => {}, open, placement = "start", ...props }) => {
  const [arrowMargin, setArrowMargin] = useState(null);

  // To prevent any flickers (before offsetWidth is received)
  useEffect(() => { anchorEl?.offsetWidth && setArrowMargin(anchorEl?.offsetWidth / 2 - ARROW_WIDTH) }, [anchorEl?.offsetWidth]);

  return (
    <Popper open={open} anchorEl={anchorEl} transition placement={ (arrow ? "bottom-" : "top-") + placement } modifiers={[{ name: "offset", options: { offset: ({ popper }) => arrow ? [0, 8] : [0, -popper.height] }}, { name: 'flip', enabled: false }]} style={{ zIndex: 1150 }} {...props}>
      {({ TransitionProps }) => (
        <Fade {...TransitionProps}>
          <Paper sx={{
            '&::before': {
              ...(arrowMargin ? { left: placement === "start" && arrowMargin, right: placement === "end" && arrowMargin } : {}),
              ...(arrow ? { content: "''", width: 0, height: 0, border: ARROW_WIDTH + "px solid transparent", borderBottomColor: 'divider', position: "absolute", top: -(ARROW_WIDTH * 2 - 1) } : {})
            }, 
            '&::after': {
              ...(arrowMargin ? { left: placement === "start" && arrowMargin + 1, right: placement === "end" && arrowMargin + 1 }: {}),
              ...(arrow ? { content: "''", width: 0, height: 0, border: (ARROW_WIDTH - 1) + "px solid transparent", borderBottomColor: "background.default", position: "absolute", top: -((ARROW_WIDTH - 1) * 2 - 1) } : {}),
            }
          }}>
            <ClickAwayListener onClickAway={onClose}>
              <MenuList>{children}</MenuList>
            </ClickAwayListener> 
          </Paper>
        </Fade>
      )}
    </Popper>
  );
};

Menu.propTypes = {
  /**
   * An HTML element, or a function that returns one.
   * It's used to set the position of the menu.
   */
  anchorEl: HTMLElementType, 
  /**
   * If true, adds an arrow. 
   */
  arrow: PropTypes.bool,
  /**
   * Menu contents, normally [`@mui/MenuItem`](?path=/docs/mui-menuitem--default)s.
   */
  children: PropTypes.node,
  /**
   * Callback fired when the click happens away from the [`core/Menu`](/docs/core-menu--default).
   */
  onClose: PropTypes.func,
  /**
   * If `true`, the component is shown.
   */
  open: PropTypes.bool.isRequired,
  /**
   * Popper placement.
   */
  placement: PropTypes.oneOf(["end", "start"]),
};

Menu.defaultProps = {
  arrow: false,
  onClose: () => {},
  open: false,
  placement: "start"
}

export default Menu;
