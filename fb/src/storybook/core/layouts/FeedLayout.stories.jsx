import { FeedLayout } from 'core/layouts'
import { AuthContext } from 'user/AuthProvider'

import { heightDecorator } from 'storybook/story/utils'

const FeedLayoutStory = {
  component: FeedLayout,
  title: 'core/layouts/FeedLayout',
  argTypes: { children: { control: { type: "text" } } },
  decorators: [
    heightDecorator,
    (Story) => (
      <AuthContext.Provider value={{ isReady: true, isLoggedIn: true, profile: { displayName: "Viktor Futó", photoURL: "/mockup-avatar.jpg" } }}>
        <Story />
      </AuthContext.Provider>
    )
  ],
  parameters: { layout: "fullscreen" }
}

const Default = args => <FeedLayout {...args} />

export { FeedLayoutStory as default, Default } 
