import {
  ActionIcon,
  Avatar,
  Button,
  Group,
  Menu,
  Modal,
  Stack,
  Text,
  Title,
  Tooltip,
  useMantineTheme,
} from '@mantine/core'
import { useDisclosure, useMediaQuery } from '@mantine/hooks'
import dayjs from 'dayjs'
import { CurrencyPound, DotsVertical, Pencil, Trash } from 'tabler-icons-react'
import {
  DeleteTransactionMutation,
  DeleteTransactionMutationVariables,
  UpdateTransactionMutation,
  UpdateTransactionMutationVariables,
} from 'types/graphql'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'

import { useAuth } from 'src/auth'

import { QUERY as AccountQuery } from '../AccountNameCell'
import TransactionModal, {
  FormValues,
} from '../TransactionModal/TransactionModal'
import {
  TransactionResult,
  QUERY as TransactionsQuery,
} from '../TransactionsCell'

const DELETE_TRANSACTION_MUTATION = gql`
  mutation DeleteTransactionMutation($id: Int!, $userId: String!) {
    deleteTransaction(id: $id, userId: $userId) {
      id
    }
  }
`

const UPDATE_TRANSACTION_MUTATION = gql`
  mutation UpdateTransactionMutation(
    $input: UpdateTransactionInput!
    $id: Int!
    $userId: String!
  ) {
    updateTransaction(input: $input, id: $id, userId: $userId) {
      id
    }
  }
`

interface TractionCardProps {
  transaction: TransactionResult
}
const TransactionCard = ({ transaction }: TractionCardProps) => {
  const isActive = transaction.account.status === 'active'
  const theme = useMantineTheme()
  const { userMetadata } = useAuth()
  const xsQuery = useMediaQuery(`(max-width: ${theme.breakpoints.xs})`)
  const [openedDelete, { open: openDelete, close: closeDelete }] =
    useDisclosure(false)

  const [openedEdit, { open: openEdit, close: closeEdit }] =
    useDisclosure(false)

  const [deleteTransaction, { loading: loadingDelete, error: errorDelete }] =
    useMutation<DeleteTransactionMutation, DeleteTransactionMutationVariables>(
      DELETE_TRANSACTION_MUTATION,
      {
        onCompleted: () => {
          toast.success('Transaction Deleted')
          closeDelete()
        },
        refetchQueries: [
          {
            query: TransactionsQuery,
            variables: {
              accountId: transaction.accountId,
              userId: userMetadata.sub,
            },
          },
          {
            query: AccountQuery,
            variables: { id: transaction.accountId, userId: userMetadata.sub },
          },
        ],
      }
    )

  const [updateTransaction, { loading: loadingUpdate, error: errorUpdate }] =
    useMutation<UpdateTransactionMutation, UpdateTransactionMutationVariables>(
      UPDATE_TRANSACTION_MUTATION,
      {
        onCompleted: () => {
          toast.success('Transaction Updated')
          closeEdit()
        },
        refetchQueries: [
          {
            query: TransactionsQuery,
            variables: {
              accountId: transaction.accountId,
              userId: userMetadata.sub,
            },
          },
          {
            query: AccountQuery,
            variables: { id: transaction.accountId, userId: userMetadata.sub },
          },
        ],
      }
    )

  const onSubmit = (data: FormValues, txnType: string) => {
    if (txnType === 'credit') {
      data.amount = data.amount * -1
    }
    updateTransaction({
      variables: {
        id: transaction.id,
        input: {
          ...data,
          date: data.date.toISOString(),
          debit: txnType === 'debit',
        },
        userId: userMetadata.sub,
      },
    })
  }

  return (
    <>
      <Group noWrap={true}>
        <Tooltip withArrow label={transaction.amount > 0 ? 'Lent' : 'Borrowed'}>
          <Avatar
            radius={'xl'}
            color={
              isActive ? (transaction.amount > 0 ? 'green' : 'red') : 'gray'
            }
          >
            {transaction.amount > 0 ? 'L' : 'B'}
          </Avatar>
        </Tooltip>

        <Stack spacing={'xs'}>
          <Group noWrap={false} spacing={xsQuery ? 'xs' : 'md'}>
            <Text
              sx={{
                fontWeight: 500,
                fontSize: '1.1rem',
              }}
            >
              {transaction.title}
            </Text>
            <Text c="dimmed">
              {dayjs(transaction.date).format('DD-MMM-YYYY')}
            </Text>
            {isActive && (
              <Menu shadow="md" width={200}>
                <Menu.Target>
                  <ActionIcon>
                    <DotsVertical size={'1rem'} />
                  </ActionIcon>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Label>Edit Transaction</Menu.Label>
                  <Menu.Item onClick={openEdit} icon={<Pencil size={'1rem'} />}>
                    Edit
                  </Menu.Item>
                  <Menu.Item
                    onClick={openDelete}
                    color="red"
                    icon={<Trash size={'1rem'} />}
                  >
                    Delete
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            )}
          </Group>

          <Group
            sx={{
              alignItems: 'end',
            }}
            spacing={5}
          >
            <CurrencyPound
              color={
                isActive
                  ? transaction.amount > 0
                    ? 'green'
                    : transaction.amount < 0
                    ? 'red'
                    : 'gray'
                  : 'gray'
              }
              style={{
                marginBottom: '0.35rem',
              }}
              size={'0.8rem'}
            ></CurrencyPound>
            <Text
              color={
                isActive
                  ? transaction.amount > 0
                    ? 'green'
                    : transaction.amount < 0
                    ? 'red'
                    : 'inherit'
                  : theme.colors.gray[5]
              }
            >
              {transaction.amount.toLocaleString('en-GB', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Text>
          </Group>
          {transaction.description && (
            <Text fz="sm">{transaction.description}</Text>
          )}
        </Stack>
      </Group>
      <Modal
        opened={openedDelete}
        onClose={closeDelete}
        title={<Title order={3}>Confirm Delete</Title>}
      >
        <Stack>
          {errorDelete && <Text color="red">Error: {errorDelete.message}</Text>}
          <Group>
            <Button
              disabled={loadingDelete}
              onClick={() => {
                deleteTransaction({
                  variables: {
                    id: transaction.id,
                    userId: userMetadata.sub,
                  },
                })
              }}
              color="red"
              leftIcon={<Trash size={'1rem'} />}
            >
              Delete
            </Button>
            <Button disabled={loadingDelete} onClick={closeDelete}>
              Cancel
            </Button>
          </Group>
        </Stack>
      </Modal>
      <TransactionModal
        opened={openedEdit}
        close={closeEdit}
        initialTxnType={transaction.amount > 0 ? 'debit' : 'credit'}
        isEdit={true}
        onSubmit={onSubmit}
        loading={loadingUpdate}
        error={errorUpdate}
        defaultValues={{
          title: transaction.title,
          amount: Math.abs(transaction.amount),
          description: transaction.description,
          date: new Date(transaction.date),
        }}
      />
    </>
  )
}

export default TransactionCard
