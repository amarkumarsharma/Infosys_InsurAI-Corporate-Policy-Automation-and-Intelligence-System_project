import React from 'react';
import DashboardSidebar from './DashboardSidebar';
import DashboardHeader from './DashboardHeader';

const DashboardLayout = ({
  children,
  userRole = 'employee',
  userName = 'User',
  userEmail = 'user@example.com',
}) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      {/* Sidebar */}
      <DashboardSidebar userRole={userRole} userName={userName} userEmail={userEmail} />

      {/* Main Content */}
      <div className="ml-64">
        {/* Header */}
        <DashboardHeader userRole={userRole} userName={userName} />

        {/* Content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
