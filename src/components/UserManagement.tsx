import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2, 
  User, 
  Mail, 
  Shield, 
  Calendar,
  CheckCircle,
  XCircle,
  MoreVertical
} from 'lucide-react';
import { User as UserType, Language } from '../types';

interface UserManagementProps {
  language: Language;
  users: UserType[];
}

const UserManagement: React.FC<UserManagementProps> = ({ language, users }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [showAddUser, setShowAddUser] = useState(false);

  const translations = {
    id: {
      userManagement: 'Manajemen Pengguna',
      searchUsers: 'Cari pengguna...',
      allRoles: 'Semua Peran',
      admin: 'Admin',
      investigator: 'Investigator',
      manager: 'Manager',
      viewer: 'Viewer',
      addUser: 'Tambah Pengguna',
      name: 'Nama',
      email: 'Email',
      role: 'Peran',
      department: 'Departemen',
      lastLogin: 'Login Terakhir',
      status: 'Status',
      actions: 'Aksi',
      active: 'Aktif',
      inactive: 'Tidak Aktif',
      edit: 'Edit',
      delete: 'Hapus',
      userDetails: 'Detail Pengguna',
      permissions: 'Izin',
      activityLog: 'Log Aktivitas',
      save: 'Simpan',
      cancel: 'Batal',
      createUser: 'Buat Pengguna Baru',
      fullName: 'Nama Lengkap',
      emailAddress: 'Alamat Email',
      selectRole: 'Pilih Peran',
      selectDepartment: 'Pilih Departemen',
      userCreated: 'Pengguna berhasil dibuat',
      userUpdated: 'Pengguna berhasil diperbarui',
      confirmDelete: 'Apakah Anda yakin ingin menghapus pengguna ini?'
    },
    en: {
      userManagement: 'User Management',
      searchUsers: 'Search users...',
      allRoles: 'All Roles',
      admin: 'Admin',
      investigator: 'Investigator',
      manager: 'Manager',
      viewer: 'Viewer',
      addUser: 'Add User',
      name: 'Name',
      email: 'Email',
      role: 'Role',
      department: 'Department',
      lastLogin: 'Last Login',
      status: 'Status',
      actions: 'Actions',
      active: 'Active',
      inactive: 'Inactive',
      edit: 'Edit',
      delete: 'Delete',
      userDetails: 'User Details',
      permissions: 'Permissions',
      activityLog: 'Activity Log',
      save: 'Save',
      cancel: 'Cancel',
      createUser: 'Create New User',
      fullName: 'Full Name',
      emailAddress: 'Email Address',
      selectRole: 'Select Role',
      selectDepartment: 'Select Department',
      userCreated: 'User created successfully',
      userUpdated: 'User updated successfully',
      confirmDelete: 'Are you sure you want to delete this user?'
    }
  };

  const t = translations[language];

  const departments = [
    'Internal Audit',
    'Legal & Compliance',
    'IT & Security',
    'Human Resources',
    'Finance',
    'Operations'
  ];

  const roles = [
    { id: 'admin', label: t.admin, color: 'bg-purple-100 text-purple-800' },
    { id: 'investigator', label: t.investigator, color: 'bg-blue-100 text-blue-800' },
    { id: 'manager', label: t.manager, color: 'bg-green-100 text-green-800' },
    { id: 'viewer', label: t.viewer, color: 'bg-gray-100 text-gray-800' }
  ];

  const getRoleColor = (role: string) => {
    const roleObj = roles.find(r => r.id === role);
    return roleObj ? roleObj.color : 'bg-gray-100 text-gray-800';
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const UserForm = ({ user, onClose }: { user?: UserType; onClose: () => void }) => {
    const [formData, setFormData] = useState({
      name: user?.name || '',
      email: user?.email || '',
      role: user?.role || 'viewer',
      department: user?.department || '',
      isActive: user?.isActive ?? true
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      // Handle form submission here
      console.log('Form submitted:', formData);
      onClose();
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-md w-full">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {user ? t.userDetails : t.createUser}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.fullName}
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.emailAddress}
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.role}
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {roles.map(role => (
                    <option key={role.id} value={role.id}>{role.label}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.department}
                </label>
                <select
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">{t.selectDepartment}</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="isActive" className="ml-2 text-sm text-gray-700">
                  {t.active}
                </label>
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {t.save}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  {t.cancel}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{t.userManagement}</h1>
        <button
          onClick={() => setShowAddUser(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>{t.addUser}</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder={t.searchUsers}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">{t.allRoles}</option>
              {roles.map(role => (
                <option key={role.id} value={role.id}>{role.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t.name}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t.email}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t.role}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t.department}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t.lastLogin}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t.status}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t.actions}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">ID: {user.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-900">{user.email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRoleColor(user.role)}`}>
                      {roles.find(r => r.id === user.role)?.label || user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.department}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-900">
                        {user.lastLogin.toLocaleDateString()}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {user.isActive ? (
                        <>
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-green-700">{t.active}</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4 text-red-500" />
                          <span className="text-sm text-red-700">{t.inactive}</span>
                        </>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setSelectedUser(user)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{users.length}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <User className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Users</p>
              <p className="text-2xl font-bold text-gray-900">
                {users.filter(u => u.isActive).length}
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Investigators</p>
              <p className="text-2xl font-bold text-gray-900">
                {users.filter(u => u.role === 'investigator').length}
              </p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <Shield className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Departments</p>
              <p className="text-2xl font-bold text-gray-900">{departments.length}</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <User className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showAddUser && (
        <UserForm onClose={() => setShowAddUser(false)} />
      )}
      
      {selectedUser && (
        <UserForm user={selectedUser} onClose={() => setSelectedUser(null)} />
      )}
    </div>
  );
};

export default UserManagement;