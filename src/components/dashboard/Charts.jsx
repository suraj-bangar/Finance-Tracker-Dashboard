import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { getChartData } from '../../utils/helpers';

export const Charts = ({ transactions }) => {
  const { balanceTrend, categoryData } = getChartData(transactions);

  // Updated colors to match premium aesthetic (indigo, blue, green, etc)
  const COLORS = ['#eab308', '#3b82f6', '#22c55e', '#a855f7', '#6366f1', '#06b6d4', '#ec4899'];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      {/* Line Chart */}
      <div className="lg:col-span-2 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl group">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-6">Balance Trend</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={balanceTrend} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.5} />
              <XAxis 
                dataKey="date" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#9ca3af', fontSize: 13 }}
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#9ca3af', fontSize: 13 }}
                tickFormatter={(value) => `₹${value}`}
                dx={-10}
              />
              <RechartsTooltip 
                contentStyle={{ backgroundColor: '#1f2937', borderRadius: '12px', border: '1px solid #374151', color: '#f3f4f6', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)' }}
                itemStyle={{ color: '#818cf8', fontWeight: 'bold' }}
                formatter={(value) => [`₹${value}`, 'Balance']}
              />
              <Line 
                type="monotone" 
                dataKey="balance" 
                stroke="#6366f1" 
                strokeWidth={4} 
                dot={{ r: 0 }} 
                activeDot={{ r: 6, fill: '#6366f1', strokeWidth: 3, stroke: '#1f2937' }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-6">Expenses by Category</h3>
        <div className="h-[300px] w-full">
          {categoryData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="45%"
                  innerRadius={70}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  formatter={(value) => [`₹${value}`, 'Amount']}
                  contentStyle={{ backgroundColor: '#1f2937', borderRadius: '12px', border: '1px solid #374151', color: '#f3f4f6', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)' }}
                  itemStyle={{ color: '#e5e7eb', fontWeight: 'bold' }}
                />
                <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '13px', color: '#9ca3af' }} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <span className="text-sm">No expenses yet</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
