export const standard = () => ({
  accountTransactions: [
    {
      id: 1,
      amount: 1000,
      debit: true,
      title: 'Salary',
      description: 'Monthly salary payment',
      createdAt: '2022-01-01T00:00:00Z',
    },
    {
      id: 2,
      amount: -500,
      debit: false,
      title: 'Rent',
      description: 'Monthly rent payment',
      createdAt: '2022-01-02T00:00:00Z',
    },
    {
      id: 3,
      amount: 2500,
      debit: true,
      title: 'Bonus',
      description: 'Year-end bonus payment',
      createdAt: '2022-01-03T00:00:00Z',
    },
    {
      id: 4,
      amount: -1000,
      debit: false,
      title: 'Credit Card Payment',
      description: 'Monthly credit card payment',
      createdAt: '2022-01-04T00:00:00Z',
    },
  ],
})
