import { avg, delta, empty, last, max, offset, rect, sum } from '@futo-ui/utils'

const clientToCoors = ({ render: { container: { height, width } }, story: { align = { x: 0.5, y: 0 } }, view: { move, present } }, { x, y }) =>
  ({ x: x - move.x - present.x - align.x * width, y: y - move.y - present.y - align.y * height });
      
const newNodeKey = nodes => { let i = 0, k; do { i++; k = i + "n"; } while (nodes[k]); return k; }

const newNodeOrder = state =>
  max([0, ...state.story.order.map((key, index) => ({ index, shown: state.view.shown[key] })).filter(n => n.shown).map(n => n.index)]) + 1;

const nextShowKey = state => state.story.order.filter(key => !state.view.shown[key])[0];

const nodeIsRendered = (state, key) => { const { height, width } = state.render.nodes[key] || {}; return height && width; }

const presentCoors = ({ render, story, view }, key) => {
  const node = story.positions[key], rnode = render.nodes[key], { container } = render, 
        { left, top, right, bottom } = delta( // Is overlapping if left < 0, top < 0, 0 < right, 0 < bottom
              rect({ x: node.x, y: node.y }, { height: rnode.height, width: rnode.width }), // Before rect -> rectRel (with align)
              sum(rect(clientToCoors({ render, story, view }, { x: 0, y: 0 }), { height: container.height, width: container.width }),
                { left: 24, top: 64, right: -24, bottom: -24 })); // PADDING
  console.log('presentCoors', key, container, rnode)

  return delta(view.present, {
    x: left < 0 && 0 < right ? avg(left, right) : Math.min(left, Math.max(0, right)),
    y: top < 0 && 0 < bottom ? avg(top, bottom) : Math.min(top, Math.max(0, bottom))
  });
}
  
