import { Account } from 'types/graphql'

import { render } from '@redwoodjs/testing/web'

import AccountEdit from './AccountEdit'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('AccountEdit', () => {
  it('renders successfully', () => {
    expect(() => {
      render(
        <AccountEdit
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
