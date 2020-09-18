import { useState } from 'react'

import { PasswordConfirmForm, PasswordResetForm } from 'auth/reset'
import { FocusLayout } from 'layouts'
import { firebase } from 'utils'

const AccountResetConfirm = ({ email, errorCode: errorCodeInitial, oobCode }) => {
  const [errorCode, setErrorCode] = useState(errorCodeInitial);
  return (
    <FocusLayout maxWidth="xs">
      { errorCode ? <PasswordResetForm errorCode={errorCode} /> : <PasswordConfirmForm actionCode={oobCode} email={email} onError={setErrorCode} /> }
    </FocusLayout>
  )
}

export const getServerSideProps = async ({ query }) => { 
  const { mode, oobCode = null } = query; let errorCode = null, email = "";
  try { email = await firebase.auth().verifyPasswordResetCode(oobCode); } catch (e) { errorCode = e.code; }
  return { props: { email, errorCode, oobCode } }
}

export default AccountResetConfirm;
