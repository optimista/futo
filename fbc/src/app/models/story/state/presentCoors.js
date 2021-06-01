import { avg, delta, rect, sum } from '@futo-ui/utils'

import { clientToCoors } from 'models/story/state'

const presentCoors = ({ render, story, view }, key) => {
  const node = story.positions[key], rnode = render.nodes[key], { container } = render, 
        { left, top, right, bottom } = delta( // Is overlapping if left < 0, top < 0, 0 < right, 0 < bottom
              rect({ x: node.x, y: node.y }, { height: rnode.height, width: rnode.width }), // Before rect -> rectRel (with align)
              sum(rect(clientToCoors({ render, story, view }, { x: 0, y: 0 }), { height: container.height, width: container.width }),
                { left: 24, top: 64, right: -24, bottom: -24 })); // PADDING

  return delta(view.present, {
    x: left < 0 && 0 < right ? avg(left, right) : Math.min(left, Math.max(0, right)),
    y: top < 0 && 0 < bottom ? avg(top, bottom) : Math.min(top, Math.max(0, bottom))
  });
}

export default presentCoors;
