import React from 'react';
import { TransactionView } from '../components/transactions/TransactionView';

export const TransactionsPage = () => {
  return (
    <div className="max-w-7xl mx-auto pb-10 fade-in">
      {/* Page Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">All Transactions</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm bg-t">Manage all your income and expenses.</p>
      </div>

      <TransactionView />
    </div>
  );
};
