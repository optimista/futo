const trashReducer = (trash = { over: false }, action) => {
  switch(action.type) {
    case "TRASH_ENTER":
      return { ...trash, over: true };
    case "TRASH_LEAVE":
      return { ...trash, over: false };
    default:
      return trash;
  }
}

export default trashReducer;
