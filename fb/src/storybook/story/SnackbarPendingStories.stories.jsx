import { useEffect, useState } from 'react'

import { SnackbarPendingStories } from 'story'

const SnackbarPendingStoriesStory = {
  component: SnackbarPendingStories,
  title: 'story/SnackbarPendingStories',
  parameters: { layout: "fullscreen" }
}

const Default = args => {
  const [render, setRender] = useState(false);
  useEffect(() => {
    const ls = window.localStorage;
    ls.setItem("auid", "storybook"); ls.setItem("ascount", 2);
    setRender(true); return () => { ls.removeItem("auid"); ls.removeItem("ascount"); }
  }, []);
  return render ? <SnackbarPendingStories {...args} /> : <></>; // in case you have args, try to use Box instead of <></>
}

Default.parameters = {
  docs: {
    iframeHeight: 400,
    inlineStories: false,
    transformSource: src => src.replace('React.Fragment', 'SnackbarPendingStories')
  }
}

export { SnackbarPendingStoriesStory as default, Default } 
