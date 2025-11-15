'use client';

import { useState } from 'react';
import Navbar from '@/components/feature/Navbar';
import ProfileSettings from './components/ProfileSettings';
import SecuritySettings from './components/SecuritySettings';
import NotificationSettings from './components/NotificationSettings';
import OrganizationSettings from './components/OrganizationSettings';
import UserManagement from './components/UserManagement';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', name: 'Profile', icon: 'ri-user-line' },
    { id: 'security', name: 'Security', icon: 'ri-shield-line' },
    { id: 'notifications', name: 'Notifications', icon: 'ri-notification-line' },
    { id: 'organization', name: 'Organization', icon: 'ri-building-line' },
    { id: 'users', name: 'User Management', icon: 'ri-team-line' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileSettings />;
      case 'security':
        return <SecuritySettings />;
      case 'notifications':
        return <NotificationSettings />;
      case 'organization':
        return <OrganizationSettings />;
      case 'users':
        return <UserManagement />;
      default:
        return <ProfileSettings />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Admin Settings</h1>
            <p className="mt-2 text-muted-foreground">Manage your account, organization, and team settings</p>
          </div>

          <div className="bg-card rounded-lg shadow-sm border border-border">
            <div className="border-b border-border">
              <nav className="flex space-x-8 px-6" aria-label="Tabs">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'border-primary text-primary'
                        : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                    }`}
                  >
                    <i className={`${tab.icon} text-lg`}></i>
                    <span>{tab.name}</span>
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-6">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
