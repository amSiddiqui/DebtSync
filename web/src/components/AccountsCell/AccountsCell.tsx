import { Grid, Text, Loader, Flex } from '@mantine/core'
import type { Account, UserAccounts } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import AccountCard from '../AccountCard/AccountCard'

export const QUERY = gql`
  query UserAccounts($userId: String!) {
    userAccounts: userAccounts(userId: $userId) {
      id
      name
      balance
      status
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

export const Success = ({ userAccounts }: CellSuccessProps<UserAccounts>) => {
  return (
    <>
      <Grid gutter="lg">
        {userAccounts.map((account) => {
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
