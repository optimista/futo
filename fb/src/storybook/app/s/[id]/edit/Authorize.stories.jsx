import { Loading } from 'core'
import { AuthContext } from 'user/AuthProvider'

import { Authorize } from 'app/s/[id]/edit/page'

const AuthorizeStory = {
  component: Authorize,
  title: 'app/s/[id]/edit/Authorize',
  argTypes: { 
    children: { control: { type: "text" } },
    fallback: { control: { disable: true } },
    if: { control: { type: "boolean" }, if: { arg: "func", exists: false } } // TO REMOVE WARNING ABOUT INPUT CHECKED ATTRIBUTE
  },
  decorators: [
    (Story) => (
      <AuthContext.Provider value={{ isReady: true, uid: "defaultProfileId" }}>
        <Story />
      </AuthContext.Provider>
    )
  ],
}

const Default = args => <Authorize {...args} />
const Auth = Default.bind({});
const Fallback = Default.bind({});

Default.args = {
  children: "Authorized",
  if: true
}

Default.parameters = {
  nextRouter: { replace: pathname => window.parent.location.href = pathname }
}

Auth.args = {
  children: "Authorized",
  func: true,
  if: auth => auth.uid === "defaultProfileId"
}

Auth.parameters = { docs: { source: { transform: src => src.replace("() => {}", "auth => auth.uid === \"defaultProfileId\"") } } }

Fallback.args = {
  fallback: <Loading />,
  ready: false
}

Fallback.parameters = { docs: { source: { transform: src => src.replace(/\/>}\n/g, "\/>}\n  ready={false}\n") } } }

export { AuthorizeStory as default, Default, Auth, Fallback } 
