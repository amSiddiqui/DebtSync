import { render } from '@redwoodjs/testing/web'

import AccountEdit from './AccountEdit'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('AccountEdit', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AccountEdit />)
    }).not.toThrow()
  })
})
