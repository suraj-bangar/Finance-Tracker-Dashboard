import React from 'react';
import { MdArrowUpward, MdArrowDownward } from 'react-icons/md';
import { formatCurrency, formatDate } from '../../utils/helpers';
import { MOCK_CATEGORIES } from '../../data/mockData';

export const RecentTransactions = ({ transactions }) => {
  // Sort by date (newest first) and take top 5
  const recentTx = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  const getCategoryColor = (categoryName) => {
    const cat = MOCK_CATEGORIES.find(c => c.name === categoryName);
    return cat ? cat.color : 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300';
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm p-6 mb-8">
      <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-6">Recent Transactions</h3>
      
      {recentTx.length === 0 ? (
        <p className="text-slate-500 dark:text-slate-400 text-center py-4">No recent transactions</p>
      ) : (
        <div className="space-y-4">
          {recentTx.map(tx => (
            <div key={tx.id} className="flex items-center justify-between p-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-xl transition-colors">
              <div className="flex items-center">
                <div className={`p-2 rounded-full mr-4 ${tx.type === 'income' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400' : 'bg-rose-100 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400'}`}>
                  {tx.type === 'income' ? <MdArrowUpward className="w-5 h-5" /> : <MdArrowDownward className="w-5 h-5" />}
                </div>
                <div>
                  <p className="font-semibold text-slate-900 dark:text-slate-100">{tx.title}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{formatDate(tx.date)}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-bold ${tx.type === 'income' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-900 dark:text-white'}`}>
                  {tx.type === 'income' ? '+' : '-'}{formatCurrency(tx.amount)}
                </p>
                <span className={`inline-block mt-1 px-2 py-0.5 text-[10px] font-medium rounded-md ${getCategoryColor(tx.category)}`}>
                  {tx.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
