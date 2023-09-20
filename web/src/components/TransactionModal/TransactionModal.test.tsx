import { render } from '@redwoodjs/testing/web'

import TransactionModal from './TransactionModal'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('TransactionModal', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TransactionModal />)
    }).not.toThrow()
  })
})
