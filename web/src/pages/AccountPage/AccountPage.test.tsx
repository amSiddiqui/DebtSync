import { render } from '@redwoodjs/testing/web'

import { useAuth } from 'src/auth'

import AccountPage from './AccountPage'

jest.mock('src/auth', () => {
  return {
    useAuth: jest.fn(),
  }
})

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('AccountPage', () => {
  const userMetadata = { sub: 'SUB_VALUE' }
  useAuth.mockReturnValue({ userMetadata })
  it('renders successfully', () => {
    expect(() => {
      render(<AccountPage id={1} />)
    }).not.toThrow()
  })
})
