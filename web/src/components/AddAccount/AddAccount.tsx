import {
  Box,
  Button,
  Modal,
  NumberInput,
  Stack,
  Text,
  TextInput,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { Plus } from 'tabler-icons-react'
import {
  CreateAccountMutation,
  CreateAccountMutationVariables,
} from 'types/graphql'

import { Form, Controller, SubmitHandler, useForm } from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'
import { Toaster, toast } from '@redwoodjs/web/dist/toast'

import { useAuth } from 'src/auth'
import { QUERY as AccountsQuery } from 'src/components/AccountsCell/AccountsCell'

const CREATE_ACCOUNT_MUTATION = gql`
  mutation CreateAccountMutation($input: CreateAccountInput!) {
    createAccount(input: $input) {
      id
    }
  }
`

interface FormValues {
  name: string
  balance: number
}

const AddAccount = () => {
  const [opened, { open, close }] = useDisclosure(false)
  const formMethods = useForm<FormValues>({
    defaultValues: {
      name: '',
      balance: 0,
    },
  })

  const { userMetadata } = useAuth()

  const [create, { loading, error }] = useMutation<
    CreateAccountMutation,
    CreateAccountMutationVariables
  >(CREATE_ACCOUNT_MUTATION, {
    onCompleted: () => {
      toast.success('Account Created')
      close()
      formMethods.reset()
    },
    refetchQueries: [
      { query: AccountsQuery, variables: { userId: userMetadata.sub } },
    ],
  })

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    if (!userMetadata) {
      toast.error('Not Authenticated. Please login again')
    } else {
      create({
        variables: {
          input: {
            name: data.name,
            status: 'active',
            userId: userMetadata.sub,
            balance: data.balance,
          },
        },
      })
    }
  }
  return (
    <>
      <Toaster />
      <Modal opened={opened} onClose={close} title="Add Debt Account">
        <Form
          formMethods={formMethods}
          onSubmit={onSubmit}
          config={{ mode: 'onBlur' }}
          error={error}
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
              name="name"
              rules={{
                required: {
                  value: true,
                  message: 'Please enter name',
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
                  value={value ? value : ''}
                  ref={ref}
                  label="Name"
                  name={name}
                  error={error && error.message}
                  placeholder="Enter Account Name"
                />
              )}
            />
            <Controller
              name="balance"
              render={({
                field: { onChange, onBlur, value, name, ref },
                fieldState: { error },
              }) => (
                <NumberInput
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value ? value : ''}
                  ref={ref}
                  label="Initial Balance"
                  name={name}
                  error={error && error.message}
                  placeholder="0.0"
                />
              )}
            />

            <Box
              sx={{
                textAlign: 'right',
              }}
            >
              <Button type="submit" leftIcon={<Plus size={'1rem'} />}>
                Add
              </Button>
            </Box>
          </Stack>
        </Form>
      </Modal>
      <Button
        disabled={loading}
        onClick={open}
        leftIcon={<Plus size={'1rem'} />}
      >
        Add Debt Account
      </Button>
    </>
  )
}

export default AddAccount
