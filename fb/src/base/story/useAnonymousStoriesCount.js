import { useEffect, useState } from 'react'

const useAnonymousStoriesCount = () => {
  const [anonymousStoriesCount, setAnonymousStoriesCount] = useState(null);
  useEffect(() => { const asc = window.localStorage.getItem("ascount"); setAnonymousStoriesCount(asc ? parseInt(asc) : null); }, []);
  return anonymousStoriesCount;
}

export default useAnonymousStoriesCount;
