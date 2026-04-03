import {
  Coffee,
  ShoppingBag,
  Home,
  Car,
  DollarSign,
  Trash2,
} from "lucide-react";
import { useContext, useState } from "react";
import { TransactionDataContext } from "../contexts/TransactionContext";
import { Search, Filter } from "lucide-react";

const AllTransactions = () => {
  const {
    transactions,
    filteredTransactions,
    deleteTransaction,
    setSearchTerm,
    filter,
    setFilter,
    searchTerm,
  } = useContext(TransactionDataContext);

  const CATEGORIES = {
    Food: {
      icon: <Coffee size={16} />,
      color: "bg-orange-500",
      text: "text-orange-500",
    },
    Shopping: {
      icon: <ShoppingBag size={16} />,
      color: "bg-purple-500",
      text: "text-purple-500",
    },
    Housing: {
      icon: <Home size={16} />,
      color: "bg-blue-500",
      text: "text-blue-500",
    },
    Transport: {
      icon: <Car size={16} />,
      color: "bg-emerald-500",
      text: "text-emerald-500",
    },
    Other: {
      icon: <DollarSign size={16} />,
      color: "bg-slate-500",
      text: "text-slate-500",
    },
  };

  return (
    <div className="bg-white rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-gray-200 p-5">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Recent Transactions
      </h2>

      {/* filter and search */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-4 ">
        <div className="relative w-full md:w-64">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={16}
          />
          <input
            type="text"
            placeholder="Search transactions..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          <Filter size={16} className="text-gray-400 mr-2 shrink-0" />
          {["All", ...Object.keys(CATEGORIES)].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                filter === cat
                  ? "bg-indigo-600 text-white"
                  : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="divide-y space-y-2 relative">
        {`${transactions.length === 0 ? "No transactions yet. Start by adding a new transaction!" : ""}`}
        {filteredTransactions.length === 0 && (
          <p className="text-sm text-gray-500 text-center py-4">
            No matching transactions found 🔍
          </p>
        )}

        {filteredTransactions.map((transaction) => (
          <div
            key={transaction.id}
            className="transaction group flex items-center justify-between py-4 px-3 rounded-lg hover:bg-gray-50 transition hover:cursor-pointer"
          >
            {/* Left */}
            <div className="flex items-center gap-3">
              <div
                className={`p-2 rounded-lg text-white ${CATEGORIES[transaction.category].color}`}
              >
                {CATEGORIES[transaction.category].icon}
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-800">
                  {transaction.name}
                </h3>
                <span
                  className={`text-xs ${CATEGORIES[transaction.category].text}`}
                >
                  {transaction.category}
                </span>
              </div>
            </div>

            {/* Right */}
            <div className="flex items-center gap-3">
              {/* Amount */}
              <h3
                className={`text-sm font-semibold ${
                  transaction.amount < 0 ? "text-red-500" : "text-green-500"
                }`}
              >
                ${transaction.amount.toFixed(2)}
              </h3>

              <button
                onClick={() => deleteTransaction(transaction.id)}
                className="opacity-0 group-hover:opacity-100 transition duration-200 text-gray-400 hover:text-red-500 hover:scale-110 hover:cursor-pointer"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllTransactions;
