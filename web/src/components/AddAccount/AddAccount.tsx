import { Box, Button, Modal, Stack, TextInput } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { Plus } from 'tabler-icons-react'
import {
  CreateAccountMutation,
  CreateAccountMutationVariables,
} from 'types/graphql'

import { Form, Controller, SubmitHandler } from '@redwoodjs/forms'
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
}

const AddAccount = () => {
  const [opened, { open, close }] = useDisclosure(false)

  const { userMetadata } = useAuth()

  const [create, { loading, error }] = useMutation<
    CreateAccountMutation,
    CreateAccountMutationVariables
  >(CREATE_ACCOUNT_MUTATION, {
    onCompleted: () => {
      toast.success('Account Created')
      close()
    },
    refetchQueries: [{ query: AccountsQuery }],
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
            balance: 0,
          },
        },
      })
    }
  }
  return (
    <>
      <Toaster />
      <Modal opened={opened} onClose={close} title="Add Account">
        <Form onSubmit={onSubmit} config={{ mode: 'onBlur' }} error={error}>
          <Stack>
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
                  value={value ? value : ''}
                  ref={ref}
                  label="Name"
                  name={name}
                  error={error && error.message}
                  placeholder="Enter Account Name"
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
        Add Account
      </Button>
    </>
  )
}

export default AddAccount
