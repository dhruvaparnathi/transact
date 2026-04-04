import { useState } from "react";
import { createContext } from "react";

export const TransactionDataContext = createContext();

const TransactionContext = ({ children }) => {
    const [transactions, setTransactions] = useState(
      localStorage.getItem("transactions")
        ? JSON.parse(localStorage.getItem("transactions"))
        : [
    { id: 1, name: "Demo - Weekly Groceries", amount: -15.99, category: "Food" },
    { id: 2, name: "Demo - Salary", amount: 1000.0, category: "Other" },
    { id: 3, name: "Demo - Gas", amount: -40.0, category: "Transport" },
    { id: 4, name: "Demo - New Shoes", amount: -89.99, category: "Shopping" },
    { id: 5, name: "Demo - Rent", amount: -800.0, category: "Housing" },
  ]
    );

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
    {
      const updatedTransactions = prev.filter((transaction) => transaction.id !== id);
      localStorage.setItem("transactions", JSON.stringify(updatedTransactions));
      return updatedTransactions;
  });
  };

  const addTransaction = (newTransaction) => {
    setTransactions((prev) => {
      const updatedTransactions = [newTransaction, ...prev];
      localStorage.setItem("transactions", JSON.stringify(updatedTransactions));
      return updatedTransactions;
    });
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
