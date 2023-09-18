import { render } from '@redwoodjs/testing/web'

import { TransactionResult } from '../TransactionsCell'

import TransactionCard from './TransactionCard'

describe('TransactionCard', () => {
  it('renders successfully', () => {
    const transaction = {
      id: 1,
      title: 'Grocery Shopping',
      description: 'Bought groceries for £50',
      debit: true,
      amount: -50,
      date: '2022-01-01T00:00:00.000Z',
    } as TransactionResult

    expect(() => {
      render(<TransactionCard transaction={transaction} />)
    }).not.toThrow()
  })
})
