import React, { useState } from 'react';
import { Bell, Search, Moon, Sun, User, ChevronDown } from 'lucide-react';
import Card from '../ui/Card';

const DashboardHeader = ({ userRole = 'employee', userName = 'User' }) => {
  const [isDark, setIsDark] = useState(true);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  return (
    <div className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700 sticky top-0 z-30">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left Section - Search */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search anything..."
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Right Section - Actions */}
          <div className="flex items-center space-x-4 ml-4">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
              >
                <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              {isNotificationsOpen && (
                <Card className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-800 z-40">
                  <div className="text-sm font-semibold mb-4">Notifications</div>
                  <div className="space-y-3">
                    {[
                      { title: 'Claim Approved', time: '2 hours ago', icon: '✓' },
                      { title: 'New Policy Available', time: '5 hours ago', icon: '📋' },
                      { title: 'Payment Confirmed', time: '1 day ago', icon: '✔' },
                    ].map((notif, i) => (
                      <div key={i} className="flex items-start space-x-3 pb-3 border-b border-gray-100 dark:border-slate-700 last:border-0">
                        <div className="text-xl mt-1">{notif.icon}</div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 dark:text-white">{notif.title}</p>
                          <p className="text-xs text-gray-500">{notif.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              )}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
            >
              {isDark ? <Sun className="w-5 h-5 text-gray-400" /> : <Moon className="w-5 h-5 text-gray-600" />}
            </button>

            {/* Divider */}
            <div className="w-px h-6 bg-gray-200 dark:bg-slate-700"></div>

            {/* User Profile */}
            <div className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors cursor-pointer">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-sm font-bold text-white">
                {userName.charAt(0).toUpperCase()}
              </div>
              <div className="text-sm">
                <div className="font-medium text-gray-900 dark:text-white">{userName}</div>
                <div className="text-xs text-gray-500 capitalize">{userRole}</div>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
