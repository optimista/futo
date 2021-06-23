import { Typography } from '@material-ui/core'

const StoryNotification = ({ children, show = false }) => {
  return <Typography sx={{ opacity: show ? 1 : 0, px: 3,
    transition: t => t.transitions.create('opacity', { duration: t.transitions.duration.standard, easing: t.transitions.easing.easeInOut }),
  }}>{children}</Typography>
}

export default StoryNotification;
