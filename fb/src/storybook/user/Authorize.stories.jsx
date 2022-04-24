import { withReactContext } from 'storybook-react-context'

import { Loading } from 'core'
import { Authorize } from 'user'
import { AuthContext } from 'user/AuthProvider'

const AuthorizeStory = {
  component: Authorize,
  title: 'user/Authorize',
  argTypes: { 
    children: { control: { type: "text" } },
    fallback: { control: { disable: true } }
  },
  decorators: [
    withReactContext({
      Context: AuthContext,
      initialState: { isReady: true, uid: "defaultProfileId" },
    }),
  ],
}

const Default = args => <Authorize {...args} />
const Fallback = Default.bind({});

Default.args = {
  children: "Authorized",
  uid: "defaultProfileId"
}

Default.parameters = {
  nextRouter: {
    replace: pathname => window.parent.location.href = pathname 
  }
}

Fallback.args = {
  fallback: <Loading />,
  ready: false
}

Fallback.parameters = { docs: { transformSource: src => src.replace(/\/>}\n/g, "\/>}\n  ready={false}\n") } }

export { AuthorizeStory as default, Default, Fallback } 
