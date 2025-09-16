export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'investigator' | 'manager' | 'viewer';
  department: string;
  avatar?: string;
  lastLogin: Date;
  isActive: boolean;
}

export interface Report {
  id: string;
  title: string;
  category: 'fraud' | 'harassment' | 'safety' | 'corruption' | 'other';
  description: string;
  location: string;
  witnesses: string;
  evidence: string;
  contactPreference: string;
  status: 'new' | 'investigating' | 'resolved' | 'closed' | 'escalated';
  priority: 'low' | 'medium' | 'high' | 'critical';
  submittedAt: Date;
  updatedAt: Date;
  assignedTo?: string;
  investigator?: User;
  timeline: TimelineEvent[];
  attachments: Attachment[];
  isAnonymous: boolean;
  riskLevel: number;
}

export interface TimelineEvent {
  id: string;
  reportId: string;
  type: 'created' | 'assigned' | 'updated' | 'resolved' | 'escalated' | 'comment';
  description: string;
  timestamp: Date;
  userId: string;
  user: User;
}

export interface Attachment {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  uploadedAt: Date;
}

export interface DashboardStats {
  totalReports: number;
  newReports: number;
  inProgress: number;
  resolved: number;
  highPriority: number;
  averageResolutionTime: number;
  reportsByCategory: Record<string, number>;
  reportsByMonth: Array<{ month: string; count: number }>;
  riskTrends: Array<{ date: string; risk: number }>;
}

export type Language = 'id' | 'en';

export type ViewMode = 'chat' | 'dashboard' | 'reports' | 'analytics' | 'settings' | 'users' | 'whatsapp' | 'simulation';