import React, { useState, useEffect } from 'react';
import { FileText, Plus, TrendingUp, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import DashboardLayout from '../../components/Dashboard/DashboardLayout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

const ModernEmployeeDashboard = () => {
  const [userName, setUserName] = useState('John Doe');
  const [userEmail, setUserEmail] = useState('john@example.com');

  useEffect(() => {
    const email = localStorage.getItem('email') || 'user@example.com';
    const nameFromEmail = email.split('@')[0];
    setUserEmail(email);
    setUserName(nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1));
  }, []);

  const stats = [
    {
      icon: FileText,
      label: 'Total Claims',
      value: '12',
      color: 'blue',
    },
    {
      icon: CheckCircle,
      label: 'Approved',
      value: '8',
      color: 'green',
    },
    {
      icon: Clock,
      label: 'Pending',
      value: '3',
      color: 'yellow',
    },
    {
      icon: AlertCircle,
      label: 'Rejected',
      value: '1',
      color: 'red',
    },
  ];

  const recentClaims = [
    {
      id: 'CLM001',
      type: 'Medical',
      amount: '$500',
      date: '2024-01-15',
      status: 'Approved',
    },
    {
      id: 'CLM002',
      type: 'Travel',
      amount: '$250',
      date: '2024-01-10',
      status: 'Pending',
    },
    {
      id: 'CLM003',
      type: 'Home',
      amount: '$1200',
      date: '2024-01-05',
      status: 'Approved',
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved':
        return 'success';
      case 'Pending':
        return 'warning';
      case 'Rejected':
        return 'danger';
      default:
        return 'info';
    }
  };

  const getColorGradient = (color) => {
    const gradients = {
      blue: 'from-blue-600 to-blue-500',
      green: 'from-green-600 to-green-500',
      yellow: 'from-yellow-600 to-yellow-500',
      red: 'from-red-600 to-red-500',
      purple: 'from-purple-600 to-purple-500',
    };
    return gradients[color] || gradients.blue;
  };

  return (
    <DashboardLayout userRole="employee" userName={userName} userEmail={userEmail}>
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Welcome back, {userName.split(' ')[0]}! 👋
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Here's a summary of your insurance claims and policies.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="hover:shadow-lg transition-all duration-300">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">
                    {stat.label}
                  </p>
                  <p className="text-4xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </p>
                </div>
                <div className={`p-3 rounded-lg bg-gradient-to-br ${getColorGradient(stat.color)}`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Recent Claims */}
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Recent Claims
            </h2>
            <Button variant="primary" size="sm">
              <span className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                New Claim
              </span>
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-slate-700">
                  <th className="text-left px-4 py-3 font-semibold text-gray-700 dark:text-gray-300">
                    Claim ID
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700 dark:text-gray-300">
                    Type
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700 dark:text-gray-300">
                    Amount
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700 dark:text-gray-300">
                    Date
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700 dark:text-gray-300">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentClaims.map((claim) => (
                  <tr
                    key={claim.id}
                    className="border-b border-gray-100 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <td className="px-4 py-3 font-semibold text-gray-900 dark:text-white">
                      {claim.id}
                    </td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{claim.type}</td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400 font-semibold">
                      {claim.amount}
                    </td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{claim.date}</td>
                    <td className="px-4 py-3">
                      <Badge variant={getStatusColor(claim.status)} size="sm">
                        {claim.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4">
            <Button variant="ghost" className="w-full">
              View all claims
            </Button>
          </div>
        </Card>

        {/* Quick Actions */}
        <Card>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Quick Actions
          </h2>

          <div className="space-y-3">
            <Button variant="gradient" className="w-full justify-start">
              <span className="flex items-center gap-2">
                <Plus className="w-5 h-5" />
                File New Claim
              </span>
            </Button>
            <Button variant="outline" className="w-full justify-start border-blue-600 text-blue-600">
              <span className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                View Policies
              </span>
            </Button>
            <Button variant="outline" className="w-full justify-start border-blue-600 text-blue-600">
              <span className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Track Claims
              </span>
            </Button>
          </div>

          {/* Helpful Info */}
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-900/50">
            <p className="text-sm font-medium text-blue-900 dark:text-blue-300 mb-2">
              💡 Need Help?
            </p>
            <p className="text-xs text-blue-800 dark:text-blue-400">
              Our AI-powered chatbot is available 24/7 to answer your questions and help you with
              claims.
            </p>
            <Button
              variant="ghost"
              size="sm"
              className="w-full mt-3 text-blue-600 hover:bg-blue-100"
            >
              Chat with AI
            </Button>
          </div>
        </Card>
      </div>

      {/* Footer Info */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
        <div className="flex items-start gap-4">
          <div className="text-3xl">📊</div>
          <div className="flex-1">
            <h3 className="font-bold text-gray-900 dark:text-white mb-1">
              Your Insurance Overview
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
              You have 2 active policies with total coverage of $250,000. Your next premium payment
              is due on February 15, 2024.
            </p>
            <Button variant="primary" size="sm">
              View Full Details
            </Button>
          </div>
        </div>
      </Card>
    </DashboardLayout>
  );
};

export default ModernEmployeeDashboard;
