import { useRouter } from 'next/router'

import { LoginForm, useLoginModel } from 'auth'
import { FocusLayout } from 'layouts'

const Login = () => {
  const router = useRouter(), 
        user = useLoginModel({ success: () => router.push("/") });

  return (
    <FocusLayout maxWidth="xs">
      <LoginForm user={user} />
    </FocusLayout>
  )
}

export default Login;
