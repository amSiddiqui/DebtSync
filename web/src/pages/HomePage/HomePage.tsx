import { Box, Group, Title } from '@mantine/core'

import { MetaTags } from '@redwoodjs/web'

import AccountsCell from 'src/components/AccountsCell'
import AddAccount from 'src/components/AddAccount/AddAccount'

const HomePage = () => {
  return (
    <>
      <MetaTags title="Home" description="Home page" />

      <Group grow>
        <Title>Accounts</Title>
        <Box
          sx={{
            textAlign: 'right',
          }}
        >
          <AddAccount />
        </Box>
      </Group>
      <AccountsCell />
    </>
  )
}

export default HomePage
