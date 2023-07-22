import { ProfileButton } from 'core/layouts/FeedLayout'
import { AuthContext } from 'user/AuthProvider'

const ProfileButtonStory = {
  component: ProfileButton,
  title: 'core/layouts/FeedLayout/PageLayout/ProfileButton',
  decorators: [
    Story => (
      <AuthContext.Provider value={{ profile: { displayName: "Viktor Futó", photoURL: "/mockup-avatar.jpg" } }}>
        <Story />
      </AuthContext.Provider>
    )
  ],
}

const Default = args => <ProfileButton {...args} />

export { ProfileButtonStory as default, Default } 
