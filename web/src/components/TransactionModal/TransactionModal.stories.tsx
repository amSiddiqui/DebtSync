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

import TransactionModal from './TransactionModal'

const meta: Meta<typeof TransactionModal> = {
  component: TransactionModal,
}

export default meta

type Story = StoryObj<typeof TransactionModal>

export const Primary: Story = {}
