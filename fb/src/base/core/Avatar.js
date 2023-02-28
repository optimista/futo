import { empty } from '@futo-ui/utils'
import { Avatar as MuiAvatar, Skeleton } from '@mui/material'
import Image from 'next/image'
import PropTypes from 'prop-types'
import { forwardRef } from 'react'

/**
 * - Adds [`@mui/Skeleton`](https://mui.com/api/skeleton) to [`@mui/Avatar`](https://mui.com/api/avatar) and integrates with [`next/image`](https://nextjs.org/docs/api-reference/next/image) 
 * - Props of the [`@mui/Avatar`](https://mui.com/api/avatar) component are also available.
 */
const Avatar = forwardRef(({ ready = true, src, ...props }, ref) => {
  const emptyAvatar = <MuiAvatar ref={ref} {...props} />;
  if (!ready) return <Skeleton variant="circular">{emptyAvatar}</Skeleton>;
  return empty(src) ? emptyAvatar : <MuiAvatar ref={ref} {...props}><Image layout="fill" objectFit="cover" priority src={src} /></MuiAvatar>;
})

Avatar.propTypes = {
  /**
   * Determines whether we even have `src` attribute (could still be fetching)
   * @default true 
   */
  ready: PropTypes.bool,

  /**
   * The `src` attribute for the `img` element.
   */
  src: PropTypes.string,
};

export default Avatar;
