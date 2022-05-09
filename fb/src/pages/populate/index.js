import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import { doc, writeBatch } from 'firebase/firestore'
import { useEffect, useState } from 'react'

import { Loading } from 'core'
import { FocusLayout } from 'core/layouts'
import { db, upload } from 'core/utils'
import { Posts } from 'post'
import { Profiles, Usernames } from 'profile'
import { Stories } from 'story'

import NEGATIVE from './negative'
import POSITIVE from './positive'

const createUser = user =>
  createUserWithEmailAndPassword(getAuth(), user.email, user.password).then(async ({ user: auth }) => {
    const batch = writeBatch(db()),
          profileId = auth.uid;
          
    batch.set(doc(Profiles, profileId), { ...(user.bio ? { bio: user.bio } : {}), ...(user.displayName ? { displayName: user.displayName } : {}), username: user.username });
    batch.set(doc(Usernames, user.username), { profileId });
    return batch.commit().then(() => user.photoURL && upload(auth, "profiles/"+profileId+"/original", user.photoURL)).then(photoURL => {
      const batch2 = writeBatch(db());
      if (photoURL) batch2.update(doc(Profiles, profileId), { photoURL });
      if (user.posts) user.posts.forEach(content => {
        batch2.set(doc(Posts), { content, profileDisplayName: user.displayName, profileId: profileId, ...(photoURL ? { profilePhotoURL: photoURL } : {}), profileUsername: user.username });
      })
      if (user.stories) user.stories.forEach((id, i) => {
        batch2.set(doc(Stories, id), { nodes: { "1n": { content: "Story #"+(i+1) }, "2n": { content: "Description #"+i } }, positions: { "1n": { x: 250, y: 80 }, "2n": { x: 300, y: 138 } }, profileId: profileId });
      })
      return batch2.commit();
    });
  });


const Populate = () => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const promise = new Promise((resolve, _) => resolve());
    promise.then(() => createUser({
      bio: "Transitioning future towards non-orthogonal writing at brainec.com 🌱",
      displayName: "Viktor Futó",
      email: "optimistavf@gmail.com",
      password: "password",
      photoURL: POSITIVE,
      posts: ["Hello there! 👋 Welcome to the `fb` generated social platform. 🎉", "This is a demo version 🧩. Feel free to try it out! 👀"],
      stories: ["NBjfsGPVM24I0f6E7Yx9", "duVyzi1sdXyESRyRxNH6", "xEWZUUdidnRl6bHYH5gX"],
      username: "optimistavf"
    })).then(() => createUser({
      bio: "Transicionando del futuro hacia la escritura no ortogonal en brainec.com 🌱",
      displayName: "Futó Viktor",
      email: "optimistavf2@gmail.com",
      password: "password",
      photoURL: NEGATIVE,
      posts: ["¡Hola! 👋 Bienvenido a la plataforma social generada por `fb`. 🎉", "Esta es una versión de demostración 🧩. No dude en probarlo! 👀"],
      username: "optimista"
    })).then(() => createUser({
      email: "empty@gmail.com",
      password: "password",
      username: "empty"
    })).then(() => setReady(true));
  }, []);

  return ready ? <FocusLayout sx={{ textAlign: "center" }}>Done!</FocusLayout> : <Loading />;
} 

export default Populate;
