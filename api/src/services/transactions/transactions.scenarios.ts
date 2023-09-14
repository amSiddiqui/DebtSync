import type { Prisma, Transaction } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.TransactionCreateArgs>({
  transaction: {
    one: {
      data: {
        amount: 5894979,
        debit: true,
        title: 'String',
        description: 'String',
        updatedAt: '2023-09-14T14:05:07.140Z',
        account: {
          create: {
            status: 'String',
            name: 'String',
            updatedAt: '2023-09-14T14:05:07.140Z',
            accountUserId: 565076,
            user: {
              create: {
                id: 'String',
                email: 'String8773367',
                updatedAt: '2023-09-14T14:05:07.140Z',
              },
            },
          },
        },
      },
    },
    two: {
      data: {
        amount: 9523137,
        debit: true,
        title: 'String',
        description: 'String',
        updatedAt: '2023-09-14T14:05:07.140Z',
        account: {
          create: {
            status: 'String',
            name: 'String',
            updatedAt: '2023-09-14T14:05:07.140Z',
            accountUserId: 4184139,
            user: {
              create: {
                id: 'String2',
                email: 'String8101525',
                updatedAt: '2023-09-14T14:05:07.140Z',
              },
            },
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Transaction, 'transaction'>
