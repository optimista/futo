import { useContext } from 'react'

import { ImageInput } from 'core'
import { FormContext } from 'core/form'

const ImageField = ({ children, name, ...props }) => {
  const model = useContext(FormContext);
  const handleLoad = e => model.handleChange(name)({ target: { value: e.target.result } });
  return <ImageInput onLoad={handleLoad} {...props}>{children}</ImageInput>;
}

export default ImageField;
