import { I } from 'core/utils/i18n'

const IStory = {
  component: I,
  title: 'core/utils/i18n/I',
}

const Default = args => <I {...args} />

Default.args = {
  dict: {
    "en": {
      "Hello!": "Hello!"
    },
    "es": {
      "Hello!": "Hola!"
    }
  },
  k: "Hello!",
  width: 60
}

export { IStory as default, Default } 
