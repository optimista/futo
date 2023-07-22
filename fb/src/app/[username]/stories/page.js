import { getUsername } from 'core/fb/getters'
import { StoriesPage } from 'pages/[username]'

const StoriesServerPage = async ({ params: { username } }) => {
  const docUsername = await getUsername(username);
  if (!docUsername.exists()) redirect("/");

  const { profileId } = docUsername.data();
  return <StoriesPage profileId={profileId} />
}

export default StoriesServerPage;
