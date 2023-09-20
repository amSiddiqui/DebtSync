import { Flex, Space, Title } from '@mantine/core'

import { MetaTags } from '@redwoodjs/web'

import AccountNameCell from 'src/components/AccountNameCell'
import AddTransaction from 'src/components/AddTransaction/AddTransaction'
import TransactionsCell from 'src/components/TransactionsCell'

type AccountPageProps = {
  id: number
}

const AccountPage = ({ id }: AccountPageProps) => {
  return (
    <>
      <MetaTags title="Account" description="Account page" />

      <AccountNameCell id={id} />
      <Space h="xl" />
      <Flex
        sx={{
          marginBottom: '1rem',
        }}
      >
        <Title
          sx={{
            flexGrow: 1,
          }}
          order={2}
        >
          Transactions
        </Title>
        <AddTransaction accountId={id} />
      </Flex>

      <TransactionsCell accountId={id} />
    </>
  )
}

export default AccountPage
