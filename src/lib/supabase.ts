import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          name: string;
          email: string;
          role: 'admin' | 'investigator' | 'manager' | 'viewer';
          department: string;
          avatar: string | null;
          last_login: string;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          role: 'admin' | 'investigator' | 'manager' | 'viewer';
          department: string;
          avatar?: string | null;
          last_login?: string;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          role?: 'admin' | 'investigator' | 'manager' | 'viewer';
          department?: string;
          avatar?: string | null;
          last_login?: string;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      reports: {
        Row: {
          id: string;
          title: string;
          category: 'fraud' | 'harassment' | 'safety' | 'corruption' | 'other';
          description: string;
          location: string;
          witnesses: string;
          evidence: string;
          contact_preference: string;
          status: 'new' | 'investigating' | 'resolved' | 'closed' | 'escalated';
          priority: 'low' | 'medium' | 'high' | 'critical';
          assigned_to: string | null;
          is_anonymous: boolean;
          risk_level: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          category: 'fraud' | 'harassment' | 'safety' | 'corruption' | 'other';
          description: string;
          location: string;
          witnesses?: string;
          evidence?: string;
          contact_preference: string;
          status?: 'new' | 'investigating' | 'resolved' | 'closed' | 'escalated';
          priority?: 'low' | 'medium' | 'high' | 'critical';
          assigned_to?: string | null;
          is_anonymous?: boolean;
          risk_level?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          category?: 'fraud' | 'harassment' | 'safety' | 'corruption' | 'other';
          description?: string;
          location?: string;
          witnesses?: string;
          evidence?: string;
          contact_preference?: string;
          status?: 'new' | 'investigating' | 'resolved' | 'closed' | 'escalated';
          priority?: 'low' | 'medium' | 'high' | 'critical';
          assigned_to?: string | null;
          is_anonymous?: boolean;
          risk_level?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      timeline_events: {
        Row: {
          id: string;
          report_id: string;
          type: 'created' | 'assigned' | 'updated' | 'resolved' | 'escalated' | 'comment';
          description: string;
          user_id: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          report_id: string;
          type: 'created' | 'assigned' | 'updated' | 'resolved' | 'escalated' | 'comment';
          description: string;
          user_id?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          report_id?: string;
          type?: 'created' | 'assigned' | 'updated' | 'resolved' | 'escalated' | 'comment';
          description?: string;
          user_id?: string | null;
          created_at?: string;
        };
      };
      attachments: {
        Row: {
          id: string;
          report_id: string;
          name: string;
          type: string;
          size: number;
          url: string;
          uploaded_at: string;
        };
        Insert: {
          id?: string;
          report_id: string;
          name: string;
          type: string;
          size?: number;
          url: string;
          uploaded_at?: string;
        };
        Update: {
          id?: string;
          report_id?: string;
          name?: string;
          type?: string;
          size?: number;
          url?: string;
          uploaded_at?: string;
        };
      };
    };
  };
}