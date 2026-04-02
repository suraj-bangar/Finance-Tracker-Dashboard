import React, { useState } from 'react';
import { MdSearch, MdFilterList, MdAdd, MdClose } from 'react-icons/md';
import { useDashboard } from '../../context/DashboardContext';
import { TransactionTable } from './TransactionTable';
import { TransactionForm } from './TransactionForm';

export const TransactionView = () => {
  const { transactions, role } = useDashboard();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortOrder, setSortOrder] = useState('date-desc');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTx, setEditingTx] = useState(null);

  const handleOpenForm = (tx = null) => {
    setEditingTx(tx);
    setIsModalOpen(true);
  };

  const handleCloseForm = () => {
    setIsModalOpen(false);
    setEditingTx(null);
  };

  // Filter and sort logic
  let filteredTx = transactions.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          t.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || t.type === filterType;
    return matchesSearch && matchesType;
  });

  filteredTx.sort((a, b) => {
    if (sortOrder === 'date-desc') return new Date(b.date) - new Date(a.date);
    if (sortOrder === 'date-asc') return new Date(a.date) - new Date(b.date);
    if (sortOrder === 'amount-desc') return b.amount - a.amount;
    if (sortOrder === 'amount-asc') return a.amount - b.amount;
    return 0;
  });

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl shadow-lg overflow-hidden mb-8 transition-all duration-300">
      <div className="p-6 border-b border-gray-100 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Transactions</h3>
          
          {role === 'Admin' && (
            <button 
              onClick={() => handleOpenForm()}
              className="flex items-center px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 font-medium text-sm"
            >
              <MdAdd className="w-5 h-5 mr-1" />
              Add Transaction
            </button>
          )}
        </div>

        <div className="mt-6 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
          {/* Search */}
          <div className="relative flex-1 group">
            <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-400 w-5 h-5 transition-colors" />
            <input 
              type="text"
              placeholder="Search by title or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-900 dark:text-gray-100 transition-all duration-300"
            />
          </div>

          {/* Type Filter */}
          <select 
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-900 dark:text-gray-100 hidden sm:block appearance-none cursor-pointer transition-all duration-300"
          >
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          {/* Sort Menu */}
          <select 
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="px-4 py-2 border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-900 dark:text-gray-100 hidden sm:block appearance-none cursor-pointer transition-all duration-300"
          >
            <option value="date-desc">Newest First</option>
            <option value="date-asc">Oldest First</option>
            <option value="amount-desc">Highest Amount</option>
            <option value="amount-asc">Lowest Amount</option>
          </select>
        </div>
      </div>

      <TransactionTable 
        transactions={filteredTx} 
        onEdit={handleOpenForm} 
      />

      {isModalOpen && (
        <TransactionForm tx={editingTx} onClose={handleCloseForm} />
      )}
    </div>
  );
};
