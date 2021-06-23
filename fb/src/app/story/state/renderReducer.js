import { filter } from '@futo-ui/utils'

const renderContainerReducer = (renderContainer = {}, action) => {
  switch(action.type) {
    case "render-container-resize":
      return { height: action.height, width: action.width };
    default:
      return renderContainer;
  }
}

const renderNodesReducer = (renderNodes = {}, action) => {
  switch(action.type) {
    case "render-node-remove":
      return filter(renderNodes, k => k !== action.key);
    case "render-node-resize":
      return { ...renderNodes, [action.key]: { height: action.height, width: action.width } };
    default:
      return renderNodes;
  }
}

const renderReducer = (render = {}, action) => {
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
