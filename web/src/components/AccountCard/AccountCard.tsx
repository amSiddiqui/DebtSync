import {
  Badge,
  Card,
  Group,
  Stack,
  Title,
  Text,
  useMantineTheme,
} from '@mantine/core'
import { motion } from 'framer-motion'
import { CurrencyPound } from 'tabler-icons-react'
import { Account } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'

interface AccountCardProps {
  account: Account
}

const AccountCard = ({ account }: AccountCardProps) => {
  const theme = useMantineTheme()

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
            <Badge variant="light">{account.status}</Badge>
          </Group>
          <Group
            sx={{
              alignItems: 'end',
            }}
          >
            <Group
              spacing={0}
              sx={{
                alignItems: 'end',
              }}
            >
              <CurrencyPound
                color={
                  account.balance < 0
                    ? theme.colors.red[8]
                    : theme.colors.green[8]
                }
                style={{
                  marginBottom: '0.4rem',
                }}
              />
              <Title
                order={1}
                color={
                  account.balance < 0
                    ? theme.colors.red[8]
                    : theme.colors.green[8]
                }
                weight={500}
              >
                {account.balance.toLocaleString('en-GB', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </Title>
            </Group>
            <Text
              fz="sm"
              sx={{
                marginBottom: '0.4rem',
              }}
            >
              ({account.balance > 0 ? 'They owe you' : 'You owe them'} )
            </Text>
          </Group>
        </Stack>
      </Card>
    </Link>
  )
}

export default AccountCard
