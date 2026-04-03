import { useState, useContext, useEffect } from "react";
import { X } from "lucide-react";
import { TransactionDataContext } from "../contexts/TransactionContext";

const NewTransaction = ({ setShowModal }) => {
    useEffect(() => {
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

  document.body.style.overflow = "hidden";
  document.body.style.paddingRight = `${scrollbarWidth}px`;

  return () => {
    document.body.style.overflow = "auto";
    document.body.style.paddingRight = "0px";
  };
}, []);


  const { addTransaction } = useContext(TransactionDataContext);

  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    category: "Food",
    type: "expense",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const amount =
      formData.type === "expense"
        ? -Math.abs(Number(formData.amount))
        : Math.abs(Number(formData.amount));

    addTransaction({
      name: formData.name,
      amount,
      category: formData.category,
    });

    setShowModal(false);
  };

  return (
    <div
      onClick={() => setShowModal(false)}
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl"
      >

        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold">New Transaction</h2>
          <button 
          className="hover:cursor-pointer rounded-full hover:bg-gray-200"
          onClick={() => setShowModal(false)}>
            <X />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Type toggle */}
          <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, type: "expense" })}
              className={`flex-1 py-2 rounded-md hover:cursor-pointer ${
                formData.type === "expense"
                  ? "bg-red-500 text-white shadow"
                  : "text-gray-500"
              }`}
            >
              Expense
            </button>

            <button
              type="button"
              onClick={() => setFormData({ ...formData, type: "income" })}
              className={`flex-1 py-2 rounded-md hover:cursor-pointer ${
                formData.type === "income"
                  ? "bg-green-500 text-white shadow"
                  : "text-gray-500"
              }`}
            >
              Income
            </button>
          </div>

          {/* Name */}
          <h4 className="text-sm font-medium text-gray-700">Transaction Name</h4>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Salary, Groceries, Rent"
            className="w-full px-4 py-2 border rounded-lg"
            required
          />

          {/* Amount */}
          <h4 className="text-sm font-medium text-gray-700">Amount</h4>
          <input
            name="amount"
            type="number"
            value={formData.amount}
            onChange={handleChange}
            placeholder="$ e.g. 100.00"
            className="w-full px-4 py-2 border rounded-lg"
            required
          />

          {/* Category */}
          <h4 className="text-sm font-medium text-gray-700">Category</h4>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Shopping">Shopping</option>
            <option value="Housing">Housing</option>
            <option value="Other">Other</option>
          </select>

          {/* Submit */}
          <button className="w-full py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition hover:cursor-pointer">
            Add Transaction
          </button>

        </form>
      </div>
    </div>
  );
};

export default NewTransaction;