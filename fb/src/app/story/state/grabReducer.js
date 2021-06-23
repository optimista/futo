const grabReducer = (grab = { dragged: false, handle: null, key: null, prev: null }, action) => {
  switch(action.type) {
    case "grab-start":
      return { ...grab, handle: action.handle, key: action.key, prev: { x: action.x, y: action.y } };
    case "grab-drag":
      return { ...grab, dragged: true, prev: { x: action.x, y: action.y } }
    case "grab-end":
      return { ...grab, dragged: false, handle: null, key: null, prev: null }
    default:
      return grab;
  }
}

export default grabReducer;
