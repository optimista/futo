import { keys, last } from '@futo-ui/utils'
import { useEffect } from 'react'

import { useDispatch, useState } from 'story/context'
import { presentCoors } from 'story/state'

const usePresentPending = () => {
  const dispatch = useDispatch(), state = useState();

  useEffect(() => state.view.present.pending && keys(state.render.nodes).length === state.story.order.length && dispatch(state => {
    const key = state.view.present.key || last(state.view.shownOrder);
    return key ? [{ type: "VIEW_PRESENT", ...presentCoors(state, key) }] : [];
  }), [state.render, state.view.present.pending]);
};

export default usePresentPending;
