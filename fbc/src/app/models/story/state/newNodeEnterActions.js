import { last } from '@futo-ui/utils'

import { newNodeActions } from 'models/story/state'

const newNodeEnterActions = (state, keyArg, { content } = {}) => {
  const key = keyArg || last(state.story.order), { x, y } = state.story.positions[key] || { x: -250, y: 80 },
        { height } = state.render.nodes[key] || { height: 0 };

  return newNodeActions(state, { content, x, y: y + height + 10 });
}

export default newNodeEnterActions;
