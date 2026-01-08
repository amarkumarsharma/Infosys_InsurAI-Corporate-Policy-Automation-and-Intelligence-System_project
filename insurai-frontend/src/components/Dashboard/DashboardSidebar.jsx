import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  LayoutDashboard,
  FileText,
  Users,
  Settings,
  LogOut,
  ChevronDown,
  Home,
  BarChart3,
  Shield,
  AlertTriangle,
  MessageSquare,
  Clock,
  CheckCircle,
  Bell,
} from 'lucide-react';

const DashboardSidebar = ({ userRole = 'employee', userName = 'User', userEmail = 'user@example.com' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('email');
    navigate('/');
  };

  const menuItems = {
    employee: [
      { icon: Home, label: 'Dashboard', href: '/employee/dashboard' },
      { icon: FileText, label: 'My Claims', href: '#' },
      { icon: CheckCircle, label: 'Policies', href: '#' },
      { icon: MessageSquare, label: 'Queries', href: '#' },
      { icon: Bell, label: 'Notifications', href: '#' },
    ],
    admin: [
      { icon: Home, label: 'Dashboard', href: '/admin/dashboard' },
      { icon: FileText, label: 'All Claims', href: '#' },
      { icon: AlertTriangle, label: 'Fraud Detection', href: '#' },
      { icon: Users, label: 'User Management', href: '#' },
      { icon: BarChart3, label: 'Analytics', href: '#' },
      { icon: Shield, label: 'Policies', href: '/admin/policy' },
    ],
    agent: [
      { icon: Home, label: 'Dashboard', href: '/agent/dashboard' },
      { icon: FileText, label: 'My Claims', href: '#' },
      { icon: Users, label: 'Clients', href: '#' },
      { icon: Clock, label: 'Availability', href: '#' },
      { icon: BarChart3, label: 'Reports', href: '#' },
    ],
    hr: [
      { icon: Home, label: 'Dashboard', href: '/hr/dashboard' },
      { icon: Users, label: 'Employees', href: '#' },
      { icon: FileText, label: 'Claims', href: '#' },
      { icon: Shield, label: 'Policies', href: '#' },
      { icon: BarChart3, label: 'Analytics', href: '#' },
      { icon: AlertTriangle, label: 'Fraud Detection', href: '#' },
    ],
  };

  const currentMenu = menuItems[userRole] || menuItems.employee;

  return (
    <div className={`fixed left-0 top-0 h-screen bg-gradient-to-b from-slate-900 to-slate-800 border-r border-slate-700 transition-all duration-300 ${isOpen ? 'w-64' : 'w-20'} z-40`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-700">
        {isOpen && (
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-xl text-white">InsurAI</span>
          </div>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Profile Section */}
      <div className="p-4 border-b border-slate-700">
        {isOpen && (
          <>
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-sm font-bold text-white">
                {userName.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-white">{userName}</div>
                <div className="text-xs text-gray-400">{userEmail}</div>
              </div>
            </div>
            <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg px-3 py-2 text-xs text-blue-300">
              <span className="font-semibold capitalize">{userRole}</span> Account
            </div>
          </>
        )}
      </div>

      {/* Menu Items */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        {currentMenu.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;
          return (
            <button
              key={item.label}
              onClick={() => navigate(item.href)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                isActive
                  ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/50'
                  : 'text-gray-300 hover:bg-slate-700'
              }`}
              title={!isOpen ? item.label : ''}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {isOpen && <span className="font-medium">{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* Footer Section */}
      <div className="border-t border-slate-700 p-4 space-y-2">
        <button
          onClick={() => setIsProfileOpen(!isProfileOpen)}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-slate-700 transition-colors"
          title={!isOpen ? 'Settings' : ''}
        >
          <Settings className="w-5 h-5 flex-shrink-0" />
          {isOpen && <span className="font-medium">Settings</span>}
        </button>
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
          title={!isOpen ? 'Logout' : ''}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {isOpen && <span className="font-medium">Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default DashboardSidebar;
