import type {
  QueryResolvers,
  MutationResolvers,
  AccountRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const userAccounts: QueryResolvers['userAccounts'] = ({ userId }) => {
  return db.account.findMany({
    where: { userId },
  })
}

export const account: QueryResolvers['account'] = ({ id, userId }) => {
  return db.account.findUnique({
    where: { id, userId },
  })
}

export const createAccount: MutationResolvers['createAccount'] = ({
  input,
}) => {
  return db.account.create({
    data: input,
  })
}

export const updateAccount: MutationResolvers['updateAccount'] = ({
  id,
  input,
  userId,
}) => {
  return db.account.update({
    data: input,
    where: { id, userId },
  })
}

export const deleteAccount: MutationResolvers['deleteAccount'] = async ({
  id,
  userId,
}) => {
  await db.transaction.deleteMany({
    where: {
      accountId: id,
      account: {
        userId,
      },
    },
  })

  const account = await db.account.delete({
    where: { id, userId },
  })

  return account
}

export const Account: AccountRelationResolvers = {
  user: (_obj, { root }) => {
    return db.account.findUnique({ where: { id: root?.id } }).user()
  },
  linkedUser: (_obj, { root }) => {
    return db.account.findUnique({ where: { id: root?.id } }).linkedUser()
  },
  Transaction: (_obj, { root }) => {
    return db.account.findUnique({ where: { id: root?.id } }).Transaction()
  },
}
