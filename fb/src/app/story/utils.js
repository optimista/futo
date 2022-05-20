import { keys } from '@futo-ui/utils'

import { l } from 'core/utils/i18n'

// Authorization
const storyAuthorized = (story, uid) => story && story.profileId === uid;

// Paths
const storyPath =     story => story ? "/s/" + story.id : "#";
const storyEditPath = story => story ? "/s/" + story.id + "/edit" : "#";

// Title & Description 
const STORY_TITLE = {
  "en": {
    "Untitled Story": "Untitled Story",
  },
  "es": {
    "Untitled Story": "Historia sin título",
  }
}

const storyTitle = (story, locale) => {
  if (!story) return null; const tnKeys = textNodesKeys(story);
  return (0 < tnKeys.length) ? story.nodes[tnKeys[0]].content : (locale ? l("Untitled Story", STORY_TITLE, locale) : null);
}

const textNodesKeys = story => story ? keys(story.nodes).sort((a,b) => parseInt(a) - parseInt(b)) : [],
      storyDesc = story => {
        if (!story) return null; const tnKeys = textNodesKeys(story);
        return (1 < tnKeys.length) ? story.nodes[tnKeys[1]].content : null;
      };

export { storyAuthorized, storyPath, storyEditPath, storyTitle, storyDesc };
