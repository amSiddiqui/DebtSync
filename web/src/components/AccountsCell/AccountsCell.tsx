import { Grid, Text, Loader, Flex } from '@mantine/core'
import type { Account, AccountsQuery } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import AccountCard from '../AccountCard/AccountCard'

export const QUERY = gql`
  query AccountsQuery {
    accounts {
      id
      name
      status
      balance
    }
  }
`

export const Loading = () => (
  <Flex justify={'center'} align={'center'} h={'5rem'}>
    <Loader variant="dots" />
  </Flex>
)

export const Empty = () => <Text>No Accounts Found</Text>

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
