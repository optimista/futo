import { filter } from '@futo-ui/utils'

import { useReducer as useReactReducer } from 'react'

const useReducer = () => useReactReducer((state, action) => {
  switch(action.type) {
    case "autosave-trigger":
      return { ...state, autosave: { ...state.autosave, pending: true, trigger: !state.autosave.trigger } };
    case "autosave-success":
      return { ...state, autosave: { ...state.autosave, pending: false } };
    case "autosave-notification-hide":
      return { ...state, autosave: { ...state.autosave, notification: false } };
    case "autosave-notification-show":
      return { ...state, autosave: { ...state.autosave, notification: true } };
    case "caret-blur":
      return { ...state, caret: { ...state.caret, key: null } };
    case "caret-focus":
      return { ...state, caret: { key: action.key, offset: action.offset || 0, pending: true } };
    case "caret-focus-finish":
      return { ...state, caret: { ...state.caret, pending: false } };
    case "story-load":
      return { ...state, story: action.story };
    case "story-node-add":
      return { ...state, story: { ...state.story, nodes: { ...state.story.nodes, [action.key]: { content: action.content || "" } }, positions: { ...state.story.positions, [action.key]: { x: action.x, y: action.y } } } };
    case "story-node-change":
      return { ...state, story: { ...state.story, nodes: { ...state.story.nodes, [action.key]: { content: action.content } } } };
    case "story-node-remove":
      return { ...state, story: { ...state.story, nodes: filter(state.story.nodes, k => k !== action.key) } };
    default:
      return state;
  }
}, { autosave: { notification: false, pending: false, trigger: false }, caret: { key: null, offset: 0, pending: false }, story: { nodes: {}, positions: {}, sx: {} } });

export default useReducer;
