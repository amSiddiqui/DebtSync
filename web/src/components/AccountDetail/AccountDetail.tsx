import {
  Stack,
  Title,
  Flex,
  Group,
  Badge,
  Text,
  Grid,
  Center,
  useMantineTheme,
} from '@mantine/core'
import { ChevronLeft, CurrencyPound } from 'tabler-icons-react'
import { Account } from 'types/graphql'

import { routes, Link } from '@redwoodjs/router'

import AccountEdit from '../AccountEdit/AccountEdit'

interface AccountDetailProps {
  account: Account
}

const AccountDetail = ({ account }: AccountDetailProps) => {
  const theme = useMantineTheme()
  const color =
    account.status == 'active'
      ? account.balance < 0
        ? 'red'
        : 'green'
      : 'grey'
  return (
    <Stack>
      <Grid>
        <Grid.Col span={10}>
          <Group spacing={'sm'}>
            <Link to={routes.home()}>
              <Center h={'100%'}>
                <ChevronLeft
                  style={{
                    marginTop: '0.2rem',
                  }}
                  color={theme.colors.blue[5]}
                />
              </Center>
            </Link>

            <Title>{account.name}</Title>
            <Badge color={account.status === 'active' ? 'blue' : 'red'}>
              {account.status}
            </Badge>
          </Group>
        </Grid.Col>
        <Grid.Col span={2}>
          <Center h={'100%'}>
            <AccountEdit account={account} />
          </Center>
        </Grid.Col>
      </Grid>
      <Group align="end">
        <Group>
          <Flex align={'end'}>
            <CurrencyPound
              style={{
                marginBottom: '0.4rem',
              }}
              color={color}
            />
            <Title color={color}>
              {account.balance.toLocaleString('en-GB', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Title>
          </Flex>
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
  )
}

export default AccountDetail
