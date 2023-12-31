import { Box, Group, Space, Title } from '@mantine/core'

import { MetaTags } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import AccountsCell from 'src/components/AccountsCell'
import AddAccount from 'src/components/AddAccount/AddAccount'

const HomePage = () => {
  const { userMetadata } = useAuth()

  return (
    <>
      <MetaTags title="Home" description="Home page" />

      <Group grow>
        <Title>Debts</Title>
        <Box
          sx={{
            textAlign: 'right',
          }}
        >
          <AddAccount />
        </Box>
      </Group>
      <Space h="lg" />
      <AccountsCell userId={userMetadata ? userMetadata.sub : ''} />
    </>
  )
}

export default HomePage
