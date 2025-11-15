'use client';

import { useState } from 'react';

export default function SecuritySettings() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const sessions = [
    { id: 1, device: 'MacBook Pro', location: 'San Francisco, CA', lastActive: '2 minutes ago', current: true },
    { id: 2, device: 'iPhone 13', location: 'San Francisco, CA', lastActive: '1 hour ago', current: false },
    { id: 3, device: 'iPad Air', location: 'Oakland, CA', lastActive: '2 days ago', current: false }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">Security Settings</h2>
        <p className="text-sm text-gray-600 mt-1">Manage your account security and authentication</p>
      </div>

      <div className="bg-gray-50 rounded-lg p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Password</h3>
            <p className="text-sm text-gray-600 mt-1">Last changed 3 months ago</p>
          </div>
          <button
            onClick={() => setShowPasswordForm(!showPasswordForm)}
            className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            {showPasswordForm ? 'Cancel' : 'Change Password'}
          </button>
        </div>

        {showPasswordForm && (
          <div className="space-y-4 mt-6 pt-6 border-t border-gray-200">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Update Password
            </button>
          </div>
        )}
      </div>

      <div className="bg-gray-50 rounded-lg p-6">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">Two-Factor Authentication</h3>
            <p className="text-sm text-gray-600 mt-1">Add an extra layer of security to your account</p>
          </div>
          <button
            onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              twoFactorEnabled ? 'bg-blue-600' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                twoFactorEnabled ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
        {twoFactorEnabled && (
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <i className="ri-shield-check-line mr-2"></i>
              Two-factor authentication is enabled. You'll need to enter a code from your authenticator app when signing in.
            </p>
          </div>
        )}
      </div>

      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Sessions</h3>
        <div className="space-y-4">
          {sessions.map((session) => (
            <div key={session.id} className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <i className={`${session.device.includes('iPhone') || session.device.includes('iPad') ? 'ri-smartphone-line' : 'ri-computer-line'} text-blue-600 text-xl`}></i>
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <p className="font-medium text-gray-900">{session.device}</p>
                    {session.current && (
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Current</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{session.location} • {session.lastActive}</p>
                </div>
              </div>
              {!session.current && (
                <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                  Revoke
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
