import { useAuth } from '../context/AuthContext';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { User, Mail, LogOut } from 'lucide-react';

const SettingsPage = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-primary-black">Settings</h1>
        <p className="text-primary-gray-600 mt-1">Manage your account settings</p>
      </div>

      <div className="max-w-2xl space-y-6">
        <Card>
          <h2 className="text-xl font-semibold text-primary-black mb-4">Account Information</h2>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-primary-gray-50 rounded-lg">
              <Mail className="text-primary-gray-600" size={20} />
              <div>
                <p className="text-sm text-primary-gray-600">Email</p>
                <p className="font-medium text-primary-black">{user?.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-primary-gray-50 rounded-lg">
              <User className="text-primary-gray-600" size={20} />
              <div>
                <p className="text-sm text-primary-gray-600">User ID</p>
                <p className="font-medium text-primary-black font-mono text-sm">
                  {user?.uid}
                </p>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold text-primary-black mb-4">Actions</h2>
          
          <Button
            variant="danger"
            onClick={handleLogout}
            className="flex items-center gap-2"
          >
            <LogOut size={20} />
            Logout
          </Button>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold text-primary-black mb-4">About</h2>
          <p className="text-primary-gray-600">
            Trackify is a premium expense tracker application built with React and Firebase.
            Track your income and expenses, manage categories, and visualize your financial data
            with beautiful charts and analytics.
          </p>
          <p className="text-sm text-primary-gray-500 mt-4">Version 1.0.0</p>
        </Card>
      </div>
    </div>
  );
};

export default SettingsPage;
