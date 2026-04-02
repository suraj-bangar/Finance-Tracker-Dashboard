# Finance Tracker Dashboard ✨

A modern, responsive, and robust Finance Dashboard UI I built to demonstrate strong frontend fundamentals and clean UI/UX design.

I set out to create a functional interface that feels like a premium fintech product (think Stripe or Razorpay) while keeping the codebase modular and efficient.

## 🚀 Features Implemented

*   **Role-Based Access Toggle:** Easily switch between 'Admin' (full edit/add capabilities) and 'Viewer' (read-only mode) directly in the UI.
*   **Dynamic Data Visualizations:** Summary cards and charts (Line, Pie) automatically recalculate and re-render instantly when transactions change.
*   **Transactions Management:** A feature-complete transaction ledger including real-time searching, category/type filtering, and sorting algorithms.
*   **Smart Financial Insights:** A custom logic engine that compares current month spending against previous months to generate dynamic financial insights.
*   **State Persistence:** Handles all local data automatically using `localStorage`, so your additions stick around when you refresh.
*   **Custom Dark Mode:** Full Tailwind theme toggle seamlessly bridging a cool light mode into a sleek, gray-900 heavy dark mode.
*   **Premium UX Enhancements:** Loading states, animated hover micro-interactions, category-specific color badges, toast notifications, and zero-data empty states.

## 🛠 Tech Stack

*   **React + Vite:** For lightning-fast scaffolding and component handling.
*   **Tailwind CSS (v4):** Powering the styling layer, dynamic coloring logic, and responsive breakpoints.
*   **Recharts:** Handling the highly-interactive and responsive SVG charting components.
*   **React Router Dom:** Managing clean tab navigation across the dashboard, analytics, and transaction views.
*   **date-fns & UUID:** For precise date math and unique key generation.

## 📁 Project Structure

```
src/
├── components/
│   ├── dashboard/       # Charts, Insights, Summary Cards, Recent list
│   ├── layout/          # Sidebar, Topbar, Main Wrapper
│   └── transactions/    # Table, Filter Views, Form Modal
├── context/             # Global Context mapping data to localStorage
├── data/                # Initial seed data for the dashboard
├── pages/               # High-level routing containers
└── utils/               # Formatting and mathematical helpers
```

## 🏎 Setup Instructions

Feel free to fork and run this on your own machine!

1.  Clone the repository or download the source code.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the Vite development server:
    ```bash
    npm run dev
    ```
4.  Open `http://localhost:5173` in your browser.

## 💡 Engineering Decisions

*   I opted for React Context over Redux for state management, as the scope of this project fits perfectly within Context without over-engineering boilerplate.
*   Form validation was written natively inside the component hooks instead of relying on heavy third-party packages to showcase core React hook proficiency.
*   "Net Savings" strictly evaluates `Income - Expenses` and handles edge-case styling dynamically depending on whether it's positive or negative.
