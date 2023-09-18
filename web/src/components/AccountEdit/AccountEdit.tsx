import { Box, ThemeIcon, Tooltip } from '@mantine/core'
import { motion } from 'framer-motion'
import { Pencil } from 'tabler-icons-react'
import { Account } from 'types/graphql'

interface AccountEditProps {
  account: Account
}

const AccountEdit = ({ account }: AccountEditProps) => {
  return (
    <>
      <Tooltip withArrow position="bottom" label="Edit Account">
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
      </Tooltip>
    </>
  )
}

export default AccountEdit
