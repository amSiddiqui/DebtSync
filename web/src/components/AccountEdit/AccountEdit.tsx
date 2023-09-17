import { Box, ThemeIcon } from '@mantine/core'
import { motion } from 'framer-motion'
import { Pencil } from 'tabler-icons-react'
import { Account } from 'types/graphql'

interface AccountEditProps {
  account: Account
}

const AccountEdit = ({ account }: AccountEditProps) => {
  return (
    <>
      <Box
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
    </>
  )
}

export default AccountEdit
