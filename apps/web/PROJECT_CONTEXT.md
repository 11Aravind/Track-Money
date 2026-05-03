# Project Context: Trackify

This file serves as a persistent reference for AI assistants to understand the project structure, tech stack, and current objectives, reducing token usage during analysis.

## 🚀 Project Overview
**Name:** Trackify
**Goal:** A comprehensive personal finance and expense tracking application.
**Theme:** Dark-themed, modern UI with real-time sync via Firebase.

## 🛠 Tech Stack
- **Frontend:** React (Vite), Tailwind CSS
- **Routing:** React Router DOM v6
- **Backend/Auth:** Firebase (Firestore & Auth)
- **Data Visualization:** Recharts
- **Icons:** Lucide React
- **Date Handling:** date-fns

## 📂 Directory Structure
- `src/components/`: Modular UI components
    - `auth/`: Login, Signup, Protected Routes
    - `categories/`: Category management & selection logic
    - `charts/`: Pie, Bar, and Line charts (Recharts)
    - `common/`: Reusable UI elements (Button, Input, Modal, Card)
    - `dashboard/`: Dashboard specific cards/widgets
    - `layout/`: Navbar, Sidebar, Mobile navigation
    - `transactions/`: Transaction lists and forms
- `src/context/`: State management (Auth, Theme, Transactions)
- `src/firebase/`: Configuration and Firestore service methods
- `src/hooks/`: Custom logic (useTransactions, useCategories, useAnalytics)
- `src/pages/`: Main page-level components (Dashboard, Transactions, etc.)
- `src/utils/`: Helper functions

## 🔑 Core Logic Reference
- **State Management:** Uses React Context API (`TransactionProvider`, `AuthProvider`).
- **Data Fetching:** Custom hooks interface directly with Firebase services.
- **Protected Routes:** Wrapped in `ProtectedRoute` component to handle auth state.

## 📝 Current Active Task (TODO)
The project is currently undergoing a **Categories UI Overhaul**:
- **Goal:** Simplify category selection.
- **Key Changes:**
    - Remove separate menu for categories.
    - Implement a unified popup for adding categories with 3 tabs: **Expense**, **Income**, **Transfer**.
    - Display default categories with icons + names.
    - Add "Add New Category" (+) icon/button to select colors and icons.
    - **UX Flow:** User selects category FIRST, then enters transaction details.

## 🤖 AI Instructions
1. **Always reference this file** before analyzing the codebase to understand the existing architecture.
2. **Consult `todo.md`** for granular task updates; this file provides the high-level roadmap.
3. **Follow the established pattern:** Use hooks for logic, context for global state, and the `common/` components for UI consistency.
