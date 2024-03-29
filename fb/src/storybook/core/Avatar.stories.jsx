import { Avatar } from 'core'

import { DEFAULT_AVATAR } from 'storybook/utils'

const AvatarStory = {
  component: Avatar,
  title: 'core/Avatar',
}

const Default = args => <Avatar {...args} />
const Empty = Default.bind({});
const NotReady = Default.bind({});

Default.args = {
  alt: "Viktor Futó",
  src: DEFAULT_AVATAR 
}

NotReady.args = {
  ready: false
}

NotReady.parameters = {
  docs: { source: { transform: src => src.replace(/Avatar/, "Avatar ready={false}") } }
}

export { AvatarStory as default, Default, Empty, NotReady } 
