import { doc, getDoc } from 'firebase/firestore'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { Stories } from 'story'

const useStoryLoad = onLoad => {
  const router = useRouter(), { id } = router.query;
  useEffect(() => { if (id) getDoc(doc(Stories, id)).then(doc => doc.exists() ? onLoad(doc.data()) : router.replace("/"), () => router.replace("/")) }, [id]);
};

export default useStoryLoad;
