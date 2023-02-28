import { useContext } from 'react'

import { FormContext } from 'core/form/FormProvider'

const useForm = () => useContext(FormContext);

export default useForm;
