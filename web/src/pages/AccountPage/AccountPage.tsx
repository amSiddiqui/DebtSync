import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import TransactionsCell from 'src/components/TransactionsCell'

type AccountPageProps = {
  id: number
}

const AccountPage = ({ id }: AccountPageProps) => {
  return (
    <>
      <MetaTags title="Account" description="Account page" />

      <h1>AccountPage</h1>
      <p>
        Find me in <code>./web/src/pages/AccountPage/AccountPage.tsx</code>
      </p>
      <p>
        My default route is named <code>account</code>, link to me with `
        <Link to={routes.account({ id: 2 })}>Account</Link>`
        <TransactionsCell accountId={id} />
      </p>
    </>
  )
}

export default AccountPage
