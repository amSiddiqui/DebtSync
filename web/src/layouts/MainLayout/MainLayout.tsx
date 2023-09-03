import { AppShell, Button, Header, Navbar } from '@mantine/core'

import { useAuth } from 'src/auth'
import UserCell from 'src/components/UserCell'

type MainLayoutProps = {
  children?: React.ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const { isAuthenticated, currentUser, logOut } = useAuth()

  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar width={{ base: 300 }} height={500} p="xs">
          DebtSync
          <Button onClick={() => logOut()}>Log Out</Button>
        </Navbar>
      }
      header={
        <Header height={60} p="xs">
          {isAuthenticated && currentUser && (
            <UserCell id={currentUser.sub as string} />
          )}
        </Header>
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      {children}
    </AppShell>
  )
}

export default MainLayout
