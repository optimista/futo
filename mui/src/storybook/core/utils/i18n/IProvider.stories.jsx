import { IProvider } from 'core/utils/i18n'

const IProviderStory = {
  component: IProvider,
  title: 'core/utils/i18n/IProvider',
  argTypes: { children: { control: { type: "text" } } }
}

const Default = args => <IProvider {...args} />

Default.args = {
  value: {
    "en": {
      "Hello!": "Hello!"
    },
    "es": {
      "Hello!": "Hola!"
    }
  }
}

export { IProviderStory as default, Default } 
