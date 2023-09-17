import {
  Avatar,
  Box,
  Center,
  Grid,
  Loader,
  Modal,
  Stack,
  Text,
  rem,
  useMantineTheme,
} from '@mantine/core'
import { ChevronRight } from 'tabler-icons-react'
import type { FindUserQuery, FindUserQueryVariables } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import { useAuth } from 'src/auth'

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
  const { userMetadata } = useAuth()
  const email = userMetadata ? userMetadata.email : ''

  return (
    <Grid>
      <Grid.Col span={2}>
        <Center h={'100%'} w={'100%'}>
          <Avatar radius="xl">{user.name[0]}</Avatar>
        </Center>
      </Grid.Col>
      <Grid.Col span={8}>
        <Box>
          <Text size="sm" weight={500}>
            {user.name}
          </Text>
          <Text color="dimmed" truncate size="xs">
            {email}
          </Text>
        </Box>
      </Grid.Col>
      <Grid.Col span={2}>
        <Center h={'100%'}>
          <ChevronRight size={rem(18)} />
        </Center>
      </Grid.Col>
    </Grid>
  )
}
