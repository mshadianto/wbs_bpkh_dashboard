import React, { useState, useEffect } from 'react';
import { Menu, X, Globe, Bell, User, LogOut, AlertTriangle, Users, FileText } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ReportsManager from './components/ReportsManager';
import Analytics from './components/Analytics';
import UserManagement from './components/UserManagement';
import ChatBot from './components/ChatBot';
import { ViewMode, Language, DashboardStats, Report, User as UserType } from './types';

function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('dashboard');
  const [language, setLanguage] = useState<Language>('id');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentUser] = useState({
    name: 'Admin BPKH',
    role: 'admin',
    avatar: null
  });

  // Mock data - in real app this would come from API
  const [dashboardStats] = useState<DashboardStats>({
    totalReports: 156,
    newReports: 23,
    inProgress: 45,
    resolved: 88,
    highPriority: 12,
    averageResolutionTime: 5.2,
    reportsByCategory: {
      fraud: 45,
      harassment: 32,
      safety: 28,
      corruption: 35,
      other: 16
    },
    reportsByMonth: [
      { month: 'Jan', count: 12 },
      { month: 'Feb', count: 19 },
      { month: 'Mar', count: 15 },
      { month: 'Apr', count: 22 },
      { month: 'May', count: 28 },
      { month: 'Jun', count: 23 }
    ],
    riskTrends: [
      { date: '2024-01', risk: 3.2 },
      { date: '2024-02', risk: 2.8 },
      { date: '2024-03', risk: 3.5 },
      { date: '2024-04', risk: 2.9 },
      { date: '2024-05', risk: 3.1 },
      { date: '2024-06', risk: 2.7 }
    ]
  });

  const [reports] = useState<Report[]>([
    {
      id: 'WB-001',
      title: 'Dugaan Penyalahgunaan Dana Operasional',
      category: 'fraud',
      description: 'Terdapat indikasi penyalahgunaan dana operasional untuk kepentingan pribadi oleh pejabat di departemen keuangan.',
      location: 'Departemen Keuangan - Lantai 3',
      witnesses: 'Staf administrasi yang melihat transaksi mencurigakan',
      evidence: 'Dokumen transaksi, email internal, rekaman percakapan',
      contactPreference: 'Email aman (anonim)',
      status: 'investigating',
      priority: 'high',
      submittedAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-20'),
      assignedTo: 'INV-001',
      investigator: {
        id: 'INV-001',
        name: 'Dr. Ahmad Santoso',
        email: 'ahmad.santoso@bpkh.go.id',
        role: 'investigator',
        department: 'Internal Audit',
        lastLogin: new Date(),
        isActive: true
      },
      timeline: [],
      attachments: [],
      isAnonymous: true,
      riskLevel: 8.5
    },
    {
      id: 'WB-002',
      title: 'Pelecehan di Tempat Kerja',
      category: 'harassment',
      description: 'Laporan pelecehan verbal dan intimidasi yang dilakukan oleh supervisor terhadap bawahan.',
      location: 'Divisi SDM - Ruang Meeting B',
      witnesses: 'Beberapa rekan kerja yang hadir dalam meeting',
      evidence: 'Rekaman audio, testimoni saksi',
      contactPreference: 'Pertemuan langsung (rahasia)',
      status: 'new',
      priority: 'critical',
      submittedAt: new Date('2024-01-22'),
      updatedAt: new Date('2024-01-22'),
      timeline: [],
      attachments: [],
      isAnonymous: true,
      riskLevel: 9.2
    }
  ]);

  const [users] = useState<UserType[]>([
    {
      id: 'USR-001',
      name: 'Dr. Ahmad Santoso',
      email: 'ahmad.santoso@bpkh.go.id',
      role: 'investigator',
      department: 'Internal Audit',
      lastLogin: new Date('2024-01-20'),
      isActive: true
    },
    {
      id: 'USR-002',
      name: 'Siti Nurhaliza, S.H.',
      email: 'siti.nurhaliza@bpkh.go.id',
      role: 'manager',
      department: 'Legal & Compliance',
      lastLogin: new Date('2024-01-19'),
      isActive: true
    },
    {
      id: 'USR-003',
      name: 'Budi Prasetyo, M.M.',
      email: 'budi.prasetyo@bpkh.go.id',
      role: 'admin',
      department: 'IT & Security',
      lastLogin: new Date('2024-01-21'),
      isActive: true
    }
  ]);

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
    switch (currentView) {
      case 'dashboard':
        return <Dashboard language={language} stats={dashboardStats} />;
      case 'chat':
        return <ChatBot language={language} />;
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
        return <Dashboard language={language} stats={dashboardStats} />;
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