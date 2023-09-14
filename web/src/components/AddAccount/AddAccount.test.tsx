import { render } from '@redwoodjs/testing/web'

import AddAccount from './AddAccount'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('AddAccount', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AddAccount />)
    }).not.toThrow()
  })
})
