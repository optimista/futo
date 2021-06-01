import { max } from '@futo-ui/utils'

const newNodeOrder = state =>
  max([0, ...state.story.order.map((key, index) => ({ index, shown: state.view.shown[key] })).filter(n => n.shown).map(n => n.index)]) + 1;

export default newNodeOrder;
