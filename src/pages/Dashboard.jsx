import React from 'react';
import { useDashboard } from '../context/DashboardContext';
import { SummaryCards } from '../components/dashboard/SummaryCards';
import { Charts } from '../components/dashboard/Charts';
import { Insights } from '../components/dashboard/Insights';
import { RecentTransactions } from '../components/dashboard/RecentTransactions';
import { TransactionView } from '../components/transactions/TransactionView';
import { calculateSummary } from '../utils/helpers';
import { format, subMonths } from 'date-fns';

export const Dashboard = () => {
  const { transactions, selectedMonth, setSelectedMonth } = useDashboard();

  // Generate month options (Last 3 months including current)
  const today = new Date();
  const months = [
    { label: 'All Time', value: 'ALL' },
    { label: format(today, 'MMMM yyyy'), value: today.toISOString() },
    { label: format(subMonths(today, 1), 'MMMM yyyy'), value: subMonths(today, 1).toISOString() },
    { label: format(subMonths(today, 2), 'MMMM yyyy'), value: subMonths(today, 2).toISOString() },
  ];

  // If a month is selected, we filter the dashboard view (Summary Cards & Charts)
  // For 'ALL', we calculate over all data. For specific month, over that month.
  const referenceDate = selectedMonth === 'ALL' ? null : new Date(selectedMonth);
  const summary = calculateSummary(transactions, referenceDate);

  // We pass either all transactions or filtered transactions to Charts based on needs.
  // Actually, charts usually look better with more data, but if filtered, show only filtered.
  const displayTransactions = referenceDate 
    ? transactions.filter(t => t.date.startsWith(format(referenceDate, 'yyyy-MM')))
    : transactions;

  return (
    <div className="max-w-7xl mx-auto pb-10 fade-in">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 space-y-4 md:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Financial Dashboard</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">Welcome back! Here's your financial overview.</p>
        </div>
        
        {/* Month Selector */}
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-slate-500 dark:text-slate-400">Period:</label>
          <select 
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="px-4 py-2 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm cursor-pointer dark:text-white transition-colors"
          >
            {months.map(m => (
              <option key={m.value} value={m.value}>{m.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Content */}
      <SummaryCards summary={summary} />
      <Insights transactions={transactions} />
      <Charts transactions={displayTransactions} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <TransactionView />
        </div>
        <div className="lg:col-span-1">
          <RecentTransactions transactions={transactions} />
        </div>
      </div>
    </div>
  );
};
