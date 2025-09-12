import React, { useState, useEffect } from 'react';
import { Menu, X, Globe, Bell, User, LogOut, AlertTriangle, Users, FileText } from 'lucide-react';
import { useUsers, useReports, useDashboardStats } from './hooks/useSupabase';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ReportsManager from './components/ReportsManager';
import Analytics from './components/Analytics';
import UserManagement from './components/UserManagement';
import ChatBot from './components/ChatBot';
import { ViewMode, Language } from './types';

function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('dashboard');
  const [language, setLanguage] = useState<Language>('id');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentUser] = useState({
    name: 'Admin BPKH',
    role: 'admin',
    avatar: null
  });

  // Use Supabase hooks for data
  const { users, loading: usersLoading, error: usersError } = useUsers();
  const { reports, loading: reportsLoading, error: reportsError } = useReports();
  const { stats: dashboardStats, loading: statsLoading, error: statsError } = useDashboardStats();

  const translations = {
    id: {
      logout: 'Keluar',
      profile: 'Profil',
      notifications: 'Notifikasi'
    },
    en: {
      logout: 'Logout',
      profile: 'Profile',
      notifications: 'Notifications'
    }
  };

  const t = translations[language];

  const renderCurrentView = () => {
    // Show loading state
    if (usersLoading || reportsLoading || statsLoading) {
      return (
        <div className="p-6 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">{language === 'id' ? 'Memuat data...' : 'Loading data...'}</p>
          </div>
        </div>
      );
    }

    switch (currentView) {
      case 'dashboard':
        return <Dashboard language={language} stats={dashboardStats || {} as any} />;
      case 'chat':
        return <ChatBot language={language} onReportSubmit={() => window.location.reload()} />;
      case 'reports':
        return <ReportsManager language={language} reports={reports} />;
      case 'analytics':
        return <Analytics language={language} stats={dashboardStats} />;
      case 'users':
        return <UserManagement language={language} users={users} />;
      case 'settings':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              {language === 'id' ? 'Pengaturan Sistem' : 'System Settings'}
            </h1>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <p className="text-gray-600">
                {language === 'id' 
                  ? 'Pengaturan sistem dan konfigurasi akan ditampilkan di sini.'
                  : 'System settings and configuration options will be displayed here.'
                }
              </p>
            </div>
          </div>
        );
      default:
        return <Dashboard language={language} stats={dashboardStats || {} as any} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar
        currentView={currentView}
        onViewChange={setCurrentView}
        language={language}
        isCollapsed={sidebarCollapsed}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {sidebarCollapsed ? <Menu className="w-5 h-5" /> : <X className="w-5 h-5" />}
              </button>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">
                  {language === 'id' ? 'Dashboard Admin BPKH' : 'BPKH Admin Dashboard'}
                </h1>
                <p className="text-sm text-gray-600">
                  {language === 'id' 
                    ? 'Sistem Manajemen Pelaporan Pelanggaran'
                    : 'Whistleblowing Management System'
                  }
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Language Toggle */}
              <button
                onClick={() => setLanguage(language === 'id' ? 'en' : 'id')}
                className="flex items-center space-x-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <Globe className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">
                  {language === 'id' ? 'EN' : 'ID'}
                </span>
              </button>

              {/* Notifications */}
              <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors group">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                  3
                </span>
                
                {/* Notification Dropdown */}
                <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-semibold text-gray-900">
                        {language === 'id' ? 'Notifikasi Terbaru' : 'Recent Notifications'}
                      </h3>
                      <span className="text-xs text-gray-500">3 {language === 'id' ? 'baru' : 'new'}</span>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3 p-2 hover:bg-gray-50 rounded-lg">
                        <div className="bg-red-100 p-1 rounded-full">
                          <AlertTriangle className="w-3 h-3 text-red-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-gray-900">
                            {language === 'id' ? 'Laporan Prioritas Tinggi' : 'High Priority Report'}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {language === 'id' ? 'Dugaan penyalahgunaan dana operasional' : 'Suspected misuse of operational funds'}
                          </p>
                          <p className="text-xs text-gray-400">2 {language === 'id' ? 'jam lalu' : 'hours ago'}</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3 p-2 hover:bg-gray-50 rounded-lg">
                        <div className="bg-orange-100 p-1 rounded-full">
                          <Users className="w-3 h-3 text-orange-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-gray-900">
                            {language === 'id' ? 'Laporan Pelecehan' : 'Harassment Report'}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {language === 'id' ? 'Pelecehan di tempat kerja' : 'Workplace harassment incident'}
                          </p>
                          <p className="text-xs text-gray-400">4 {language === 'id' ? 'jam lalu' : 'hours ago'}</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3 p-2 hover:bg-gray-50 rounded-lg">
                        <div className="bg-blue-100 p-1 rounded-full">
                          <FileText className="w-3 h-3 text-blue-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-gray-900">
                            {language === 'id' ? 'Laporan Baru' : 'New Report'}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {language === 'id' ? 'Pelanggaran prosedur keamanan' : 'Security procedure violation'}
                          </p>
                          <p className="text-xs text-gray-400">6 {language === 'id' ? 'jam lalu' : 'hours ago'}</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <button 
                        onClick={() => setCurrentView('reports')}
                        className="w-full text-xs text-blue-600 hover:text-blue-800 font-medium"
                      >
                        {language === 'id' ? 'Lihat Semua Laporan' : 'View All Reports'}
                      </button>
                    </div>
                  </div>
                </div>
              </button>

              {/* User Menu */}
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{currentUser.name}</p>
                  <p className="text-xs text-gray-500 capitalize">{currentUser.role}</p>
                </div>
                <div className="relative">
                  <button className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto">
          {renderCurrentView()}
        </main>
      </div>
    </div>
  );
}

export default App;