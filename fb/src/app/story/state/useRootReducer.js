import { arrayize, combineReducers, empty, isfunction } from '@futo-ui/utils'
import { useEffect, useReducer as useReactReducer, useRef } from 'react'

import { actionsCreator, grabReducer, renderReducer, storyReducer, viewReducer } from 'story/state'

const effectsReducer = (effects = { onPresentReady: { action: null, key: null }, onTimeout: { action: null, timeout: null } }, action) => {
  switch(action.type) {
    case "on-present-ready":
      return { ...effects, onPresentReady: { action: action.action, key: action.key } }
    case "on-present-ready-unbind":
      return { ...effects, onPresentReady: { action: null, key: null } }
    case "on-timeout":
      return { ...effects, onTimeout: { action: action.action, timeout: action.timeout } }
    case "on-timeout-unbind":
      return { ...effects, onTimeout: { action: null, timeout: null } }
    default:
      return effects;
  }
}

const useRootReducer = (reducers = {}) => {
  const rootReducer = combineReducers({ effectsReducer, grabReducer, renderReducer, storyReducer, viewReducer, ...reducers }),
        [state, dispatch] = useReactReducer((state, actionArg) => {
          let actions = arrayize(isfunction(actionArg) ? actionArg(state) : actionArg);
          
          const runActions = (actions, state) =>
            actions.reduce((accState, seedAction) => {
              const actions = actionsCreator(accState, seedAction);
              return empty(actions) ? rootReducer(accState, seedAction) : runActions(actions, accState);
            }, state)

          return runActions(actions, state);
        }, null, () => rootReducer({}, {}));

  // usePresentReady 
  const { height: containerHeight, width: containerWidth } = state.render.container,
        { height: nodeHeight, width: nodeWidth } = state.render.nodes[state.effects.onPresentReady.key] || {};

  useEffect(() => { containerHeight && containerWidth && nodeHeight && nodeWidth && dispatch({ type: "ON_PRESENT_READY" })
  }, [containerHeight, containerWidth, nodeHeight, nodeWidth]); 

  // useTimeoutEffect
  const timer = useRef(), { timeout } = state.effects.onTimeout;
  useEffect(() => { if (timeout) {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => dispatch({ type: "ON_TIMEOUT" }), timeout); 
  }}, [state.effects.onTimeout.timeout])
  

  return [state, dispatch];
}

export default useRootReducer;
