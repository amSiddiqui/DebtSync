import type { Prisma, Account } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.AccountCreateArgs>({
  account: {
    one: {
      data: {
        status: 'String',
        name: 'String',
        updatedAt: '2023-09-14T14:05:00.917Z',
        accountUserId: 6169469,
        user: {
          create: {
            id: 'String',
            email: 'String1127547',
            updatedAt: '2023-09-14T14:05:00.917Z',
          },
        },
      },
    },
    two: {
      data: {
        status: 'String',
        name: 'String43',
        updatedAt: '2023-09-14T14:05:00.917Z',
        accountUserId: 8009846,
        user: {
          create: {
            id: 'String2',
            email: 'String6989710',
            updatedAt: '2023-09-14T14:05:00.917Z',
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Account, 'account'>
