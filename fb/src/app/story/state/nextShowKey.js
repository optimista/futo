const nextShowKey = state => state.story.order.filter(key => !state.view.shown[key])[0];

export default nextShowKey;
