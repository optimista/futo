import { empty } from '@futo-ui/utils'

// Paths
const storyPath =     ({ id }) => "/s/" + id;
const storyEditPath = ({ id }) => "/s/" + id + "/edit";

// Helpers
const textNodeKeys = ({ nodes, order }) => order.filter(k => empty(nodes[k].type) || nodes[k].type === "text");

// Props
const description = s => s.nodes[textNodeKeys(s)[1]]?.content;
const lastEdited = ({ editedAtTime, order }) => "Last edited: " + editedAtTime + " · " + order.length + " nodes";
const title = s => s.nodes[textNodeKeys(s)[0]]?.content || "Untitled Story";

export { description, lastEdited, storyPath, storyEditPath, title };
