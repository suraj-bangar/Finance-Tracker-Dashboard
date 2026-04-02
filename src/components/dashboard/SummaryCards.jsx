import React from 'react';
import { MdTrendingUp, MdTrendingDown, MdAccountBalanceWallet, MdSavings } from 'react-icons/md';
import { formatCurrency } from '../../utils/helpers';

export const SummaryCards = ({ summary }) => {
  const cards = [
    {
      title: 'Total Balance',
      amount: summary.balance,
      icon: <MdAccountBalanceWallet className="w-6 h-6 text-white" />,
      color: 'bg-gradient-to-br from-green-500 to-green-600 shadow-green-500/30',
      textColor: 'text-white',
      titleColor: 'text-green-50'
    },
    {
      title: 'Total Income',
      amount: summary.income,
      icon: <MdTrendingUp className="w-6 h-6 text-white" />,
      color: 'bg-gradient-to-br from-blue-500 to-blue-600 shadow-blue-500/30',
      textColor: 'text-white',
      titleColor: 'text-blue-50'
    },
    {
      title: 'Total Expenses',
      amount: summary.expense,
      icon: <MdTrendingDown className="w-6 h-6 text-white" />,
      color: 'bg-gradient-to-br from-red-500 to-red-600 shadow-red-500/30',
      textColor: 'text-white',
      titleColor: 'text-red-50'
    },
    {
      title: 'Net Savings',
      amount: summary.netSavings,
      icon: <MdSavings className="w-6 h-6 text-white" />,
      color: 'bg-gradient-to-br from-indigo-500 to-indigo-600 shadow-indigo-500/30',
      textColor: 'text-white',
      titleColor: 'text-indigo-50'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, index) => (
        <div 
          key={index} 
          className={`p-6 rounded-xl shadow-lg border border-transparent transition-all duration-300 hover:scale-105 hover:shadow-xl ${card.color}`}
        >
          <div className="flex justify-between items-start">
            <div>
              <p className={`text-sm font-medium mb-1 ${card.titleColor}`}>
                {card.title}
              </p>
              <h3 className={`text-2xl md:text-3xl font-bold ${card.textColor}`}>
                {formatCurrency(card.amount)}
              </h3>
            </div>
            <div className="p-3 rounded-xl bg-white/20 backdrop-blur-sm">
              {card.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
