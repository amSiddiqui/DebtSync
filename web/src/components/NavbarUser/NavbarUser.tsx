import React from 'react'

import { UnstyledButton, Box, useMantineTheme, rem, Menu } from '@mantine/core'
import { Logout, Settings } from 'tabler-icons-react'

import UserCell from 'src/components/UserCell'

interface NavbarUserProps {
  id: string
  logOutCallback?: () => void
}

export function NavbarUser({ id, logOutCallback }: NavbarUserProps) {
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
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <UnstyledButton
            sx={{
              display: 'block',
              width: '100%',
              padding: theme.spacing.xs,
              borderRadius: theme.radius.sm,
              color:
                theme.colorScheme === 'dark'
                  ? theme.colors.dark[0]
                  : theme.black,

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
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label>Profile</Menu.Label>
          <Menu.Item icon={<Settings size={14} />}>Settings</Menu.Item>
          <Menu.Item
            onClick={() => {
              logOutCallback && logOutCallback()
            }}
            icon={<Logout size={14} />}
          >
            Log Out
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Box>
  )
}
