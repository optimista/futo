import { Button } from '@mui/material'
import PropTypes from 'prop-types'
import { forwardRef, useState } from 'react'

/**
 * - Integrates drag'n'drop & `FileReader.load_event` for e.g. showing the preview if file is an image. Extends `<input type="file" />`
 */
const ImageInput = forwardRef(({ accept = "image/*", children, component: Component = Button, name, onLoad = () => {}, ...props }, ref) => {
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
    <Component className={over ? "Fui-over" : ""} component="label" ref={ref} onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} onDragOver={handleDragOver} onDrop={handleDrop} {...props}>
      {children}
      <input accept={accept} hidden name={name} onChange={handleChange} type="file" />
    </Component>
  );
});

ImageInput.propTypes = {
  /**
   * A comma-separated list of one or more file types describing which types to allow (goes to `input` element).
   * @default "image/*"
   */
  accept: PropTypes.string, 
  
  /**
   * The content of the component.
   */
  children: PropTypes.node,

  /**
   * The component that wraps `<input type="file" />`.
   * Either a [`@mui/Button`](https://mui.com/api/button/#main-content) or [`core/IconButton`](?path=/docs/core-tooltip--default) 
   * @default Button
   */ 
  component: PropTypes.elementType, //DOESN'T WORK: PropTypes.oneOf([Button, IconButton]),

  /**
   * Name attribute of the `input` element.
   */
  name: PropTypes.string,

  /**
   * Event handler executed when instance of `FileReader` fires [`FileReader.load_event`](https://developer.mozilla.org/en-US/docs/Web/API/FileReader/load_event), i.e. when content of file is available.
   * @default () => {}
   */
  onLoad: PropTypes.func,
};

export default ImageInput;
