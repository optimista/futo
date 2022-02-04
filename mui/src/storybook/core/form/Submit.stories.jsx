import { FormProvider, Submit } from 'core/form'

const SubmitStory = {
  component: Submit,
  args: { children: "Log in" },
  argTypes: { children: { control: { type: "text" } } },
  title: 'core/form/Submit',
}

const Default = args => <Submit {...args} />
const Failed = Default.bind({}); 
const Loading = Default.bind({}); 

Failed.decorators = [
  Story =>
    <FormProvider value={{ isFail: true }}>
      <Story />
    </FormProvider>
];

Loading.decorators = [
  Story =>
    <FormProvider value={{ isSending: true }}>
      <Story />
    </FormProvider>
];

export { SubmitStory as default, Default, Failed, Loading } 
