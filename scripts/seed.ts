import type { Prisma } from '@prisma/client'
import { db } from 'api/src/lib/db'

export default async () => {
  try {
    const data: Prisma.UserCreateInput[] = [
      {
        id: 'auth0|64f32710e2c29ce3479bef7f',
        name: 'aamir_siddiqui17@yahoo.com',
        email: 'john.doe@example.com',
        accounts: {
          create: [
            {
              name: 'Savings Account',
              balance: 1000,
              status: 'active',
              Transaction: {
                create: [
                  {
                    title: 'Initial Deposit',
                    description: 'Deposit of $1000',
                    amount: 1000,
                    debit: false,
                  },
                  {
                    title: 'Grocery Shopping',
                    description: 'Bought groceries for $50',
                    amount: 50,
                    debit: true,
                  },
                  {
                    title: 'Gas Station',
                    description: 'Filled up gas for $30',
                    amount: 30,
                    debit: true,
                  },
                ],
              },
            },
            {
              name: 'Checking Account',
              balance: 500,
              status: 'active',
              Transaction: {
                create: [
                  {
                    title: 'Initial Deposit',
                    description: 'Deposit of $500',
                    amount: 500,
                    debit: false,
                  },
                  {
                    title: 'Rent Payment',
                    description: 'Paid rent for $1000',
                    amount: 1000,
                    debit: true,
                  },
                  {
                    title: 'Electricity Bill',
                    description: 'Paid electricity bill for $50',
                    amount: 50,
                    debit: true,
                  },
                ],
              },
            },
          ],
        },
      },
    ]

    console.log('Seeding database...')

    await Promise.all(
      data.map(async (user) => {
        const record = await db.user.create({ data: user })
        console.log(`Created user with id: ${record.id}`)
      })
    )

    console.log('Database seeding complete.')
  } catch (error) {
    console.error('Error seeding database:', error)
  }
}
