import { Account } from 'types/graphql'

import { render } from '@redwoodjs/testing/web'

import AccountDetail from './AccountDetail'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('AccountDetail', () => {
  it('renders successfully', () => {
    expect(() => {
      render(
        <AccountDetail
          account={
            {
              id: 1,
              name: 'Personal',
              status: 'active',
              balance: 1000,
            } as Account
          }
        />
      )
    }).not.toThrow()
  })
})
