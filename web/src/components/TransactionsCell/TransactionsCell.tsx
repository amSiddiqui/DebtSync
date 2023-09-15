import type { TransactionsQuery } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

export const QUERY = gql`
  query TransactionsQuery($accountId: Int!) {
    accountTransactions: accountTransactions(accountId: $accountId) {
      id
      amount
      debit
      title
      description
      createdAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  accountTransactions,
}: CellSuccessProps<TransactionsQuery>) => {
  return (
    <ul>
      {accountTransactions.map((item) => {
        return <li key={item.id}>{JSON.stringify(item)}</li>
      })}
    </ul>
  )
}
