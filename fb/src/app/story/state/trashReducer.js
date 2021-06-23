const trashReducer = (trash = { over: false }, action) => {
  switch(action.type) {
    case "trash-enter":
      return { ...trash, over: true };
    case "trash-leave":
      return { ...trash, over: false };
    default:
      return trash;
  }
}

export default trashReducer;
