import { makeStyles } from '@material-ui/core/styles'

import { Header } from 'core'

const useStyles = makeStyles(theme => ({
  placeholder: theme.mixins.toolbar
}));

const PageLayout = ({ children, HeaderProps }) => {
  const classes = useStyles();
  return (
    <>
      <Header {...HeaderProps} />
      <div className={classes.placeholder} />
      {children}
    </>
  )
}

export default PageLayout;
