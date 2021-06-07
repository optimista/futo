import { useRouter } from 'next/router'

import { FocusLayout } from 'core/layouts'
import { LoginForm, useLoginModel } from 'user'

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
