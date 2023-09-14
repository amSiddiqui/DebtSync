import { Account } from 'types/graphql'

import { render } from '@redwoodjs/testing/web'

import AccountCard from './AccountCard'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('AccountCard', () => {
  it('renders successfully', () => {
    expect(() => {
      render(
        <AccountCard
          account={{ id: 1, name: 'test', status: 'active' } as Account}
        />
      )
    }).not.toThrow()
  })
})
