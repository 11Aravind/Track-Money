Create a mobile responsive expense tracker web application using React JS + Firebase as backend.
The UI theme should be minimal, modern black & white combination (premium clean look).

🎯 Core Features

Build a full expense management system where users can:

Add Income & Expenses

User can add transaction

Fields:

Amount

Type (Income / Expense)

Category (Food, Petrol, Salary etc)

Date

Notes (optional)

Save data in Firebase Firestore

Category Management

Default categories:

Food

Petrol

Shopping

Bills

Salary (income)

User can:

Add new category

Edit category

Delete category

Categories stored in Firebase

Dashboard
Create a clean dashboard showing:

Total balance

Total income

Total expense

Current month expense

Current month income

Monthly Expense Tracking

Show each month expense summary

Month dropdown filter (Jan–Dec)

Show selected month:

Total income

Total expense

Remaining balance

Category-wise Tracking

Show total expense per category

Example:

Food: ₹5000

Petrol: ₹2000

Shopping: ₹3500

Filters
Add filter options:

Filter by month

Filter by category

Filter by income/expense

Date range filter

Graphs & Analytics
Add charts using chart library (Recharts or Chart.js):

Pie chart → category expense

Bar chart → monthly expense

Line chart → income vs expense trend

Transaction List

Show all transactions

Edit/delete option

Search option

Filter option

Authentication
Use Firebase authentication:

Email login/signup

User-specific data (each user sees own expenses)

Mobile Responsive

Fully responsive for mobile + desktop

Mobile-first UI

Clean spacing and modern layout

🎨 UI/UX Design Requirements

Theme: Black & White premium UI

Background: black/white minimal

Cards with soft shadow

Modern dashboard layout

Smooth hover effects

Clean fonts (modern finance style)

Responsive sidebar or bottom navigation for mobile

Pages:

Login / Signup

Dashboard

Add Transaction

Category Manager

Reports & Graphs

Settings

🛠 Tech Stack

React JS (Vite)

Firebase Authentication

Firebase Firestore DB

Tailwind CSS (for fast UI)

Chart.js or Recharts for graphs

Fully component-based structure

📂 Firebase Structure

Collections:

users

transactions

categories

Each transaction:

userId

type (income/expense)

amount

category

date

note

createdAt

✨ Extra (if possible)

Dark/light toggle (default black-white theme)

Download monthly report (PDF)

Smooth animations

Loading skeletons

💡 Goal

Build a modern premium expense tracker SaaS-style web app
Clean UI, fast, mobile responsive, scalable and production-ready