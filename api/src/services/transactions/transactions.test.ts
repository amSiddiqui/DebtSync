import type { Transaction } from '@prisma/client'

import { ServiceValidationError } from '@redwoodjs/api'

import { account } from '../accounts/accounts'

import {
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
  scenario(
    'returns a single transaction',
    async (scenario: StandardScenario) => {
      const result = await transaction({
        id: scenario.transaction.one.id,
        userId: 'String',
      })

      expect(result).toEqual(scenario.transaction.one)
    }
  )

  scenario('creates a transaction', async (scenario: StandardScenario) => {
    const now = new Date()
    const result = await createTransaction({
      input: {
        amount: 4,
        debit: true,
        title: 'String',
        description: 'String',
        date: now,
        accountId: scenario.transaction.two.accountId,
      },
      userId: 'String2',
    })

    const affectedAccount = await account({
      id: scenario.transaction.two.accountId,
      userId: 'String2',
    })

    expect(result.amount).toEqual(4)
    expect(result.debit).toEqual(true)
    expect(result.title).toEqual('String')
    expect(result.date).toEqual(now)
    expect(result.description).toEqual('String')
    expect(result.accountId).toEqual(scenario.transaction.two.accountId)

    expect(affectedAccount.balance).toEqual(6)
  })

  scenario(
    'creates a transaction with inactive account',
    async (scenario: StandardScenario) => {
      const now = new Date()
      let errorThrown = false
      try {
        await createTransaction({
          input: {
            amount: 4,
            debit: true,
            title: 'String',
            description: 'String',
            date: now,
            accountId: scenario.transaction.three.accountId,
          },
          userId: 'String3',
        })
      } catch (e) {
        errorThrown = true
        expect(e).toBeInstanceOf(ServiceValidationError)
        expect(e.message).toEqual(
          'Account is inactivate. Please activate it first.'
        )
      }
      expect(errorThrown).toEqual(true)
    }
  )

  scenario('updates a transaction', async (scenario: StandardScenario) => {
    const original = (await transaction({
      id: scenario.transaction.one.id,
      userId: 'String',
    })) as Transaction
    const result = await updateTransaction({
      id: original.id,
      input: { amount: 7 },
    })

    const affectedAccount = await account({
      id: scenario.transaction.one.accountId,
      userId: 'String',
    })

    expect(result.amount).toEqual(7)
    expect(affectedAccount.balance).toEqual(7)
  })

  scenario('deletes a transaction', async (scenario: StandardScenario) => {
    const original = (await deleteTransaction({
      id: scenario.transaction.one.id,
      userId: 'String',
    })) as Transaction
    const result = await transaction({ id: original.id, userId: 'String' })

    expect(result).toEqual(null)
  })
})
