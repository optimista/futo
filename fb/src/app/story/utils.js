// Paths
const storyPath =     story => story ? "/s/" + story.id : "#";
const storyEditPath = story => story ? "/s/" + story.id + "/edit" : "#";

export { storyPath, storyEditPath };
