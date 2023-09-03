import { Button } from '@mantine/core'

import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import { useAuth } from 'src/auth'

const HomePage = () => {
  const { isAuthenticated, currentUser, loading, logIn } = useAuth()

  if (loading) {
    return <div>Loading...</div>
  }
  return (
    <>
      <MetaTags title="Home" description="Home page" />

      <h1>HomePage</h1>
      <p>
        Find me in <code>./web/src/pages/HomePage/HomePage.tsx</code>
      </p>
      <p>
        My default route is named <code>home</code>, link to me with `
        <Link to={routes.home()}>Home</Link>`
        <p>{JSON.stringify({ isAuthenticated })}</p>
        <p>{JSON.stringify({ currentUser })}</p>
        <Button onClick={() => logIn()}>Log In</Button>
      </p>
    </>
  )
}

export default HomePage
