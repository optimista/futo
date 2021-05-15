import { Button, CircularProgress } from '@material-ui/core'
import { Refresh } from '@material-ui/icons'
import { useContext } from 'react'

import { FormContext } from 'core/form'

const Submit = ({ children, ...props }) => {
  const model = useContext(FormContext);

  let content, ownProps = {};
  switch(true) {
    case model.isSending: content = <CircularProgress />; break;
    case model.isFail: ownProps = { ...ownProps, startIcon: <Refresh /> }; content = "Try again"; break;
    default: content = children; break;
  }

  return <Button type="submit" {...ownProps} {...props}>{content}</Button>
}

export default Submit;
