import { keys } from '@futo-ui/utils'
import { doc, getDoc } from 'firebase/firestore'
import { getAuth } from 'firebase-admin/auth'
import nookies from 'nookies'

import { Loading, Logo } from 'core'
import { FixedLayout } from 'core/layouts'
import { firebase } from 'core/utils/server'
import { ProfileMenuButton } from 'profile'
import { Stories } from 'story'
import { StoreProvider } from 'story/context'
import { Node, StoryContainer } from 'story/core'
import { Text } from 'story/nodes'

const StoryPage = ({ story }) =>
  <FixedLayout toolbarLeft={<Logo />} toolbarRight={<ProfileMenuButton />}>
    { story.profileId ?  
      <StoreProvider value={{ story }}>
        <StoryContainer>
          { keys(story.nodes).map(key => 
            <Node key={key} id={key}>
              <Text id={key} />
            </Node>
          )}
        </StoryContainer>
      </StoreProvider>
      :
      <Loading />
    }
  </FixedLayout>

const getServerSideProps = async (context) => {
  const { token } = nookies.get(context); //let uid;
  if (token) try { uid = (await getAuth(firebase).verifyIdToken(token)).uid; } catch(e) {};
  const docStory = await getDoc(doc(Stories, context.params.id)), story = docStory.data();
  if (!docStory.exists()) return { redirect: { destination: '/', permanent: false } };
  //if (story && story.profileId !== uid) return { redirect: { destination: storyPath(story), permanent: false } }; if story personal -> then redirect
  return { props: { story } }
}

export { StoryPage as default, getServerSideProps };
