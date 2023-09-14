import type { Prisma, Account } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.AccountCreateArgs>({
  account: {
    one: {
      data: {
        status: 'String',
        name: 'String',
        updatedAt: '2023-09-14T20:17:53.672Z',
        user: {
          create: {
            id: 'String',
            email: 'String214059',
            updatedAt: '2023-09-14T20:17:53.672Z',
          },
        },
      },
    },
    two: {
      data: {
        status: 'String',
        name: 'String',
        updatedAt: '2023-09-14T20:17:53.672Z',
        user: {
          create: {
            id: 'String2',
            email: 'String7183665',
            updatedAt: '2023-09-14T20:17:53.672Z',
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Account, 'account'>
