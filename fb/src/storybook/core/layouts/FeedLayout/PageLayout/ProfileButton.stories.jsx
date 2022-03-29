import { withReactContext } from 'storybook-react-context'

import { ProfileButton } from 'core/layouts/FeedLayout'
import { AuthContext } from 'user/AuthProvider'

const ProfileButtonStory = {
  component: ProfileButton,
  title: 'core/layouts/FeedLayout/PageLayout/ProfileButton',
  decorators: [
    withReactContext({
      Context: AuthContext,
      initialState: { profile: { displayName: "Viktor Futó", photoURL: "/mockup-avatar.jpg" } },
    }),
  ],
}

const Default = args => <ProfileButton {...args} />

export { ProfileButtonStory as default, Default } 
