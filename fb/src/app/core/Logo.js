import { Link } from '@material-ui/core'

import { Avatar } from 'core'

const Logo = props => 
  <Link href="/" underline="none">
    <Avatar alt="name" src="/name.png" {...props} />
  </Link>

export default Logo;
