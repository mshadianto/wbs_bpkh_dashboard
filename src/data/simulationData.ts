export interface SimulationCase {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  witnesses: string;
  evidence: string;
  contactPreference: string;
  priority: string;
  riskLevel: number;
  timeline: SimulationEvent[];
  currentStep: number;
  status: string;
  assignedTo?: string;
  investigatorNotes: string[];
  attachments: string[];
  resolution?: string;
}

export interface SimulationEvent {
  id: string;
  type: string;
  description: string;
  timestamp: Date;
  user: string;
  details?: string;
  status?: string;
}

export const simulationCases: SimulationCase[] = [
  {
    id: "WB-2024-001",
    title: "Dugaan Penyalahgunaan Dana Operasional Haji",
    description: "Saya melihat ada transaksi mencurigakan dalam pengelolaan dana operasional untuk kegiatan haji tahun ini. Ada beberapa invoice yang tidak sesuai dengan kegiatan yang dilakukan, dan saya khawatir ada penyalahgunaan dana jamaah haji.",
    category: "fraud",
    location: "Kantor Pusat BPKH - Divisi Keuangan",
    witnesses: "Rekan kerja di divisi keuangan yang juga memperhatikan hal ini",
    evidence: "Screenshot invoice, dokumen perbandingan anggaran vs realisasi, email internal",
    contactPreference: "Email aman (anonim)",
    priority: "high",
    riskLevel: 8.5,
    status: "resolved",
    assignedTo: "Ahmad Investigator",
    investigatorNotes: [
      "Laporan diterima dan dilakukan verifikasi awal",
      "Ditemukan ketidaksesuaian dalam 3 invoice senilai Rp 2.1 miliar",
      "Dilakukan audit mendalam dengan tim eksternal",
      "Bukti kuat menunjukkan adanya markup harga dan vendor fiktif",
      "Kasus diserahkan ke pihak berwajib"
    ],
    attachments: ["invoice_analysis.pdf", "audit_report.pdf", "evidence_photos.zip"],
    resolution: "Kasus terbukti. Pelaku dipecat dan proses hukum dilanjutkan. Dana sebesar Rp 1.8 miliar berhasil diselamatkan. Sistem pengadaan diperbaiki dengan kontrol yang lebih ketat.",
    currentStep: 8,
    timeline: [
      {
        id: "1",
        type: "created",
        description: "Laporan diterima melalui sistem chat bot",
        timestamp: new Date("2024-01-15T09:30:00"),
        user: "Sistem",
        details: "Laporan anonim tentang dugaan penyalahgunaan dana operasional"
      },
      {
        id: "2", 
        type: "assigned",
        description: "Laporan ditugaskan kepada investigator senior",
        timestamp: new Date("2024-01-15T10:15:00"),
        user: "Admin BPKH",
        details: "Ditugaskan kepada Ahmad Investigator (Senior Investigator)"
      },
      {
        id: "3",
        type: "updated",
        description: "Status diubah menjadi 'Investigating'",
        timestamp: new Date("2024-01-16T08:00:00"),
        user: "Ahmad Investigator",
        status: "investigating",
        details: "Memulai investigasi awal dan verifikasi dokumen"
      },
      {
        id: "4",
        type: "comment",
        description: "Temuan awal: Ditemukan ketidaksesuaian dalam invoice",
        timestamp: new Date("2024-01-18T14:30:00"),
        user: "Ahmad Investigator",
        details: "3 invoice menunjukkan harga yang tidak wajar dibanding market price"
      },
      {
        id: "5",
        type: "escalated",
        description: "Kasus dieskalasi ke manajemen tingkat atas",
        timestamp: new Date("2024-01-22T11:00:00"),
        user: "Ahmad Investigator",
        details: "Potensi kerugian signifikan, memerlukan audit eksternal"
      },
      {
        id: "6",
        type: "updated",
        description: "Tim audit eksternal dilibatkan",
        timestamp: new Date("2024-01-25T09:00:00"),
        user: "Manager Audit",
        details: "KAP independen ditunjuk untuk audit forensik"
      },
      {
        id: "7",
        type: "comment",
        description: "Hasil audit: Terbukti ada penyalahgunaan dana",
        timestamp: new Date("2024-02-15T16:00:00"),
        user: "Auditor Eksternal",
        details: "Markup harga 40-60% dan vendor fiktif teridentifikasi"
      },
      {
        id: "8",
        type: "resolved",
        description: "Kasus diselesaikan dengan tindakan tegas",
        timestamp: new Date("2024-02-20T10:00:00"),
        user: "Direktur BPKH",
        details: "Pelaku dipecat, proses hukum dilanjutkan, sistem diperbaiki"
      }
    ]
  },
  {
    id: "WB-2024-002", 
    title: "Pelecehan Seksual di Tempat Kerja",
    description: "Saya mengalami pelecehan seksual berulang dari atasan saya. Beliau sering membuat komentar yang tidak pantas dan melakukan sentuhan yang tidak diinginkan. Saya takut melapor karena khawatir karir saya terancam.",
    category: "harassment",
    location: "Kantor Regional Jakarta - Lantai 5",
    witnesses: "Beberapa rekan kerja yang melihat perilaku tidak pantas tersebut",
    evidence: "Rekaman percakapan, screenshot chat WhatsApp yang tidak pantas, saksi mata",
    contactPreference: "Pertemuan langsung (rahasia)",
    priority: "critical",
    riskLevel: 9.2,
    status: "investigating",
    assignedTo: "Siti Investigator",
    investigatorNotes: [
      "Kasus sangat sensitif, memerlukan penanganan khusus",
      "Korban ditempatkan di lingkungan kerja yang aman",
      "Wawancara dengan saksi-saksi dilakukan",
      "Bukti digital sedang dianalisis"
    ],
    attachments: ["witness_statements.pdf", "digital_evidence.zip"],
    currentStep: 4,
    timeline: [
      {
        id: "1",
        type: "created", 
        description: "Laporan pelecehan seksual diterima",
        timestamp: new Date("2024-02-10T14:20:00"),
        user: "Sistem",
        details: "Laporan sensitif melalui chat bot dengan tingkat kerahasiaan tinggi"
      },
      {
        id: "2",
        type: "assigned",
        description: "Ditugaskan kepada investigator khusus kasus sensitif",
        timestamp: new Date("2024-02-10T15:00:00"),
        user: "HR Director",
        details: "Siti Investigator (Spesialis Kasus Pelecehan)"
      },
      {
        id: "3",
        type: "updated",
        description: "Korban ditempatkan di lingkungan kerja yang aman",
        timestamp: new Date("2024-02-11T09:00:00"),
        user: "Siti Investigator",
        status: "investigating",
        details: "Work from home arrangement dan dukungan psikologis"
      },
      {
        id: "4",
        type: "comment",
        description: "Wawancara dengan saksi pertama selesai",
        timestamp: new Date("2024-02-12T16:30:00"),
        user: "Siti Investigator", 
        details: "Saksi mengkonfirmasi perilaku tidak pantas yang berulang"
      }
    ]
  },
  {
    id: "WB-2024-003",
    title: "Pelanggaran Protokol Keselamatan Kerja",
    description: "Di area konstruksi gedung baru, saya melihat banyak pelanggaran protokol keselamatan. Pekerja tidak menggunakan APD lengkap, scaffolding tidak aman, dan tidak ada safety officer yang mengawasi. Saya khawatir akan terjadi kecelakaan kerja.",
    category: "safety",
    location: "Proyek Pembangunan Gedung Baru - Site B",
    witnesses: "Pekerja konstruksi lain, supervisor lapangan",
    evidence: "Foto-foto kondisi lapangan, video pelanggaran safety, dokumen SOP yang diabaikan",
    contactPreference: "Panggilan telepon (nomor anonim)",
    priority: "high",
    riskLevel: 7.8,
    status: "new",
    currentStep: 1,
    investigatorNotes: [],
    attachments: [],
    timeline: [
      {
        id: "1",
        type: "created",
        description: "Laporan pelanggaran keselamatan kerja diterima",
        timestamp: new Date("2024-02-25T11:45:00"),
        user: "Sistem",
        details: "Laporan urgent tentang risiko keselamatan di proyek konstruksi"
      }
    ]
  }
];

export const getSimulationCase = (id: string): SimulationCase | undefined => {
  return simulationCases.find(case => case.id === id);
};

export const getSimulationProgress = (caseId: string): number => {
  const case_ = getSimulationCase(caseId);
  if (!case_) return 0;
  
  const totalSteps = 8; // Standard WBS process steps
  return (case_.currentStep / totalSteps) * 100;
};

export const getNextSimulationStep = (caseId: string): string => {
  const case_ = getSimulationCase(caseId);
  if (!case_) return "";
  
  const steps = [
    "Laporan Diterima",
    "Verifikasi Awal", 
    "Penugasan Investigator",
    "Investigasi Mendalam",
    "Pengumpulan Bukti",
    "Analisis & Evaluasi",
    "Tindakan Korektif",
    "Penutupan Kasus"
  ];
  
  return case_.currentStep < steps.length ? steps[case_.currentStep] : "Selesai";
};