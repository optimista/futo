import { useDispatch, useState } from 'story/context'
import { Caret, Text } from 'story/nodes'

const TextEditable = ({ id: key, ...props }) => {
  const dispatch = useDispatch(), state = useState();

  const handleMouseUp = e => e.button === 0 &&
    dispatch({ type: "TEXT_LEFT_MOUSE_UP", key, x: e.clientX, y: e.clientY });

  return key === state.caret.key ? <Caret /> : <Text id={key} onMouseUp={handleMouseUp} sx={{ cursor: "pointer" }} {...props} />;
};

export default TextEditable;
