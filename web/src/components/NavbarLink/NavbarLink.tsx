import { Group, ThemeIcon, UnstyledButton, Text } from '@mantine/core'

import { Link } from '@redwoodjs/router'

interface Props {
  color: string
  icon: React.ReactNode
  label: string
  to: string
}

const NavbarLink = ({ color, icon, label, to }: Props) => {
  return (
    <Link
      style={{
        textDecoration: 'none',
        color: 'inherit',
      }}
      to={to}
    >
      <UnstyledButton
        sx={(theme) => ({
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
        })}
      >
        <Group>
          <ThemeIcon color={color} variant="light">
            {icon}
          </ThemeIcon>

          <Text size="sm">{label}</Text>
        </Group>
      </UnstyledButton>
    </Link>
  )
}

export default NavbarLink
