import { ApolloError } from '@apollo/client'
import {
  Box,
  Button,
  Center,
  Flex,
  Indicator,
  Modal,
  NumberInput,
  SegmentedControl,
  Stack,
  Text,
  TextInput,
  Textarea,
  useMantineTheme,
} from '@mantine/core'
import { DatePickerInput } from '@mantine/dates'
import dayjs from 'dayjs'
import {
  Calendar,
  CurrencyPound,
  LetterT,
  Plus,
  TrendingDown,
  TrendingUp,
} from 'tabler-icons-react'

import { Controller, Form, useForm } from '@redwoodjs/forms'

export interface FormValues {
  title: string
  amount: number
  description: string
  date: Date
}

interface TransactionModalProps {
  opened: boolean
  close: () => void
  onSubmit: (data: FormValues, txnType: string) => void
  loading: boolean
  error: ApolloError
  defaultValues: FormValues
  isEdit: boolean
  initialTxnType?: 'credit' | 'debit'
}

const TransactionModal = ({
  opened,
  close,
  onSubmit,
  loading,
  error,
  defaultValues,
  isEdit,
  initialTxnType,
}: TransactionModalProps) => {
  const [txnType, setTxnType] = React.useState<'credit' | 'debit'>(
    initialTxnType ? initialTxnType : 'credit'
  )
  const theme = useMantineTheme()

  const formMethods = useForm<FormValues>({
    defaultValues: defaultValues,
  })

  return (
    <Modal
      size={'lg'}
      opened={opened}
      onClose={close}
      title={<Text>{isEdit ? 'Edit' : 'Add'} Transaction</Text>}
    >
      <Form
        onSubmit={(data) => {
          onSubmit(data, txnType)
        }}
        error={error}
        formMethods={formMethods}
      >
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
              <DatePickerInput
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
                renderDay={(date) => {
                  return (
                    <Indicator
                      size={6}
                      color="red"
                      offset={-5}
                      disabled={!dayjs(date).isSame(dayjs(), 'day')}
                    >
                      <div>{date.getDate()}</div>
                    </Indicator>
                  )
                }}
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
                label={`Amount (${txnType === 'credit' ? 'Borrowed' : 'Lent'})`}
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
              {isEdit ? 'Edit' : 'Add'}
            </Button>
          </Box>
        </Stack>
      </Form>
    </Modal>
  )
}

export default TransactionModal
