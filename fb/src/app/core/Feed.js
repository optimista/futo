import { useInfiniteScroll, useMounted } from '@futo-ui/hooks'
import { arrayize, last } from '@futo-ui/utils'
import { endAt, getDocs, limit, onSnapshot, orderBy, query, startAfter, where } from 'firebase/firestore'
import PropTypes from 'prop-types'
import { useEffect, useRef, useState } from 'react'

const BATCH_LIMIT = 20;

/**
 * - Component that generates a feed, given an array of items.
 * - Integrates infinite scrolling & realtime firestore updates.
 */
const Feed = ({ collection, Item = () => null, profileId, ready = true, skeletons = 3, sortBy = "timestamp" }) => {
  const [batches, setBatches] = useState([]), [fetching, setFetching, setHasMore] = useInfiniteScroll({ fetching: true, hasMore: true }),
        isInitial = useRef(true), listeners = useRef([]), mounted = useMounted(); sortBy = arrayize(sortBy);

  useEffect(() => () => { listeners.current.map(l => l()); listeners.current = []; }, []);
  useEffect(() => {
    if (ready) {
      if (!fetching) return;
      const l = batches.length, batch = last(batches) || [];
 
      let q = collection;
      if (profileId !== undefined) q = query(q, where("profileId", "==", profileId));  
      sortBy.forEach(s => { q = query(q, orderBy(s, "desc")); })
      if (0 < l) { q = query(q, startAfter(last(batch).doc)); } else { if (!isInitial.current) return; } // reactStrictMode

      getDocs(query(q, limit(BATCH_LIMIT))).then(snapshot => {
        if (mounted.current) { // prevent setting the state when component has been unmounted
          if (0 < snapshot.docs.length) {
            const map = doc => ({ doc: doc, data: doc.data() }), items = snapshot.docs.map(map);
            setBatches(bs => bs.concat([items]));
            const unsubscribe = onSnapshot(query(q, endAt(last(items).doc)), snapshot => {
              const itemsUpdated = snapshot.docs.map(map);
              setBatches(bs => bs.map((b, i) => i === l ? itemsUpdated : b)); 
            });
            listeners.current = listeners.current.concat([unsubscribe]);
          }
          if (snapshot.docs.length < BATCH_LIMIT) setHasMore(false); 
          setFetching(false);
        }
      });
      return () => { isInitial.current = false; } // reactStrictMode
    }
  }, [fetching, ready]);

  return (
    <>
      { batches.map(batch => batch.map(({ data }) => Item(data, data.id))) }
      
      {/* Additional two Item Skeletons for initial load (together = 3) */}
      { fetching && batches.length === 0 && (new Array(skeletons-1)).fill().map((_, i) => Item(_, "s" + i)) }
      
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
   * Number of skeletons showing if not loaded 
   * @default 3 
   */
  skeletons: PropTypes.number,
  
  /**
   * The field to sort by.
   * @default "timestamp" 
   */
  sortBy: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)])
};

export default Feed;
