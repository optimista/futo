import { useInfiniteScroll, useMounted } from '@futo-ui/hooks'
import { isfunction } from '@futo-ui/utils'
import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
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

// if profileId === undefined -> value is not expected
// if profileId === null -> value is expected
// if profileId !== undefined && profileId !== undefined -> value
const Feed = ({ CardComponent, CardProps, collection, profileId }) => {
  const [batches, setBatches] = useState([]),
        [fetching, setFetching, setHasMore] = useInfiniteScroll({ fetching: true, hasMore: true }),
        listeners = useRef([]),
        mounted = useMounted();
 
  useEffect(() => () => listeners.current.map(l => l()), []);

  useEffect(() => {
    if (profileId !== null) {
      if (!fetching) return;
      const l = batches.length, batch = batches[l - 1] || [], itemLast = batch[batch.length - 1],
            query = (profileId !== undefined ? collection.where("profileId", "==", profileId) : collection).orderBy("timestamp", "desc").startAfter(itemLast?.timestamp || new Date(253402300799999));
           
      query.limit(BATCH_LIMIT).get().then(snapshot => {
        if (mounted.current) { // prevent setting the state when component has been unmounted
          const items = snapshot.docs.map(doc => doc.data());
          setBatches(bs => bs.concat([items]));
          const unsubscribe = query.endAt(items[items.length-1]?.timestamp || new Date()).onSnapshot(snapshot => {
            const itemsUpdated = snapshot.docs.map(doc => doc.data());
            setBatches(bs => bs.map((b, i) => i === l ? itemsUpdated : b)); 
          });
          listeners.current = listeners.current.concat([unsubscribe]);
          if (items.length < BATCH_LIMIT) setHasMore(false); 
          setFetching(false);
        }
      });
    }
  }, [fetching, profileId]);

  const classes = useStyles();
  return (
    <Box className={classes.root}>
      {batches.map(batch => batch.map(item =>
        <CardComponent key={item.id} {...(isfunction(CardProps) ? CardProps(item) : CardProps)} />
      ))}

      {/* Single Card skeleton for fetching */}
      { fetching && <CardComponent /> } 
      
      {/* Additional two Card Skeletons for initial load (together = 3) */}
      { fetching && batches.length === 0 && (new Array(3-1)).fill().map((_, i) => <CardComponent key={"CardPlaceholder-" + i} />) }
    </Box>
  )
}

export default Feed;
