import { Avatar } from 'core'

const AvatarStory = {
  component: Avatar,
  title: 'core/Avatar',
}

const Default = args => <Avatar {...args} />
const Empty = Default.bind({});
const NotReady = Default.bind({});

Default.args = {
  src: "/mockup-avatar.jpg"
}

NotReady.args = {
  ready: false
}

NotReady.parameters = {
  docs: { transformSource: src => src.replace(/Avatar/, "Avatar ready={false}")}
}

export { AvatarStory as default, Default, Empty, NotReady } 
