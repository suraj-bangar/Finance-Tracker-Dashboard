import React, { useState, useEffect } from 'react';
import { MdClose } from 'react-icons/md';
import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';
import { useDashboard } from '../../context/DashboardContext';
import { MOCK_CATEGORIES } from '../../data/mockData';
import { toast } from 'react-hot-toast';

export const TransactionForm = ({ tx, onClose }) => {
  const { addTransaction, updateTransaction } = useDashboard();
  const isEditing = !!tx;

  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    type: 'expense',
    category: 'Food',
    date: format(new Date(), 'yyyy-MM-dd')
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (tx) {
      setFormData({
        title: tx.title,
        amount: tx.amount,
        type: tx.type,
        category: tx.category,
        date: tx.date
      });
    }
  }, [tx]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.amount || isNaN(formData.amount) || Number(formData.amount) <= 0) {
      newErrors.amount = 'Valid positive amount is required';
    }
    if (!formData.date) newErrors.date = 'Date is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      id: isEditing ? tx.id : uuidv4(),
      title: formData.title.trim(),
      amount: Number(formData.amount),
      type: formData.type,
      category: formData.category,
      date: formData.date
    };

    if (isEditing) {
      updateTransaction(payload);
      toast.success('Transaction updated');
    } else {
      addTransaction(payload);
      toast.success('Transaction added');
    }
    onClose();
  };

  // Prevent background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800">
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">
            {isEditing ? 'Edit Transaction' : 'New Transaction'}
          </h3>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
          >
            <MdClose className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Title
            </label>
            <input 
              type="text" 
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Groceries"
              className={`w-full px-4 py-2 border rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors ${
                errors.title ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-200 dark:border-slate-700'
              }`}
            />
            {errors.title && <p className="mt-1 text-sm text-rose-500">{errors.title}</p>}
          </div>

          {/* Amount & Type */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Amount
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                <input 
                  type="number" 
                  name="amount"
                  step="0.01"
                  value={formData.amount}
                  onChange={handleChange}
                  placeholder="0.00"
                  className={`w-full pl-8 pr-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-colors ${
                    errors.amount ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 dark:border-gray-700'
                  }`}
                />
              </div>
              {errors.amount && <p className="mt-1 text-sm text-rose-500">{errors.amount}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {MOCK_CATEGORIES.filter(c => c.type === formData.type || formData.type === 'expense').map(c => (
                  <option key={c.name} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>
            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Date
              </label>
              <input 
                type="date" 
                name="date"
                value={formData.date}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors ${
                  errors.date ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-200 dark:border-slate-700'
                }`}
              />
              {errors.date && <p className="mt-1 text-sm text-rose-500">{errors.date}</p>}
            </div>
          </div>

          <div className="pt-4 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            >
              {isEditing ? 'Save Changes' : 'Add Transaction'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
