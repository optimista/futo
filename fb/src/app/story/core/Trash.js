import { Box } from '@material-ui/core'
import { DeleteOutline } from '@material-ui/icons'
import { makeStyles } from '@material-ui/styles'
import clsx from 'clsx'

import { useDispatch, useState } from 'story/context'

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.action.selected,
    borderRadius: "100%",
    bottom: 0,
    color: "white",
    height: 300,
    left: 0,
    position: "fixed",
    width: 300,
    transform: "translate(-50%, 50%)",
    zIndex: 1
  },
  hover: { backgroundColor: theme.palette.primary.main },
  icon: {
    color: theme.palette.background.default,
    fontSize: "3.2rem",
    right: "31%",
    position: "absolute",
    top: "31%",
    transform: "translate(50%, -50%)"
  },
  iconHover: { color: theme.palette.text.main }
}));

const Trash = () => {
  const dispatch = useDispatch(), state = useState();

  const handleMouseEnter = () => dispatch({ type: "trash-enter" });
  const handleMouseLeave = () => dispatch({ type: "trash-leave" });
  const handleMouseUp = e => e.button === 0 && dispatch({ type: "TRASH_LEFT_MOUSE_UP" })

  const classes = useStyles();
  return (
    <Box className={clsx(classes.root, { [classes.hover]: state.trash.over })} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onMouseUp={handleMouseUp}>
      <DeleteOutline className={clsx(classes.icon, { [classes.iconHover]: state.trash.over })} />
    </Box>
  )
} 

export default Trash;
