import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { DashboardProvider } from './context/DashboardContext';
import { Layout } from './components/layout/Layout';
import { Dashboard } from './pages/Dashboard';
import { TransactionsPage } from './pages/TransactionsPage';
import { AnalyticsPage } from './pages/AnalyticsPage';

function App() {
  return (
    <DashboardProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/transactions" element={<TransactionsPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
      <Toaster 
        position="top-right" 
        toastOptions={{
          style: {
            background: '#334155',
            color: '#fff',
            borderRadius: '12px',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
        }} 
      />
    </DashboardProvider>
  );
}

export default App;
