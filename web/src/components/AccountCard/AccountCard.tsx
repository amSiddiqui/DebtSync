import { Badge, Card, Group, Stack, Title, Text } from '@mantine/core'
import { motion } from 'framer-motion'
import { Account } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'

interface AccountCardProps {
  account: Account
}

const AccountCard = ({ account }: AccountCardProps) => {
  return (
    <Link
      style={{
        textDecoration: 'none',
        color: 'inherit',
      }}
      to={routes.account({ id: account.id })}
    >
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
        <Stack>
          <Group position="apart" mt="md" mb="xs">
            <Title order={4} weight={500}>
              {account.name}
            </Title>
            <Badge color="green" variant="light">
              {account.status}
            </Badge>
          </Group>
          <Group
            spacing={'xs'}
            sx={{
              alignItems: 'baseline',
            }}
          >
            <Text size={'lg'}>£</Text>
            <Title
              order={1}
              weight={500}
              color={account.balance < 0 ? 'red' : 'black'}
            >
              {account.balance.toLocaleString('en-GB', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Title>
          </Group>
        </Stack>
      </Card>
    </Link>
  )
}

export default AccountCard
