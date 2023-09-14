import { Box, Button, Modal, Stack, TextInput } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { Plus } from 'tabler-icons-react'
import { Form, Controller, SubmitHandler } from '@redwoodjs/forms'

interface FormValues {
  name: string
}

const AddAccount = () => {
  const [opened, { open, close }] = useDisclosure(false)
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data)
  }
  return (
    <>
      <Modal opened={opened} onClose={close} title="Add Account">
        <Form onSubmit={onSubmit} config={{ mode: 'onBlur' }}>
          <Stack>
            <Controller
              name="name"
              rules={{
                required: {
                  value: true,
                  message: 'Please enter name',
                },
              }}
              render={({
                field: { onChange, onBlur, value, name, ref },
                fieldState: { error },
              }) => (
                <TextInput
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value ? value : ''}
                  ref={ref}
                  label="Name"
                  name={name}
                  error={error && error.message}
                  placeholder="Enter Account Name"
                />
              )}
            />

            <Box
              sx={{
                textAlign: 'right',
              }}
            >
              <Button type="submit" leftIcon={<Plus size={'1rem'} />}>Add</Button>
            </Box>
          </Stack>
        </Form>
      </Modal>
      <Button onClick={open} leftIcon={<Plus size={'1rem'} />}>
        Add Account
      </Button>
    </>
  )
}

export default AddAccount
