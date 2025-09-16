// 🛡️ WBS BPKH Enhanced - Windows Ready
// Copy seluruh kode ini ke src/App.jsx

import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  AlertTriangle, 
  FileText, 
  Phone, 
  Mail, 
  MessageSquare, 
  Eye, 
  EyeOff, 
  ChevronRight, 
  BarChart3, 
  Users, 
  Clock, 
  CheckCircle, 
  Star, 
  Globe, 
  Lock, 
  Smartphone, 
  Headphones,
  Upload,
  Send,
  ArrowRight,
  TrendingUp,
  Activity,
  AlertCircle,
  Settings,
  Download,
  Filter,
  Search,
  MessageCircle,
  Bot,
  X,
  Minimize2,
  Maximize2,
  ThumbsUp,
  ThumbsDown,
  Copy,
  Paperclip
} from 'lucide-react';

const WhistleblowingSystem = () => {
  const [currentView, setCurrentView] = useState('home');
  const [language, setLanguage] = useState('id');
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const [chatbotMinimized, setChatbotMinimized] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      type: 'bot',
      message: 'Selamat datang di Asisten WBS BPKH! 🤖\n\nSaya siap membantu Anda secara anonim 24/7. Bagaimana saya bisa membantu?',
      timestamp: new Date().toISOString(),
      options: [
        'Cara melaporkan pelanggaran',
        'Jenis-jenis pelanggaran',
        'Keamanan dan anonimitas',
        'Status laporan saya'
      ]
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [anonymousId] = useState('ANON-' + Math.random().toString(36).substr(2, 9).toUpperCase());
  const [reportForm, setReportForm] = useState({
    category: '',
    incident_type: '',
    description: '',
    location: '',
    date: '',
    evidence: null,
    urgency: 'medium'
  });
  const [caseStats, setCaseStats] = useState({
    totalReports: 347,
    resolved: 289,
    inProgress: 42,
    pending: 16,
    avgResponseTime: '18 jam',
    satisfactionRate: 4.7
  });

  // Translations untuk multi-language
  const translations = {
    id: {
      title: 'Sistem Pelaporan Pelanggaran BPKH',
      subtitle: 'Laporkan dugaan pelanggaran dengan aman dan terpercaya',
      reportIncident: 'Laporkan Pelanggaran',
      trackReport: 'Lacak Laporan',
      dashboard: 'Dashboard',
      anonymous: 'Anonim',
      identified: 'Teridentifikasi',
      categories: {
        corruption: 'Korupsi & Suap',
        hajiFund: 'Penyalahgunaan Dana Haji',
        discrimination: 'Diskriminasi',
        fraud: 'Penipuan',
        ethics: 'Pelanggaran Etika',
        other: 'Lainnya'
      }
    },
    en: {
      title: 'BPKH Whistleblowing System',
      subtitle: 'Report suspected violations safely and confidentially',
      reportIncident: 'Report Incident',
      trackReport: 'Track Report',
      dashboard: 'Dashboard',
      anonymous: 'Anonymous',
      identified: 'Identified',
      categories: {
        corruption: 'Corruption & Bribery',
        hajiFund: 'Hajj Fund Misuse',
        discrimination: 'Discrimination',
        fraud: 'Fraud',
        ethics: 'Ethics Violation',
        other: 'Others'
      }
    },
    ar: {
      title: 'نظام الإبلاغ عن المخالفات - هيئة إدارة المالية للحج',
      subtitle: 'أبلغ عن المخالفات المشتبه فيها بأمان وسرية',
      reportIncident: 'أبلغ عن حادثة',
      trackReport: 'تتبع التقرير',
      dashboard: 'لوحة التحكم',
      anonymous: 'مجهول',
      identified: 'معرف',
      categories: {
        corruption: 'الفساد والرشوة',
        hajiFund: 'إساءة استخدام أموال الحج',
        discrimination: 'التمييز',
        fraud: 'الاحتيال',
        ethics: 'انتهاك الأخلاق',
        other: 'أخرى'
      }
    }
  };

  const t = translations[language];

  // Chatbot AI Responses - Enhanced untuk Windows
  const getBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('cara melaporkan') || message.includes('how to report')) {
      return {
        message: '📋 Ada beberapa cara untuk melaporkan pelanggaran:\n\n1. 📝 Form Online - Isi formulir pelaporan di website ini\n2. ☎️ Hotline 24/7 - Hubungi 0800-1-BPKH (2754)\n3. 💬 Chat dengan saya secara anonim\n4. 📧 Email terenkripsi ke wbs@bpkh.go.id\n\n🔒 Semuanya dijamin aman dan rahasia dengan enkripsi tingkat militer!',
        options: ['Mulai membuat laporan', 'Penjelasan keamanan sistem', 'Jenis pelanggaran apa saja?']
      };
    }
    
    if (message.includes('jenis pelanggaran') || message.includes('kategori')) {
      return {
        message: '🎯 Berikut jenis pelanggaran yang dapat dilaporkan di BPKH:\n\n🤝 Korupsi & Suap\n🕋 Penyalahgunaan Dana Haji\n⚖️ Diskriminasi & Harassment\n💰 Penipuan & Fraud\n📋 Pelanggaran Etika\n🏢 Konflik Kepentingan\n📊 Manipulasi Data Keuangan\n🔒 Pelanggaran Keamanan Data\n\n❓ Ada yang ingin Anda laporkan?',
        options: ['Ya, saya ingin melaporkan', 'Butuh penjelasan lebih detail', 'Bagaimana jika saya ragu?']
      };
    }
    
    if (message.includes('keamanan') || message.includes('anonim') || message.includes('rahasia')) {
      return {
        message: '🛡️ Keamanan dan anonimitas adalah prioritas utama BPKH:\n\n🔐 Enkripsi AES 2048-bit untuk semua data\n👤 Zero IP logging - kami TIDAK menyimpan alamat IP\n🛡️ No metadata collection\n🆔 Anonymous ID Anda: ' + anonymousId + '\n🚫 Anti-retaliation policy ketat\n⚖️ Perlindungan hukum penuh UU No. 31/1999\n🔒 Server aman ISO 27001 certified\n\n✅ Anda 100% aman melaporkan tanpa takut!',
        options: ['Saya siap melaporkan', 'Apa itu anti-retaliation?', 'Bisakah dideteksi identitas saya?']
      };
    }
    
    if (message.includes('status laporan') || message.includes('track') || message.includes('lacak')) {
      return {
        message: '🔍 Untuk melacak status laporan Anda:\n\n1. 📋 Gunakan ID laporan yang diberikan saat submit\n2. 🌐 Masukkan di halaman "Lacak Laporan"\n3. ⏱️ Lihat timeline progress real-time\n4. 📱 Dapatkan notifikasi update status\n\n💡 Jika Anda belum punya ID laporan, saya bisa bantu membuatkan laporan baru.',
        options: ['Lacak laporan sekarang', 'Buat laporan baru', 'Saya lupa ID laporan']
      };
    }
    
    if (message.includes('mulai') || message.includes('buat laporan') || message.includes('melaporkan')) {
      return {
        message: '🚀 Excellent! Saya akan memandu Anda membuat laporan step-by-step.\n\nUntuk memulai, silakan pilih kategori pelanggaran yang paling sesuai dengan situasi Anda:',
        options: ['Korupsi & Suap', 'Penyalahgunaan Dana Haji', 'Diskriminasi', 'Penipuan', 'Pelanggaran Etika', 'Lainnya'],
        action: 'start_report'
      };
    }
    
    if (message.includes('korupsi') || message.includes('suap')) {
      return {
        message: '⚠️ Anda memilih kategori KORUPSI & SUAP.\n\nIni adalah pelanggaran serius yang meliputi:\n• 💰 Menerima atau memberi suap\n• 🏛️ Penyalahgunaan wewenang\n• 🎁 Gratifikasi tidak sah\n• 📈 Mark-up anggaran/tender\n• 🤝 Kolusi dalam pengadaan\n\n🔥 Kategori ini mendapat prioritas investigasi TINGGI!\n\nApakah Anda siap melanjutkan ke form pelaporan?',
        options: ['Ya, lanjut ke form', 'Butuh informasi lebih detail', 'Saya masih ragu'],
        action: 'goto_report'
      };
    }
    
    if (message.includes('dana haji') || message.includes('hajj fund')) {
      return {
        message: '🕋 PENYALAHGUNAAN DANA HAJI - Pelanggaran sangat serius!\n\nKami memahami betapa sakralnya dana haji. Pelanggaran meliputi:\n\n💸 Penggunaan dana di luar ketentuan syariah\n📊 Manipulasi laporan keuangan haji\n🎯 Investasi tidak sesuai prinsip syariah\n👥 Nepotisme dalam tender haji\n📋 Falsifikasi dokumen jamaah\n💼 Markup biaya penyelenggaraan\n\n🔥 BPKH berkomitmen melindungi amanah jamaah!\n\nApakah Anda menyaksikan hal seperti ini?',
        options: ['Ya, saya ingin melaporkan', 'Butuh bukti apa saja?', 'Bagaimana prosesnya?']
      };
    }
    
    if (message.includes('bukti') || message.includes('evidence') || message.includes('dokumen')) {
      return {
        message: '📁 Bukti yang dapat membantu investigasi BPKH:\n\n📄 Dokumen (PDF, Word, Excel, PowerPoint)\n📸 Foto/Screenshot percakapan\n🎥 Video rekaman (jika ada)\n💬 Chat/Email/WhatsApp\n📊 Data transaksi/transfer\n📋 Surat/memo internal\n🎧 Rekaman audio (jika legal)\n👥 Nama saksi (opsional)\n\n🔒 Semua file akan dienkripsi dan aman!\n📏 Upload maksimal 10MB per file\n🛡️ Server secure dengan sertifikat ISO 27001',
        options: ['Saya punya bukti', 'Bagaimana jika tidak ada bukti?', 'Apakah bukti wajib?']
      };
    }
    
    if (message.includes('tidak ada bukti') || message.includes('tanpa bukti')) {
      return {
        message: '✅ Tidak masalah! Laporan tetap sangat berharga tanpa bukti fisik:\n\n👁️ Kesaksian mata Anda sudah cukup penting\n📝 Ceritakan detail yang Anda ingat\n📅 Kapan kejadian berlangsung\n📍 Di mana lokasi kejadian\n👥 Siapa saja yang terlibat\n💰 Perkiraan nilai kerugian (jika ada)\n🎯 Dampak yang ditimbulkan\n\n🕵️ Tim investigasi profesional BPKH akan menindaklanjuti dengan teknik investigasi modern!\n\n⏱️ Laporan akan diproses dalam 1x24 jam.',
        options: ['Lanjut buat laporan', 'Apa yang terjadi setelah lapor?', 'Berapa lama prosesnya?']
      };
    }
    
    if (message.includes('anti-retaliation') || message.includes('pembalasan')) {
      return {
        message: '🛡️ ANTI-RETALIATION POLICY BPKH:\n\n📜 Berdasarkan UU No. 31/1999 tentang Pemberantasan Korupsi\n⚖️ PP No. 43/2018 tentang Tata Cara Pelaksanaan Peran Serta Masyarakat\n🔒 Perlindungan identitas whistleblower\n🚫 DILARANG: pemecatan, demosi, mutasi tidak wajar\n🚫 DILARANG: intimidasi, ancaman, tekanan\n💼 Dukungan hukum gratis jika terjadi retaliation\n📞 Hotline khusus perlindungan saksi\n\n⚡ Pelanggaran anti-retaliation = PIDANA!',
        options: ['Saya merasa aman sekarang', 'Bagaimana jika saya karyawan?', 'Prosedur jika ada retaliation?']
      };
    }
    
    // Default enhanced response
    return {
      message: '🤖 Terima kasih telah menghubungi Asisten AI WBS BPKH!\n\nSaya di sini untuk membantu Anda dengan:\n\n📋 Panduan membuat laporan pelanggaran\n🔒 Informasi keamanan dan enkripsi sistem\n📊 Jenis-jenis pelanggaran yang dapat dilaporkan\n🕵️ Proses investigasi dan tindak lanjut\n💬 Konseling dan dukungan emosional\n⚖️ Informasi perlindungan hukum\n📱 Cara menggunakan semua fitur platform\n\n💡 Saya tersedia 24/7 untuk membantu Anda!\n\nApa yang bisa saya bantu hari ini?',
      options: ['Cara melaporkan pelanggaran', 'Jenis-jenis pelanggaran', 'Keamanan dan anonimitas', 'Status laporan saya']
    };
  };

  const sendChatMessage = (message) => {
    if (!message.trim()) return;
    
    const userMessage = {
      id: Date.now(),
      type: 'user',
      message: message,
      timestamp: new Date().toISOString()
    };
    
    setChatMessages(prev => [...prev, userMessage]);
    setChatInput('');
    setIsTyping(true);
    
    // Simulate realistic bot typing delay
    setTimeout(() => {
      const botResponse = getBotResponse(message);
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        message: botResponse.message,
        timestamp: new Date().toISOString(),
        options: botResponse.options,
        action: botResponse.action
      };
      
      setChatMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const selectChatOption = (option, action) => {
    // Handle special actions
    if (action === 'goto_report' && option.includes('lanjut ke form')) {
      setChatbotOpen(false);
      setCurrentView('report');
      return;
    }
    
    if (action === 'start_report' && option !== 'Lainnya') {
      // Pre-fill form category based on chat selection
      const categoryMap = {
        'Korupsi & Suap': 'corruption',
        'Penyalahgunaan Dana Haji': 'hajiFund',
        'Diskriminasi': 'discrimination',
        'Penipuan': 'fraud',
        'Pelanggaran Etika': 'ethics'
      };
      
      if (categoryMap[option]) {
        setReportForm(prev => ({ ...prev, category: categoryMap[option] }));
      }
    }
    
    sendChatMessage(option);
  };

  const rateChatMessage = (messageId, rating) => {
    setChatMessages(prev => 
      prev.map(msg => 
        msg.id === messageId 
          ? { ...msg, rating: rating }
          : msg
      )
    );
  };

  // HomePage Component
  const HomePage = () => (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center shadow-lg">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">BPKH WBS</h1>
                <p className="text-sm text-gray-600">Whistleblowing System Enhanced</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <select 
                value={language} 
                onChange={(e) => setLanguage(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white shadow-sm"
              >
                <option value="id">🇮🇩 Indonesia</option>
                <option value="en">🇺🇸 English</option>
                <option value="ar">🇸🇦 العربية</option>
              </select>
              
              <button 
                onClick={() => setCurrentView('dashboard')}
                className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg text-gray-700 transition-colors shadow-sm"
              >
                📊 Dashboard
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t.title}
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            {t.subtitle}
          </p>
          
          {/* Quick Action Buttons */}
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            <div 
              onClick={() => setCurrentView('report')}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all cursor-pointer border-2 border-transparent hover:border-red-200 group transform hover:scale-105"
            >
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-red-200 transition-colors">
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{t.reportIncident}</h3>
              <p className="text-gray-600">Laporkan dugaan pelanggaran secara aman dan rahasia</p>
            </div>
            
            <div 
              onClick={() => setCurrentView('track')}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all cursor-pointer border-2 border-transparent hover:border-blue-200 group transform hover:scale-105"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                <Search className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{t.trackReport}</h3>
              <p className="text-gray-600">Pantau status dan perkembangan laporan Anda</p>
            </div>

            <div 
              onClick={() => setChatbotOpen(true)}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all cursor-pointer border-2 border-transparent hover:border-purple-200 group transform hover:scale-105"
            >
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
                <MessageCircle className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">🤖 Chat AI Anonim</h3>
              <p className="text-gray-600">Konsultasi dan panduan real-time dengan AI assistant</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all cursor-pointer border-2 border-transparent hover:border-green-200 group transform hover:scale-105">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                <Headphones className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">☎️ Hotline 24/7</h3>
              <p className="text-gray-600">Hubungi kami kapan saja melalui telepon</p>
              <p className="text-green-600 font-semibold mt-2">0800-1-BPKH (2754)</p>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500">
              <div className="text-3xl font-bold text-green-600">{caseStats.totalReports}</div>
              <div className="text-gray-600">Total Laporan</div>
              <div className="text-sm text-green-600 mt-1">+12% bulan ini</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500">
              <div className="text-3xl font-bold text-blue-600">{caseStats.resolved}</div>
              <div className="text-gray-600">Terselesaikan</div>
              <div className="text-sm text-blue-600 mt-1">83.3% success rate</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-orange-500">
              <div className="text-3xl font-bold text-orange-600">{caseStats.avgResponseTime}</div>
              <div className="text-gray-600">Avg Response</div>
              <div className="text-sm text-orange-600 mt-1">-25% improvement</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-purple-500">
              <div className="text-3xl font-bold text-purple-600">{caseStats.satisfactionRate}★</div>
              <div className="text-gray-600">Rating Kepuasan</div>
              <div className="text-sm text-purple-600 mt-1">dari 1,247 reviews</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            🔒 Keamanan & Perlindungan Terjamin
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Lock className="w-10 h-10 text-green-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">🔐 Enkripsi End-to-End</h4>
              <p className="text-gray-600">Laporan Anda dienkripsi dengan standar militer AES 2048-bit. Tidak ada yang bisa membaca kecuali investigator resmi.</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Eye className="w-10 h-10 text-blue-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">👤 Anonimitas Terjaga</h4>
              <p className="text-gray-600">Zero IP logging, no metadata collection, dan anonymous ID system. Identitas Anda 100% aman.</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Shield className="w-10 h-10 text-purple-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">⚖️ Perlindungan Hukum</h4>
              <p className="text-gray-600">Dilindungi UU No. 31/1999, PP No. 43/2018, dan regulasi anti-retaliation yang ketat.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  // Simplified version untuk deployment - Components lain akan ada di file terpisah
  const ReportForm = () => (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <button 
          onClick={() => setCurrentView('home')}
          className="mb-6 flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ChevronRight className="w-5 h-5 transform rotate-180 mr-2" />
          🏠 Kembali ke Beranda
        </button>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">📝 Form Pelaporan Enhanced</h2>
            <p className="text-gray-600">Sistem pelaporan dengan AI guidance dan enkripsi tingkat enterprise</p>
            
            {reportForm.category && (
              <div className="mt-4 p-3 bg-purple-50 border border-purple-200 rounded-lg">
                <div className="flex items-center justify-center space-x-2">
                  <MessageCircle className="w-4 h-4 text-purple-600" />
                  <span className="text-sm text-purple-700">
                    🤖 Kategori dipilih dari Chat AI: <strong>
                      {reportForm.category === 'corruption' ? 'Korupsi & Suap' :
                       reportForm.category === 'hajiFund' ? 'Penyalahgunaan Dana Haji' :
                       reportForm.category === 'discrimination' ? 'Diskriminasi' :
                       reportForm.category === 'fraud' ? 'Penipuan' :
                       reportForm.category === 'ethics' ? 'Pelanggaran Etika' : 'Lainnya'}
                    </strong>
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-yellow-800 mb-3">🚧 Under Development</h3>
            <p className="text-yellow-700 mb-3">Form pelaporan lengkap sedang dalam pengembangan. Sementara ini, Anda dapat:</p>
            <div className="space-y-2">
              <button 
                onClick={() => setChatbotOpen(true)}
                className="block w-full bg-purple-100 hover:bg-purple-200 text-purple-800 py-2 px-4 rounded-lg transition-colors text-left"
              >
                🤖 Gunakan Chat AI untuk panduan pelaporan
              </button>
              <button className="block w-full bg-green-100 hover:bg-green-200 text-green-800 py-2 px-4 rounded-lg transition-colors text-left">
                ☎️ Hubungi Hotline: 0800-1-BPKH (2754)
              </button>
              <button className="block w-full bg-blue-100 hover:bg-blue-200 text-blue-800 py-2 px-4 rounded-lg transition-colors text-left">
                📧 Email: wbs@bpkh.go.id
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const TrackReport = () => (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <button 
          onClick={() => setCurrentView('home')}
          className="mb-6 flex items-center text-gray-600 hover:text-gray-900"
        >
          <ChevronRight className="w-5 h-5 transform rotate-180 mr-2" />
          🏠 Kembali ke Beranda
        </button>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">🔍 Lacak Status Laporan</h2>
            <p className="text-gray-600">Masukkan ID laporan untuk melihat status dan perkembangan real-time</p>
          </div>

          <div className="max-w-md mx-auto">
            <div className="flex">
              <input 
                type="text"
                placeholder="WBS-2025-XXXXXX"
                className="flex-1 border border-gray-300 rounded-l-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-r-lg transition-colors">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="mt-8 p-6 bg-gray-50 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">📊 Sample: Status Investigating</h3>
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                🔍 Investigating
              </span>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <div className="ml-4">
                  <p className="font-medium text-gray-900">✅ Laporan Diterima</p>
                  <p className="text-sm text-gray-500">15 Jan 2025, 14:30</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <div className="ml-4">
                  <p className="font-medium text-gray-900">🔍 Verifikasi Initial</p>
                  <p className="text-sm text-gray-500">15 Jan 2025, 16:45</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                <div className="ml-4">
                  <p className="font-medium text-gray-900">🕵️ Sedang Diinvestigasi</p>
                  <p className="text-sm text-gray-500">16 Jan 2025, 09:00 - Ongoing</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                <div className="ml-4">
                  <p className="font-medium text-gray-500">📋 Kesimpulan & Tindak Lanjut</p>
                  <p className="text-sm text-gray-400">Menunggu hasil investigasi</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const Dashboard = () => (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setCurrentView('home')}
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <ChevronRight className="w-5 h-5 transform rotate-180 mr-2" />
                🏠 Kembali
              </button>
              <h1 className="text-2xl font-bold text-gray-900">📊 Analytics Dashboard</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Laporan</p>
                <p className="text-3xl font-bold text-gray-900">{caseStats.totalReports}</p>
                <p className="text-sm text-green-600">+12% dari bulan lalu</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Terselesaikan</p>
                <p className="text-3xl font-bold text-gray-900">{caseStats.resolved}</p>
                <p className="text-sm text-green-600">83.3% success rate</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Dalam Proses</p>
                <p className="text-3xl font-bold text-gray-900">{caseStats.inProgress}</p>
                <p className="text-sm text-orange-600">Avg 5 hari</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Response Time</p>
                <p className="text-3xl font-bold text-gray-900">{caseStats.avgResponseTime}</p>
                <p className="text-sm text-green-600">-25% improvement</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">📈 Analytics Overview</h3>
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h4 className="text-lg font-semibold text-gray-700 mb-2">Advanced Analytics Coming Soon</h4>
            <p className="text-gray-600">Dashboard analytics lengkap dengan visualisasi data, trend analysis, dan reporting tools sedang dalam pengembangan.</p>
          </div>
        </div>
      </div>
    </div>
  );

  // Chatbot Component dengan Windows optimization
  const ChatBot = () => (
    <>
      {/* Floating Chat Button */}
      {!chatbotOpen && (
        <button
          onClick={() => setChatbotOpen(true)}
          className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group z-50 animate-pulse hover:animate-none"
        >
          <MessageCircle className="w-8 h-8 group-hover:scale-110 transition-transform" />
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center animate-bounce">
            <span className="text-xs font-bold text-white">AI</span>
          </div>
          
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-600 to-blue-600 animate-ping opacity-20"></div>
        </button>
      )}

      {/* Chat Window */}
      {chatbotOpen && (
        <div className={`fixed bottom-6 right-6 w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 transition-all duration-300 ${
          chatbotMinimized ? 'h-16' : 'h-[600px]'
        }`}>
          {/* Chat Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-t-2xl">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold">🤖 Asisten WBS BPKH</h3>
                <p className="text-xs opacity-90">🆔 Anonymous ID: {anonymousId}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setChatbotMinimized(!chatbotMinimized)}
                className="p-1 hover:bg-white/20 rounded transition-colors"
              >
                {chatbotMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setChatbotOpen(false)}
                className="p-1 hover:bg-white/20 rounded transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {!chatbotMinimized && (
            <>
              {/* Chat Messages */}
              <div className="flex-1 p-4 overflow-y-auto max-h-96 space-y-4">
                {chatMessages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] p-3 rounded-2xl ${
                      msg.type === 'user' 
                        ? 'bg-green-600 text-white rounded-br-md' 
                        : 'bg-gray-100 text-gray-900 rounded-bl-md'
                    }`}>
                      <p className="text-sm whitespace-pre-line">{msg.message}</p>
                      
                      {/* Bot Options */}
                      {msg.options && (
                        <div className="mt-3 space-y-2">
                          {msg.options.map((option, index) => (
                            <button
                              key={index}
                              onClick={() => selectChatOption(option, msg.action)}
                              className="block w-full text-left p-2 bg-white/10 hover:bg-white/20 rounded-lg text-xs transition-colors border border-white/20"
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Rating for bot messages */}
                      {msg.type === 'bot' && !msg.options && (
                        <div className="mt-3 flex items-center space-x-2">
                          <span className="text-xs opacity-70">Helpful?</span>
                          <button
                            onClick={() => rateChatMessage(msg.id, 'helpful')}
                            className={`p-1 rounded ${
                              msg.rating === 'helpful' 
                                ? 'bg-green-200 text-green-800' 
                                : 'bg-white/10 hover:bg-white/20'
                            }`}
                          >
                            <ThumbsUp className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => rateChatMessage(msg.id, 'not-helpful')}
                            className={`p-1 rounded ${
                              msg.rating === 'not-helpful' 
                                ? 'bg-red-200 text-red-800' 
                                : 'bg-white/10 hover:bg-white/20'
                            }`}
                          >
                            <ThumbsDown className="w-3 h-3" />
                          </button>
                        </div>
                      )}

                      <div className="flex items-center justify-between mt-1">
                        <p className="text-xs opacity-70">
                          {new Date(msg.timestamp).toLocaleTimeString('id-ID', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </p>
                        {msg.type === 'bot' && (
                          <button
                            onClick={() => navigator.clipboard?.writeText(msg.message)}
                            className="p-1 opacity-50 hover:opacity-100 transition-opacity"
                            title="Copy message"
                          >
                            <Copy className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 p-3 rounded-2xl rounded-bl-md">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Chat Input */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors" title="Attach file">
                    <Paperclip className="w-4 h-4" />
                  </button>
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendChatMessage(chatInput)}
                    placeholder="Ketik pesan Anda..."
                    className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                  />
                  <button
                    onClick={() => sendChatMessage(chatInput)}
                    disabled={!chatInput.trim()}
                    className="p-2 bg-green-600 text-white rounded-full hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                    title="Send message"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
                
                {/* Quick Actions */}
                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    onClick={() => sendChatMessage('Cara melaporkan pelanggaran')}
                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-xs text-gray-700 transition-colors"
                  >
                    📝 Cara Lapor
                  </button>
                  <button
                    onClick={() => sendChatMessage('Jenis pelanggaran')}
                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-xs text-gray-700 transition-colors"
                  >
                    📋 Jenis Pelanggaran
                  </button>
                  <button
                    onClick={() => sendChatMessage('Keamanan sistem')}
                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-xs text-gray-700 transition-colors"
                  >
                    🔒 Keamanan
                  </button>
                  <button
                    onClick={() => {
                      setChatbotOpen(false);
                      setCurrentView('report');
                    }}
                    className="px-3 py-1 bg-green-100 hover:bg-green-200 rounded-full text-xs text-green-700 transition-colors"
                  >
                    🚀 Langsung Lapor
                  </button>
                </div>

                {/* Anonymous Notice */}
                <div className="mt-3 p-2 bg-green-50 rounded-lg">
                  <p className="text-xs text-green-700 flex items-center">
                    <Shield className="w-3 h-3 mr-1" />
                    🔒 Chat ini sepenuhnya anonim dan terenkripsi AES-256
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );

  // Main App Render
  return (
    <div className="font-sans">
      {currentView === 'home' && <HomePage />}
      {currentView === 'report' && <ReportForm />}
      {currentView === 'dashboard' && <Dashboard />}
      {currentView === 'track' && <TrackReport />}
      
      {/* Chatbot - Always available on all pages */}
      <ChatBot />
    </div>
  );
};

export default WhistleblowingSystem;