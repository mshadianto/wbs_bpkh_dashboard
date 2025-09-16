import React, { useState, useEffect } from 'react';
import { 
  MessageCircle, 
  Phone, 
  Send, 
  CheckCircle, 
  AlertCircle,
  Users,
  BarChart3,
  Settings,
  Power,
  PowerOff,
  Smartphone,
  Clock,
  Shield
} from 'lucide-react';
import { wahaClient, WAHAMessage } from '../lib/waha';
import { supabase } from '../lib/supabase';
import { Language } from '../types';

interface WhatsAppBotProps {
  language: Language;
}

interface WhatsAppSession {
  name: string;
  status: 'WORKING' | 'STOPPED' | 'STARTING' | 'FAILED';
  qr?: string;
  me?: {
    id: string;
    pushName: string;
  };
}

interface BotStats {
  totalMessages: number;
  activeChats: number;
  reportsSubmitted: number;
  responseTime: number;
}

const WhatsAppBot: React.FC<WhatsAppBotProps> = ({ language }) => {
  const [session, setSession] = useState<WhatsAppSession | null>(null);
  const [messages, setMessages] = useState<WAHAMessage[]>([]);
  const [stats, setStats] = useState<BotStats>({
    totalMessages: 0,
    activeChats: 0,
    reportsSubmitted: 0,
    responseTime: 2.3
  });
  const [isLoading, setIsLoading] = useState(false);
  const [testMessage, setTestMessage] = useState('');
  const [testNumber, setTestNumber] = useState('');

  const translations = {
    id: {
      whatsappBot: 'WhatsApp Bot WBS',
      sessionStatus: 'Status Sesi',
      botStatistics: 'Statistik Bot',
      recentMessages: 'Pesan Terbaru',
      sessionControl: 'Kontrol Sesi',
      startSession: 'Mulai Sesi',
      stopSession: 'Hentikan Sesi',
      restartSession: 'Restart Sesi',
      testMessage: 'Test Pesan',
      sendTest: 'Kirim Test',
      phoneNumber: 'Nomor Telepon',
      message: 'Pesan',
      totalMessages: 'Total Pesan',
      activeChats: 'Chat Aktif',
      reportsSubmitted: 'Laporan Dikirim',
      avgResponseTime: 'Rata-rata Respon',
      seconds: 'detik',
      working: 'Aktif',
      stopped: 'Berhenti',
      starting: 'Memulai',
      failed: 'Gagal',
      sessionName: 'Nama Sesi',
      connectedAs: 'Terhubung sebagai',
      lastActivity: 'Aktivitas Terakhir',
      botFeatures: 'Fitur Bot',
      anonymousReporting: 'Pelaporan Anonim',
      multiLanguage: 'Multi Bahasa',
      autoResponse: 'Respon Otomatis',
      secureEncryption: 'Enkripsi Aman',
      configuration: 'Konfigurasi',
      webhookUrl: 'URL Webhook',
      autoReply: 'Balas Otomatis',
      enabled: 'Aktif',
      disabled: 'Nonaktif'
    },
    en: {
      whatsappBot: 'WhatsApp WBS Bot',
      sessionStatus: 'Session Status',
      botStatistics: 'Bot Statistics',
      recentMessages: 'Recent Messages',
      sessionControl: 'Session Control',
      startSession: 'Start Session',
      stopSession: 'Stop Session',
      restartSession: 'Restart Session',
      testMessage: 'Test Message',
      sendTest: 'Send Test',
      phoneNumber: 'Phone Number',
      message: 'Message',
      totalMessages: 'Total Messages',
      activeChats: 'Active Chats',
      reportsSubmitted: 'Reports Submitted',
      avgResponseTime: 'Avg Response Time',
      seconds: 'seconds',
      working: 'Working',
      stopped: 'Stopped',
      starting: 'Starting',
      failed: 'Failed',
      sessionName: 'Session Name',
      connectedAs: 'Connected as',
      lastActivity: 'Last Activity',
      botFeatures: 'Bot Features',
      anonymousReporting: 'Anonymous Reporting',
      multiLanguage: 'Multi Language',
      autoResponse: 'Auto Response',
      secureEncryption: 'Secure Encryption',
      configuration: 'Configuration',
      webhookUrl: 'Webhook URL',
      autoReply: 'Auto Reply',
      enabled: 'Enabled',
      disabled: 'Disabled'
    }
  };

  const t = translations[language];

  useEffect(() => {
    loadSessionStatus();
    loadMessages();
    loadStats();
    
    // Refresh data every 30 seconds
    const interval = setInterval(() => {
      loadSessionStatus();
      loadMessages();
      loadStats();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const loadSessionStatus = async () => {
    try {
      const status = await wahaClient.getSessionStatus();
      setSession(status);
    } catch (error) {
      console.error('Error loading session status:', error);
    }
  };

  const loadMessages = async () => {
    try {
      const messages = await wahaClient.getMessages(50);
      setMessages(messages);
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  const loadStats = async () => {
    try {
      // Load stats from database
      const { data: reports } = await supabase
        .from('reports')
        .select('*')
        .eq('contact_preference', 'WhatsApp');

      setStats(prev => ({
        ...prev,
        reportsSubmitted: reports?.length || 0,
        totalMessages: messages.length,
        activeChats: new Set(messages.map(m => m.from)).size
      }));
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const handleStartSession = async () => {
    setIsLoading(true);
    try {
      const success = await wahaClient.startSession();
      if (success) {
        setTimeout(loadSessionStatus, 2000);
      }
    } catch (error) {
      console.error('Error starting session:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStopSession = async () => {
    setIsLoading(true);
    try {
      const success = await wahaClient.stopSession();
      if (success) {
        setTimeout(loadSessionStatus, 2000);
      }
    } catch (error) {
      console.error('Error stopping session:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendTest = async () => {
    if (!testNumber || !testMessage) return;
    
    setIsLoading(true);
    try {
      const success = await wahaClient.sendMessage(testNumber, testMessage);
      if (success) {
        setTestMessage('');
        setTestNumber('');
        setTimeout(loadMessages, 1000);
      }
    } catch (error) {
      console.error('Error sending test message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'WORKING': return 'bg-green-100 text-green-800';
      case 'STOPPED': return 'bg-red-100 text-red-800';
      case 'STARTING': return 'bg-yellow-100 text-yellow-800';
      case 'FAILED': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'WORKING': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'STOPPED': return <PowerOff className="w-5 h-5 text-red-500" />;
      case 'STARTING': return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'FAILED': return <AlertCircle className="w-5 h-5 text-red-500" />;
      default: return <AlertCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl p-6">
        <div className="flex items-center space-x-3">
          <div className="bg-white/20 p-3 rounded-lg">
            <MessageCircle className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{t.whatsappBot}</h1>
            <p className="text-green-100">WAHA Integration - Session: terong_n8n</p>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{t.totalMessages}</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalMessages}</p>
            </div>
            <MessageCircle className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{t.activeChats}</p>
              <p className="text-2xl font-bold text-gray-900">{stats.activeChats}</p>
            </div>
            <Users className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{t.reportsSubmitted}</p>
              <p className="text-2xl font-bold text-gray-900">{stats.reportsSubmitted}</p>
            </div>
            <BarChart3 className="w-8 h-8 text-purple-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{t.avgResponseTime}</p>
              <p className="text-2xl font-bold text-gray-900">{stats.responseTime}s</p>
            </div>
            <Clock className="w-8 h-8 text-orange-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Session Status */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">{t.sessionStatus}</h2>
          
          {session ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(session.status)}
                  <div>
                    <p className="font-medium text-gray-900">{t.sessionName}: {session.name}</p>
                    <p className="text-sm text-gray-600">
                      Status: <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(session.status)}`}>
                        {t[session.status.toLowerCase() as keyof typeof t] || session.status}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {session.me && (
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Smartphone className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-medium text-green-900">{t.connectedAs}</p>
                      <p className="text-sm text-green-700">{session.me.pushName} ({session.me.id})</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex space-x-3">
                <button
                  onClick={handleStartSession}
                  disabled={isLoading || session.status === 'WORKING'}
                  className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-300 transition-colors flex items-center justify-center space-x-2"
                >
                  <Power className="w-4 h-4" />
                  <span>{t.startSession}</span>
                </button>
                <button
                  onClick={handleStopSession}
                  disabled={isLoading || session.status === 'STOPPED'}
                  className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 disabled:bg-gray-300 transition-colors flex items-center justify-center space-x-2"
                >
                  <PowerOff className="w-4 h-4" />
                  <span>{t.stopSession}</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Loading session status...</p>
            </div>
          )}
        </div>

        {/* Test Message */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">{t.testMessage}</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t.phoneNumber}
              </label>
              <input
                type="text"
                value={testNumber}
                onChange={(e) => setTestNumber(e.target.value)}
                placeholder="628123456789@c.us"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t.message}
              </label>
              <textarea
                value={testMessage}
                onChange={(e) => setTestMessage(e.target.value)}
                placeholder="Test message from WBS Bot"
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <button
              onClick={handleSendTest}
              disabled={isLoading || !testNumber || !testMessage}
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 transition-colors flex items-center justify-center space-x-2"
            >
              <Send className="w-4 h-4" />
              <span>{t.sendTest}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bot Features */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">{t.botFeatures}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
            <Shield className="w-6 h-6 text-blue-600" />
            <div>
              <p className="font-medium text-blue-900">{t.anonymousReporting}</p>
              <p className="text-sm text-blue-700">{t.enabled}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
            <MessageCircle className="w-6 h-6 text-green-600" />
            <div>
              <p className="font-medium text-green-900">{t.multiLanguage}</p>
              <p className="text-sm text-green-700">{t.enabled}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-4 bg-purple-50 rounded-lg">
            <Clock className="w-6 h-6 text-purple-600" />
            <div>
              <p className="font-medium text-purple-900">{t.autoResponse}</p>
              <p className="text-sm text-purple-700">{t.enabled}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-4 bg-orange-50 rounded-lg">
            <Settings className="w-6 h-6 text-orange-600" />
            <div>
              <p className="font-medium text-orange-900">{t.secureEncryption}</p>
              <p className="text-sm text-orange-700">{t.enabled}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Messages */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">{t.recentMessages}</h2>
        
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {messages.length > 0 ? (
            messages.slice(0, 10).map((message) => (
              <div key={message.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="bg-green-500 p-2 rounded-full">
                  <Phone className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">{message.from}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(message.timestamp * 1000).toLocaleString()}
                    </p>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{message.body}</p>
                  <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full mt-2">
                    {message.type}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No messages yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WhatsAppBot;