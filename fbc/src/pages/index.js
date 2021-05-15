import { FeedLayout } from 'layouts'
import { PostFeed, PostPrompt } from 'models/post'

const Home = () => 
  <FeedLayout>
    <PostPrompt />
    <PostFeed />
  </FeedLayout>

export default Home;
