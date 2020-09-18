import { useDialog, useInfiniteScroll, useMenu, useModel } from '@futo-ui/hooks'
import { Box, Container, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Send } from '@material-ui/icons'
import { useEffect, useState } from 'react'

import { Posts } from 'data'
import { PageLayout } from 'layouts'
import { PostCard, PostDialog, PostSkeleton } from 'posts'

const POSTS_LIMIT = 20;

const useStyles = makeStyles(theme => ({ container: { paddingBottom: "1rem" }, input: { cursor: "pointer" } }));

const PostsPage = ({ initialPosts = [] }) => {
  const [batches, setBatches] = useState([initialPosts]);
  const [fetching, setFetching, setHasMore] = useInfiniteScroll({ hasMore: initialPosts.length === 0 || initialPosts.length === POSTS_LIMIT });

  useEffect(() => {    
    if (!fetching) return;
    const l = batches.length, batch = batches[l - 1], postLast = batch[batch.length - 1];
    Posts.after(postLast.timestamp, POSTS_LIMIT, { snapshot: true }).onSnapshot(snapshot => {      
      const newPosts = snapshot.docs.map(doc => doc.data());
      if (newPosts.length !== 0) setBatches(bs => l === bs.length ? bs.concat([newPosts]) : bs.map((b, i) => i === l ? newPosts : b)); 
      if (newPosts.length < POSTS_LIMIT) setHasMore(false); 
      setFetching(false);      
    });
  }, [fetching]);

  useEffect(() => { 
    Posts.limit(POSTS_LIMIT, { snapshot: true }).onSnapshot(snapshot => setBatches(bs => bs.map((b, i) => i === 0 ? snapshot.docs.map(doc => doc.data()) : b)));
  }, []);

  const [open, handleOpen, handleClose] = useDialog(false); 
  const post = useModel({ content: "" });

  function handleEdit(i, j) { return e => { post.set(batches[i][j]); handleOpen(); } }
  function handleMouseDown(e) { e.preventDefault(); if (e.nativeEvent.which === 1) { post.reset(); handleOpen(); } }

  const classes = useStyles();
  return (
    <PageLayout>
      <Container className={classes.container} maxWidth="sm">
        <Box mb={4} mt={1} px={2}>
          <TextField fullWidth InputProps={{ classes: { input: classes.input } }} margin="normal" onMouseDown={handleMouseDown} placeholder="What are you up to?"></TextField>
        </Box>
        {batches.map((batch, i) => batch.map((post, j) =>
          <PostCard key={j} post={post} onEdit={handleEdit(i, j)} />
        ))}
        { fetching && <PostSkeleton /> }        
      </Container>      
      <PostDialog open={open} post={post} onClose={handleClose} />      
    </PageLayout>
  )
}

export const getServerSideProps = async (ctx) => { 
  const { firebase } = await import('utils/server'),
        initialPosts = await Posts.config(firebase).limit(POSTS_LIMIT);

  return { props: { initialPosts } }
}

export default PostsPage
