import React from 'react';
import { NavLink } from 'react-router-dom';
import { MdDashboard, MdListAlt, MdShowChart } from 'react-icons/md';

export const MobileNav = () => {
  const linkClass = ({ isActive }) =>
    `flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors duration-200 ${
      isActive
        ? 'text-indigo-500'
        : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
    }`;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 flex justify-around items-center z-50">
      <NavLink to="/dashboard" className={linkClass}>
        <MdDashboard className="w-6 h-6" />
        <span className="text-[10px] font-medium">Dashboard</span>
      </NavLink>
      <NavLink to="/transactions" className={linkClass}>
        <MdListAlt className="w-6 h-6" />
        <span className="text-[10px] font-medium">Ledger</span>
      </NavLink>
      <NavLink to="/analytics" className={linkClass}>
        <MdShowChart className="w-6 h-6" />
        <span className="text-[10px] font-medium">Analytics</span>
      </NavLink>
    </nav>
  );
};
