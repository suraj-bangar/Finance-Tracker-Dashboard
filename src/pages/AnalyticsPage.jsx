import React from 'react';
import { useDashboard } from '../context/DashboardContext';
import { Charts } from '../components/dashboard/Charts';
import { Insights } from '../components/dashboard/Insights';

export const AnalyticsPage = () => {
  const { transactions } = useDashboard();

  return (
    <div className="max-w-7xl mx-auto pb-10 fade-in">
      {/* Page Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Analytics & Insights</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm bg-t">Deep dive into your financial metrics.</p>
      </div>

      <Insights transactions={transactions} />
      
      <Charts transactions={transactions} />
      
      {/* Additional placeholder for future advanced analytics cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-2xl shadow-sm text-center">
            <h3 className="text-lg font-medium text-slate-800 dark:text-slate-100 mb-2">Saving Goals</h3>
            <p className="text-slate-500 dark:text-slate-400">Goals tracking feature coming soon.</p>
         </div>
         <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-2xl shadow-sm text-center">
            <h3 className="text-lg font-medium text-slate-800 dark:text-slate-100 mb-2">Export Data</h3>
            <p className="text-slate-500 dark:text-slate-400">CSV export functionality coming soon.</p>
         </div>
      </div>
    </div>
  );
};
