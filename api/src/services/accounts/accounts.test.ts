import type { Account } from '@prisma/client'

import {
  account,
  createAccount,
  updateAccount,
  deleteAccount,
} from './accounts'
import type { StandardScenario } from './accounts.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('accounts', () => {
  scenario('returns a single account', async (scenario: StandardScenario) => {
    const result = await account({
      id: scenario.account.one.id,
      userId: scenario.account.one.userId,
    })

    expect(result).toEqual(scenario.account.one)
  })

  scenario('creates a account', async (scenario: StandardScenario) => {
    const result = await createAccount({
      input: {
        status: 'String',
        name: 'String3',
        userId: scenario.account.two.userId,
        balance: 0,
      },
    })

    expect(result.status).toEqual('String')
    expect(result.name).toEqual('String3')
    expect(result.userId).toEqual(scenario.account.two.userId)
    expect(result.balance).toEqual(0)
  })

  scenario('updates a account', async (scenario: StandardScenario) => {
    const original = (await account({
      id: scenario.account.one.id,
      userId: scenario.account.one.userId,
    })) as Account
    const result = await updateAccount({
      id: original.id,
      input: { status: 'String2' },
    })

    expect(result.status).toEqual('String2')
  })

  scenario('deletes a account', async (scenario: StandardScenario) => {
    const original = (await deleteAccount({
      id: scenario.account.one.id,
    })) as Account
    const result = await account({ id: original.id, userId: original.userId })

    expect(result).toEqual(null)
  })
})
