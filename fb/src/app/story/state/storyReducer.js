import { filter, insert } from '@futo-ui/utils'

const nodeReducer = (node, action) => {
  switch(action.type) {
    case "NODE_ADD":
      return { content: action.content || "" };
    case "NODE_EDIT":
      return { ...node, content: action.value };
    case "NODE_IMAGE":
      return { ...node, content: action.value, type: "image", width: 250 };
    default:
      return node;
  }
} 

const nodesReducer = (nodes, action) => {
  switch(action.type) {
    case "NODES_REMOVE":
      return filter(nodes, k => !action.keymap[k]);
    default:
      return action.key ? {
        ...nodes,
        [action.key]: nodeReducer(nodes[action.key], action)
      } : nodes;
  }
}

const orderReducer = (order, action) => {
  switch(action.type) {
    case "NODE_ADD":
      return insert(order, action.orderIndex, [action.key]);
    case "NODES_REMOVE":
      return order.filter(k => !action.keymap[k]);
    default:
      return order;
  }
}

const positionReducer = (position, action) => {
  switch(action.type) {
    case "NODE_ADD":
      return { x: action.x, y: action.y }
    case "NODE_MOVE":
      return { x: position.x + action.dx, y: position.y + action.dy }
    default:
      return position;
  }
}

const positionsReducer = (positions, action) => {
  switch(action.type) {
    case "NODES_REMOVE":
      return filter(positions, k => !action.keymap[k]);
    default:
      return action.key ? {
        ...positions,
        [action.key]: positionReducer(positions[action.key], action)
      } : positions;
  }
}

const sxReducer = (sx = {}, action) => {
  switch(action.type) {
    case "NODE_ADD":
      return action.sx; 
    default:
      return sx;
  }
}

const sxsReducer = (sxs = {}, action) => {
  switch(action.type) {
    case "NODES_REMOVE":
      return filter(sxs, k => !action.keymap[k]);
    default:
      return action.key ? {
        ...sxs,
        [action.key]: sxReducer(sxs[action.key], action)
      } : sxs;
  }
}

const storyReducer = (story = { nodes: {}, order: [], positions: {}, sx: {} }, action) => {
  switch(action.type) {
    case "STORY_LOAD":
      return action.value;
    default:
      return {
        ...story,
        nodes: nodesReducer(story.nodes, action),
        order: orderReducer(story.order, action),
        positions: positionsReducer(story.positions, action),
        sx: sxsReducer(story.sx, action)
      };
  }
}

export default storyReducer;
