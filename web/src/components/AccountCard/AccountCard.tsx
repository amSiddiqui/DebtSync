import { Badge, Card, Group, Title } from '@mantine/core'
import { motion } from 'framer-motion'
import { Account } from 'types/graphql'

interface AccountCardProps {
  account: Account
}

const AccountCard = ({ account }: AccountCardProps) => {
  return (
    <Card
      component={motion.div}
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.99 }}
      sx={{
        cursor: 'pointer',
      }}
    >
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
