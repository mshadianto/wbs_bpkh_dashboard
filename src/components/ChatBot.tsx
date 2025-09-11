import React, { useState, useEffect, useRef } from 'react';
import { Send, Shield, Lock, FileText, AlertTriangle, Users, DollarSign, Heart, HardHat, MessageCircle, CheckCircle } from 'lucide-react';
import { Language } from '../types';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  options?: string[];
  component?: string;
}

interface ReportData {
  category: string;
  description: string;
  location: string;
  witnesses: string;
  evidence: string;
  contactPreference: string;
}

interface ChatBotProps {
  language: Language;
}

const ChatBot: React.FC<ChatBotProps> = ({ language }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [currentStep, setCurrentStep] = useState('welcome');
  const [reportData, setReportData] = useState<ReportData>({
    category: '',
    description: '',
    location: '',
    witnesses: '',
    evidence: '',
    contactPreference: ''
  });
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const translations = {
    id: {
      title: "LaporAman BPKH",
      subtitle: "Platform Pelaporan Anonim",
      anonymous: "100% Anonim",
      encrypted: "Terenkripsi",
      confidential: "Rahasia",
      welcome: "🛡️ **Selamat datang di LaporAman BPKH**\n\nSaya di sini untuk membantu Anda melaporkan pelanggaran dengan aman dan anonim. Identitas Anda akan tetap sepenuhnya rahasia sepanjang proses ini.\n\nApakah kita mulai?",
      startReport: "Mulai Laporan",
      learnMore: "Pelajari Lebih Lanjut",
      howItWorks: "📋 **Cara Kerja LaporAman BPKH:**\n\n🔒 **100% Anonim** - Tidak ada informasi pribadi yang dikumpulkan\n🛡️ **Aman** - Semua data dienkripsi dan dilindungi\n⚡ **Cepat** - Proses terpandu sederhana hanya membutuhkan beberapa menit\n📞 **Rahasia** - Laporan Anda langsung ke personel yang berwenang\n\nSiap untuk memulai laporan Anda?",
      selectCategory: "Mari mulai dengan jenis insiden yang ingin Anda laporkan. Silakan pilih kategori yang paling menggambarkan masalah tersebut:",
      categories: {
        fraud: "Penipuan Keuangan",
        harassment: "Pelecehan/Diskriminasi", 
        safety: "Pelanggaran Keselamatan",
        corruption: "Korupsi/Suap",
        other: "Pelanggaran Lainnya"
      },
      thankYouCategory: "Terima kasih telah memilih **{category}**. Sekarang, mohon berikan deskripsi rinci tentang apa yang terjadi. Sertakan sebanyak mungkin informasi yang Anda rasa nyaman untuk dibagikan:",
      whereOccurred: "Di mana insiden ini terjadi? Anda bisa seumum atau sespesifik yang Anda inginkan (mis., 'Departemen Keuangan', 'Gedung A - Lantai 3', 'Kerja jarak jauh'):",
      witnesses: "Apakah ada saksi untuk insiden ini? Jika ya, mohon berikan nama atau deskripsi. Jika tidak, cukup ketik 'Tidak ada':",
      evidence: "Apakah Anda memiliki bukti pendukung (dokumen, email, rekaman, dll.)? Mohon jelaskan apa yang Anda miliki:",
      contactPreference: "Terakhir, bagaimana Anda ingin dihubungi mengenai laporan ini?",
      contactOptions: {
        anonymous: "Anonim - Tidak perlu kontak",
        email: "Email aman (anonim)",
        phone: "Panggilan telepon (nomor anonim)",
        meeting: "Pertemuan langsung (rahasia)"
      },
      reviewSummary: "Sempurna! Izinkan saya menunjukkan ringkasan laporan Anda sebelum pengiriman:",
      reportSummary: "Ringkasan Laporan",
      category: "Kategori:",
      description: "Deskripsi:",
      location: "Lokasi:",
      witnessesLabel: "Saksi:",
      evidenceLabel: "Bukti:",
      contactPref: "Preferensi Kontak:",
      submitReport: "Kirim Laporan",
      makeChanges: "Buat Perubahan",
      reportSubmitted: "✅ **Laporan Berhasil Dikirim!**\n\nLaporan Anda telah dikirim dengan aman kepada pihak berwenang. Berikut yang akan terjadi selanjutnya:\n\n📋 **ID Laporan:** WB-{id}\n⏱️ **Waktu Respons:** 3-5 hari kerja\n🔒 **Status:** Anda dapat memeriksa status kapan saja (sepenuhnya anonim)\n\nTerima kasih telah berani berbicara. Keberanian Anda membantu menciptakan lingkungan kerja yang lebih aman untuk semua orang.",
      submitAnother: "Kirim Laporan Lain",
      exit: "Keluar",
      thankYou: "Terima kasih telah menggunakan LaporAman BPKH. Tetap aman! 🛡️",
      startOver: "Saya siap membantu Anda mengirim laporan lain. Kategori apa yang paling menggambarkan insiden baru ini?",
      typeResponse: "Ketik respons Anda...",
      safetyPrivacy: "Keamanan dan privasi Anda adalah prioritas utama kami"
    },
    en: {
      title: "SecureReport BPKH",
      subtitle: "Anonymous Reporting Platform",
      anonymous: "100% Anonymous",
      encrypted: "Encrypted",
      confidential: "Confidential",
      welcome: "🛡️ **Welcome to SecureReport BPKH**\n\nI'm here to help you report misconduct safely and anonymously. Your identity will remain completely confidential throughout this process.\n\nShall we begin?",
      startReport: "Start Report",
      learnMore: "Learn More",
      howItWorks: "📋 **How SecureReport BPKH Works:**\n\n🔒 **100% Anonymous** - No personal information is collected\n🛡️ **Secure** - All data is encrypted and protected\n⚡ **Fast** - Simple guided process takes just minutes\n📞 **Confidential** - Your report goes directly to authorized personnel\n\nReady to start your report?",
      selectCategory: "Let's begin with the type of incident you'd like to report. Please select the category that best describes the issue:",
      categories: {
        fraud: "Financial Fraud",
        harassment: "Harassment/Discrimination",
        safety: "Safety Violations", 
        corruption: "Corruption/Bribery",
        other: "Other Misconduct"
      },
      thankYouCategory: "Thank you for selecting **{category}**. Now, please provide a detailed description of what happened. Include as much information as you feel comfortable sharing:",
      whereOccurred: "Where did this incident occur? You can be as general or specific as you'd like (e.g., 'Finance Department', 'Building A - 3rd Floor', 'Remote work'):",
      witnesses: "Were there any witnesses to this incident? If yes, please provide names or descriptions. If no, simply type 'None':",
      evidence: "Do you have any supporting evidence (documents, emails, recordings, etc.)? Please describe what you have available:",
      contactPreference: "Finally, how would you prefer to be contacted about this report?",
      contactOptions: {
        anonymous: "Anonymous - No contact needed",
        email: "Secure email (anonymous)",
        phone: "Phone call (anonymous number)",
        meeting: "In-person meeting (confidential)"
      },
      reviewSummary: "Perfect! Let me show you a summary of your report before submission:",
      reportSummary: "Report Summary",
      category: "Category:",
      description: "Description:",
      location: "Location:",
      witnessesLabel: "Witnesses:",
      evidenceLabel: "Evidence:",
      contactPref: "Contact Preference:",
      submitReport: "Submit Report",
      makeChanges: "Make Changes",
      reportSubmitted: "✅ **Report Submitted Successfully!**\n\nYour report has been securely transmitted to the appropriate authorities. Here's what happens next:\n\n📋 **Report ID:** WB-{id}\n⏱️ **Response Time:** 3-5 business days\n🔒 **Status:** You can check status anytime (completely anonymous)\n\nThank you for speaking up. Your courage helps create a safer workplace for everyone.",
      submitAnother: "Submit Another Report",
      exit: "Exit",
      thankYou: "Thank you for using SecureReport BPKH. Stay safe! 🛡️",
      startOver: "I'm ready to help you submit another report. What category best describes this new incident?",
      typeResponse: "Type your response...",
      safetyPrivacy: "Your safety and privacy are our top priority"
    }
  };

  const t = translations[language];

  const categories = [
    { id: 'fraud', label: t.categories.fraud, icon: DollarSign, color: 'text-red-500' },
    { id: 'harassment', label: t.categories.harassment, icon: Users, color: 'text-orange-500' },
    { id: 'safety', label: t.categories.safety, icon: HardHat, color: 'text-yellow-500' },
    { id: 'corruption', label: t.categories.corruption, icon: AlertTriangle, color: 'text-purple-500' },
    { id: 'other', label: t.categories.other, icon: FileText, color: 'text-blue-500' }
  ];

  const contactOptions = [
    t.contactOptions.anonymous,
    t.contactOptions.email,
    t.contactOptions.phone,
    t.contactOptions.meeting
  ];

  useEffect(() => {
    // Initial welcome message
    setMessages([]);
    addBotMessage(t.welcome, [t.startReport, t.learnMore]);
  }, [language]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const addMessage = (text: string, isBot: boolean, options?: string[], component?: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isBot,
      timestamp: new Date(),
      options,
      component
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const addBotMessage = (text: string, options?: string[], component?: string) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      addMessage(text, true, options, component);
    }, 1000);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    
    addMessage(input, false);
    processUserInput(input);
    setInput('');
  };

  const handleOptionClick = (option: string) => {
    addMessage(option, false);
    processUserInput(option);
  };

  const processUserInput = (userInput: string) => {
    switch (currentStep) {
      case 'welcome':
        if (userInput === t.startReport) {
          setCurrentStep('category');
          addBotMessage(t.selectCategory, [], 'categorySelect');
        } else if (userInput === t.learnMore) {
          addBotMessage(t.howItWorks, [t.startReport]);
        }
        break;
        
      case 'category':
        if (categories.find(cat => cat.label === userInput)) {
          setReportData(prev => ({ ...prev, category: userInput }));
          setCurrentStep('description');
          addBotMessage(t.thankYouCategory.replace('{category}', userInput));
        }
        break;
        
      case 'description':
        setReportData(prev => ({ ...prev, description: userInput }));
        setCurrentStep('location');
        addBotMessage(t.whereOccurred);
        break;
        
      case 'location':
        setReportData(prev => ({ ...prev, location: userInput }));
        setCurrentStep('witnesses');
        addBotMessage(t.witnesses);
        break;
        
      case 'witnesses':
        setReportData(prev => ({ ...prev, witnesses: userInput }));
        setCurrentStep('evidence');
        addBotMessage(t.evidence);
        break;
        
      case 'evidence':
        setReportData(prev => ({ ...prev, evidence: userInput }));
        setCurrentStep('contact');
        addBotMessage(t.contactPreference, contactOptions);
        break;
        
      case 'contact':
        setReportData(prev => ({ ...prev, contactPreference: userInput }));
        setCurrentStep('review');
        addBotMessage(t.reviewSummary, [], 'reviewReport');
        break;
        
      case 'review':
        if (userInput === t.submitReport) {
          setCurrentStep('complete');
          const reportId = Math.random().toString(36).substr(2, 9).toUpperCase();
          addBotMessage(t.reportSubmitted.replace('{id}', reportId), [t.submitAnother, t.exit]);
        } else if (userInput === t.makeChanges) {
          setCurrentStep('category');
          addBotMessage(t.selectCategory, [], 'categorySelect');
        }
        break;
        
      case 'complete':
        if (userInput === t.submitAnother) {
          // Reset everything
          setReportData({
            category: '',
            description: '',
            location: '',
            witnesses: '',
            evidence: '',
            contactPreference: ''
          });
          setCurrentStep('category');
          addBotMessage(t.startOver, [], 'categorySelect');
        } else if (userInput === t.exit) {
          addBotMessage(t.thankYou);
        }
        break;
    }
  };

  const CategorySelector = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
      {categories.map((category) => {
        const IconComponent = category.icon;
        return (
          <button
            key={category.id}
            onClick={() => handleOptionClick(category.label)}
            className="flex items-center space-x-3 p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 text-left group"
          >
            <IconComponent className={`w-6 h-6 ${category.color} group-hover:scale-110 transition-transform`} />
            <span className="font-medium text-gray-800">{category.label}</span>
          </button>
        );
      })}
    </div>
  );

  const ReviewReport = () => (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mt-4 space-y-4">
      <div className="flex items-center space-x-2 mb-4">
        <FileText className="w-5 h-5 text-blue-500" />
        <h3 className="text-lg font-semibold text-gray-800">{t.reportSummary}</h3>
      </div>
      
      <div className="space-y-3">
        <div>
          <label className="text-sm font-medium text-gray-600">{t.category}</label>
          <p className="text-gray-800">{reportData.category}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-600">{t.description}</label>
          <p className="text-gray-800 bg-gray-50 p-3 rounded">{reportData.description}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-600">{t.location}</label>
          <p className="text-gray-800">{reportData.location}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-600">{t.witnessesLabel}</label>
          <p className="text-gray-800">{reportData.witnesses}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-600">{t.evidenceLabel}</label>
          <p className="text-gray-800">{reportData.evidence}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-600">{t.contactPref}</label>
          <p className="text-gray-800">{reportData.contactPreference}</p>
        </div>
      </div>
      
      <div className="flex space-x-3 pt-4 border-t border-gray-200">
        <button
          onClick={() => handleOptionClick(t.submitReport)}
          className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center justify-center space-x-2"
        >
          <CheckCircle className="w-4 h-4" />
          <span>{t.submitReport}</span>
        </button>
        <button
          onClick={() => handleOptionClick(t.makeChanges)}
          className="flex-1 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors font-medium"
        >
          {t.makeChanges}
        </button>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white shadow-sm border border-gray-200 rounded-lg mb-6">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-800">{t.title}</h1>
                  <p className="text-sm text-gray-600">{t.subtitle}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-green-50 px-3 py-1 rounded-full">
                  <Lock className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-700">{t.anonymous}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Interface */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 h-[600px] flex flex-col">
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[80%] ${message.isBot ? 'bg-gray-100 text-gray-800' : 'bg-blue-600 text-white'} rounded-lg px-4 py-3`}>
                  <div className="whitespace-pre-line">{message.text}</div>
                  
                  {/* Render special components */}
                  {message.component === 'categorySelect' && <CategorySelector />}
                  {message.component === 'reviewReport' && <ReviewReport />}
                  
                  {/* Option buttons */}
                  {message.options && message.options.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {message.options.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => handleOptionClick(option)}
                          className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm hover:bg-blue-700 transition-colors"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg px-4 py-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          {currentStep !== 'complete' && (
            <div className="border-t border-gray-200 p-4">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={t.typeResponse}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <div className="flex items-center justify-center space-x-4">
            <div className="flex items-center space-x-1">
              <Lock className="w-4 h-4" />
              <span>{t.encrypted}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Shield className="w-4 h-4" />
              <span>{t.anonymous}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Heart className="w-4 h-4" />
              <span>{t.confidential}</span>
            </div>
          </div>
          <p className="mt-2">{t.safetyPrivacy}</p>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;