import { Loader } from '@mantine/core'
import type { Account, account, accountVariables } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import AccountDetail from '../AccountDetail/AccountDetail'

export const QUERY = gql`
  query account($id: Int!) {
    account: account(id: $id) {
      id
      name
      status
      balance
    }
  }
`

export const Loading = () => <Loader variant="dots" size={'lg'} />

export const Failure = ({ error }: CellFailureProps<accountVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  account,
}: CellSuccessProps<account, accountVariables>) => {
  return <AccountDetail account={account as Account} />
}
