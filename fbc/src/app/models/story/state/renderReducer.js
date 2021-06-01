const renderContainerReducer = (renderContainer, action) => {
  switch(action.type) {
    case "RENDER_CONTAINER_RESIZE":
      return { height: action.height, width: action.width };
    default:
      return renderContainer;
  }
}

const renderNodesReducer = (renderNodes, action) => {
  switch(action.type) {
    case "RENDER_NODE_RESIZE":
      return { ...renderNodes, [action.key]: { height: action.height, width: action.width } };
    default:
      return renderNodes;
  }
}

const renderReducer = (render = { container: {}, nodes: {} }, action) => {
  switch(action.type) {
    default:
      return {
        ...render,
        container: renderContainerReducer(render.container, action),
        nodes: renderNodesReducer(render.nodes, action)
      }
  }
}

export default renderReducer;
