import { filter, keys } from '@futo-ui/utils'

const moveReducer = (move, action) => {
  switch(action.type) {
    case "VIEW_MOVE":
      return { ...move, x: move.x + action.dx, y: move.y + action.dy }
    default:
      return move;
  }
}

const presentReducer = (present, action) => {
  switch(action.type) {
    case "VIEW_PRESENT":
      return { ...present, key: null, pending: false, x: action.x, y: action.y }
    case "VIEW_PRESENT_TRIGGER":
      return { ...present, key: action.key, pending: true }
    default:
      return present;
  }
}

const shownOrderReducer = (shownOrder, action) => {
  switch(action.type) {
    case "VIEW_HIDE":
      return shownOrder.slice(0, shownOrder.length - 1);
    case "VIEW_REMOVE":
      return shownOrder.filter(key => !action.keymap[key]);
    case "VIEW_SHOW":
      return shownOrder.concat(action.keys);
    default:
      return shownOrder;
  }
}

const shownReducer = (shown, action) => {
  switch(action.type) {
    case "VIEW_HIDE":
      return { ...shown, [action.key]: false };
    case "VIEW_REMOVE":
      return keys(filter(action.keymap, (_, v) => v)).reduce((acc, key) => ({ ...acc, [key]: false }), shown);
    case "VIEW_SHOW":
      return action.keys.reduce((acc, key) => ({ ...acc, [key]: true }), shown);
    default:
      return shown;
  }
}

const viewReducer = (view = { move: { x: 0, y: 0 }, present: { key: null, pending: false, x: 0, y: 0 }, shown: {}, shownOrder: [] }, action) => {
  switch(action.type) {
    default:
      return {
        ...view,
        move: moveReducer(view.move, action),
        present: presentReducer(view.present, action),
        shown: shownReducer(view.shown, action),
        shownOrder: shownOrderReducer(view.shownOrder, action)
      };
  }
}

export default viewReducer;
