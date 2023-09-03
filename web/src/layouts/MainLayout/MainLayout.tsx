import {
  AppShell,
  Header,
  Navbar,
  useMantineTheme,
  Text,
  MediaQuery,
  Burger,
  Group,
  Image,
  Title,
  ActionIcon,
  useMantineColorScheme,
} from '@mantine/core'
import { Sun, MoonStars } from 'tabler-icons-react'

import { useAuth } from 'src/auth'
import UserCell from 'src/components/UserCell'

type MainLayoutProps = {
  children?: React.ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const { isAuthenticated, currentUser } = useAuth()
  const [opened, setOpened] = React.useState(false)
  const theme = useMantineTheme()
  const { toggleColorScheme } = useMantineColorScheme()

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
          p="md"
          hidden={!opened}
          hiddenBreakpoint="sm"
        >
          <Navbar.Section grow mt="xs">
            <Text>Application</Text>
          </Navbar.Section>
          <Navbar.Section>
            {isAuthenticated && currentUser && (
              <UserCell id={currentUser.sub as string} />
            )}
          </Navbar.Section>
        </Navbar>
      }
      header={
        <Header height={{ base: 50, md: 70 }} p="md">
          <Group sx={{ height: '100%' }} px={20} position="apart">
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>
            <Group
              spacing={12}
              sx={{
                cursor: 'pointer',
              }}
            >
              <Image src="/logo/buying.png" alt="DebtSync" maw={30} mx="auto" />
              <Title order={3}>DebtSync</Title>
            </Group>
            <ActionIcon
              variant="default"
              onClick={() => toggleColorScheme()}
              size={30}
            >
              {theme.colorScheme === 'dark' ? (
                <Sun size="1rem" />
              ) : (
                <MoonStars size="1rem" />
              )}
            </ActionIcon>
          </Group>
        </Header>
      }
    >
      {children}
    </AppShell>
  )
}

export default MainLayout
