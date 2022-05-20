import { useInfiniteScroll, useMounted } from '@futo-ui/hooks'
import { last } from '@futo-ui/utils'
import { endAt, getDocs, limit, onSnapshot, orderBy, query, startAfter, where } from 'firebase/firestore'
import PropTypes from 'prop-types'
import { useEffect, useRef, useState } from 'react'

const BATCH_LIMIT = 20;

/**
 * - Component that generates a feed, given an array of items.
 * - Integrates infinite scrolling & realtime firestore updates.
 */
const Feed = ({ collection, Item = () => null, profileId, ready = true, sortBy = "timestamp" }) => {
  const [batches, setBatches] = useState([]),
        [fetching, setFetching, setHasMore] = useInfiniteScroll({ fetching: true, hasMore: true }),
        listeners = useRef([]),
        mounted = useMounted();
 
  useEffect(() => () => listeners.current.map(l => l()), []);

  useEffect(() => {
    if (ready) {
      if (!fetching) return;
      const l = batches.length, batch = last(batches) || [];
  
      let q = collection;
      if (profileId !== undefined) q = query(q, where("profileId", "==", profileId));  
      q = query(q, orderBy(sortBy, "desc"));
      if (0 < l) q = query(q, startAfter(last(batch)[sortBy]));
           
      getDocs(query(q, limit(BATCH_LIMIT))).then(snapshot => {
        if (mounted.current) { // prevent setting the state when component has been unmounted
          const items = snapshot.docs.map(doc => doc.data());
          setBatches(bs => bs.concat([items]));
          const unsubscribe = onSnapshot(query(q, endAt(last(items)?.[sortBy] || new Date())), snapshot => {
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

  return (
    <>
      { batches.map(batch => batch.map(doc => Item(doc, doc.id))) }
      
      {/* Additional two Item Skeletons for initial load (together = 3) */}
      { fetching && batches.length === 0 && (new Array(3-1)).fill().map((_, i) => Item(_, "s" + i)) }
      
      {/* Single Card skeleton for fetching */}
      { fetching && Item(undefined, "x") } 
    </>
  )
}

Feed.propTypes = {
  /**
   * The content / value of the `contenteditable` element.
   */
  collection: PropTypes.object.isRequired, 

  /**
   * The function that returns component used for a single item in the feed.
   * @default (item, key) => null
   */
  Item: PropTypes.func.isRequired,

  /**
   * Optional foreign key that can filter items which belongs to a given user / profile.
   * If not given, will fetch a batch of all items.
   */
  profileId: PropTypes.string,

  /**
   * Determines whether it can start fetching (e.g., if we are still to receive `profileId`, we are not ready).
   * @default true
   */
  ready: PropTypes.bool,
  
  /**
   * The field to sort by.
   * @default "timestamp" 
   */
  sortBy: PropTypes.string,
};

export default Feed;
