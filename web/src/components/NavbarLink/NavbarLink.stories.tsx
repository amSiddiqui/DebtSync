// Pass props to your component by passing an `args` object to your story
//
// ```jsx
// export const Primary: Story = {
//  args: {
//    propName: propValue
//  }
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { Meta, StoryObj } from '@storybook/react'

import NavbarLink from './NavbarLink'

const meta: Meta<typeof NavbarLink> = {
  component: NavbarLink,
}

export default meta

type Story = StoryObj<typeof NavbarLink>

export const Primary: Story = {}
