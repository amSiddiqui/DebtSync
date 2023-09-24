import { render } from '@redwoodjs/testing/web'

import SupportPage from './SupportPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('SupportPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SupportPage />)
    }).not.toThrow()
  })
})
