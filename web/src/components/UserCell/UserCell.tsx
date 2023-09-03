import { Loader, Modal, Stack, Text, useMantineTheme } from '@mantine/core'
import type { FindUserQuery, FindUserQueryVariables } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import NewUserModal from '../NewUserModal/NewUserModal'

export const QUERY = gql`
  query FindUserQuery($id: String!) {
    user: user(id: $id) {
      id
      name
    }
  }
`

export const Loading = () => {
  const theme = useMantineTheme()
  return (
    <Modal
      opened={true}
      onClose={() => {}}
      withCloseButton={false}
      closeOnClickOutside={false}
      closeOnEscape={false}
      overlayProps={{
        color:
          theme.colorScheme === 'dark'
            ? theme.colors.dark[9]
            : theme.colors.gray[2],
        opacity: 0.55,
        blur: 3,
      }}
    >
      <Stack
        sx={{
          height: '10rem',
        }}
        justify="center"
        align="center"
      >
        <Text>Getting things ready</Text>
        <Loader variant="dots" />
      </Stack>
    </Modal>
  )
}

export const Empty = () => <NewUserModal />

export const Failure = ({
  error,
}: CellFailureProps<FindUserQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  user,
}: CellSuccessProps<FindUserQuery, FindUserQueryVariables>) => {
  return <div>{user.name}</div>
}
