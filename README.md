# 💎 Syntecxhub Expense Tracker

A premium, professional-grade expense tracking application built for modern financial management. This project features a sleek glassmorphism UI, real-time data visualization, and a robust architecture using advanced React hooks.

![Preview](https://raw.githubusercontent.com/minahil-ch/Syntecxhub_Expense-Tracker/main/preview.png)

## 🚀 Features

-   **Intelligent Dashboard**: Real-time overview of Balance, Income, and Expenses.
-   **Advanced Visualizations**: Interactive Area Charts for spending trends and Pie Charts for category distribution using `Recharts`.
-   **Transaction Management**: Add, delete, and filter transactions with ease.
-   **Category Insights**: Smart category-wise breakdown with custom icons.
-   **Glassmorphism UI**: High-end, dark-mode design with vibrant gradients and smooth animations via `Framer Motion`.
-   **Performance Optimized**: Utilizes `useMemo` and `useCallback` for efficient data processing and rendering.
-   **Fully Responsive**: Seamless experience across mobile, tablet, and desktop devices.
-   **Mock API Integration**: Simulated real-world data fetching with `useEffect` and LocalStorage persistence.

## 🛠️ Tech Stack

-   **Frontend**: React.js (Vite)
-   **Styling**: Vanilla CSS (Custom Design System)
-   **Animations**: Framer Motion
-   **Icons**: Lucide React
-   **Charts**: Recharts
-   **Data Persistence**: LocalStorage (Simulated Mock API)

## 📦 Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/minahil-ch/Syntecxhub_Expense-Tracker.git
   ```

2. **Navigate to the project**:
   ```bash
   cd Syntecxhub_Expense-Tracker
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

## 🏗️ Technical Highlights

-   **`useState`**: Managed complex states for transactions and UI transitions.
-   **`useEffect`**: Handled asynchronous data fetching from a mock API service.
-   **`useRef`**: Implemented smart focus management for the transaction entry form.
-   **`useMemo`**: Optimized expensive calculations for financial summaries and chart datasets.
-   **`useCallback`**: Memoized event handlers to prevent unnecessary re-renders of child components.

## 🎨 UI Design Philosophy

The application follows a **Glassmorphism** design language, characterized by:
-   Translucent background cards with blur effects.
-   Vibrant indigo-to-violet gradients.
-   Minimalist typography using 'Outfit' and 'Inter'.
-   Subtle micro-animations for interactive elements.

---

Built with ❤️ by [Minahil](https://github.com/minahil-ch)
