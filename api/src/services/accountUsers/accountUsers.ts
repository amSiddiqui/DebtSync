import type {
  QueryResolvers,
  MutationResolvers,
  AccountUserRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const accountUsers: QueryResolvers['accountUsers'] = () => {
  return db.accountUser.findMany()
}

export const accountUser: QueryResolvers['accountUser'] = ({ id }) => {
  return db.accountUser.findUnique({
    where: { id },
  })
}

export const createAccountUser: MutationResolvers['createAccountUser'] = ({
  input,
}) => {
  return db.accountUser.create({
    data: input,
  })
}

export const updateAccountUser: MutationResolvers['updateAccountUser'] = ({
  id,
  input,
}) => {
  return db.accountUser.update({
    data: input,
    where: { id },
  })
}

export const deleteAccountUser: MutationResolvers['deleteAccountUser'] = ({
  id,
}) => {
  return db.accountUser.delete({
    where: { id },
  })
}

export const AccountUser: AccountUserRelationResolvers = {
  user: (_obj, { root }) => {
    return db.accountUser.findUnique({ where: { id: root?.id } }).user()
  },
  Account: (_obj, { root }) => {
    return db.accountUser.findUnique({ where: { id: root?.id } }).Account()
  },
}
