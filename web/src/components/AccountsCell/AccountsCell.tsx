import { Grid } from '@mantine/core'
import type { Account, AccountsQuery } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import AccountCard from '../AccountCard/AccountCard'

export const QUERY = gql`
  query AccountsQuery {
    accounts {
      id
      name
      status
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ accounts }: CellSuccessProps<AccountsQuery>) => {
  return (
    <>
      <Grid gutter="lg">
        {accounts.map((account) => {
          return (
            <Grid.Col key={account.id} xs={12} sm={6}>
              <AccountCard account={account as Account} />
            </Grid.Col>
          )
        })}
      </Grid>
    </>
  )
}
