import { render } from '@redwoodjs/testing/web'

import NavbarLink from './NavbarLink'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('NavbarLink', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<NavbarLink />)
    }).not.toThrow()
  })
})
