import React from 'react';
import { 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Users,
  FileText,
  BarChart3,
  Shield
} from 'lucide-react';
import { DashboardStats, Language } from '../types';

interface DashboardProps {
  language: Language;
  stats: DashboardStats;
}

const Dashboard: React.FC<DashboardProps> = ({ language, stats }) => {
  const translations = {
    id: {
      overview: 'Ringkasan',
      totalReports: 'Total Laporan',
      newReports: 'Laporan Baru',
      inProgress: 'Sedang Diproses',
      resolved: 'Terselesaikan',
      highPriority: 'Prioritas Tinggi',
      avgResolution: 'Rata-rata Penyelesaian',
      days: 'hari',
      recentActivity: 'Aktivitas Terbaru',
      reportTrends: 'Tren Laporan',
      categoryBreakdown: 'Kategori Laporan',
      riskAnalysis: 'Analisis Risiko',
      quickActions: 'Aksi Cepat',
      viewAllReports: 'Lihat Semua Laporan',
      generateReport: 'Buat Laporan',
      manageUsers: 'Kelola Pengguna',
      systemSettings: 'Pengaturan Sistem'
    },
    en: {
      overview: 'Overview',
      totalReports: 'Total Reports',
      newReports: 'New Reports',
      inProgress: 'In Progress',
      resolved: 'Resolved',
      highPriority: 'High Priority',
      avgResolution: 'Avg Resolution',
      days: 'days',
      recentActivity: 'Recent Activity',
      reportTrends: 'Report Trends',
      categoryBreakdown: 'Category Breakdown',
      riskAnalysis: 'Risk Analysis',
      quickActions: 'Quick Actions',
      viewAllReports: 'View All Reports',
      generateReport: 'Generate Report',
      manageUsers: 'Manage Users',
      systemSettings: 'System Settings'
    }
  };

  const t = translations[language];

  const statCards = [
    {
      title: t.totalReports,
      value: stats.totalReports,
      icon: FileText,
      color: 'bg-blue-500',
      change: '+12%'
    },
    {
      title: t.newReports,
      value: stats.newReports,
      icon: AlertTriangle,
      color: 'bg-orange-500',
      change: '+5%'
    },
    {
      title: t.inProgress,
      value: stats.inProgress,
      icon: Clock,
      color: 'bg-yellow-500',
      change: '-3%'
    },
    {
      title: t.resolved,
      value: stats.resolved,
      icon: CheckCircle,
      color: 'bg-green-500',
      change: '+8%'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t.overview}</h1>
          <p className="text-gray-600">Badan Pengelola Keuangan Haji - Dashboard</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
            Sistem Aktif
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <p className="text-sm text-green-600 mt-1">{stat.change}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Report Trends */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.reportTrends}</h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center">
              <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Chart visualization would go here</p>
            </div>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.categoryBreakdown}</h3>
          <div className="space-y-3">
            {Object.entries(stats.reportsByCategory).map(([category, count]) => (
              <div key={category} className="flex items-center justify-between">
                <span className="text-gray-600 capitalize">{category}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{ width: `${(count / stats.totalReports) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.recentActivity}</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="bg-blue-500 p-2 rounded-full">
                  <FileText className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    Laporan baru: Dugaan penyalahgunaan dana
                  </p>
                  <p className="text-xs text-gray-500">2 jam yang lalu</p>
                </div>
                <div className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs">
                  Baru
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.quickActions}</h3>
          <div className="space-y-3">
            <button className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
              {t.viewAllReports}
            </button>
            <button className="w-full bg-gray-600 text-white px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium">
              {t.generateReport}
            </button>
            <button className="w-full bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
              {t.manageUsers}
            </button>
            <button className="w-full border border-gray-300 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
              {t.systemSettings}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;