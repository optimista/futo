import { useRouter } from 'next/router'

import { FocusLayout } from 'core/layouts'
import { LoginForm, useLoginModel } from 'user'

const Login = () => {
  const router = useRouter(), user = useLoginModel({ onSuccess: () => router.push("/") });

  return (
    <FocusLayout maxWidth="xs">
      <LoginForm user={user} />
    </FocusLayout>
  )
}

export default Login;
