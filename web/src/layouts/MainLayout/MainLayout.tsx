import {
  AppShell,
  Header,
  Navbar,
  useMantineTheme,
  Text,
  MediaQuery,
  Burger,
} from '@mantine/core'

import { useAuth } from 'src/auth'
import UserCell from 'src/components/UserCell'

type MainLayoutProps = {
  children?: React.ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const { isAuthenticated, currentUser } = useAuth()
  const [opened, setOpened] = React.useState(false)
  const theme = useMantineTheme()

  return (
    <AppShell
      padding="md"
      styles={{
        main: {
          background:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Navbar
          width={{ sm: 200, lg: 300 }}
          height={500}
          p="md"
          hidden={!opened}
          hiddenBreakpoint="sm"
        >
          <Text>Application</Text>
        </Navbar>
      }
      header={
        <Header height={{ base: 50, md: 70 }} p="md">
          <div
            style={{ display: 'flex', alignItems: 'center', height: '100%' }}
          >
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>

            <Text>Application header</Text>
            {isAuthenticated && currentUser && (
              <UserCell id={currentUser.sub as string} />
            )}
          </div>
        </Header>
      }
    >
      {children}
    </AppShell>
  )
}

export default MainLayout
