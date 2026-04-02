import { format, parseISO, isSameMonth, subMonths, isWithinInterval, startOfMonth, endOfMonth } from 'date-fns';

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(amount);
};

export const formatDate = (dateString, formatStr = 'MMM dd, yyyy') => {
  if (!dateString) return '';
  return format(parseISO(dateString), formatStr);
};

export const calculateSummary = (transactions, monthDate) => {
  let filtered = transactions;
  
  if (monthDate) {
    const start = startOfMonth(monthDate);
    const end = endOfMonth(monthDate);
    filtered = transactions.filter(t => isWithinInterval(parseISO(t.date), { start, end }));
  }

  const income = filtered
    .filter(t => t.type === 'income')
    .reduce((acc, curr) => acc + curr.amount, 0);
    
  const expense = filtered
    .filter(t => t.type === 'expense')
    .reduce((acc, curr) => acc + curr.amount, 0);

  return {
    income,
    expense,
    balance: income - expense, // Can be total balance or monthly balance depending on usage
    netSavings: income - expense
  };
};

export const generateInsights = (transactions, referenceDate = new Date()) => {
  const currentMonthStart = startOfMonth(referenceDate);
  const currentMonthEnd = endOfMonth(referenceDate);
  const prevMonthStart = startOfMonth(subMonths(referenceDate, 1));
  const prevMonthEnd = endOfMonth(subMonths(referenceDate, 1));

  const currentMonthTx = transactions.filter(t => isWithinInterval(parseISO(t.date), { start: currentMonthStart, end: currentMonthEnd }));
  const prevMonthTx = transactions.filter(t => isWithinInterval(parseISO(t.date), { start: prevMonthStart, end: prevMonthEnd }));

  const currentSummary = calculateSummary(currentMonthTx);
  const prevSummary = calculateSummary(prevMonthTx);

  const insights = [];

  // Spending comparison
  if (prevSummary.expense > 0) {
    const diff = currentSummary.expense - prevSummary.expense;
    const percent = Math.abs((diff / prevSummary.expense) * 100).toFixed(0);
    if (diff > 0) {
      insights.push({ text: `Spending increased by ${percent}% compared to last month`, type: 'negative' });
    } else {
      insights.push({ text: `You've spent ${percent}% less than last month. Good job!`, type: 'positive' });
    }
  }

  // Highest category
  const categories = {};
  currentMonthTx.filter(t => t.type === 'expense').forEach(t => {
    categories[t.category] = (categories[t.category] || 0) + t.amount;
  });
  
  const sortedCategories = Object.entries(categories).sort((a, b) => b[1] - a[1]);
  if (sortedCategories.length > 0) {
    insights.push({ text: `Highest spending isolated to ${sortedCategories[0][0]} (${formatCurrency(sortedCategories[0][1])})`, type: 'neutral' });
  }

  // Savings comparison
  if (currentSummary.netSavings > prevSummary.netSavings) {
    insights.push({ text: `You saved more this month compared to the previous month!`, type: 'positive' });
  }

  return insights;
};

export const getChartData = (transactions) => {
  // Line chart data (Balance over time within the selected dataset)
  // Let's group by date and calculate daily cumulative balance (approx)
  // Or simply income vs expense per month. The instructions said: "Line Chart -> balance trend over time"
  
  const sorted = [...transactions].sort((a, b) => new Date(a.date) - new Date(b.date));
  let cumulativeBalance = 0;
  const balanceTrend = sorted.map(t => {
    cumulativeBalance += t.type === 'income' ? t.amount : -t.amount;
    return {
      date: format(parseISO(t.date), 'MMM dd'),
      rawDate: t.date,
      balance: cumulativeBalance
    };
  });

  // Pie chart data (Expenses by category)
  const expenses = transactions.filter(t => t.type === 'expense');
  const categoryMap = {};
  expenses.forEach(t => {
    categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
  });
  
  const categoryData = Object.keys(categoryMap).map(key => ({
    name: key,
    value: categoryMap[key]
  }));

  return { balanceTrend, categoryData };
};
