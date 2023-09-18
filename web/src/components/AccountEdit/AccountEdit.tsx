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
import { DeviceFloppy, Pencil, Power } from 'tabler-icons-react'
import { Account } from 'types/graphql'
import {
  UpdateAccountMutation,
  UpdateAccountMutationVariables,
} from 'types/graphql'

import { Form, Controller, SubmitHandler, useForm } from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'
import { Toaster, toast } from '@redwoodjs/web/dist/toast'

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

interface FormValues {
  name: string
}

const AccountEdit = ({ account }: AccountEditProps) => {
  const [opened, { open, close }] = useDisclosure(false)
  const [deactivate, setDeactivate] = React.useState(false)

  const [update, { loading, error }] = useMutation<
    UpdateAccountMutation,
    UpdateAccountMutationVariables
  >(UPDATE_ACCOUNT_MUTATION, {
    onCompleted: () => {
      if (deactivate) {
        toast.success('Account Deactivated')
      } else {
        toast.success('Account Updated')
      }
      close()
    },
    refetchQueries: [{ query: AccountsQuery, variables: { id: account.id } }],
  })

  const formMethods = useForm<FormValues>({
    defaultValues: {
      name: account.name,
    },
  })

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    update({
      variables: {
        id: account.id,
        input: deactivate
          ? { status: 'inactive' }
          : {
              name: data.name,
            },
      },
    })
  }
  return (
    <>
      <Toaster />
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
                <Button
                  type="submit"
                  color="red"
                  onClick={() => setDeactivate(true)}
                  leftIcon={<Power size="1rem" />}
                >
                  Deactivate
                </Button>
              </Box>
            </Group>
          </Stack>
        </Form>
      </Modal>
    </>
  )
}

export default AccountEdit
