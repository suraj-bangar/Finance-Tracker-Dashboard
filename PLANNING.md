# Project Planning & Architecture

## Core Objective
The goal of this project was to build a robust, responsive, and dynamic Finance Dashboard showcasing modern frontend engineering principles. I specifically focused on creating an interface that feels exactly like a premium fintech product (taking inspiration from products like Stripe and Razorpay) while maintaining clean code architecture.

## Technical Requirements
- **Framework:** React using Vite for rapid scaffolding and optimized builds.
- **Styling:** Tailwind CSS (v4) to construct a custom dark-mode-first aesthetic with utility-first classes, heavily utilizing CSS grid/flexbox.
- **Components:** Modular, highly reusable React components.
- **State Management:** React Context API natively integrated with `localStorage` to simulate a database session without over-engineering with Redux.
- **Routing:** React Router v6 for efficient SPA (Single Page Application) navigation between the Dashboard, Analytics, and Transactions ledgers.

## Architecture & Data Flow

### 1. State Management (`DashboardContext`)
I needed a way to manage the financial ledger without drilling props endlessly. 
- Integrated a global Context provider spanning across the `App.jsx` boundary.
- Handled calculations locally to return `transactions`, `theme`, and `role` dependencies cleanly to any subscribed component.
- Applied `useEffect` bindings to ensure any array mutations automatically sync with the browser's `localStorage`.

### 2. Theming Engine
- Elected to force a "dark mode first" presentation logic utilizing Tailwind's `.dark` pseudo-selector.
- The UI binds tightly to `gray-900` background spacing and `gray-800` cards for shadow separation, with interactive states highlighted entirely in `indigo-500` to establish a commanding financial profile.

### 3. Component Hierarchy
- **Layouts (`Sidebar`, `Topbar`)**: Handles all `nav` routing and provides access toggles (Role/Theme).
- **Widgets (`SummaryCards`, `RecentTransactions`)**: Pure presentational components receiving destructured context to display mathematical summaries or truncated history arrays.
- **Charts Engine (`Charts`)**: Implemented Recharts to parse localized `mockData` dynamically. Built robust formatters to render Indian Rupees (₹) flawlessly across Tooltips and Y-axis mappings.

### 4. Smart Financial Insights
- Engineered a lightweight mathematical parser inside `utils/helpers.js` (`generateInsights`). 
- This function filters arrays by timestamp matching the `date-fns` intervals to securely analyze month-over-month (MoM) spending limits.
- Evaluates differences to dynamically output readable performance metrics (e.g. "Spending increased by 15%").

## Challenges & Solutions
1. **Dealing with complex form validations:** Built native controlled inputs managing an `errors` object state rather than reaching for heavy libraries like Formik, assuring lightweight bundle sizes.
2. **Dynamic UI Rendering:** Added an implicit `Role` toggle simulating an Admin/Viewer state. If logged in as Viewer, the table rows conditionally unmount the 'Edit' and 'Delete' icons, and the top 'Add Transaction' node vanishes, completely preventing access to the mutable layer of context.

## Future Roadmap (V2)
- Integrate a real Postgres backend using Node.js/Express.
- Establish user authentication (JWT) replacing the static Role toggle.
- Add CSV export wrappers for ledger history. 
