import type { Prisma, User } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: {
      data: {
        id: 'String',
        email: 'String7893953',
        name: 'Name1',
      },
    },
    two: {
      data: {
        id: 'String2',
        email: 'String9693817',
        name: 'Name2',
      },
    },
  },
})

export type StandardScenario = ScenarioData<User, 'user'>
