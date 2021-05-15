import { Link, List, ListItem, Typography } from '@material-ui/core'
import Head from 'next/head'

import { PageLayout } from 'layouts'

const Home = () => 
  <>
    <Head>
      <title>MyApp</title>
    </Head>
    <PageLayout>
      <Typography gutterBottom variant="h4">MyApp</Typography>
      <Typography paragraph>Welcome to MyApp application!</Typography>
      <br />
      <Typography gutterBottom variant="h5">Generated Pages</Typography>
      <List>
        <ListItem><Link href="/">/</Link></ListItem>
        <ListItem><Link href="/theme">/theme</Link></ListItem>
      </List>
    </PageLayout>
  </>

export default Home;
