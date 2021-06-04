const caretReducer = (caret = { fold: true, key: null, offset: 0, pending: false }, action) => {
  switch(action.type) {
    case "CARET_BLUR":
      return { ...caret, key: null };
    case "CARET_FOCUS":
      return { ...caret, fold: true, key: action.key, offset: action.offset || 0, pending: true };
    case "CARET_FOCUSED":
      return { ...caret, pending: false };
    case "CARET_TOGGLE":
      return { ...caret, fold: !caret.fold };
    default:
      return caret;
  }
}

export default caretReducer;
