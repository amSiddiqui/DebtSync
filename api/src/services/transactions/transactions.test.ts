import type { Transaction } from '@prisma/client'

import {
  transactions,
  transaction,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from './transactions'
import type { StandardScenario } from './transactions.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('transactions', () => {
  scenario('returns all transactions', async (scenario: StandardScenario) => {
    const result = await transactions()

    expect(result.length).toEqual(Object.keys(scenario.transaction).length)
  })

  scenario(
    'returns a single transaction',
    async (scenario: StandardScenario) => {
      const result = await transaction({ id: scenario.transaction.one.id })

      expect(result).toEqual(scenario.transaction.one)
    }
  )

  scenario('creates a transaction', async (scenario: StandardScenario) => {
    const result = await createTransaction({
      input: {
        amount: 8636256,
        debit: true,
        title: 'String',
        description: 'String',
        accountId: scenario.transaction.two.accountId,
      },
    })

    expect(result.amount).toEqual(8636256)
    expect(result.debit).toEqual(true)
    expect(result.title).toEqual('String')
    expect(result.description).toEqual('String')
    expect(result.accountId).toEqual(scenario.transaction.two.accountId)
  })

  scenario('updates a transaction', async (scenario: StandardScenario) => {
    const original = (await transaction({
      id: scenario.transaction.one.id,
    })) as Transaction
    const result = await updateTransaction({
      id: original.id,
      input: { amount: 3067435 },
    })

    expect(result.amount).toEqual(3067435)
  })

  scenario('deletes a transaction', async (scenario: StandardScenario) => {
    const original = (await deleteTransaction({
      id: scenario.transaction.one.id,
    })) as Transaction
    const result = await transaction({ id: original.id })

    expect(result).toEqual(null)
  })
})
