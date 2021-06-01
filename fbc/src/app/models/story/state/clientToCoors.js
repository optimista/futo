const clientToCoors = ({ render: { container: { height, width } }, story: { align = { x: 0.5, y: 0 } }, view: { move, present } }, { x, y }) =>
  ({ x: x - move.x - present.x - align.x * width, y: y - move.y - present.y - align.y * height });

export default clientToCoors;
