const getPlaceholder = state => {
  const n = state.story.order.length;
  switch(true) {
    case n === 1: return "Title";
    case n <= 2: return "My story starts...";
    case n <= 4: return "Keep writing";
    case n <= 7: return "Your are doing well";
    case n <= 12: return "Don't forget to review";
    default: return "Time for conclusion?";
  }
}

export default getPlaceholder;
