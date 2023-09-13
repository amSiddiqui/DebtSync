import type { Prisma, Account } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.AccountCreateArgs>({
  account: {
    one: {
      data: {
        status: 'String',
        updatedAt: '2023-09-13T18:01:06.254Z',
        primaryUser: {
          create: {
            id: 'String',
            email: 'String3441915',
            updatedAt: '2023-09-13T18:01:06.254Z',
          },
        },
        secondaryUser: { create: { id: 'String', name: 'String' } },
      },
    },
    two: {
      data: {
        status: 'String',
        updatedAt: '2023-09-13T18:01:06.254Z',
        primaryUser: {
          create: {
            id: 'String',
            email: 'String9177123',
            updatedAt: '2023-09-13T18:01:06.254Z',
          },
        },
        secondaryUser: { create: { id: 'String', name: 'String' } },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Account, 'account'>
