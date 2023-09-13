import type { AccountUser } from '@prisma/client'

import {
  accountUsers,
  accountUser,
  createAccountUser,
  updateAccountUser,
  deleteAccountUser,
} from './accountUsers'
import type { StandardScenario } from './accountUsers.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('accountUsers', () => {
  scenario('returns all accountUsers', async (scenario: StandardScenario) => {
    const result = await accountUsers()

    expect(result.length).toEqual(Object.keys(scenario.accountUser).length)
  })

  scenario(
    'returns a single accountUser',
    async (scenario: StandardScenario) => {
      const result = await accountUser({ id: scenario.accountUser.one.id })

      expect(result).toEqual(scenario.accountUser.one)
    }
  )

  scenario('creates a accountUser', async () => {
    const result = await createAccountUser({
      input: { id: 'String', name: 'String' },
    })

    expect(result.id).toEqual('String')
    expect(result.name).toEqual('String')
  })

  scenario('updates a accountUser', async (scenario: StandardScenario) => {
    const original = (await accountUser({
      id: scenario.accountUser.one.id,
    })) as AccountUser
    const result = await updateAccountUser({
      id: original.id,
      input: { id: 'String2' },
    })

    expect(result.id).toEqual('String2')
  })

  scenario('deletes a accountUser', async (scenario: StandardScenario) => {
    const original = (await deleteAccountUser({
      id: scenario.accountUser.one.id,
    })) as AccountUser
    const result = await accountUser({ id: original.id })

    expect(result).toEqual(null)
  })
})
