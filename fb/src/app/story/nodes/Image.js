import { url } from '@futo-ui/utils'
import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import ImageNext from 'next/image'

import { useState } from 'story/context'

const useStyles = makeStyles(() => ({
  image: { filter: "none !important" },
  img: { display: "block" }
}));

const Image = ({ id: key, ...props }) => {
  const state = useState(), { content, height, placeholder, width } = state.story.nodes[key], classes = useStyles();
  return url(content) && height && width ?
    <Box sx={{ '& > div': { display: "block !important" } }}>
      <ImageNext blurDataURL={placeholder || Image.DEFAULT_PLACEHOLDER} className={classes.image} draggable="false" height={height} placeholder="blur" src={content} width={width} {...props} />
    </Box>
    :
    <img className={classes.img} draggable="false" src={content} {...props} />
}

Image.DEFAULT_PLACEHOLDER = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN8/B8AAssB5CY77SMAAAAASUVORK5CYII=";

export default Image;
