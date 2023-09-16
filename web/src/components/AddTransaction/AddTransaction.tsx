import { Button, Modal, Stack } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { Plus } from 'tabler-icons-react'

import { Form } from '@redwoodjs/forms'
import { Toaster } from '@redwoodjs/web/dist/toast'

interface AddTransactionProps {
  accountId: number
}

const AddTransaction = ({ accountId }: AddTransactionProps) => {
  const [opened, { open, close }] = useDisclosure(false)
  console.log({ accountId })
  return (
    <>
      <Toaster />
      <Modal opened={opened} onClose={close} title="Add Transaction">
        <Form config={{ mode: 'onBlur' }}>
          <Stack></Stack>
        </Form>
      </Modal>
      <Button onClick={open} leftIcon={<Plus size={'1rem'} />}>
        Add Transaction
      </Button>
    </>
  )
}

export default AddTransaction
