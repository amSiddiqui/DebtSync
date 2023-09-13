import type { Prisma, Transaction } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.TransactionCreateArgs>({
  transaction: {
    one: {
      data: {
        amount: 4711787,
        debit: true,
        title: 'String',
        description: 'String',
        updatedAt: '2023-09-13T18:01:14.099Z',
        account: {
          create: {
            status: 'String',
            updatedAt: '2023-09-13T18:01:14.099Z',
            primaryUser: {
              create: {
                id: 'String',
                email: 'String1875995',
                updatedAt: '2023-09-13T18:01:14.099Z',
              },
            },
            secondaryUser: { create: { id: 'String', name: 'String' } },
          },
        },
      },
    },
    two: {
      data: {
        amount: 7296604,
        debit: true,
        title: 'String',
        description: 'String',
        updatedAt: '2023-09-13T18:01:14.099Z',
        account: {
          create: {
            status: 'String',
            updatedAt: '2023-09-13T18:01:14.099Z',
            primaryUser: {
              create: {
                id: 'String',
                email: 'String1614675',
                updatedAt: '2023-09-13T18:01:14.099Z',
              },
            },
            secondaryUser: { create: { id: 'String', name: 'String' } },
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Transaction, 'transaction'>
