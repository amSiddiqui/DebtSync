import { render } from '@redwoodjs/testing/web'

import NewUserModal from './NewUserModal'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('NewUserModal', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<NewUserModal />)
    }).not.toThrow()
  })
})
