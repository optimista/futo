import { filter } from '@futo-ui/utils'

const preloadsReducer = (preloads = {}, action) => {
  switch(action.type) {
    case "preload-add":
      return { ...preloads, [action.key]: action.src };
    case "preload-remove":
      return filter(preloads, k => k !== action.key);
    default:
      return preloads;
  }
}

export default preloadsReducer;
