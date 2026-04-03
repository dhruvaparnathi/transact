import { useState } from "react";
import { createContext } from "react";

export const TransactionDataContext = createContext();

const TransactionContext = ({ children }) => {
    const [transactions, setTransactions] = useState([
    { id: 1, name: "Weekly Groceries", amount: -15.99, category: "Food" },
    { id: 2, name: "Salary", amount: 1000.0, category: "Other" },
    { id: 3, name: "Gas", amount: -40.0, category: "Transport" },
    { id: 4, name: "New Shoes", amount: -89.99, category: "Shopping" },
    { id: 5, name: "Rent", amount: -800.0, category: "Housing" },
  ]);

    const [filter, setFilter] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredTransactions = transactions.filter((t) => {
  const matchesCategory = filter === "All" || t.category === filter;

  const matchesSearch =
    t.name.toLowerCase().includes(searchTerm.toLowerCase());

  return matchesCategory && matchesSearch;
});


  const deleteTransaction = (id) => {
    setTransactions((prev) =>
      prev.filter((transaction) => transaction.id !== id),
    );
  };

  const addTransaction = (newTransaction) => {
    setTransactions((prev) => [{ id: Date.now(), ...newTransaction }, ...prev]);
  };

  return (
    <TransactionDataContext.Provider
      value={{ transactions, setTransactions, addTransaction, deleteTransaction, filter, setFilter, searchTerm, setSearchTerm ,filteredTransactions}}
    >
      {children}
    </TransactionDataContext.Provider>
  );
};

export default TransactionContext;
