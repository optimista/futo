import { offset } from '@futo-ui/utils'

import { useDispatch } from 'models/story/context'
import { TextContainer } from 'models/story/view'

const TextFocusable = ({ children, id: key, ...props }) => {
  const dispatch = useDispatch(),
        handleMouseUp = e =>
          dispatch(state => state.grab.dragged ? [] : [{ type: "CARET_FOCUS", key, offset: offset({ x: e.clientX, y: e.clientY }) }]);

  return <TextContainer onMouseUp={handleMouseUp} {...props}>{children}</TextContainer>
}

export default TextFocusable;
