import type { Prisma, User } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: {
      data: {
        auth0Sub: 'String6293586',
        email: 'String8467404',
        updatedAt: '2023-09-02T16:29:44.096Z',
      },
    },
    two: {
      data: {
        auth0Sub: 'String2554449',
        email: 'String6935594',
        updatedAt: '2023-09-02T16:29:44.096Z',
      },
    },
  },
})

export type StandardScenario = ScenarioData<User, 'user'>
