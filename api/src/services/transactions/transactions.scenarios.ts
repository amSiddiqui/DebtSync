import type { Prisma, Transaction } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.TransactionCreateArgs>({
  transaction: {
    one: {
      data: {
        amount: 3230699,
        debit: true,
        title: 'String',
        date: '2023-09-14T20:18:01.461Z',
        description: 'String',
        updatedAt: '2023-09-14T20:18:01.461Z',
        account: {
          create: {
            status: 'active',
            name: 'String',
            updatedAt: '2023-09-14T20:18:01.461Z',
            user: {
              create: {
                id: 'String',
                email: 'String6344763',
                updatedAt: '2023-09-14T20:18:01.461Z',
              },
            },
          },
        },
      },
    },
    two: {
      data: {
        amount: 2,
        debit: true,
        title: 'String',
        date: '2023-09-14T20:18:01.461Z',
        description: 'String',
        updatedAt: '2023-09-14T20:18:01.461Z',
        account: {
          create: {
            status: 'active',
            name: 'String',
            updatedAt: '2023-09-14T20:18:01.461Z',
            user: {
              create: {
                id: 'String2',
                email: 'String210194',
                updatedAt: '2023-09-14T20:18:01.461Z',
              },
            },
          },
        },
      },
    },
    three: {
      data: {
        amount: -12,
        debit: true,
        title: 'String',
        date: '2023-09-14T20:18:01.461Z',
        description: 'String',
        updatedAt: '2023-09-14T20:18:01.461Z',
        account: {
          create: {
            status: 'inactive',
            name: 'String',
            updatedAt: '2023-09-14T20:18:01.461Z',
            user: {
              create: {
                id: 'String3',
                email: 'String310531',
                updatedAt: '2023-09-14T20:18:01.461Z',
              },
            },
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Transaction, 'transaction'>
