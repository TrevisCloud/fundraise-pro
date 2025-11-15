'use client';

import { useState } from 'react';

interface NotificationPreference {
  id: string;
  title: string;
  description: string;
  email: boolean;
  push: boolean;
}

export default function NotificationSettings() {
  const [preferences, setPreferences] = useState<NotificationPreference[]>([
    {
      id: 'donations',
      title: 'New Donations',
      description: 'Get notified when someone makes a donation',
      email: true,
      push: true
    },
    {
      id: 'campaigns',
      title: 'Campaign Updates',
      description: 'Updates about your active campaigns',
      email: true,
      push: false
    },
    {
      id: 'milestones',
      title: 'Milestone Achievements',
      description: 'When campaigns reach funding milestones',
      email: true,
      push: true
    },
    {
      id: 'team',
      title: 'Team Activity',
      description: 'When team members make changes or updates',
      email: false,
      push: false
    },
    {
      id: 'reports',
      title: 'Weekly Reports',
      description: 'Summary of your fundraising activity',
      email: true,
      push: false
    },
    {
      id: 'security',
      title: 'Security Alerts',
      description: 'Important security and account notifications',
      email: true,
      push: true
    }
  ]);

  const togglePreference = (id: string, type: 'email' | 'push') => {
    setPreferences(preferences.map(pref =>
      pref.id === id ? { ...pref, [type]: !pref[type] } : pref
    ));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground">Notification Preferences</h2>
        <p className="text-sm text-muted-foreground mt-1">Choose how you want to be notified about important events</p>
      </div>

      <div className="bg-muted rounded-lg p-6">
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-4 pb-4 border-b border-border">
            <div className="col-span-1">
              <p className="text-sm font-medium text-foreground">Notification Type</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-foreground">Email</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-foreground">Push</p>
            </div>
          </div>

          {preferences.map((pref) => (
            <div key={pref.id} className="grid grid-cols-3 gap-4 items-center">
              <div className="col-span-1">
                <h4 className="font-medium text-foreground">{pref.title}</h4>
                <p className="text-sm text-muted-foreground">{pref.description}</p>
              </div>
              <div className="flex justify-center">
                <button
                  onClick={() => togglePreference(pref.id, 'email')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    pref.email ? 'bg-primary' : 'bg-border'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      pref.email ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              <div className="flex justify-center">
                <button
                  onClick={() => togglePreference(pref.id, 'push')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    pref.push ? 'bg-primary' : 'bg-border'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      pref.push ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-border">
          <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-colors">
            Save Preferences
          </button>
        </div>
      </div>

      <div className="bg-secondary border border-border rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <i className="ri-information-line text-primary text-xl mt-0.5"></i>
          <div>
            <p className="text-sm text-foreground font-medium">About Notifications</p>
            <p className="text-sm text-muted-foreground mt-1">
              Security alerts cannot be disabled to ensure your account safety. You can adjust all other notification preferences based on your needs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
