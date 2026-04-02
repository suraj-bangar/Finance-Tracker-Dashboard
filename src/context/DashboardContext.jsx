import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialTransactions } from '../data/mockData';

const DashboardContext = createContext();

export const useDashboard = () => useContext(DashboardContext);

export const DashboardProvider = ({ children }) => {
  // Try to load from localStorage first
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('finance_transactions');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return initialTransactions;
      }
    }
    return initialTransactions;
  });

  const [role, setRole] = useState('Admin'); // 'Admin' or 'Viewer'
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('finance_theme') || 'dark';
  });

  // Track the currently selected month for filtering dashboard widgets
  const [selectedMonth, setSelectedMonth] = useState('ALL'); 

  // Persist transactions
  useEffect(() => {
    localStorage.setItem('finance_transactions', JSON.stringify(transactions));
  }, [transactions]);

  // Persist and apply theme
  useEffect(() => {
    localStorage.setItem('finance_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const addTransaction = (t) => {
    setTransactions(prev => [t, ...prev]);
  };

  const updateTransaction = (updatedTx) => {
    setTransactions(prev => prev.map(t => t.id === updatedTx.id ? updatedTx : t));
  };

  const deleteTransaction = (id) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  return (
    <DashboardContext.Provider value={{
      transactions,
      addTransaction,
      updateTransaction,
      deleteTransaction,
      role,
      setRole,
      theme,
      toggleTheme,
      selectedMonth,
      setSelectedMonth
    }}>
      {children}
    </DashboardContext.Provider>
  );
};
