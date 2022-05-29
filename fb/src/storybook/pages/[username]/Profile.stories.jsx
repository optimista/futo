import { getDocs, limit, orderBy, query } from 'firebase/firestore'

import { Profile } from 'pages/[username]'
import { Profiles } from 'profile'

import { centerDecorator } from 'storybook/utils'

const ProfileStory = {
  component: Profile,
  title: 'pages/[username]/Profile',
  decorators: [centerDecorator()],
  parameters: { layout: "fullscreen" }
}

const Default = (args, { loaded: { profiles } }) => {
  const profileId = profiles.docs.map(doc => doc.id)[0];
  return <Profile profileId={profileId} {...args} />
}

Default.loaders = [
  async () => ({
    profiles: await getDocs(query(Profiles, orderBy("timestamp", "asc"), limit(1)))
  }),
];

// Patch for loaders (see: https://github.com/storybookjs/storybook/issues/12726)
Default.parameters = {
  docs: {
    iframeHeight: 420,
    inlineStories: false,
  }
}

export { ProfileStory as default, Default } 
