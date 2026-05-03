# Trackify - Premium Expense Tracker

A modern, mobile-responsive expense tracker web application built with React and Firebase.

## Features

- 🔐 **Authentication** - Secure email/password authentication with Firebase
- 💰 **Transaction Management** - Add, edit, and delete income/expense transactions
- 📁 **Category Management** - Create and manage custom categories
- 📊 **Analytics & Reports** - Visualize your financial data with charts
- 📱 **Mobile Responsive** - Works seamlessly on desktop and mobile devices
- 🎨 **Premium UI** - Clean black & white design with smooth animations

## Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Backend**: Firebase (Authentication + Firestore)
- **Charts**: Recharts
- **Icons**: Lucide React
- **Routing**: React Router DOM

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Firebase account

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd Trackify
```

2. Install dependencies
```bash
npm install
```

3. Configure Firebase

Create a `.env` file in the root directory and add your Firebase configuration:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

You can find these values in your Firebase project settings.

4. Start the development server
```bash
npm run dev
```

The application will open at `http://localhost:3000`

### Building for Production

```bash
npm run build
```

The production-ready files will be in the `dist` directory.
 
+### Deployment Configuration
+
+When deploying to a platform like Vercel or Netlify, you must add your domain to the **Authorized Domains** list in the Firebase Console:
+
+1. Go to [Firebase Console](https://console.firebase.google.com/)
+2. Navigate to **Authentication** > **Settings** > **Authorized domains**
+3. Click **Add domain** and enter your deployment URL (e.g., `track-money-ten.vercel.app`)
+4. Ensure all environment variables (from your `.env` file) are added to your hosting provider's dashboard.
+

## Firebase Setup

1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Email/Password authentication in Authentication section
3. Create a Firestore database
4. Set up Firestore security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only access their own data
    match /transactions/{transaction} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
    }
    
    match /categories/{category} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
    }
  }
}
```

## Project Structure

```
src/
├── components/
│   ├── auth/           # Authentication components
│   ├── layout/         # Layout components (Sidebar, Navbar, etc.)
│   ├── dashboard/      # Dashboard components
│   ├── transactions/   # Transaction components
│   ├── categories/     # Category components
│   ├── charts/         # Chart components
│   └── common/         # Reusable UI components
├── context/            # React Context (Auth)
├── firebase/           # Firebase configuration
├── hooks/              # Custom React hooks
├── pages/              # Page components
├── utils/              # Utility functions
├── App.jsx             # Main app component
├── main.jsx            # Entry point
└── index.css           # Global styles
```

## Features Overview

### Dashboard
- View total balance, income, and expense
- Monthly overview with selectable months
- Category-wise breakdown
- Quick add transaction button

### Transactions
- List all transactions with search and filters
- Filter by month, category, and type
- Add, edit, and delete transactions
- Real-time updates

### Categories
- Manage income and expense categories
- Add custom categories with icons
- Edit and delete categories
- Default categories included

### Reports
- Pie chart for category-wise expenses
- Bar chart for monthly income vs expense
- Line chart for income/expense trends

### Settings
- View account information
- Logout functionality

## Default Categories

The app comes with pre-configured categories:
- **Income**: Salary, Other Income
- **Expense**: Food, Petrol, Shopping, Bills, Other Expense

## License

MIT

## Support

For issues and questions, please create an issue in the repository.
