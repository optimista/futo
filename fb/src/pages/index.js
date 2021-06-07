import { FeedLayout } from 'core/layouts'
import { PostFeed, PostPrompt } from 'post'

const Home = () => 
  <FeedLayout>
    <PostPrompt />
    <PostFeed />
  </FeedLayout>

export default Home;
