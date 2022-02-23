import { LocaleProvider } from 'core/utils/i18n'

const LocaleProviderStory = {
  component: LocaleProvider,
  title: 'core/utils/i18n/LocaleProvider',
  argTypes: { children: { control: { type: "text" } } }
}

const Default = args => <LocaleProvider {...args} />

export { LocaleProviderStory as default, Default } 
