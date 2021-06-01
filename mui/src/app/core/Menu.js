import { ClickAwayListener, Fade, MenuList, Paper, Popper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useEffect, useState } from 'react'

const ARROW_WIDTH = 10;

const useStyles = makeStyles(theme => ({
  arrow: {
    '&::before': {
      content: "''",
      width: 0,
      height: 0,
      border: ARROW_WIDTH + "px solid transparent",
      borderBottomColor: theme.palette.divider,
      position: "absolute",
      top: -(ARROW_WIDTH * 2 - 1),
    },
    '&::after': {
      content: "''",
      width: 0,
      height: 0,
      border: (ARROW_WIDTH - 1) + "px solid transparent",
      borderBottomColor: "white",
      position: "absolute",
      top: -((ARROW_WIDTH - 1) * 2 - 1),
    }
  }
}))

const Menu = ({ arrow, anchorEl, children, onClose, open, placement = "start", ...props }) => {
  const [arrowMargin, setArrowMargin] = useState(null);

  useEffect(() => anchorEl?.offsetWidth && setArrowMargin(anchorEl?.offsetWidth / 2 - ARROW_WIDTH), [anchorEl?.offsetWidth]);

  const classes = useStyles();
  return (
    <Popper open={open} anchorEl={anchorEl} transition placement={ (arrow ? "bottom-" : "top-") + placement } modifiers={[{ name: "offset", options: { offset: ({ popper }) => arrow ? [0, 8] : [0, -popper.height] }}, { name: 'flip', enabled: false }]} {...props}>
      {({ TransitionProps }) => (
        <Fade {...TransitionProps}>
          <Paper className={arrow && classes.arrow} elevation={2} sx={arrowMargin && {
            '&::before': { left: placement === "start" && arrowMargin, right: placement === "end" && arrowMargin }, 
            '&::after': { left: placement === "start" && arrowMargin + 1, right: placement === "end" && arrowMargin + 1 }
          }}>
            <ClickAwayListener onClickAway={onClose}>
              <MenuList>{children}</MenuList>
            </ClickAwayListener> 
          </Paper>
        </Fade>
      )}
    </Popper>
  );
}

export default Menu;
