import { empty, keys } from '@futo-ui/utils'

const emptyNodesKeymap = (state) => keys(state.story.nodes).reduce((acc, key) => ({ ...acc, [key]: empty(state.story.nodes[key].content) }), {});

export default emptyNodesKeymap;
