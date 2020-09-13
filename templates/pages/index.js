import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { FocusLayout } from 'layouts'

const useStyles = makeStyles(theme => ({
  title: { fontStyle: "italic", fontWeight: "bold" }
}));

const Home = () => {
  const classes = useStyles();
  return (
    <FocusLayout header>
      <Typography align="center" classes={{ root: classes.title }} variant="h1">Name</Typography>
    </FocusLayout>
  )
}

export default Home
