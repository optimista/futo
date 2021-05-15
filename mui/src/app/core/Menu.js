import clsx from 'clsx'
import { ClickAwayListener, Fade, MenuList, Paper, Popper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  arrow: {
    '&::before': {
      content: "''",
      width: 0,
      height: 0,
      border: "8px solid transparent",
      borderBottomColor: theme.palette.divider,
      position: "absolute",
      top: -15,
    },
    '&::after': {
      content: "''",
      width: 0,
      height: 0,
      border: "7px solid transparent",
      borderBottomColor: "white",
      position: "absolute",
      top: -13,
    }
  },
  arrowStart: {
    '&::before': { left: 8 },
    '&::after': { left: 9 }
  },
  arrowEnd: {
    '&::before': { right: 8 },
    '&::after': { right: 9 }
  }
}))

const Menu = ({ arrow, anchorEl, children, onClose, open, placement = "start", ...props }) => {
  const classes = useStyles();
  return (
    <Popper open={open} disablePortal anchorEl={anchorEl} transition placement={ (arrow ? "bottom-" : "top-") + placement } modifiers={[{ name: "offset", options: { offset: ({ popper }) => arrow ? [0, 4] : [0, -popper.height] }}, { name: 'flip', enabled: false }]} {...props}>
      {({ TransitionProps }) => (
        <Fade {...TransitionProps}>
          <Paper className={arrow && clsx(classes.arrow, { [classes.arrowStart]: placement === "start", [classes.arrowEnd]: placement === "end" })} elevation={2} style={{ top: 11 }}>
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
