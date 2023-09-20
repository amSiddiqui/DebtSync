import type {
  QueryResolvers,
  MutationResolvers,
  TransactionRelationResolvers,
} from 'types/graphql'

import { validateWith } from '@redwoodjs/api'

import { db } from 'src/lib/db'

export const transaction: QueryResolvers['transaction'] = ({ id, userId }) => {
  return db.transaction.findUnique({
    where: { id, account: { userId } },
  })
}

export const accountTransactions: QueryResolvers['accountTransactions'] = ({
  accountId,
  userId,
}) => {
  return db.transaction.findMany({
    where: { account: { id: accountId, userId } },
    include: { account: true },
    orderBy: { date: 'desc' },
  })
}

export const createTransaction: MutationResolvers['createTransaction'] =
  async ({ input, userId }) => {
    const accountId = input.accountId

    await validateWith(async () => {
      const ac = await db.account.findUnique({
        where: { id: accountId, userId },
      })
      if (ac.status !== 'active') {
        throw 'Account is inactivate. Please activate it first.'
      }
    })

    const transaction = await db.transaction.create({
      data: input,
    })

    const sum = await db.transaction.aggregate({
      where: { accountId, account: { userId } },
      _sum: { amount: true },
    })

    await db.account.update({
      where: { id: accountId, userId },
      data: { balance: sum._sum.amount },
    })

    return transaction
  }

export const updateTransaction: MutationResolvers['updateTransaction'] =
  async ({ id, input, userId }) => {
    await validateWith(async () => {
      const ac = await db.transaction.findUnique({
        where: {
          id,
          account: {
            userId,
          },
        },
        include: {
          account: true,
        },
      })

      if (ac.account.status !== 'active') {
        throw 'Account is inactivate. Please activate it first.'
      }
    })

    const transaction = await db.transaction.update({
      data: input,
      where: { id, account: { userId } },
    })

    const accountId = transaction.accountId

    const sum = await db.transaction.aggregate({
      where: {
        accountId,
        account: {
          userId,
        },
      },
      _sum: { amount: true },
    })

    await db.account.update({
      where: { id: accountId, userId },
      data: { balance: sum._sum.amount },
    })

    return transaction
  }

export const deleteTransaction: MutationResolvers['deleteTransaction'] =
  async ({ id, userId }) => {
    await validateWith(async () => {
      const ac = await db.transaction.findUnique({
        where: { id, account: { userId } },
        include: {
          account: true,
        },
      })

      if (ac.account.status !== 'active') {
        throw 'Account is inactivate. Please activate it first.'
      }
    })
    const txn = await db.transaction.delete({
      where: { id, account: { userId } },
    })

    const accountId = txn.accountId

    const sum = await db.transaction.aggregate({
      where: { accountId, account: { userId } },
      _sum: { amount: true },
    })

    await db.account.update({
      where: { id: accountId, userId },
      data: { balance: sum._sum.amount ? sum._sum.amount : 0 },
    })

    return txn
  }

export const Transaction: TransactionRelationResolvers = {
  account: (_obj, { root }) => {
    return db.transaction.findUnique({ where: { id: root?.id } }).account()
  },
}
