import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { User, Report, DashboardStats } from '../types';

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedUsers: User[] = data.map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department,
        avatar: user.avatar,
        lastLogin: new Date(user.last_login),
        isActive: user.is_active
      }));

      setUsers(formattedUsers);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const createUser = async (userData: Omit<User, 'id' | 'lastLogin'>) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .insert([{
          name: userData.name,
          email: userData.email,
          role: userData.role,
          department: userData.department,
          avatar: userData.avatar,
          is_active: userData.isActive
        }])
        .select()
        .single();

      if (error) throw error;

      await fetchUsers(); // Refresh the list
      return data;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to create user');
    }
  };

  const updateUser = async (id: string, userData: Partial<User>) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .update({
          name: userData.name,
          email: userData.email,
          role: userData.role,
          department: userData.department,
          avatar: userData.avatar,
          is_active: userData.isActive,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      await fetchUsers(); // Refresh the list
      return data;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to update user');
    }
  };

  const deleteUser = async (id: string) => {
    try {
      const { error } = await supabase
        .from('users')
        .delete()
        .eq('id', id);

      if (error) throw error;

      await fetchUsers(); // Refresh the list
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to delete user');
    }
  };

  return {
    users,
    loading,
    error,
    createUser,
    updateUser,
    deleteUser,
    refetch: fetchUsers
  };
};

export const useReports = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('reports')
        .select(`
          *,
          investigator:assigned_to(*)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedReports: Report[] = data.map(report => ({
        id: report.id,
        title: report.title,
        category: report.category,
        description: report.description,
        location: report.location,
        witnesses: report.witnesses,
        evidence: report.evidence,
        contactPreference: report.contact_preference,
        status: report.status,
        priority: report.priority,
        submittedAt: new Date(report.created_at),
        updatedAt: new Date(report.updated_at),
        assignedTo: report.assigned_to,
        investigator: report.investigator ? {
          id: report.investigator.id,
          name: report.investigator.name,
          email: report.investigator.email,
          role: report.investigator.role,
          department: report.investigator.department,
          avatar: report.investigator.avatar,
          lastLogin: new Date(report.investigator.last_login),
          isActive: report.investigator.is_active
        } : undefined,
        timeline: [],
        attachments: [],
        isAnonymous: report.is_anonymous,
        riskLevel: report.risk_level
      }));

      setReports(formattedReports);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const createReport = async (reportData: {
    title: string;
    category: string;
    description: string;
    location: string;
    witnesses: string;
    evidence: string;
    contactPreference: string;
  }) => {
    try {
      const { data, error } = await supabase
        .from('reports')
        .insert([{
          title: reportData.title,
          category: reportData.category,
          description: reportData.description,
          location: reportData.location,
          witnesses: reportData.witnesses,
          evidence: reportData.evidence,
          contact_preference: reportData.contactPreference,
          status: 'new',
          priority: 'medium',
          is_anonymous: true,
          risk_level: 5.0
        }])
        .select()
        .single();

      if (error) throw error;

      await fetchReports(); // Refresh the list
      return data;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to create report');
    }
  };

  const updateReport = async (id: string, updates: Partial<Report>) => {
    try {
      const { data, error } = await supabase
        .from('reports')
        .update({
          status: updates.status,
          priority: updates.priority,
          assigned_to: updates.assignedTo,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      await fetchReports(); // Refresh the list
      return data;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to update report');
    }
  };

  return {
    reports,
    loading,
    error,
    createReport,
    updateReport,
    refetch: fetchReports
  };
};

export const useDashboardStats = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      
      // Fetch reports for statistics
      const { data: reports, error: reportsError } = await supabase
        .from('reports')
        .select('*');

      if (reportsError) throw reportsError;

      // Calculate statistics
      const totalReports = reports.length;
      const newReports = reports.filter(r => r.status === 'new').length;
      const inProgress = reports.filter(r => r.status === 'investigating').length;
      const resolved = reports.filter(r => r.status === 'resolved').length;
      const highPriority = reports.filter(r => r.priority === 'high' || r.priority === 'critical').length;

      // Calculate average resolution time (mock for now)
      const averageResolutionTime = 5.2;

      // Group by category
      const reportsByCategory = reports.reduce((acc, report) => {
        acc[report.category] = (acc[report.category] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      // Mock monthly data
      const reportsByMonth = [
        { month: 'Jan', count: 12 },
        { month: 'Feb', count: 19 },
        { month: 'Mar', count: 15 },
        { month: 'Apr', count: 22 },
        { month: 'May', count: 28 },
        { month: 'Jun', count: totalReports }
      ];

      const riskTrends = [
        { date: '2024-01', risk: 3.2 },
        { date: '2024-02', risk: 2.8 },
        { date: '2024-03', risk: 3.5 },
        { date: '2024-04', risk: 2.9 },
        { date: '2024-05', risk: 3.1 },
        { date: '2024-06', risk: 2.7 }
      ];

      setStats({
        totalReports,
        newReports,
        inProgress,
        resolved,
        highPriority,
        averageResolutionTime,
        reportsByCategory,
        reportsByMonth,
        riskTrends
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return {
    stats,
    loading,
    error,
    refetch: fetchStats
  };
};