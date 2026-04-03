import Navbar from './components/Navbar'
import Balance from './components/Balance'
import AllTransactions from './components/AllTransactions'
import NewTransaction from './components/NewTransaction'
import { useState } from 'react'

const App = () => {

  const [isNewTransactionOpen, setIsNewTransactionOpen] = useState(false);

  return (
  <>
    <Navbar setOpenNew={setIsNewTransactionOpen} />
    <div className="max-w-6xl mx-auto px-6 py-6 space-y-6">
      <Balance />
      <AllTransactions />
    </div>
    {
      isNewTransactionOpen && <NewTransaction setShowModal={setIsNewTransactionOpen} />
    }
  </>
)
}

export default App
