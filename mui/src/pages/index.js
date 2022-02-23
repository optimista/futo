import { Link, List, ListItem, Typography } from '@mui/material'
import Head from 'next/head'

import { PageLayout } from 'core/layouts'
import { NAMES } from 'core/i18n'
import { I, IProvider } from 'core/utils/i18n'

const HOME = {
  "en": {
    "Welcome": "Welcome to "+NAMES.ccname+" application!",
    "Generated Pages": "Generated Pages",
  },
  "es": {
    "Welcome": "¡Bienvenido a la aplicación "+NAMES.ccname+"!",
    "Generated Pages": "Páginas generadas",
  }
}

const Home = () => 
  <IProvider value={HOME}>
    <Head>
      <title>{NAMES.ccname}</title>
    </Head>
    <PageLayout>
      <Typography gutterBottom variant="h4">{NAMES.ccname}</Typography>
      <Typography paragraph><I k="Welcome" width={220} /></Typography>
      <br />
      <Typography gutterBottom variant="h5"><I k="Generated Pages" width={183} /></Typography>
      <List>
        <ListItem><Link href="/">/</Link></ListItem>
      </List>
    </PageLayout>
  </IProvider>

export default Home;
