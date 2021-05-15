import { Card, CardContent, CardHeader } from '@material-ui/core'

const PostCardLayout = ({ action, avatar, children, sx, title }) => {
  return (
    <>
      <Card sx={{ border: 0, ...sx }}>
        <CardHeader action={action} avatar={avatar} title={title} />
        { children && <CardContent sx={{ pl: 9, pt: 0 }}>{children}</CardContent> }
      </Card>
    </>
  )
}

export default PostCardLayout;
