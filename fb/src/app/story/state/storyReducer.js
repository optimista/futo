import { filter, insert } from '@futo-ui/utils'

const nodeReducer = (node, action) => {
  switch(action.type) {
    case "story-node-add":
      return { content: action.content || "" };
    case "story-node-change":
      return { ...node, 
        ...(action.content !== undefined ? { content: action.content } : {}),
        ...(action.height ? { height: action.height } : {}),
        ...(action.placeholder ? { placeholder: action.placeholder } : {}),
        ...(action.t ? { type: action.t } : {}),
        ...(action.width ? { width: action.width } : {})
      };
    default:
      return node;
  }
} 

const nodesReducer = (nodes = {}, action) => {
  switch(action.type) {
    case "story-node-add":
    case "story-node-change":
      return { ...nodes, [action.key]: nodeReducer(nodes[action.key], action) };
    case "story-node-remove":
      return filter(nodes, k => k !== action.key);
    default:
      return nodes;
  }
}

const orderReducer = (order = [], action) => {
  switch(action.type) {
    case "story-node-add":
      return insert(order, action.order, [action.key]);
    case "story-node-remove":
      return order.filter(k => k !== action.key);
    default:
      return order;
  }
}

const positionReducer = (position, action) => {
  switch(action.type) {
    case "story-node-add":
      return { x: action.x, y: action.y }
    case "story-node-move":
      return { x: position.x + action.dx, y: position.y + action.dy }
    default:
      return position;
  }
}

const positionsReducer = (positions = {}, action) => {
  switch(action.type) {
    case "story-node-add":
    case "story-node-move":
      return { ...positions, [action.key]: positionReducer(positions[action.key], action) };
    case "story-node-remove":
      return filter(positions, k => k !== action.key);
    default:
      return positions;
  }
}

const sxReducer = (sx = {}, action) => {
  switch(action.type) {
    case "story-node-add":
    case "story-node-change":
      return action.sx || sx; 
    default:
      return sx;
  }
}

const sxsReducer = (sxs = {}, action) => {
  switch(action.type) {
    case "story-node-add":
    case "story-node-change":
      return { ...sxs, [action.key]: sxReducer(sxs[action.key], action) };
    case "story-node-remove":
      return filter(sxs, k => k !== action.key);
    default:
      return sxs;
  }
}

const storyReducer = (story = {}, action) => {
  switch(action.type) {
    case "story-load":
      return action.story;
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
