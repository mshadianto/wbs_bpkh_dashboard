import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  PieChart, 
  Calendar,
  Download,
  Filter
} from 'lucide-react';
import { DashboardStats, Language } from '../types';

interface AnalyticsProps {
  language: Language;
  stats: DashboardStats;
}

const Analytics: React.FC<AnalyticsProps> = ({ language, stats }) => {
  const translations = {
    id: {
      analytics: 'Analitik & Laporan',
      reportTrends: 'Tren Laporan',
      categoryAnalysis: 'Analisis Kategori',
      resolutionMetrics: 'Metrik Penyelesaian',
      riskAssessment: 'Penilaian Risiko',
      monthlyReports: 'Laporan Bulanan',
      exportReport: 'Ekspor Laporan',
      filterData: 'Filter Data',
      totalCases: 'Total Kasus',
      avgResolutionTime: 'Rata-rata Waktu Penyelesaian',
      successRate: 'Tingkat Keberhasilan',
      riskLevel: 'Tingkat Risiko',
      days: 'hari',
      thisMonth: 'Bulan Ini',
      lastMonth: 'Bulan Lalu',
      increase: 'Naik',
      decrease: 'Turun',
      stable: 'Stabil'
    },
    en: {
      analytics: 'Analytics & Reports',
      reportTrends: 'Report Trends',
      categoryAnalysis: 'Category Analysis',
      resolutionMetrics: 'Resolution Metrics',
      riskAssessment: 'Risk Assessment',
      monthlyReports: 'Monthly Reports',
      exportReport: 'Export Report',
      filterData: 'Filter Data',
      totalCases: 'Total Cases',
      avgResolutionTime: 'Avg Resolution Time',
      successRate: 'Success Rate',
      riskLevel: 'Risk Level',
      days: 'days',
      thisMonth: 'This Month',
      lastMonth: 'Last Month',
      increase: 'Increase',
      decrease: 'Decrease',
      stable: 'Stable'
    }
  };

  const t = translations[language];

  const kpiCards = [
    {
      title: t.totalCases,
      value: stats.totalReports,
      change: '+12%',
      trend: 'up',
      icon: BarChart3
    },
    {
      title: t.avgResolutionTime,
      value: `${stats.averageResolutionTime} ${t.days}`,
      change: '-8%',
      trend: 'down',
      icon: Calendar
    },
    {
      title: t.successRate,
      value: '94.2%',
      change: '+2.1%',
      trend: 'up',
      icon: TrendingUp
    },
    {
      title: t.riskLevel,
      value: 'Medium',
      change: 'Stable',
      trend: 'stable',
      icon: PieChart
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t.analytics}</h1>
          <p className="text-gray-600">Comprehensive reporting and analytics dashboard</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4" />
            <span>{t.filterData}</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="w-4 h-4" />
            <span>{t.exportReport}</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiCards.map((kpi, index) => {
          const IconComponent = kpi.icon;
          const getTrendColor = (trend: string) => {
            switch (trend) {
              case 'up': return 'text-green-600';
              case 'down': return 'text-red-600';
              default: return 'text-gray-600';
            }
          };

          const getTrendIcon = (trend: string) => {
            switch (trend) {
              case 'up': return <TrendingUp className="w-4 h-4" />;
              case 'down': return <TrendingDown className="w-4 h-4" />;
              default: return <div className="w-4 h-4 bg-gray-400 rounded-full"></div>;
            }
          };

          return (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <IconComponent className="w-5 h-5 text-blue-600" />
                </div>
                <div className={`flex items-center space-x-1 ${getTrendColor(kpi.trend)}`}>
                  {getTrendIcon(kpi.trend)}
                  <span className="text-sm font-medium">{kpi.change}</span>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{kpi.title}</p>
                <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Report Trends Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">{t.reportTrends}</h3>
            <select className="border border-gray-300 rounded-lg px-3 py-1 text-sm">
              <option>Last 6 months</option>
              <option>Last year</option>
              <option>All time</option>
            </select>
          </div>
          <div className="h-80 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center">
              <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 font-medium">Monthly Report Trends</p>
              <p className="text-sm text-gray-400">Interactive chart would display here</p>
            </div>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">{t.categoryAnalysis}</h3>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              View Details
            </button>
          </div>
          <div className="space-y-4">
            {Object.entries(stats.reportsByCategory).map(([category, count]) => {
              const percentage = (count / stats.totalReports) * 100;
              return (
                <div key={category} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 capitalize">{category}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">{count} cases</span>
                      <span className="text-sm font-medium text-gray-900">{percentage.toFixed(1)}%</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Resolution Metrics */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">{t.resolutionMetrics}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-3xl font-bold text-green-600 mb-2">87%</div>
            <div className="text-sm text-green-700 font-medium">Cases Resolved</div>
            <div className="text-xs text-green-600 mt-1">Within SLA</div>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <div className="text-3xl font-bold text-yellow-600 mb-2">13%</div>
            <div className="text-sm text-yellow-700 font-medium">In Progress</div>
            <div className="text-xs text-yellow-600 mt-1">Active Investigation</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-3xl font-bold text-blue-600 mb-2">5.2</div>
            <div className="text-sm text-blue-700 font-medium">Avg Days</div>
            <div className="text-xs text-blue-600 mt-1">To Resolution</div>
          </div>
        </div>
      </div>

      {/* Risk Assessment */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">{t.riskAssessment}</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-4">Risk Distribution</h4>
            <div className="space-y-3">
              {[
                { level: 'Critical', count: 3, color: 'bg-red-500' },
                { level: 'High', count: 12, color: 'bg-orange-500' },
                { level: 'Medium', count: 28, color: 'bg-yellow-500' },
                { level: 'Low', count: 45, color: 'bg-green-500' }
              ].map((risk) => (
                <div key={risk.level} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${risk.color}`}></div>
                    <span className="text-sm font-medium text-gray-700">{risk.level}</span>
                  </div>
                  <span className="text-sm text-gray-900">{risk.count} cases</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-4">Risk Trends</h4>
            <div className="h-32 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <TrendingUp className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">Risk trend visualization</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;