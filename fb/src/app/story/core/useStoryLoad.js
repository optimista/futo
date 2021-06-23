import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { Stories } from 'story'

const useStoryLoad = onLoad => {
  const router = useRouter(), { id } = router.query;
  useEffect(() => id && Stories.doc(id).get().then(doc => {
    doc.exists ? onLoad(doc.data()) : router.replace("/");
  }, () => router.replace("/")), [id]);
};

export default useStoryLoad;
