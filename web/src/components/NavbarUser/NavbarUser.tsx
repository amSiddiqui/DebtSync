import React from 'react'

import { UnstyledButton, Box, useMantineTheme, rem } from '@mantine/core'

import UserCell from 'src/components/UserCell'

interface NavbarUserProps {
  id: string
}

export function NavbarUser({ id }: NavbarUserProps) {
  const theme = useMantineTheme()

  return (
    <Box
      sx={{
        paddingTop: theme.spacing.sm,
        borderTop: `${rem(1)} solid ${
          theme.colorScheme === 'dark'
            ? theme.colors.dark[4]
            : theme.colors.gray[2]
        }`,
      }}
    >
      <UnstyledButton
        sx={{
          display: 'block',
          width: '100%',
          padding: theme.spacing.xs,
          borderRadius: theme.radius.sm,
          color:
            theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

          '&:hover': {
            backgroundColor:
              theme.colorScheme === 'dark'
                ? theme.colors.dark[6]
                : theme.colors.gray[0],
          },
        }}
      >
        <UserCell id={id} />
      </UnstyledButton>
    </Box>
  )
}
