import { doc, getDoc } from 'firebase/firestore'
import { getAuth } from 'firebase-admin/auth'
import nookies from 'nookies'
import { cache } from 'react'

import { firebase } from 'core/fb/admin'
import { Stories } from 'core/fb/colls'
import { StoryPage } from 'pages/s/[id]'

const getStory = async id => {
  const docStory = await cache(id => getDoc(doc(Stories, id)))(id);
  return docStory;
}

const StoryServerPage = async ({ context, params: { id } }) => {
  const { token } = nookies.get(context);// let uid;
  if (token) try { uid = (await getAuth(firebase).verifyIdToken(token)).uid; } catch(e) {};

  const docStory = await getStory(id), story = docStory.data();
  if (!docStory.exists()) redirect("/");
  //if (story && story.profileId !== uid) redirect(storyPath(story)); if story personal -> then redirect

  return <StoryPage story={story} />
}

export default StoryServerPage;
