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

import AddTransaction from './AddTransaction'

const meta: Meta<typeof AddTransaction> = {
  component: AddTransaction,
}

export default meta

type Story = StoryObj<typeof AddTransaction>

export const Primary: Story = {}
