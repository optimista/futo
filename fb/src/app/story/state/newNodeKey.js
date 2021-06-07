import { keys, max } from '@futo-ui/utils'

const newNodeKey = nodes => max([0, ...keys(nodes).map(k => parseInt(k))]) + 1 + "n";

export default newNodeKey;
