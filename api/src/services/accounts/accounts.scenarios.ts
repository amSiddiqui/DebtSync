import type { Prisma, Account } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.AccountCreateArgs>({
  account: {
    one: {
      data: {
        status: 'String',
        name: 'String',
        updatedAt: '2023-09-14T16:03:44.170Z',
        user: {
          create: {
            id: 'String',
            email: 'String5608810',
            updatedAt: '2023-09-14T16:03:44.170Z',
          },
        },
      },
    },
    two: {
      data: {
        status: 'String',
        name: 'String',
        updatedAt: '2023-09-14T16:03:44.170Z',
        user: {
          create: {
            id: 'String2',
            email: 'String6026573',
            updatedAt: '2023-09-14T16:03:44.170Z',
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Account, 'account'>
