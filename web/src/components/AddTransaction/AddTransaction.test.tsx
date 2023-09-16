import { render } from '@redwoodjs/testing/web'

import AddTransaction from './AddTransaction'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('AddTransaction', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AddTransaction />)
    }).not.toThrow()
  })
})
