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

import AccountCard from './AccountCard'

const meta: Meta<typeof AccountCard> = {
  component: AccountCard,
}

export default meta

type Story = StoryObj<typeof AccountCard>

export const Primary: Story = {}
