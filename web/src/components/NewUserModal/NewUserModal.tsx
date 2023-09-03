import {
  Box,
  Button,
  Modal,
  Stack,
  TextInput,
  Title,
  useMantineTheme,
} from '@mantine/core'
import { CreateUserMutation, CreateUserMutationVariables } from 'types/graphql'

import { Controller, Form, SubmitHandler } from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import { QUERY as UserQuery } from 'src/components/UserCell/UserCell'

const CREATE_USER = gql`
  mutation CreateUserMutation($input: CreateUserInput!) {
    createUser(input: $input) {
      id
    }
  }
`

interface UserFormValues {
  name: string
}

const NewUserModal = () => {
  const { userMetadata } = useAuth()

  console.log({ userMetadata })

  const [showModal, setShowModal] = React.useState(true)

  const [create, { loading, error }] = useMutation<
    CreateUserMutation,
    CreateUserMutationVariables
  >(CREATE_USER, {
    onCompleted: () => {},
    refetchQueries: [
      { query: UserQuery, variables: { id: userMetadata?.sub } },
    ],
  })

  const theme = useMantineTheme()

  const onSubmit: SubmitHandler<UserFormValues> = (data) => {
    create({
      variables: {
        input: {
          id: userMetadata?.sub,
          name: data.name,
          email: userMetadata?.email,
        },
      },
    })
  }

  return (
    <Modal
      onClose={() => {
        setShowModal(false)
      }}
      withCloseButton={false}
      opened={showModal}
      closeOnClickOutside={false}
      overlayProps={{
        color:
          theme.colorScheme === 'dark'
            ? theme.colors.dark[9]
            : theme.colors.gray[2],
        opacity: 0.55,
        blur: 3,
      }}
    >
      <Form error={error} onSubmit={onSubmit} config={{ mode: 'onBlur' }}>
        <Stack>
          <Title order={4}>Complete your profile to continue</Title>
          <Controller
            name="name"
            rules={{
              required: {
                value: true,
                message: 'Name is required',
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
                name={name}
                withAsterisk
                placeholder="Enter your name"
                label="Name"
                error={error?.message}
              />
            )}
          />
          <Box>
            <Button type="submit" disabled={loading}>
              Submit
            </Button>
          </Box>
        </Stack>
      </Form>
    </Modal>
  )
}

export default NewUserModal
