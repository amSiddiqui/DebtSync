import {
  Box,
  Modal,
  ThemeIcon,
  Tooltip,
  Stack,
  Text,
  TextInput,
  Button,
  Group,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { motion } from 'framer-motion'
import { DeviceFloppy, Pencil, Power, Trash } from 'tabler-icons-react'
import { Account } from 'types/graphql'
import {
  UpdateAccountMutation,
  UpdateAccountMutationVariables,
  DeleteAccountMutation,
  DeleteAccountMutationVariables,
} from 'types/graphql'

import { Form, Controller, SubmitHandler, useForm } from '@redwoodjs/forms'
import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'

import { QUERY as AccountsQuery } from 'src/components/AccountNameCell/AccountNameCell'
interface AccountEditProps {
  account: Account
}

const UPDATE_ACCOUNT_MUTATION = gql`
  mutation UpdateAccountMutation($input: UpdateAccountInput!, $id: Int!) {
    updateAccount(input: $input, id: $id) {
      id
    }
  }
`

const DELETE_ACCOUNT_MUTATION = gql`
  mutation DeleteAccountMutation($id: Int!) {
    deleteAccount(id: $id) {
      id
    }
  }
`

interface FormValues {
  name: string
}

const AccountEdit = ({ account }: AccountEditProps) => {
  const [opened, { open, close }] = useDisclosure(false)
  const [toggleActive, setToggleActive] = React.useState(false)

  const [update, { loading, error }] = useMutation<
    UpdateAccountMutation,
    UpdateAccountMutationVariables
  >(UPDATE_ACCOUNT_MUTATION, {
    onCompleted: () => {
      if (toggleActive) {
        if (account.status === 'active') {
          toast.success('Account Deactivated')
        } else {
          toast.success('Account Activated')
        }
      } else {
        toast.success('Account Updated')
      }
      close()
    },
    refetchQueries: [{ query: AccountsQuery, variables: { id: account.id } }],
  })

  const [deleteAccount, { loading: loadingDelete, error: errorDelete }] =
    useMutation<DeleteAccountMutation, DeleteAccountMutationVariables>(
      DELETE_ACCOUNT_MUTATION,
      {
        onCompleted: () => {
          toast.success('Account Deleted')
          close()
          navigate(routes.home())
        },
        refetchQueries: [
          { query: AccountsQuery, variables: { id: account.id } },
        ],
      }
    )

  const formMethods = useForm<FormValues>({
    defaultValues: {
      name: account.name,
    },
  })

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    update({
      variables: {
        id: account.id,
        input: toggleActive
          ? { status: account.status === 'active' ? 'inactive' : 'active' }
          : {
              name: data.name,
            },
      },
    })
  }
  return (
    <>
      <Tooltip withArrow position="bottom" label="Edit Debt Account">
        <Box
          onClick={open}
          component={motion.div}
          whileHover={{
            scale: 1.2,
          }}
          whileTap={{
            scale: 0.9,
          }}
        >
          <ThemeIcon
            style={{
              cursor: 'pointer',
            }}
            radius={'xl'}
            size={'md'}
          >
            <Pencil size={'1rem'} />
          </ThemeIcon>
        </Box>
      </Tooltip>
      <Modal opened={opened} onClose={close} title="Edit Debt Account">
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
            {errorDelete && (
              <Text
                sx={{
                  color: 'red',
                }}
              >
                {errorDelete.message}
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
            <Group
              style={{
                justifyContent: 'space-between',
              }}
            >
              <Box>
                <Button
                  disabled={loading}
                  type="submit"
                  leftIcon={<DeviceFloppy size="1rem" />}
                >
                  Save
                </Button>
              </Box>
              <Box>
                {account.status === 'active' && (
                  <Button
                    type="submit"
                    color="red"
                    disabled={loading || loadingDelete}
                    onClick={() => setToggleActive(true)}
                    leftIcon={<Power size="1rem" />}
                  >
                    Deactivate
                  </Button>
                )}
                {account.status !== 'active' && (
                  <Group>
                    <Button
                      type="submit"
                      color="green"
                      disabled={loading || loadingDelete}
                      onClick={() => setToggleActive(true)}
                      leftIcon={<Power size="1rem" />}
                    >
                      Activate
                    </Button>
                    <Button
                      leftIcon={<Trash size="1rem" />}
                      color="red"
                      disabled={loading || loadingDelete}
                      onClick={() => {
                        deleteAccount({
                          variables: {
                            id: account.id,
                          },
                        })
                      }}
                      type="button"
                    >
                      Delete
                    </Button>
                  </Group>
                )}
              </Box>
            </Group>
          </Stack>
        </Form>
      </Modal>
    </>
  )
}

export default AccountEdit
