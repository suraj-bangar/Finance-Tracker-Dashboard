import { subDays, subMonths, format } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';

const today = new Date();

export const MOCK_CATEGORIES = [
  { name: 'Salary', type: 'income', color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' },
  { name: 'Freelance', type: 'income', color: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400' },
  { name: 'Food', type: 'expense', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-400' },
  { name: 'Travel', type: 'expense', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' },
  { name: 'Shopping', type: 'expense', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400' },
  { name: 'Bills', type: 'expense', color: 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-400' },
  { name: 'Entertainment', type: 'expense', color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400' },
];

export const initialTransactions = [
  // Current Month
  { id: uuidv4(), date: format(today, 'yyyy-MM-dd'), amount: 5000, category: 'Salary', type: 'income', title: 'Monthly Salary' },
  { id: uuidv4(), date: format(subDays(today, 2), 'yyyy-MM-dd'), amount: 150, category: 'Food', type: 'expense', title: 'Groceries' },
  { id: uuidv4(), date: format(subDays(today, 5), 'yyyy-MM-dd'), amount: 60, category: 'Bills', type: 'expense', title: 'Internet Bill' },
  { id: uuidv4(), date: format(subDays(today, 8), 'yyyy-MM-dd'), amount: 200, category: 'Shopping', type: 'expense', title: 'New Shoes' },
  { id: uuidv4(), date: format(subDays(today, 12), 'yyyy-MM-dd'), amount: 800, category: 'Freelance', type: 'income', title: 'Web Project' },
  { id: uuidv4(), date: format(subDays(today, 15), 'yyyy-MM-dd'), amount: 45, category: 'Food', type: 'expense', title: 'Dinner Out' },
  
  // Last Month
  { id: uuidv4(), date: format(subDays(subMonths(today, 1), 2), 'yyyy-MM-dd'), amount: 5000, category: 'Salary', type: 'income', title: 'Monthly Salary' },
  { id: uuidv4(), date: format(subDays(subMonths(today, 1), 5), 'yyyy-MM-dd'), amount: 300, category: 'Travel', type: 'expense', title: 'Flight Tickets' },
  { id: uuidv4(), date: format(subDays(subMonths(today, 1), 10), 'yyyy-MM-dd'), amount: 120, category: 'Entertainment', type: 'expense', title: 'Concert Tickets' },
  { id: uuidv4(), date: format(subDays(subMonths(today, 1), 15), 'yyyy-MM-dd'), amount: 250, category: 'Food', type: 'expense', title: 'Groceries' },
  { id: uuidv4(), date: format(subDays(subMonths(today, 1), 20), 'yyyy-MM-dd'), amount: 55, category: 'Bills', type: 'expense', title: 'Phone Bill' },
  
  // 2 Months Ago
  { id: uuidv4(), date: format(subDays(subMonths(today, 2), 2), 'yyyy-MM-dd'), amount: 5000, category: 'Salary', type: 'income', title: 'Monthly Salary' },
  { id: uuidv4(), date: format(subDays(subMonths(today, 2), 5), 'yyyy-MM-dd'), amount: 180, category: 'Shopping', type: 'expense', title: 'Clothes' },
  { id: uuidv4(), date: format(subDays(subMonths(today, 2), 12), 'yyyy-MM-dd'), amount: 220, category: 'Food', type: 'expense', title: 'Groceries' },
  { id: uuidv4(), date: format(subDays(subMonths(today, 2), 18), 'yyyy-MM-dd'), amount: 90, category: 'Bills', type: 'expense', title: 'Utilities' },
];
