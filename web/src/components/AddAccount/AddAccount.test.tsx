import { render } from '@redwoodjs/testing/web'

import { useAuth } from 'src/auth'

import AddAccount from './AddAccount'

jest.mock('src/auth', () => {
  return {
    useAuth: jest.fn(),
  }
})

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('AddAccount', () => {
  const userMetadata = { sub: 'SUB_VALUE' }
  useAuth.mockReturnValue({ userMetadata })
  it('renders successfully', () => {
    expect(() => {
      render(<AddAccount />)
    }).not.toThrow()
  })
})
