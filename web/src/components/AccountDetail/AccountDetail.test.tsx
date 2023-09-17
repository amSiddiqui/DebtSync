import { render } from '@redwoodjs/testing/web'

import AccountDetail from './AccountDetail'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('AccountDetail', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AccountDetail />)
    }).not.toThrow()
  })
})
