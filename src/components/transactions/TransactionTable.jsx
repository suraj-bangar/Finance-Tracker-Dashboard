import React, { useState, useEffect } from 'react';
import { MdEdit, MdDelete, MdArrowDownward, MdArrowUpward, MdOutlineReceiptLong } from 'react-icons/md';
import { formatCurrency, formatDate } from '../../utils/helpers';
import { useDashboard } from '../../context/DashboardContext';
import { MOCK_CATEGORIES } from '../../data/mockData';
import { toast } from 'react-hot-toast';

export const TransactionTable = ({ transactions, onEdit }) => {
  const { role, deleteTransaction } = useDashboard();
  const [loading, setLoading] = useState(false);

  // Simulate loading state on initial render or list change
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [transactions.length]);

  const getCategoryColor = (categoryName) => {
    const cat = MOCK_CATEGORIES.find(c => c.name === categoryName);
    return cat ? cat.color : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      deleteTransaction(id);
      toast.success('Transaction deleted');
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-500 dark:text-gray-400 text-sm">Loading transactions...</p>
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4 transition-all duration-300">
          <MdOutlineReceiptLong className="w-8 h-8 text-gray-400" />
        </div>
        <h4 className="text-lg font-medium text-gray-800 dark:text-gray-200">No transactions found</h4>
        <p className="text-gray-500 dark:text-gray-400 mt-1 max-w-sm text-sm">
          We couldn't find any data matching your current filters or criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50 dark:bg-gray-900/50 text-sm uppercase tracking-wider text-gray-400 border-b border-gray-100 dark:border-gray-800">
            <th className="px-6 py-4 font-semibold">Title</th>
            <th className="px-6 py-4 font-semibold">Category</th>
            <th className="px-6 py-4 font-semibold">Date</th>
            <th className="px-6 py-4 font-semibold text-right">Amount</th>
            {role === 'Admin' && <th className="px-6 py-4 font-semibold text-right">Action</th>}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
          {transactions.map((tx) => (
            <tr key={tx.id} className="even:bg-gray-50 dark:even:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300 group">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className={`p-2 rounded-full mr-4 transition-colors ${tx.type === 'income' ? 'bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400' : 'bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400'}`}>
                    {tx.type === 'income' ? <MdArrowUpward className="w-4 h-4" /> : <MdArrowDownward className="w-4 h-4" />}
                  </div>
                  <span className="font-medium text-gray-900 dark:text-gray-100">{tx.title}</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2.5 py-1 text-xs font-medium rounded-md ${getCategoryColor(tx.category)}`}>
                  {tx.category}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {formatDate(tx.date)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-lg font-bold">
                <span className={tx.type === 'income' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                  {tx.type === 'income' ? '+' : '-'}{formatCurrency(tx.amount)}
                </span>
              </td>
              {role === 'Admin' && (
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button 
                      onClick={() => onEdit(tx)}
                      className="p-2 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <MdEdit className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(tx.id)}
                      className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <MdDelete className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
