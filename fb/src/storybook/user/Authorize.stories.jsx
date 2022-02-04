import { RouterContext } from "next/dist/shared/lib/router-context"

import { Authorize } from 'user'

const AuthorizeStory = {
  component: Authorize,
  title: 'user/Authorize',
  argTypes: { 
    children: { control: { type: "text" } }
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

export { AuthorizeStory as default, Default } 
