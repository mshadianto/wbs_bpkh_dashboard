import React from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  BarChart3, 
  Users, 
  Settings, 
  MessageCircle,
  Shield,
  Bell,
  Search,
  Filter
} from 'lucide-react';
import { ViewMode, Language } from '../types';

interface SidebarProps {
  currentView: ViewMode;
  onViewChange: (view: ViewMode) => void;
  language: Language;
  isCollapsed: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange, language, isCollapsed }) => {
  const translations = {
    id: {
      dashboard: 'Dashboard',
      reports: 'Laporan',
      analytics: 'Analitik',
      users: 'Pengguna',
      settings: 'Pengaturan',
      chatBot: 'Chat Bot',
      notifications: 'Notifikasi'
    },
    en: {
      dashboard: 'Dashboard',
      reports: 'Reports',
      analytics: 'Analytics',
      users: 'Users',
      settings: 'Settings',
      chatBot: 'Chat Bot',
      notifications: 'Notifications'
    }
  };

  const t = translations[language];

  const menuItems = [
    { id: 'dashboard' as ViewMode, icon: LayoutDashboard, label: t.dashboard },
    { id: 'chat' as ViewMode, icon: MessageCircle, label: t.chatBot },
    { id: 'reports' as ViewMode, icon: FileText, label: t.reports },
    { id: 'analytics' as ViewMode, icon: BarChart3, label: t.analytics },
    { id: 'users' as ViewMode, icon: Users, label: t.users },
    { id: 'settings' as ViewMode, icon: Settings, label: t.settings },
  ];

  return (
    <div className={`bg-slate-900 text-white transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'} min-h-screen`}>
      <div className="p-4">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Shield className="w-6 h-6 text-white" />
          </div>
          {!isCollapsed && (
            <div>
              <h1 className="text-lg font-bold">BPKH</h1>
              <p className="text-xs text-slate-400">Admin Dashboard</p>
            </div>
          )}
        </div>
      </div>

      <nav className="mt-8">
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = currentView === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-slate-800 transition-colors ${
                isActive ? 'bg-blue-600 border-r-2 border-blue-400' : ''
              }`}
            >
              <IconComponent className="w-5 h-5" />
              {!isCollapsed && <span>{item.label}</span>}
            </button>
          );
        })}
      </nav>

    </div>
  );
};

export default Sidebar;