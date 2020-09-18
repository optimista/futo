import { ClickAwayListener, Fade, MenuList, Paper, Popper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useRef } from 'react'

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
      right: 7
    },
    '&::after': {
      content: "''",
      width: 0,
      height: 0,
      border: "7px solid transparent",
      borderBottomColor: "white",
      position: "absolute",
      top: -13,
      right: 8
    }
  }
}))

const Menu = ({ arrow, anchorEl, children, onClose, open }) => {
  const [arrowRef, setArrowRef] = useRef();  

  const classes = useStyles();
  return (
    <Popper open={open} anchorEl={anchorEl} transition disablePortal placement={ arrow ? "bottom-end" : "top-end"} modifiers={{ offset: { offset: arrow ? "0,4" : "0,-100%" }}}>
      {({ TransitionProps }) => (
        <Fade {...TransitionProps}>
          <Paper className={arrow && classes.arrow}>            
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
