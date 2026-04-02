import React from 'react';
import { MdDarkMode, MdLightMode, MdNotificationsNone } from 'react-icons/md';
import { useDashboard } from '../../context/DashboardContext';

export const Topbar = () => {
  const { theme, toggleTheme, role, setRole } = useDashboard();

  return (
    <header className="h-16 flex items-center justify-between px-4 md:px-8 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 transition-colors">
      <div className="flex items-center md:hidden">
        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-blue-500">
          Finance Tracker
        </span>
      </div>
      
      <div className="hidden md:block">
        <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Overview</h1>
      </div>

      <div className="flex items-center space-x-4 ml-auto">
        {/* Role Switcher */}
        <div className="flex items-center bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
          <button
            onClick={() => setRole('Viewer')}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all duration-300 ${
              role === 'Viewer' 
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' 
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
            }`}
          >
            Viewer
          </button>
          <button
            onClick={() => setRole('Admin')}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all duration-300 ${
              role === 'Admin' 
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' 
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
            }`}
          >
            Admin
          </button>
        </div>

        {/* Theme Toggle */}
        <button 
          onClick={toggleTheme}
          className="p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 rounded-full transition-colors"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <MdLightMode className="w-5 h-5" /> : <MdDarkMode className="w-5 h-5" />}
        </button>

        {/* Notifications */}
        <button className="p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 rounded-full transition-colors relative">
          <MdNotificationsNone className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-500 rounded-full border-2 border-white dark:border-gray-900"></span>
        </button>

        {/* Profile Avatar */}
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-blue-500 flex items-center justify-center text-white font-medium shadow-sm ring-2 ring-white dark:ring-gray-900 cursor-pointer text-xs">
          FT
        </div>
      </div>
    </header>
  );
};
