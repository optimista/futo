import { useInfiniteScroll, useMounted } from '@futo-ui/hooks'
import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'

import { PostCard, PostDialog, Posts, usePostDialog } from 'models/post'

const BATCH_LIMIT = 20;

const useStyles = makeStyles(theme => ({
  root: {
    '& > .MuiCard-root': {
      borderTop: "1px solid "+theme.palette.divider,
      '&:last-of-type': { borderBottom: "1px solid "+theme.palette.divider }
    }
  }
}))

const PostFeed = () => {
  const [batches, setBatches] = useState([]),
        [fetching, setFetching, setHasMore] = useInfiniteScroll({ fetching: true, hasMore: true }),
        [postDialog, post] = usePostDialog(),
        listeners = useRef([]),
        mounted = useMounted(),
        router = useRouter(), 
        { username } = router.query;
 
  useEffect(() => () => listeners.current.map(l => l()), []);

  useEffect(() => {    
    if (router.isReady) {
      if (!fetching) return;
      const l = batches.length, batch = batches[l - 1] || [], postLast = batch[batch.length - 1],
            query = (username ? Posts.where("profileUsername", "==", username) : Posts).orderBy("timestamp", "desc").startAfter(postLast?.timestamp || new Date(253402300799999));
           
      query.limit(BATCH_LIMIT).get().then(snapshot => {
        if (mounted.current) { // prevent setting the state when component has been unmounted
          const posts = snapshot.docs.map(doc => doc.data());
          setBatches(bs => bs.concat([posts]));
          const unsubscribe = query.endAt(posts[posts.length-1]?.timestamp || new Date()).onSnapshot(snapshot => {
            const postsUpdated = snapshot.docs.map(doc => doc.data());
            setBatches(bs => bs.map((b, i) => i === l ? postsUpdated : b)); 
          });
          listeners.current = listeners.current.concat([unsubscribe]);
          if (posts.length < BATCH_LIMIT) setHasMore(false); 
          setFetching(false);
        }
      });
    }
  }, [fetching, router.isReady]);

  const handleEdit = (i, j) => () => postDialog.open(batches[i][j]);

  const classes = useStyles();
  return (
    <Box className={classes.root}>
      {batches.map((batch, i) => batch.map((post, j) =>
        <PostCard key={post.id} post={post} onEdit={handleEdit(i, j)} />
      ))}

      {/* Single PostCard skeleton for fetching */}
      { fetching && <PostCard /> } 
      
      {/* Additional two PostCard Skeletons for initial load (together = 3) */}
      { fetching && batches.length === 0 && (new Array(3-1)).fill().map((_, i) => <PostCard key={"PostCard-Placeholder-" + i} />) }

      <PostDialog post={post} open={postDialog.isOpen} onClose={postDialog.close} /> 
    </Box>
  )
}

export default PostFeed;
