import { render } from '@redwoodjs/testing/web'

import { useAuth } from 'src/auth'

import HomePage from './HomePage'

jest.mock('src/auth', () => {
  return {
    useAuth: jest.fn(),
  }
})

describe('HomePage', () => {
  it('renders successfully', () => {
    const userMetadata = { sub: 'SUB_VALUE' }
    useAuth.mockReturnValue({ userMetadata })

    expect(() => {
      render(<HomePage />)
    }).not.toThrow()
  })
})
