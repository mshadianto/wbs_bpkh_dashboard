import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Edit, 
  Trash2,
  AlertTriangle,
  CheckCircle,
  Clock,
  User,
  Calendar,
  MapPin,
  FileText
} from 'lucide-react';
import { Report, Language } from '../types';

interface ReportsManagerProps {
  language: Language;
  reports: Report[];
}

const ReportsManager: React.FC<ReportsManagerProps> = ({ language, reports }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  const translations = {
    id: {
      reportsManagement: 'Manajemen Laporan',
      searchReports: 'Cari laporan...',
      allStatus: 'Semua Status',
      new: 'Baru',
      investigating: 'Investigasi',
      resolved: 'Selesai',
      closed: 'Ditutup',
      escalated: 'Eskalasi',
      priority: 'Prioritas',
      assignedTo: 'Ditugaskan ke',
      submittedAt: 'Dikirim pada',
      actions: 'Aksi',
      view: 'Lihat',
      edit: 'Edit',
      delete: 'Hapus',
      exportData: 'Ekspor Data',
      reportDetails: 'Detail Laporan',
      category: 'Kategori',
      description: 'Deskripsi',
      location: 'Lokasi',
      witnesses: 'Saksi',
      evidence: 'Bukti',
      timeline: 'Timeline',
      attachments: 'Lampiran',
      updateStatus: 'Update Status',
      assignInvestigator: 'Tugaskan Investigator',
      addComment: 'Tambah Komentar'
    },
    en: {
      reportsManagement: 'Reports Management',
      searchReports: 'Search reports...',
      allStatus: 'All Status',
      new: 'New',
      investigating: 'Investigating',
      resolved: 'Resolved',
      closed: 'Closed',
      escalated: 'Escalated',
      priority: 'Priority',
      assignedTo: 'Assigned to',
      submittedAt: 'Submitted at',
      actions: 'Actions',
      view: 'View',
      edit: 'Edit',
      delete: 'Delete',
      exportData: 'Export Data',
      reportDetails: 'Report Details',
      category: 'Category',
      description: 'Description',
      location: 'Location',
      witnesses: 'Witnesses',
      evidence: 'Evidence',
      timeline: 'Timeline',
      attachments: 'Attachments',
      updateStatus: 'Update Status',
      assignInvestigator: 'Assign Investigator',
      addComment: 'Add Comment'
    }
  };

  const t = translations[language];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new': return <AlertTriangle className="w-4 h-4 text-orange-500" />;
      case 'investigating': return <Clock className="w-4 h-4 text-blue-500" />;
      case 'resolved': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'closed': return <CheckCircle className="w-4 h-4 text-gray-500" />;
      case 'escalated': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default: return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-orange-100 text-orange-800';
      case 'investigating': return 'bg-blue-100 text-blue-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      case 'escalated': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || report.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{t.reportsManagement}</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
          <Download className="w-4 h-4" />
          <span>{t.exportData}</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder={t.searchReports}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">{t.allStatus}</option>
              <option value="new">{t.new}</option>
              <option value="investigating">{t.investigating}</option>
              <option value="resolved">{t.resolved}</option>
              <option value="closed">{t.closed}</option>
              <option value="escalated">{t.escalated}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Reports Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID / {t.category}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t.description}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t.priority}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t.assignedTo}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t.submittedAt}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t.actions}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredReports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">#{report.id.slice(-6)}</div>
                      <div className="text-sm text-gray-500 capitalize">{report.category}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-xs truncate">{report.title}</div>
                    <div className="text-sm text-gray-500 max-w-xs truncate">{report.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(report.status)}
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(report.status)}`}>
                        {t[report.status as keyof typeof t] || report.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${getPriorityColor(report.priority)}`}></div>
                      <span className="text-sm text-gray-900 capitalize">{report.priority}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {report.investigator ? (
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-900">{report.investigator.name}</span>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-500">Unassigned</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {report.submittedAt.toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setSelectedReport(report)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Report Detail Modal */}
      {selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">{t.reportDetails}</h2>
                <button
                  onClick={() => setSelectedReport(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">{t.category}</label>
                    <p className="text-gray-900 capitalize">{selectedReport.category}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">{t.description}</label>
                    <p className="text-gray-900">{selectedReport.description}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">{t.location}</label>
                    <p className="text-gray-900">{selectedReport.location}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">{t.witnesses}</label>
                    <p className="text-gray-900">{selectedReport.witnesses}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">{t.evidence}</label>
                    <p className="text-gray-900">{selectedReport.evidence}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-2">Status & Assignment</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Status:</span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(selectedReport.status)}`}>
                          {selectedReport.status}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Priority:</span>
                        <span className="text-sm font-medium capitalize">{selectedReport.priority}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      {t.updateStatus}
                    </button>
                    <button className="w-full bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                      {t.assignInvestigator}
                    </button>
                    <button className="w-full border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                      {t.addComment}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportsManager;