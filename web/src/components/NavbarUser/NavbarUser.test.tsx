import { render } from '@redwoodjs/testing/web'

import NavbarUser from './NavbarUser'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('NavbarUser', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<NavbarUser />)
    }).not.toThrow()
  })
})
