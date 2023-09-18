import type {
  QueryResolvers,
  MutationResolvers,
  TransactionRelationResolvers,
} from 'types/graphql'

import { validateWith } from '@redwoodjs/api'

import { db } from 'src/lib/db'

export const transactions: QueryResolvers['transactions'] = () => {
  return db.transaction.findMany()
}

export const transaction: QueryResolvers['transaction'] = ({ id }) => {
  return db.transaction.findUnique({
    where: { id },
  })
}

export const accountTransactions: QueryResolvers['accountTransactions'] = ({
  accountId,
}) => {
  return db.transaction.findMany({
    where: { accountId },
  })
}

export const createTransaction: MutationResolvers['createTransaction'] =
  async ({ input }) => {
    const accountId = input.accountId

    await validateWith(async () => {
      const ac = await db.account.findUnique({ where: { id: accountId } })
      if (ac.status !== 'active') {
        throw 'Account is inactivate. Please activate it first.'
      }
    })

    const transaction = await db.transaction.create({
      data: input,
    })

    const sum = await db.transaction.aggregate({
      where: { accountId },
      _sum: { amount: true },
    })

    await db.account.update({
      where: { id: accountId },
      data: { balance: sum._sum.amount },
    })

    return transaction
  }

export const updateTransaction: MutationResolvers['updateTransaction'] =
  async ({ id, input }) => {
    await validateWith(async () => {
      const ac = await db.transaction.findUnique({
        where: { id },
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
      where: { id },
    })

    const accountId = transaction.accountId

    const sum = await db.transaction.aggregate({
      where: { accountId },
      _sum: { amount: true },
    })

    await db.account.update({
      where: { id: accountId },
      data: { balance: sum._sum.amount },
    })

    return transaction
  }

export const deleteTransaction: MutationResolvers['deleteTransaction'] = ({
  id,
}) => {
  return db.transaction.delete({
    where: { id },
  })
}

export const Transaction: TransactionRelationResolvers = {
  account: (_obj, { root }) => {
    return db.transaction.findUnique({ where: { id: root?.id } }).account()
  },
}
