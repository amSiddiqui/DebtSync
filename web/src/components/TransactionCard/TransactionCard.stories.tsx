// Pass props to your component by passing an `args` object to your story
//
// ```jsx
// export const Primary: Story = {
//  args: {
//    propName: propValue
//  }
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { Meta, StoryObj } from '@storybook/react'

import { TransactionResult } from '../TransactionsCell'

import TransactionCard from './TransactionCard'

const meta: Meta<typeof TransactionCard> = {
  component: TransactionCard,
}

export default meta

type Story = StoryObj<typeof TransactionCard>

export const Primary: Story = {
  args: {
    transaction: {
      id: 1,
      title: 'Grocery Shopping',
      description: 'Bought groceries for £50',
      debit: true,
      amount: -50,
      date: '2022-01-01T00:00:00.000Z',
    } as TransactionResult,
  },
}
