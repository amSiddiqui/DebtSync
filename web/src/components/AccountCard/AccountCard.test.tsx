import { render } from '@redwoodjs/testing/web'

import AccountCard from './AccountCard'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('AccountCard', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AccountCard />)
    }).not.toThrow()
  })
})
