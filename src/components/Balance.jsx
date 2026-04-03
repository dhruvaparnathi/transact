import { TrendingUp, TrendingDown, DollarSign } from "lucide-react";
import { useContext } from "react";
import { TransactionDataContext } from "../contexts/TransactionContext";

const Balance = () => {

    const { transactions } = useContext(TransactionDataContext);
    const totalIncome = transactions
      .filter(transaction => transaction.amount > 0)
      .reduce((sum, transaction) => sum + transaction.amount, 0);
    
    const totalExpense = transactions
      .filter(transaction => transaction.amount < 0)
      .reduce((sum, transaction) => sum + transaction.amount, 0);



  return (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">


    {/* Income */}
    <div className="bg-green-50 rounded-2xl p-6 min-h-[110px] shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-green-100">
      <div className="flex items-center justify-between">
        <h3 className="text-sm text-green-700">Income</h3>
        <TrendingUp className="text-green-600" size={18} />
      </div>
      <h2 className="text-2xl font-bold mt-3 text-green-700">$ {totalIncome.toFixed(2)}</h2>
    </div>

    {/* Balance */}
    <div className="bg-white rounded-2xl p-6 min-h-[110px] shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-gray-200">
      <div className="flex items-center justify-between">
        <h3 className="text-sm text-gray-500">Total Balance</h3>
        <DollarSign size={18} />
      </div>
      <h2 className="text-2xl font-bold mt-3">$ {(totalIncome + totalExpense).toFixed(2)}</h2>
    </div>

    {/* Expense */}
    <div className="bg-red-50 rounded-2xl p-6 min-h-[110px] shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-red-100">
      <div className="flex items-center justify-between">
        <h3 className="text-sm text-red-700">Expense</h3>
        <TrendingDown className="text-red-600" size={18} />
      </div>
      <h2 className="text-2xl font-bold mt-3 text-red-700">$ {Math.abs(totalExpense).toFixed(2)}</h2>
    </div>

  </div>
)
};

export default Balance;
