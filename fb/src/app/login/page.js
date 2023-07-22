'use client';

import { NoSsr } from '@mui/material'
import { useRouter } from 'next/navigation'

import { FocusLayout } from 'core/layouts'
import { LoginForm, useLoginModel } from 'user'

const Login = () => {
  const router = useRouter(), user = useLoginModel({ onSuccess: () => router.push("/") });

  return (
    <FocusLayout maxWidth="xs">
      <NoSsr>
        <LoginForm user={user} />
      </NoSsr>
    </FocusLayout>
  )
}

export default Login;
