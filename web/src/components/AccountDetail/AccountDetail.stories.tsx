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
import { Account } from 'types/graphql'

import AccountDetail from './AccountDetail'

const meta: Meta<typeof AccountDetail> = {
  component: AccountDetail,
}

export default meta

type Story = StoryObj<typeof AccountDetail>

export const Primary: Story = {
  args: {
    account: {
      id: 1,
      name: 'Personal',
      status: 'active',
      balance: 1000,
    } as Account,
  },
}
