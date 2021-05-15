import { Box, Container } from '@material-ui/core'

import { Header } from 'core'

const PageLayout = ({ children, maxWidth }) => {
  return (
    <>
      <Header />
      <Box sx={{ minHeight: theme => theme.mixins.toolbar['@media (min-width:0px) and (orientation: landscape)'].minHeight }} />
      <Container maxWidth={maxWidth} sx={{ py: 4 }}>
        {children || <></>}
      </Container>
    </>
  )
}

export default PageLayout;
