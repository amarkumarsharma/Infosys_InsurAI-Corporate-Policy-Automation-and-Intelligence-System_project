import React, { useState, useEffect } from 'react';
import { Users, FileText, AlertTriangle, BarChart3 } from 'lucide-react';
import DashboardLayout from '../../components/Dashboard/DashboardLayout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

const ModernHRDashboard = () => {
  const [userName, setUserName] = useState('HR Manager');
  const [userEmail, setUserEmail] = useState('hr@example.com');

  useEffect(() => {
    const email = localStorage.getItem('email') || 'hr@example.com';
    setUserEmail(email);
  }, []);

  const stats = [
    { icon: Users, label: 'Total Employees', value: '285', color: 'blue' },
    { icon: FileText, label: 'Pending Claims', value: '12', color: 'yellow' },
    { icon: AlertTriangle, label: 'Issues', value: '3', color: 'red' },
    { icon: BarChart3, label: 'Compliance', value: '95%', color: 'green' },
  ];

  return (
    <DashboardLayout userRole="hr" userName={userName} userEmail={userEmail}>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          HR Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Employee management and claims overview
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
            Pending Approvals
          </h2>
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-800 rounded-lg">
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 dark:text-white">Employee {i} - Claim Request</p>
                  <p className="text-sm text-gray-500">Medical Claim - $1,200</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="success" size="sm" className="bg-green-600 hover:bg-green-700">
                    Approve
                  </Button>
                  <Button variant="danger" size="sm" className="bg-red-600 hover:bg-red-700">
                    Reject
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            HR Tools
          </h2>
          <div className="space-y-2">
            <Button variant="gradient" className="w-full">
              Employee Directory
            </Button>
            <Button variant="outline" className="w-full border-blue-600 text-blue-600">
              Claims Review
            </Button>
            <Button variant="outline" className="w-full border-blue-600 text-blue-600">
              Generate Reports
            </Button>
            <Button variant="outline" className="w-full border-blue-600 text-blue-600">
              Policies
            </Button>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ModernHRDashboard;
