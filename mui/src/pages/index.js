import { Link, List, ListItem, Typography } from '@mui/material'
import Head from 'next/head'

import { PageLayout } from 'core/layouts'
import { NAMES } from 'core/locales'

const Home = () => 
  <>
    <Head>
      <title>{NAMES.ccname}</title>
    </Head>
    <PageLayout>
      <Typography gutterBottom variant="h4">{NAMES.ccname}</Typography>
      <Typography paragraph>{"Welcome to "+NAMES.ccname+" application!"}</Typography>
      <br />
      <Typography gutterBottom variant="h5">Generated Pages</Typography>
      <List>
        <ListItem><Link href="/">/</Link></ListItem>
      </List>
    </PageLayout>
  </>

export default Home;
