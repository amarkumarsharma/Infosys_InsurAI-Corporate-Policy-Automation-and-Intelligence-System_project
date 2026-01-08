import React, { useState, useEffect } from 'react';
import { BarChart3, Users, AlertTriangle, TrendingUp, Shield } from 'lucide-react';
import DashboardLayout from '../../components/Dashboard/DashboardLayout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

const ModernAdminDashboard = () => {
  const [userName, setUserName] = useState('Admin User');
  const [userEmail, setUserEmail] = useState('admin@example.com');

  useEffect(() => {
    const email = localStorage.getItem('email') || 'admin@example.com';
    setUserEmail(email);
  }, []);

  const stats = [
    { icon: BarChart3, label: 'Total Claims', value: '1,234', color: 'blue' },
    { icon: Users, label: 'Active Users', value: '456', color: 'purple' },
    { icon: AlertTriangle, label: 'Fraud Detected', value: '23', color: 'red' },
    { icon: TrendingUp, label: 'Monthly Growth', value: '+12.5%', color: 'green' },
  ];

  return (
    <DashboardLayout userRole="admin" userName={userName} userEmail={userEmail}>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Admin Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          System-wide insights and analytics
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="hover:shadow-lg">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">
                    {stat.label}
                  </p>
                  <p className="text-4xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </p>
                </div>
                <div className={`p-3 rounded-lg bg-gradient-to-br from-${stat.color}-600 to-${stat.color}-500`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Recent Claims Activity
          </h2>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-800 rounded-lg">
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 dark:text-white">Claim CLM{1000 + i}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Patient: John Doe</p>
                </div>
                <Badge variant="success">Approved</Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            System Status
          </h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">Uptime</span>
              <Badge variant="success">99.9%</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">API Response</span>
              <Badge variant="success">&lt;100ms</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">Database</span>
              <Badge variant="success">Healthy</Badge>
            </div>
            <Button variant="outline" className="w-full mt-4">
              View Detailed Logs
            </Button>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ModernAdminDashboard;
