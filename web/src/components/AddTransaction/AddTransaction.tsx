import {
  Box,
  Button,
  Center,
  Flex,
  Modal,
  NumberInput,
  SegmentedControl,
  Stack,
  Text,
  TextInput,
  Textarea,
  useMantineTheme,
} from '@mantine/core'
import { DateInput } from '@mantine/dates'
import { useDisclosure } from '@mantine/hooks'
import {
  Calendar,
  CurrencyPound,
  LetterT,
  Plus,
  TrendingDown,
  TrendingUp,
} from 'tabler-icons-react'
import {
  CreateTransactionMutation,
  CreateTransactionMutationVariables,
} from 'types/graphql'

import { Controller, Form, SubmitHandler, useForm } from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'
import { Toaster, toast } from '@redwoodjs/web/dist/toast'

import { QUERY as AccountQuery } from '../AccountNameCell'
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

interface FormValues {
  title: string
  amount: number
  description: string
  date: Date
}

const AddTransaction = ({ accountId }: AddTransactionProps) => {
  const [opened, { open, close }] = useDisclosure(false)
  const [txnType, setTxnType] = React.useState<'credit' | 'debit'>('credit')
  const formMethods = useForm<FormValues>({
    defaultValues: {
      title: '',
      amount: 0,
      description: '',
      date: new Date(),
    },
  })

  const theme = useMantineTheme()

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

  const onSubmit: SubmitHandler<FormValues> = (data) => {
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
      <Toaster />
      <Modal
        size={'lg'}
        opened={opened}
        onClose={close}
        title={<Text>Add Transaction</Text>}
      >
        <Form onSubmit={onSubmit} error={error} formMethods={formMethods}>
          <Stack>
            {error && (
              <Text
                sx={{
                  color: 'red',
                }}
              >
                {error.message}
              </Text>
            )}
            <Controller
              name="title"
              rules={{
                required: {
                  value: true,
                  message: 'Please enter a title',
                },
              }}
              render={({
                field: { onChange, onBlur, value, name, ref },
                fieldState: { error },
              }) => (
                <TextInput
                  onChange={onChange}
                  onBlur={onBlur}
                  withAsterisk
                  value={value}
                  ref={ref}
                  icon={<LetterT size="1rem" />}
                  label="Title"
                  name={name}
                  error={error && error.message}
                  placeholder="Enter title"
                />
              )}
            />
            <Controller
              name="date"
              rules={{
                required: {
                  value: true,
                  message: 'Please add transaction date',
                },
              }}
              render={({
                field: { onChange, onBlur, value, name, ref },
                fieldState: { error },
              }) => (
                <DateInput
                  onChange={onChange}
                  withAsterisk
                  clearable
                  onBlur={onBlur}
                  value={value}
                  ref={ref}
                  label="Date"
                  icon={<Calendar size={'1rem'} />}
                  name={name}
                  error={error && error.message}
                  placeholder="Transaction Date"
                />
              )}
            />
            <SegmentedControl
              value={txnType}
              color={txnType === 'credit' ? 'red' : 'green'}
              onChange={() => {
                setTxnType(txnType === 'credit' ? 'debit' : 'credit')
              }}
              data={[
                {
                  label: (
                    <Center>
                      <TrendingDown size="1rem" />
                      <Box ml={10}>Borrowed</Box>
                    </Center>
                  ),
                  value: 'credit',
                },
                {
                  label: (
                    <Center>
                      <TrendingUp size="1rem" />
                      <Box ml={10}>Lent</Box>
                    </Center>
                  ),
                  value: 'debit',
                },
              ]}
            />

            <Controller
              name="amount"
              rules={{
                required: {
                  value: true,
                  message: 'Please enter an amount',
                },
                min: {
                  value: 0,
                  message: 'Please enter a positive amount',
                },
              }}
              render={({
                field: { onChange, onBlur, value, name, ref },
                fieldState: { error },
              }) => (
                <NumberInput
                  onChange={onChange}
                  withAsterisk
                  onBlur={onBlur}
                  icon={
                    <Flex justify={'center'} align={'center'}>
                      <CurrencyPound
                        color={
                          txnType === 'credit'
                            ? theme.colors.red[8]
                            : theme.colors.green[8]
                        }
                        size="1rem"
                      />
                      <Text
                        color={
                          txnType === 'credit'
                            ? theme.colors.red[8]
                            : theme.colors.green[8]
                        }
                      >
                        {txnType === 'credit' ? '-' : '+'}
                      </Text>
                    </Flex>
                  }
                  value={value}
                  ref={ref}
                  label={`Amount (${
                    txnType === 'credit' ? 'Borrowed' : 'Lent'
                  })`}
                  name={name}
                  error={error && error.message}
                  placeholder="0.00"
                />
              )}
            />

            <Controller
              name="description"
              render={({
                field: { onChange, onBlur, value, name, ref },
                fieldState: { error },
              }) => (
                <Textarea
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  ref={ref}
                  autosize
                  minRows={4}
                  label="Description"
                  name={name}
                  error={error && error.message}
                  placeholder="Description..."
                />
              )}
            />
            <Box>
              <Button
                disabled={loading}
                type="submit"
                leftIcon={<Plus size={'1rem'} />}
              >
                Add
              </Button>
            </Box>
          </Stack>
        </Form>
      </Modal>
      <Button onClick={open} leftIcon={<Plus size={'1rem'} />}>
        Add Transaction
      </Button>
    </>
  )
}

export default AddTransaction
