import { Button } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { Plus } from 'tabler-icons-react'
import {
  CreateTransactionMutation,
  CreateTransactionMutationVariables,
} from 'types/graphql'

import { useForm } from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'

import { QUERY as AccountQuery } from '../AccountNameCell'
import TransactionModal from '../TransactionModal/TransactionModal'
import { FormValues } from '../TransactionModal/TransactionModal'
import { QUERY as TransactionsQuery } from '../TransactionsCell'

interface AddTransactionProps {
  accountId: number
}

const CREATE_TRANSACTION_MUTATION = gql`
  mutation CreateTransactionMutation($input: CreateTransactionInput!) {
    createTransaction(input: $input) {
      id
    }
  }
`

const AddTransaction = ({ accountId }: AddTransactionProps) => {
  const [opened, { open, close }] = useDisclosure(false)
  const formMethods = useForm<FormValues>({
    defaultValues: {
      title: '',
      amount: 0,
      description: '',
      date: new Date(),
    },
  })

  const [create, { loading, error }] = useMutation<
    CreateTransactionMutation,
    CreateTransactionMutationVariables
  >(CREATE_TRANSACTION_MUTATION, {
    onCompleted: () => {
      toast.success('Transaction Created')
      formMethods.reset()
      close()
    },
    refetchQueries: [
      { query: TransactionsQuery, variables: { accountId } },
      { query: AccountQuery, variables: { id: accountId } },
    ],
  })

  const onSubmit = (data: FormValues, txnType: string) => {
    data.description = data.description ? data.description : ''
    if (txnType === 'credit') {
      data.amount = data.amount * -1
    }
    create({
      variables: {
        input: {
          ...data,
          date: data.date.toISOString(),
          debit: txnType === 'debit',
          accountId,
        },
      },
    })
  }
  return (
    <>
      <TransactionModal
        opened={opened}
        onSubmit={onSubmit}
        close={close}
        loading={loading}
        error={error}
        defaultValues={{
          title: '',
          amount: 0,
          description: '',
          date: new Date(),
        }}
        isEdit={false}
      />
      <Button onClick={open} leftIcon={<Plus size={'1rem'} />}>
        Add Transaction
      </Button>
    </>
  )
}

export default AddTransaction
