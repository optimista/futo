import { Logo } from 'core'
import { FixedLayout } from 'core/layouts'
import { ProfileMenuButton } from 'profile'
import { AuthContext } from 'user/AuthProvider'

import { heightDecorator } from 'storybook/story/utils'

const FixedLayoutStory = {
  component: FixedLayout,
  title: 'core/layouts/FixedLayout',
  argTypes: {
    children: { control: { type: "text" } },
    toolbarLeft: { control: { type: "text" } },
    toolbarRight: { control: { type: "text" } }
  },
  decorators: [
    heightDecorator,
    Story => (
      <AuthContext.Provider value={{ isReady: true, isLoggedIn: true, profile: { photoURL: "/mockup-avatar.jpg" } }}>
        <Story />
      </AuthContext.Provider>
    )
  ],
  parameters: { layout: "fullscreen" }
}

const Default = args => <FixedLayout {...args} />

Default.args = {
  toolbarLeft: <Logo />,
  toolbarRight: <ProfileMenuButton />
}

export { FixedLayoutStory as default, Default } 
