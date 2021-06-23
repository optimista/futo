import { base64, max, round, url, urltobase64 } from '@futo-ui/utils'
import { Box } from '@material-ui/core'
import ImageNext from 'next/image'

import { upload } from 'core/utils'
import { useDispatch, useState } from 'story/context'
import { Image } from 'story/nodes'

const ImageEditable = ({ id: key, ...props }) => {
  const dispatch = useDispatch(), state = useState(), src = state.preloads[key],
        { content, height, placeholder, width } = state.story.nodes[key];

  const handleLoad = e => {
    !height && !width && dispatch({ type: "NODE_CHANGE", key, height: e.target.height, width: e.target.width });

    base64(content) && upload("stories/"+state.story.id+"/"+key, content)
      .then(downloadURL => dispatch({ type: "preload-add", key, src: downloadURL }));
    
    const u = max(height, width) / 10, pW = round(width / u), pH = round(height / u) || 1;
    !placeholder && height && width && url(e.target.src) && urltobase64(e.target.src, { height: pH, width: pW })
      .then(placeholder => dispatch({ type: "NODE_CHANGE", key, placeholder }))
  }

  const handlePreload = e =>
    !base64(e.target.src) && dispatch({ type: "PRELOAD", key });

  return (
    <>
      { src && <Box sx={{ position: "fixed", zIndex: -9999 }}><ImageNext height={height} onLoad={handlePreload} src={src} width={width} /></Box> }
      <Image id={key} onLoad={handleLoad} {...props} />
    </>
  )
}


export default ImageEditable;
