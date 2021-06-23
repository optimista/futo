import { filter } from '@futo-ui/utils'

const moveReducer = (move = { x: 0, y: 0 }, action) => {
  switch(action.type) {
    case "view-move":
      return { ...move, x: move.x + action.dx, y: move.y + action.dy }
    default:
      return move;
  }
}

const presentReducer = (present = { x: 0, y: 0 }, action) => {
  switch(action.type) {
    case "view-present":
      return { ...present, x: action.x, y: action.y }
    default:
      return present;
  }
}

const shownOrderReducer = (shownOrder = [], action) => {
  switch(action.type) {
    case "view-hide":
      return shownOrder.slice(0, shownOrder.length - 1);
    case "view-node-remove":
      return shownOrder.filter(k => k !== action.key);
    case "view-show":
      return [...new Set(shownOrder.concat(action.keys))];
    default:
      return shownOrder;
  }
}

const shownReducer = (shown = {}, action) => {
  switch(action.type) {
    case "view-hide":
      return { ...shown, [action.key]: false };
    case "view-node-remove":
      return filter(shown, k => k !== action.key);
    case "view-show":
      return action.keys.reduce((acc, key) => ({ ...acc, [key]: true }), shown);
    default:
      return shown;
  }
}

const viewReducer = (view = {}, action) => {
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
