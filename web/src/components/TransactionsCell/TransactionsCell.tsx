import { Box, Divider, Loader, Stack } from '@mantine/core'
import type { TransactionsQuery } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import TransactionCard from '../TransactionCard/TransactionCard'

export type TransactionResult = {
  id: number
  amount: number
  debit: boolean
  title: string
  date: string
  description: string
}

export const QUERY = gql`
  query TransactionsQuery($accountId: Int!) {
    accountTransactions: accountTransactions(accountId: $accountId) {
      id
      amount
      debit
      title
      date
      description
    }
  }
`

export const Loading = () => <Loader variant="dots" />

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  accountTransactions,
}: CellSuccessProps<TransactionsQuery>) => {
  return (
    <Stack>
      {accountTransactions.map((item, index) => {
        return (
          <Box key={item.id}>
            <TransactionCard transaction={item} />
            {accountTransactions.length - 1 !== index && <Divider my="lg" />}
          </Box>
        )
      })}
    </Stack>
  )
}
