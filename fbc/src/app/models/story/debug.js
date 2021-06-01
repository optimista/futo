const debug = state => {
  if (!empty(state.story)) {
    if (state.story.order.length !== keys(state.story.nodes).length) throw "Story Order does not map to story nodes!"
  }
}

export default debug;
