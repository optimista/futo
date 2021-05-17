import { Container, Toolbar } from '@material-ui/core'

import { Header } from 'core'

const PageLayout = ({ children, maxWidth }) => {
  return (
    <>
      <Header />
      <Toolbar />
      <Container maxWidth={maxWidth} sx={{ py: 4 }}>
        {children || <></>}
      </Container>
    </>
  )
}

export default PageLayout;
