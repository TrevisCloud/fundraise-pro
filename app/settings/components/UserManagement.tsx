'use client';

import { useState } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'Admin' | 'Manager' | 'Member';
  status: 'Active' | 'Pending';
  joinedDate: string;
}

export default function UserManagement() {
  const [showInviteForm, setShowInviteForm] = useState(false);
  const [users] = useState<User[]>([
    { id: 1, name: 'Sarah Johnson', email: 'sarah.johnson@nonprofit.org', role: 'Admin', status: 'Active', joinedDate: 'Jan 2023' },
    { id: 2, name: 'Michael Chen', email: 'michael.chen@nonprofit.org', role: 'Manager', status: 'Active', joinedDate: 'Mar 2023' },
    { id: 3, name: 'Emily Rodriguez', email: 'emily.r@nonprofit.org', role: 'Manager', status: 'Active', joinedDate: 'May 2023' },
    { id: 4, name: 'David Kim', email: 'david.kim@nonprofit.org', role: 'Member', status: 'Active', joinedDate: 'Jul 2023' },
    { id: 5, name: 'Lisa Anderson', email: 'lisa.a@nonprofit.org', role: 'Member', status: 'Pending', joinedDate: 'Dec 2023' }
  ]);

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'Admin': return 'bg-purple-100 text-purple-700';
      case 'Manager': return 'bg-blue-100 text-blue-700';
      case 'Member': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusBadgeColor = (status: string) => {
    return status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Team Members</h2>
          <p className="text-sm text-gray-600 mt-1">Manage your team and their permissions</p>
        </div>
        <button
          onClick={() => setShowInviteForm(!showInviteForm)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <i className="ri-user-add-line"></i>
          <span>Invite Member</span>
        </button>
      </div>

      {showInviteForm && (
        <div className="bg-gray-50 rounded-lg p-6 border-2 border-blue-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Invite New Team Member</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  placeholder="email@example.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>Member</option>
                  <option>Manager</option>
                  <option>Admin</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Personal Message (Optional)</label>
              <textarea
                rows={3}
                placeholder="Add a personal message to the invitation..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex space-x-3">
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Send Invitation
              </button>
              <button
                onClick={() => setShowInviteForm(false)}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-gray-50 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Joined</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleBadgeColor(user.role)}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeColor(user.status)}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.joinedDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-4">Edit</button>
                    <button className="text-red-600 hover:text-red-900">Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <i className="ri-information-line text-blue-600 text-xl mt-0.5"></i>
          <div>
            <p className="text-sm text-blue-800 font-medium">Role Permissions</p>
            <ul className="text-sm text-blue-700 mt-2 space-y-1">
              <li><strong>Admin:</strong> Full access to all features and settings</li>
              <li><strong>Manager:</strong> Can manage campaigns, view reports, and invite members</li>
              <li><strong>Member:</strong> Can view campaigns and basic reports</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
