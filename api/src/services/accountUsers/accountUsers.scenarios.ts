import type { Prisma, AccountUser } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.AccountUserCreateArgs>({
  accountUser: {
    one: { data: { id: 'String', name: 'String' } },
    two: { data: { id: 'String', name: 'String' } },
  },
})

export type StandardScenario = ScenarioData<AccountUser, 'accountUser'>
