import React, { useState, useEffect } from 'react';
import { Users, Target, TrendingUp, Calendar } from 'lucide-react';
import DashboardLayout from '../../components/Dashboard/DashboardLayout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

const ModernAgentDashboard = () => {
  const [userName, setUserName] = useState('Agent User');
  const [userEmail, setUserEmail] = useState('agent@example.com');

  useEffect(() => {
    const email = localStorage.getItem('email') || 'agent@example.com';
    setUserEmail(email);
  }, []);

  const stats = [
    { icon: Users, label: 'My Clients', value: '45', color: 'blue' },
    { icon: Target, label: 'Policies Sold', value: '12', color: 'green' },
    { icon: TrendingUp, label: 'Commission', value: '$5,250', color: 'purple' },
    { icon: Calendar, label: 'This Month', value: 'In Progress', color: 'yellow' },
  ];

  return (
    <DashboardLayout userRole="agent" userName={userName} userEmail={userEmail}>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Agent Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Your performance and client management hub
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

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            My Clients
          </h2>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-800 rounded-lg">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                    {String.fromCharCode(65 + i)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">Client {i}</p>
                    <p className="text-sm text-gray-500">Active since 2023</p>
                  </div>
                </div>
                <Badge variant="success">Active</Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Quick Actions
          </h2>
          <div className="space-y-2">
            <Button variant="gradient" className="w-full">
              Add New Client
            </Button>
            <Button variant="outline" className="w-full border-blue-600 text-blue-600">
              View Performance
            </Button>
            <Button variant="outline" className="w-full border-blue-600 text-blue-600">
              Generate Report
            </Button>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ModernAgentDashboard;
