import React, { useMemo } from 'react';
import { MdLightbulbOutline, MdTrendingUp, MdTrendingDown, MdStars } from 'react-icons/md';
import { generateInsights } from '../../utils/helpers';

export const Insights = ({ transactions }) => {
  const insights = useMemo(() => generateInsights(transactions), [transactions]);

  const getIcon = (type) => {
    switch(type) {
      case 'positive': return <MdTrendingDown className="w-5 h-5 text-emerald-500" />; // spending down is positive
      case 'negative': return <MdTrendingUp className="w-5 h-5 text-rose-500" />;
      default: return <MdLightbulbOutline className="w-5 h-5 text-amber-500" />;
    }
  };

  const getBg = (type) => {
    switch(type) {
      case 'positive': return 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-100 dark:border-emerald-500/20';
      case 'negative': return 'bg-rose-50 dark:bg-rose-500/10 border-rose-100 dark:border-rose-500/20';
      default: return 'bg-amber-50 dark:bg-amber-500/10 border-amber-100 dark:border-amber-500/20';
    }
  };

  if (insights.length === 0) return null;

  return (
    <div className="mb-8">
      <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center">
        <MdStars className="w-6 h-6 text-amber-500 mr-2" />
        Smart Insights
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {insights.map((insight, index) => (
          <div key={index} className={`flex items-start p-4 rounded-xl border ${getBg(insight.type)}`}>
            <div className="mt-0.5 mr-3 flex-shrink-0">
              {getIcon(insight.type)}
            </div>
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {insight.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
