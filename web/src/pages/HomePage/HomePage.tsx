import { Box, Button, Group, Text, Title } from '@mantine/core'

import { MetaTags } from '@redwoodjs/web'
import AddAccount from 'src/components/AddAccount/AddAccount'
import { Plus } from 'tabler-icons-react'

const HomePage = () => {
  return (
    <>
      <MetaTags title="Home" description="Home page" />

      <Group grow>
        <Title>Accounts</Title>
        <Box sx={{
          textAlign: 'right'
        }}>
          <AddAccount />
        </Box>
      </Group>
    </>
  )
}

export default HomePage
