import { Card, CardHeader, CardContent } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'

const PostSkeleton = () =>
  <Card>
    <CardHeader
      action={<Skeleton width={24} />}
      avatar={<Skeleton variant="circle" height={32} width={32} />}
      title={<Skeleton width={80} />}
    />
    <CardContent>
      <Skeleton height={60} variant="rect" />
    </CardContent>
  </Card>

export default PostSkeleton;
