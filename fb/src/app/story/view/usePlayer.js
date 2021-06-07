import { useMouseWheel } from '@futo-ui/hooks'
import { last } from '@futo-ui/utils'

import { useDispatch } from 'story/context'
import { nextShowKey, presentCoors } from 'story/state'

const usePlayer = () => {
  const dispatch = useDispatch();

  useMouseWheel({
    up: () => dispatch(state => {
      const key = last(state.view.shownOrder), key2 = last(state.view.shownOrder, -2);
      return key && key2 ? [{ type: "VIEW_HIDE", key }, { type: "VIEW_PRESENT", ...presentCoors(state, key2) }] : [];
    }),
    down: () => dispatch(state => {
      const key = nextShowKey(state);
      return key ? [{ type: "VIEW_SHOW", keys: [key] }, { type: "VIEW_PRESENT", ...presentCoors(state, key) }] : [];
    })
  });
}

export default usePlayer;
