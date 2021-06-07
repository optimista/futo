import { Box } from '@material-ui/core'
import { DeleteOutline } from '@material-ui/icons'
import { makeStyles } from '@material-ui/styles'
import clsx from 'clsx'

import { useDispatch, useState } from 'story/context'

const useStyles = makeStyles(() => ({
  root: {
    bottom: 20,
    height: "50px",
    left: 20,
    position: "fixed",
    width: "50px",
    border: "3px dashed black"
  },
  hover: { borderColor: "red" },
  icon: {
    color: "black",
    fontSize: "2rem",
    left: "50%",
    position: "absolute",
    top: "50%",
    transform: "translate(-50%, -50%)"
  },
  iconHover: {
    color: "red"
  }
}));

const Trash = () => {
  const dispatch = useDispatch(), state = useState();

  const handleMouseEnter = () => {
    console.log('mouseneter')
    dispatch({ type: "TRASH_ENTER" });
  }
  const handleMouseLeave = () => dispatch({ type: "TRASH_LEAVE" });

  const handleMouseUp = e => e.button === 0 && dispatch(state => {
    const keymap = { [state.grab.key]: true };
    return [{ type: "TRASH_LEAVE" }, { type: "NODES_REMOVE", keymap }, { type: "VIEW_REMOVE", keymap }];
  });

  const classes = useStyles();
  return (
    <Box className={clsx(classes.root, { [classes.hover]: state.trash.over })} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onMouseUp={handleMouseUp}>
      <DeleteOutline className={clsx(classes.icon, { [classes.iconHover]: state.trash.over })} />
    </Box>
  )
} 

export default Trash;
