import clsx from 'clsx'
import { Button } from '@material-ui/core'
import { forwardRef, useState } from 'react'

const ImageInput = forwardRef(({ accept = "image/*", children, className, component: Component = Button, onLoad, ...props }, ref) => {
  const [over, setOver] = useState(0);

  const load = file => { if (file) {
    const reader = new FileReader();
    reader.onload = onLoad;
    reader.readAsDataURL(file);
  }}

  const handleChange = e => load(e.target.files[0]);
  const handleDragEnter = () => setOver(i => i + 1); 
  const handleDragLeave = () => setOver(i => i - 1); 
  const handleDragOver = e => e.preventDefault();
  const handleDrop = e => { e.preventDefault(); setOver(0); load(e.dataTransfer.files[0]); } 
 
  return (
    <Component className={clsx(className, { "Fui-over": over })} component="label" ref={ref} onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} onDragOver={handleDragOver} onDrop={handleDrop} {...props}>
      {children}
      <input accept={accept} hidden onChange={handleChange} type="file" />
    </Component>
  );
});

export default ImageInput;
