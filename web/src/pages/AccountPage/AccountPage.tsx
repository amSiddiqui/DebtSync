import { Group } from '@mantine/core'

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
      <Group>
        <AccountNameCell id={id} />
      </Group>
      <AddTransaction accountId={id} />
      <TransactionsCell accountId={id} />
    </>
  )
}

export default AccountPage
