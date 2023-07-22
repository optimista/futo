import { useModel } from '@futo-ui/hooks'

import { Field, FormProvider } from 'core/form'

const FormProviderStory = {
  component: FormProvider,
  title: 'core/form/FormProvider',
  argTypes: {
    children: { control: { type: null } },
    value: { control: { type: null } }
  }
}

const Default = args => {
  const model = useModel({ email: "" });
  return (
    <FormProvider value={model} {...args}>
      <Field name="email" />
    </FormProvider>
  )
}

Default.parameters = { docs: { source: { transform: src => src.replace(/value={{[\s\S]*?}}/g, "value={model}") } } }

export { FormProviderStory as default, Default } 
