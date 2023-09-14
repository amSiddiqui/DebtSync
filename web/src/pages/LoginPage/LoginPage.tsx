import { useEffect, useState } from 'react'

import { Box, Loader, Stack, Title } from '@mantine/core'

import { MetaTags } from '@redwoodjs/web'

import { useAuth } from 'src/auth'

const LoginPage = () => {
  const { isAuthenticated, loading, logIn } = useAuth()
  const [loginCalled, setLoginCalled] = useState(false)

  useEffect(() => {
    if (!loading && !isAuthenticated && !loginCalled) {
      logIn()
      setLoginCalled(true)
    }
  }, [isAuthenticated, loading, logIn, loginCalled])

  return (
    <>
      <MetaTags title="Login" description="Login page" />

      <Box
        sx={{
          display: 'flex',
          width: '100vw',
          height: '80vh',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Stack justify="center" align="center">
          {loading && <Title order={2}>Loading</Title>}
          {!loading && <Title order={4}>Authenticating</Title>}
          <Loader variant="dots" size={'xl'} />
        </Stack>
      </Box>
    </>
  )
}

export default LoginPage
