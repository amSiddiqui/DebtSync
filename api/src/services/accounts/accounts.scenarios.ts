import type { Prisma, Account } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.AccountCreateArgs>({
  account: {
    one: {
      data: {
        status: 'String',
        updatedAt: '2023-09-14T12:00:41.665Z',
        primaryUser: {
          create: {
            id: 'String',
            email: 'String1464816',
            updatedAt: '2023-09-14T12:00:41.665Z',
          },
        },
        secondaryUser: { create: { name: 'String' } },
      },
    },
    two: {
      data: {
        status: 'String',
        updatedAt: '2023-09-14T12:00:41.665Z',
        primaryUser: {
          create: {
            id: 'String2',
            email: 'String8763572',
            updatedAt: '2023-09-14T12:00:41.665Z',
          },
        },
        secondaryUser: { create: { name: 'String' } },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Account, 'account'>
