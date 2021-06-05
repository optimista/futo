import { useInfiniteScroll, useMounted } from '@futo-ui/hooks'
import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { useEffect, useRef, useState } from 'react'

const BATCH_LIMIT = 20;

const useStyles = makeStyles(theme => ({
  root: {
    '& > .MuiCard-root': {
      borderTop: "1px solid "+theme.palette.divider,
      '&:last-of-type': { borderBottom: "1px solid "+theme.palette.divider }
    }
  }
}))

const Feed = ({ collection, Item = () => null, orderBy = "timestamp", profileId, ready = true }) => {
  const [batches, setBatches] = useState([]),
        [fetching, setFetching, setHasMore] = useInfiniteScroll({ fetching: true, hasMore: true }),
        listeners = useRef([]),
        mounted = useMounted();
 
  useEffect(() => () => listeners.current.map(l => l()), []);

  useEffect(() => {
    if (ready) {
      if (!fetching) return;
      const l = batches.length, batch = batches[l - 1] || [], itemLast = batch[batch.length - 1],
            query = (profileId !== undefined ? collection.where("profileId", "==", profileId) : collection).orderBy(orderBy, "desc").startAfter(itemLast?.[orderBy] || new Date(253402300799999));
           
      query.limit(BATCH_LIMIT).get().then(snapshot => {
        if (mounted.current) { // prevent setting the state when component has been unmounted
          const items = snapshot.docs.map(doc => doc.data());
          setBatches(bs => bs.concat([items]));
          const unsubscribe = query.endAt(items[items.length-1]?.[orderBy] || new Date()).onSnapshot(snapshot => {
            const itemsUpdated = snapshot.docs.map(doc => doc.data());
            setBatches(bs => bs.map((b, i) => i === l ? itemsUpdated : b)); 
          });
          listeners.current = listeners.current.concat([unsubscribe]);
          if (items.length < BATCH_LIMIT) setHasMore(false); 
          setFetching(false);
        }
      });
    }
  }, [fetching, ready]);

  const classes = useStyles();
  return (
    <Box className={classes.root}>
      {batches.map(batch => batch.map(item => <Item key={item.id} item={item} />))}
      
      {/* Additional two Item Skeletons for initial load (together = 3) */}
      { fetching && batches.length === 0 && (new Array(3-1)).fill().map((_, i) => <Item key={"p"+i} />) }
      
      {/* Single Card skeleton for fetching */}
      { fetching && <Item /> } 
    </Box>
  )
}

export default Feed;
