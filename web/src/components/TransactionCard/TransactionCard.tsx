import { Avatar, Group, Stack, Text, Tooltip } from '@mantine/core'
import dayjs from 'dayjs'
import { CurrencyPound } from 'tabler-icons-react'

import { TransactionResult } from '../TransactionsCell'

interface TractionCardProps {
  transaction: TransactionResult
}
const TransactionCard = ({ transaction }: TractionCardProps) => {
  return (
    <>
      <Group spacing={'lg'}>
        <Tooltip withArrow label={transaction.amount > 0 ? 'Lent' : 'Borrowed'}>
          <Avatar
            radius={'xl'}
            color={transaction.amount > 0 ? 'green' : 'red'}
          >
            {transaction.amount > 0 ? 'L' : 'B'}
          </Avatar>
        </Tooltip>

        <Stack spacing={0}>
          <Group>
            <Text
              sx={{
                fontWeight: 500,
                fontSize: '1.1rem',
              }}
            >
              {transaction.title}
            </Text>
            <Text c="dimmed">
              {dayjs(transaction.date).format('DD-MMM-YYYY')}
            </Text>
          </Group>

          <Group
            sx={{
              alignItems: 'end',
            }}
            spacing={5}
          >
            <CurrencyPound
              color={
                transaction.amount > 0
                  ? 'green'
                  : transaction.amount < 0
                  ? 'red'
                  : 'gray'
              }
              style={{
                marginBottom: '0.35rem',
              }}
              size={'0.8rem'}
            ></CurrencyPound>
            <Text
              color={
                transaction.amount > 0
                  ? 'green'
                  : transaction.amount < 0
                  ? 'red'
                  : 'inherit'
              }
            >
              {transaction.amount.toLocaleString('en-GB', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Text>
          </Group>
          {transaction.description && (
            <Text fz="sm">{transaction.description}</Text>
          )}
        </Stack>
      </Group>
    </>
  )
}

export default TransactionCard
