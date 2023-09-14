import type { Prisma, Transaction } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.TransactionCreateArgs>({
  transaction: {
    one: {
      data: {
        amount: 9302060,
        debit: true,
        title: 'String',
        description: 'String',
        updatedAt: '2023-09-14T16:03:51.867Z',
        account: {
          create: {
            status: 'String',
            name: 'String',
            updatedAt: '2023-09-14T16:03:51.867Z',
            user: {
              create: {
                id: 'String',
                email: 'String1306627',
                updatedAt: '2023-09-14T16:03:51.867Z',
              },
            },
          },
        },
      },
    },
    two: {
      data: {
        amount: 7745106,
        debit: true,
        title: 'String',
        description: 'String',
        updatedAt: '2023-09-14T16:03:51.867Z',
        account: {
          create: {
            status: 'String',
            name: 'String',
            updatedAt: '2023-09-14T16:03:51.867Z',
            user: {
              create: {
                id: 'String2',
                email: 'String6616923',
                updatedAt: '2023-09-14T16:03:51.867Z',
              },
            },
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Transaction, 'transaction'>
