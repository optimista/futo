import { doc, getDoc } from 'firebase/firestore'
import { redirect } from 'next/navigation'
import { cache } from 'react'

import { Profiles } from 'core/fb/colls'
import { getUsername } from 'core/fb/getters'
import { NAMES } from 'core/i18n'

import { ProfilePage } from 'pages/[username]'

const getProfile = async profileId => {
  const docProfile = await cache(profileId => getDoc(doc(Profiles, profileId)))(profileId);
  return docProfile;
}

const generateMetadata = async ({ params: { username } }) => { 
  const docUsername = await getUsername(username), { profileId } = docUsername.data(),
        docProfile = await getProfile(profileId), { bio, displayName, photoURL } = docProfile.data(),
        name = displayName || "@" + username, imageAlt = name+"'s profile picture";

  return {
    title: name,
    openGraph: {
      title: name,
      description: bio || name + "'s profile'",
      type: "website",
      url: "https://"+NAMES.name+".vercel.app/"+username,
      images: [{
        url: photoURL,
        alt: imageAlt
      }],
    },
    twitterGraph: {
      card: "summary",
      site: "@"+NAMES.name,
      images: [{
        url: photoURL,
        alt: imageAlt
      }]
    }
  }
}

const ProfileServerPage = async ({ params: { username } }) => {
  const docUsername = await getUsername(username);
  if (!docUsername.exists()) redirect("/");

  const { profileId } = docUsername.data();
  return <ProfilePage profileId={profileId} username={username} />
}

export { ProfileServerPage as default, generateMetadata };
