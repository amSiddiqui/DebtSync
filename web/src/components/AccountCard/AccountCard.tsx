import { Badge, Card, Group, Title } from '@mantine/core'
import { Account } from 'types/graphql'

interface AccountCardProps {
  account: Account
}

const AccountCard = ({ account }: AccountCardProps) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Group position="apart" mt="md" mb="xs">
        <Title order={4} weight={500}>
          {account.name}
        </Title>
        <Badge color="green" variant="light">
          {account.status}
        </Badge>
      </Group>
    </Card>
  )
}

export default AccountCard