const actionsCreator = (state, action) => {
  switch(action.type) {
    case "AUTOSAVE_SUCCESS": {
      return [{ type: "autosave-success" }, { type: "on-timeout", timeout: 5000, action: { type: "autosave-notification-hide" } }]; }

    case "CONTAINER_LEFT_MOUSE_UP": {
      const { x, y } = clientToCoors(state, { x: action.x, y: action.y });
      return !state.grab.dragged && state.grab.handle === "container" ? [{ type: "NODE_ADD", x, y }] : []; }

    case "CARET_BLUR": {
      const { fold, key } = state.caret; if (!fold) return []; const { content } = state.story.nodes[key];
      return [{ type: "caret-blur" }].concat(empty(content) ? [{ type: "NODE_REMOVE", key }] : []); }
    case "CARET_CHANGE": { 
      const { key } = state.caret, { content } = action; 
      return [{ type: "NODE_CHANGE", key, content }]; }
    case "CARET_ENTER": {
      const { key } = state.caret, { content } = state.story.nodes[key], { startOffset, endOffset } = action; 
      return [{ type: "NODE_CHANGE", key, content: content.slice(0, startOffset) },
              { type: "NODE_ADD_BELOW", key, content: content.slice(endOffset) }]; }
    case "CARET_IMAGE_LOAD": {
      const { content } = action, { key } = state.caret;
      return [{ type: "NODE_CHANGE", key, content, t: "image", sx: {} }, { type: "view-show", keys: [key] }]; }
    case "CARET_TOGGLE": {
      const { fold } = state.caret;
      return [{ type: fold ? "caret-unfold" : "caret-fold" }]; }
  
    case "GRAB_START_NODE":
      const { key, x, y } = action;
      return state.caret.key !== key ? [{ type: "grab-start", handle: "node", key, x, y }] : [];
    case "GRAB_MOVE": {
      const { x, y } = action, { handle, key, prev } = state.grab; if (!handle && !prev) return []; const dx = x - prev.x, dy = y - prev.y;
      return [handle === "node" ? { type: "story-node-move", key, dx, dy } : { type: "view-move", dx, dy }, { type: "grab-drag", x, y }]; }
    case "GRAB_MOUSE_UP": {
      const { handle } = state.grab; if (!handle) return []; const actions = [{ type: "grab-end" }];
      if (handle === "node") actions.push({ type: "autosave-trigger" }); return actions; }

    case "INIT_EDITOR": {
      const { story } = action, { order } = story, key = last(action.story.order);
      return [{ type: "story-load", story }, { type: "view-show", keys: order }, key ? { type: "on-present-ready", key, action: { type: "NODE_ADD_BELOW", key } } : { type: "NODE_ADD", x: -250, y: 80 }]; }
    case "INIT_VIEWER": {
      const { story } = action, actions = [{ type: "story-load", story }], key = story.order[0];
      if (key) actions.push({ type: "view-show", keys: [key] }, { type: "on-present-ready", key, action: { type: "PRESENT", key } });
      return actions; }

    case "NODE_ADD": {
      const { content, x, y } = action, key = newNodeKey(state.story.nodes), order = newNodeOrder(state),
            sx = empty(state.story.order) ? { fontSize: "2rem", fontWeight: "bold" } : {};

      return [{ type: "story-node-add", key, content, order, sx: { ...sx, maxWidth: 400 }, x, y },
              { type: "view-show", keys: [key] }, { type: "caret-focus", key }]; }
    case "NODE_ADD_BELOW": {
      const { content } = action, { x, y } = state.story.positions[action.key], { height } = state.render.nodes[action.key];
      return [{ type: "NODE_ADD", content, x, y: y + height + 10 }]; }
    case "NODE_CHANGE": { 
      const { content, height, key, placeholder, sx, t, width } = action; 
      return [{ type: "story-node-change", key, content, height, placeholder, sx, t, width }, { type: "autosave-trigger" }]; }
    case "NODE_REMOVE": {
      const { key } = action;
      return [{ type: "story-node-remove", key }, { type: "view-node-remove", key },
              { type: "render-node-remove", key }, { type: "autosave-trigger" }]; }
   
    // <-- Effects (Starting with "ON_")
    case "ON_PRESENT_READY": {
      return [{ type: "on-present-ready-unbind" }, state.effects.onPresentReady.action] };
    case "ON_TIMEOUT": {
      return [{ type: "on-timeout-unbind" }, state.effects.onTimeout.action] };
    // -->

    case "PLAYER_PREV": {
      const key = last(state.view.shownOrder), key2 = last(state.view.shownOrder, -2);
      return key && key2 ? [{ type: "view-hide", key }, { type: "PRESENT", key: key2 }] : []; }
    case "PLAYER_NEXT": {
      const key = nextShowKey(state); 
      return key && nodeIsRendered(state, key) ? [{ type: "view-show", keys: [key] }, { type: "PRESENT", key }] : []; }

    case "PRELOAD": {
      const { key } = action, src = state.preloads[key];
      return [{ type: "preload-remove", key }, { type: "NODE_CHANGE", key, content: src }]; }

    case "PRESENT": {
      const { key } = action; if (!nodeIsRendered(state, key)) return [];
      const { x, y } = presentCoors(state, key); return [{ type: "view-present", x, y }]; }

    case "RENDER_NODE_RESIZE": {
      const { height, key, width } = action;
      return [{ type: "render-node-resize", key, height, width }].concat(state.caret.key === key ? [{ type: "on-present-ready", key, action: { type: "PRESENT", key }}].concat(state.story.nodes[key].type === "image" ? [{ type: "caret-blur" }] : []) : []); } // on-present-ready because INIT_EDITOR's add 

    case "TEXT_LEFT_MOUSE_UP": {
      const { key, x, y } = action;
      return state.grab.dragged ? [] : [{ type: "caret-focus", key, offset: offset({ x, y }) }]; }

    case "TRASH_LEFT_MOUSE_UP": {
      const { key } = state.grab;
      return key ? [{ type: "NODE_REMOVE", key }, { type: "trash-leave" }] : []; }

    default:
      return [];
  }
}

export default actionsCreator;
