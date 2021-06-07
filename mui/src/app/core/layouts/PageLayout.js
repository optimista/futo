import { Container } from '@material-ui/core'

const PageLayout = ({ children, maxWidth }) => {
  return (
    <Container maxWidth={maxWidth} sx={{ py: 4 }}>
      {children || <></>}
    </Container>
  )
}

export default PageLayout;
