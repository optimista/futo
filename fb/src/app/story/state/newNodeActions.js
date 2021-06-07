import { empty } from '@futo-ui/utils'

import { newNodeKey, newNodeOrderIndex } from 'story/state'

const newNodeActions = (state, { content, x, y }) => {
  const key = newNodeKey(state.story.nodes), orderIndex = newNodeOrderIndex(state);
  return [{ type: "NODE_ADD", key, content, orderIndex, ...(empty(state.story.order) ? { sx: { fontSize: "2rem", fontWeight: "bold" } } : {}), x, y }, { type: "VIEW_SHOW", keys: [key] }, { type: "CARET_FOCUS", key }, { type: "VIEW_PRESENT_TRIGGER", key }];
};

export default newNodeActions;
