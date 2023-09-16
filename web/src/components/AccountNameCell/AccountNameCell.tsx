import { Box, Title } from '@mantine/core'
import type { account, accountVariables } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

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

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps<accountVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  account,
}: CellSuccessProps<account, accountVariables>) => {
  return (
    <Box>
      <Title>Account: {account.name}</Title>
      <p>Balance: {account.balance}</p>
      <p>Status: {account.status}</p>
    </Box>
  )
}
