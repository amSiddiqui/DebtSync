import type { Prisma, Transaction } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.TransactionCreateArgs>({
  transaction: {
    one: {
      data: {
        amount: 4409922,
        debit: true,
        title: 'String',
        description: 'String',
        updatedAt: '2023-09-14T12:00:51.161Z',
        account: {
          create: {
            status: 'String',
            updatedAt: '2023-09-14T12:00:51.161Z',
            primaryUser: {
              create: {
                id: 'String',
                email: 'String881482',
                updatedAt: '2023-09-14T12:00:51.161Z',
              },
            },
            secondaryUser: { create: { name: 'String' } },
          },
        },
      },
    },
    two: {
      data: {
        amount: 9039796,
        debit: true,
        title: 'String',
        description: 'String',
        updatedAt: '2023-09-14T12:00:51.161Z',
        account: {
          create: {
            status: 'String',
            updatedAt: '2023-09-14T12:00:51.161Z',
            primaryUser: {
              create: {
                id: 'String2',
                email: 'String7794776',
                updatedAt: '2023-09-14T12:00:51.161Z',
              },
            },
            secondaryUser: { create: { name: 'String' } },
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Transaction, 'transaction'>
