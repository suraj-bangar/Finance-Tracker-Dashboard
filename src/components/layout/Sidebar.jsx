import React from 'react';
import { NavLink } from 'react-router-dom';
import { MdDashboard, MdListAlt, MdShowChart, MdAccountBalanceWallet } from 'react-icons/md';

export const Sidebar = () => {
  const linkClass = ({ isActive }) => 
    `flex items-center px-4 py-3 rounded-lg transition-all duration-300 font-medium ${
      isActive 
        ? 'bg-indigo-500 text-white shadow-md' 
        : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200'
    }`;

  return (
    <aside className="w-64 hidden md:flex flex-col border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 transition-colors">
      <div className="h-16 flex items-center px-6 border-b border-gray-200 dark:border-gray-800">
        <MdAccountBalanceWallet className="w-8 h-8 text-indigo-500 mr-3" />
        <span className="text-xl font-bold text-gray-900 dark:text-white">
          Finance Tracker
        </span>
      </div>
      
      <nav className="flex-1 py-6 px-4 space-y-2">
        <NavLink to="/dashboard" className={linkClass}>
          <MdDashboard className="w-5 h-5 mr-3" />
          Dashboard
        </NavLink>
        <NavLink to="/transactions" className={linkClass}>
          <MdListAlt className="w-5 h-5 mr-3" />
          Transactions
        </NavLink>
        <NavLink to="/analytics" className={linkClass}>
          <MdShowChart className="w-5 h-5 mr-3" />
          Analytics
        </NavLink>
      </nav>
      
      <div className="p-4 m-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 transition-all hover:shadow-md">
        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-3">Need help?</p>
        <button className="w-full text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 rounded-lg py-2 hover:shadow-lg transition-all duration-300">
          Contact Support
        </button>
      </div>
    </aside>
  );
};
