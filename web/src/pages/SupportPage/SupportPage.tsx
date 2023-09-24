import {
  AppShell,
  Image,
  Title,
  Group,
  Header,
  useMantineTheme,
  ActionIcon,
  useMantineColorScheme,
  Button,
  Container,
  Text,
  Divider,
} from '@mantine/core'
import { Home2, MoonStars, Sun } from 'tabler-icons-react'

import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const SupportPage = () => {
  const theme = useMantineTheme()
  const { toggleColorScheme } = useMantineColorScheme()
  return (
    <>
      <MetaTags title="Support" description="Support page" />
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
        header={
          <Header height={70} p="md">
            <Group sx={{ height: '100%' }} px={20} position="apart">
              <Group>
                <Link
                  to={routes.home()}
                  style={{
                    textDecoration: 'none',
                    color: 'inherit',
                  }}
                >
                  <Group
                    spacing={12}
                    sx={{
                      cursor: 'pointer',
                    }}
                  >
                    <Image
                      src="/logo/buying.png"
                      alt="DebtSync"
                      maw={30}
                      mx="auto"
                    />
                    <Title order={3}>DebtSync</Title>
                  </Group>
                </Link>
                <Link
                  to={routes.home()}
                  style={{
                    textDecoration: 'none',
                    color: 'inherit',
                  }}
                >
                  <Button leftIcon={<Home2 size={'1rem'} />} variant="subtle">
                    Home
                  </Button>
                </Link>
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
        <Container>
          <Title order={1} mb={'lg'}>
            Login Support
          </Title>
          <Text>
            Having trouble logging in? We’re here to help! Here are a few common
            issues and solutions:
          </Text>
          <Divider my="md" />
          <Title order={3}>Forgot Password</Title>
          <Text>
            If you’ve forgotten your password, click on the “Forgot Password”
            link on the login page and follow the instructions to reset it.
          </Text>
          <Divider my="md" />
          <Title order={3}>Account Locked</Title>
          <Text>
            If your account is locked due to multiple unsuccessful login
            attempts, please wait for 15 minutes and try again. This is a
            security feature to protect your account.
          </Text>
          <Divider my="md" />
          <Title order={3}>Need More Help?</Title>
          <Text>
            If you’re still having trouble logging in or need assistance with
            something else, please reach out to our support team at{' '}
            <a href="mailto:contact@webrace.com">contact@webrace.com</a>. We’re
            here to assist you!
          </Text>
        </Container>
      </AppShell>
    </>
  )
}

export default SupportPage
