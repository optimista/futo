import { RouterContext } from "next/dist/shared/lib/router-context"

import { Loading } from 'core'
import { Authorize } from 'user'

const AuthorizeStory = {
  component: Authorize,
  title: 'user/Authorize',
  argTypes: { 
    children: { control: { type: "text" } },
    fallback: { control: { disable: true } }
  },
  decorators: [
    (Story, { args }) => {
      return <RouterContext.Provider value={{ replace: () => {
        window.parent.location.href = args.redirect || "/?path=/docs/user-authorize--default"
      } }}><Story /></RouterContext.Provider>
    }
  ],
}

const Default = args => <Authorize {...args} />
const Fallback = Default.bind({});

Default.args = {
  children: "Authorized"
}

Fallback.args = {
  fallback: <Loading />,
  ready: false
}

Fallback.parameters = { docs: { transformSource: src => src.replace(/\/>}\n/g, "\/>}\n  ready={false}\n") } }

export { AuthorizeStory as default, Default, Fallback } 
