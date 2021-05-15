import clsx from 'clsx'
import { Button } from '@material-ui/core'
import { forwardRef, useContext, useState } from 'react'

import { FormContext } from 'core/form'

const ImageField = forwardRef(({ children, className, component: Component = Button, name, ...props }, ref) => {
  const [over, setOver] = useState(0),
        model = useContext(FormContext);

  const setPreview = file => {
    if (file && 0 < ImageField.MIME_TYPES.filter(s => file.type.match(s)).length) {
      const reader = new FileReader();
      reader.onload = e => model.handleChange(name)({ target: { value: e.target.result } });
      reader.readAsDataURL(file);
    }
  }

  const handleChange = e => setPreview(e.target.files[0]);
  const handleDragEnter = () => setOver(i => i + 1); 
  const handleDragLeave = () => setOver(i => i - 1); 
  const handleDragOver = e => e.preventDefault();
  const handleDrop = e => { e.preventDefault(); setOver(0); setPreview(e.dataTransfer.files[0]); } 
 
  return (
    <Component className={clsx(className, { "Fui-over": over })} component="label" ref={ref} onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} onDragOver={handleDragOver} onDrop={handleDrop} {...props}>
      {children}
      <input accept={ImageField.MIME_TYPES.join(",")} hidden onChange={handleChange} type="file" />
    </Component>
  );
});

ImageField.MIME_TYPES = ["image/jpeg", "image/png", "image/webp"];

export default ImageField;
