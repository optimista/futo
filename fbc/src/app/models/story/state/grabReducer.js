const grabReducer = (grab = { dragged: false, handle: null, key: null, last: null }, action) => {
  switch(action.type) {
    case "GRAB_START":
      return { ...grab, handle: action.handle, key: action.key, last: { x: action.x, y: action.y } };
    case "GRAB_DRAG":
      return { ...grab, dragged: true, last: { x: action.x, y: action.y } }
    case "GRAB_END":
      return { ...grab, dragged: false, handle: null, key: null, last: null }
    default:
      return grab;
  }
}

export default grabReducer;
