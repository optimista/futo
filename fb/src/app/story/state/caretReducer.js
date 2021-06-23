const caretReducer = (caret = { fold: true, key: null, offset: 0, pending: false }, action) => {
  switch(action.type) {
    case "caret-blur":
      return { ...caret, key: null };
    case "caret-focus":
      return { ...caret, fold: true, key: action.key, offset: action.offset || 0, pending: true };
    case "caret-focus-finish":
      return { ...caret, pending: false };
    case "caret-fold":
      return { ...caret, fold: true, offset: 0, pending: true };
    case "caret-unfold":
      return { ...caret, fold: false }
    default:
      return caret;
  }
}

export default caretReducer;
