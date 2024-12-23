import React, { useState } from "react";
import toast from "react-hot-toast";

const SalaryPage = ({ isAdmin }) => {
    const [transactions, setTransactions] = useState([
        { id: 1, type: "Credit", amount: 5000, date: "2024-12-01", details: "Salary for December" },
        { id: 2, type: "Debit", amount: 1000, date: "2024-12-05", details: "Advance Payment" },
        { id: 3, type: "Credit", amount: 4500, date: "2024-11-01", details: "Salary for November" },
        { id: 4, type: "Debit", amount: 500, date: "2024-11-10", details: "Medical Expense" },
    ]);

    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [newTransaction, setNewTransaction] = useState({
        type: "Credit",
        amount: "",
        date: "",
        details: "",
    });

    const totalSalary = transactions.reduce(
        (sum, t) => (t.type === "Credit" ? sum + t.amount : sum - t.amount),
        0
    );

    const openModal = (transaction) => setSelectedTransaction(transaction);
    const closeModal = () => setSelectedTransaction(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTransaction({ ...newTransaction, [name]: value });
    };

    const addTransaction = (e) => {
        e.preventDefault();
        if (!newTransaction.amount || !newTransaction.date || !newTransaction.details) {
            toast.error("Please fill out all fields");
            return;
        }
        setTransactions([
            ...transactions,
            {
                id: transactions.length + 1,
                ...newTransaction,
                amount: parseFloat(newTransaction.amount),
            },
        ]);
        setNewTransaction({ type: "Credit", amount: "", date: "", details: "" });
    };

    return (
        <div className="min-h-screen w-screen flex flex-col items-center py-6 px-4 md:px-8">
        {/* Header */}
        <div className="w-full max-w-4xl bg-white shadow rounded-lg p-6 text-center">
            <h1 className="text-2xl font-bold text-gray-800"> Salary Data</h1>
            <p className="text-gray-600 mt-2">
                Total Salary:{" "}
                <span
                    className={`font-semibold ${
                        totalSalary >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                >
                    ₹{totalSalary}
                </span>
            </p>
        </div>
    
        {/* Admin Form */}
        {isAdmin && (
            <div className="w-full max-w-4xl bg-white shadow rounded-lg mt-6 p-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Add Transaction</h2>
                <form onSubmit={addTransaction} className="space-y-4">
                    <div className="flex flex-col md:flex-row md:space-x-4">
                        <div className="w-full">
                            <label className="block text-gray-600 font-medium mb-1">Type</label>
                            <select
                                name="type"
                                value={newTransaction.type}
                                onChange={handleInputChange}
                                className="w-full border-gray-300 rounded px-3 py-2"
                            >
                                <option value="Credit">Credit</option>
                                <option value="Debit">Debit</option>
                            </select>
                        </div>
                        <div className="w-full">
                            <label className="block text-gray-600 font-medium mb-1">Amount</label>
                            <input
                                type="number"
                                name="amount"
                                value={newTransaction.amount}
                                onChange={handleInputChange}
                                className="w-full border-gray-300 rounded px-3 py-2"
                                placeholder="Enter amount"
                            />
                        </div>
                        <div className="w-full">
                            <label className="block text-gray-600 font-medium mb-1">Date</label>
                            <input
                                type="date"
                                name="date"
                                value={newTransaction.date}
                                onChange={handleInputChange}
                                className="w-full border-gray-300 rounded px-3 py-2"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-gray-600 font-medium mb-1">Details</label>
                        <input
                            type="text"
                            name="details"
                            value={newTransaction.details}
                            onChange={handleInputChange}
                            className="w-full border-gray-300 rounded px-3 py-2"
                            placeholder="Enter details"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Add Transaction
                    </button>
                </form>
            </div>
        )}
    
        {/* Transaction List */}
        <div className="w-full max-w-4xl bg-white shadow rounded-lg mt-6 p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Transactions</h2>
            <div className="overflow-x-auto">
                <table className="w-full table-auto border-collapse border border-gray-200">
                    <thead>
                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm">
                            <th className="border border-gray-200 px-4 py-2">Date</th>
                            <th className="border border-gray-200 px-4 py-2">Type</th>
                            <th className="border border-gray-200 px-4 py-2">Amount</th>
                            <th className="border border-gray-200 px-4 py-2">Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((transaction) => (
                            <tr
                                key={transaction.id}
                                className="text-gray-700 text-sm hover:bg-gray-100"
                            >
                                <td className="border border-gray-200 px-4 py-2">{transaction.date}</td>
                                <td
                                    className={`border border-gray-200 px-4 py-2 font-semibold ${
                                        transaction.type === "Credit"
                                            ? "text-green-600"
                                            : "text-red-600"
                                    }`}
                                >
                                    {transaction.type}
                                </td>
                                <td className="border border-gray-200 px-4 py-2">
                                    ₹{transaction.amount}
                                </td>
                                <td className="border border-gray-200 px-4 py-2">
                                    <button
                                        onClick={() => openModal(transaction)}
                                        className="text-blue-500 hover:underline"
                                    >
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    
        {/* Modal */}
        {selectedTransaction && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/3 p-6">
                    <h3 className="text-lg font-bold text-gray-800">Transaction Details</h3>
                    <p className="mt-2 text-sm text-gray-600">
                        <strong>Date:</strong> {selectedTransaction.date}
                    </p>
                    <p className="mt-2 text-sm text-gray-600">
                        <strong>Type:</strong> {selectedTransaction.type}
                    </p>
                    <p className="mt-2 text-sm text-gray-600">
                        <strong>Amount:</strong> ₹{selectedTransaction.amount}
                    </p>
                    <p className="mt-2 text-sm text-gray-600">
                        <strong>Details:</strong> {selectedTransaction.details}
                    </p>
                    <button
                        onClick={closeModal}
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Close
                    </button>
                </div>
            </div>
        )}
    </div>
    
    );
};

export default SalaryPage;
