'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';
import Navbar from '@/components/feature/Navbar';

interface Integration {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: string;
  status: 'connected' | 'available' | 'coming-soon';
  features: string[];
  setupComplexity: 'easy' | 'medium' | 'advanced';
}

export default function IntegrationsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const integrations: Integration[] = [
    {
      id: 'stripe',
      name: 'Stripe',
      category: 'payment',
      description: 'Accept online donations with secure payment processing',
      icon: 'ri-bank-card-line',
      status: 'connected',
      features: ['Credit Cards', 'Bank Transfers', 'Apple Pay', 'Google Pay'],
      setupComplexity: 'easy'
    },
    {
      id: 'paypal',
      name: 'PayPal',
      category: 'payment',
      description: 'Enable PayPal donations for global reach',
      icon: 'ri-paypal-line',
      status: 'available',
      features: ['PayPal Checkout', 'Recurring Donations', 'Mobile Payments'],
      setupComplexity: 'easy'
    },
    {
      id: 'mailchimp',
      name: 'Mailchimp',
      category: 'email',
      description: 'Sync donors with email marketing campaigns',
      icon: 'ri-mail-line',
      status: 'connected',
      features: ['Donor Segmentation', 'Automated Campaigns', 'Analytics'],
      setupComplexity: 'medium'
    },
    {
      id: 'salesforce',
      name: 'Salesforce Nonprofit Cloud',
      category: 'crm',
      description: 'Comprehensive donor relationship management',
      icon: 'ri-contacts-line',
      status: 'available',
      features: ['Donor Profiles', 'Grant Management', 'Volunteer Tracking'],
      setupComplexity: 'advanced'
    },
    {
      id: 'facebook',
      name: 'Facebook Fundraisers',
      category: 'social',
      description: 'Launch fundraising campaigns on Facebook',
      icon: 'ri-facebook-line',
      status: 'available',
      features: ['Social Campaigns', 'Peer-to-Peer', 'Event Fundraising'],
      setupComplexity: 'medium'
    },
    {
      id: 'google-ads',
      name: 'Google Ad Grants',
      category: 'marketing',
      description: 'Reach more donors with free Google advertising',
      icon: 'ri-google-line',
      status: 'available',
      features: ['Search Ads', 'Display Campaigns', '$10k Monthly Grant'],
      setupComplexity: 'medium'
    },
    {
      id: 'quickbooks',
      name: 'QuickBooks',
      category: 'accounting',
      description: 'Sync donations with your accounting system',
      icon: 'ri-calculator-line',
      status: 'available',
      features: ['Donation Tracking', 'Financial Reports', 'Tax Documents'],
      setupComplexity: 'medium'
    },
    {
      id: 'twilio',
      name: 'Twilio',
      category: 'communication',
      description: 'Send SMS updates and notifications to donors',
      icon: 'ri-message-line',
      status: 'available',
      features: ['SMS Campaigns', 'Donation Alerts', 'Two-Way Messaging'],
      setupComplexity: 'medium'
    },
    {
      id: 'zoom',
      name: 'Zoom',
      category: 'events',
      description: 'Host virtual fundraising events and webinars',
      icon: 'ri-video-line',
      status: 'connected',
      features: ['Virtual Events', 'Webinar Integration', 'Registration Sync'],
      setupComplexity: 'easy'
    },
    {
      id: 'eventbrite',
      name: 'Eventbrite',
      category: 'events',
      description: 'Manage event registration and ticket sales',
      icon: 'ri-calendar-event-line',
      status: 'available',
      features: ['Event Management', 'Ticket Sales', 'Attendee Tracking'],
      setupComplexity: 'easy'
    },
    {
      id: 'benevity',
      name: 'Benevity',
      category: 'workplace',
      description: 'Corporate giving and employee engagement platform',
      icon: 'ri-building-line',
      status: 'coming-soon',
      features: ['Corporate Matching', 'Employee Giving', 'Volunteer Programs'],
      setupComplexity: 'advanced'
    },
    {
      id: 'network-for-good',
      name: 'Network for Good',
      category: 'fundraising',
      description: 'Comprehensive nonprofit fundraising tools',
      icon: 'ri-heart-line',
      status: 'available',
      features: ['Donor Management', 'Online Forms', 'Peer-to-Peer'],
      setupComplexity: 'medium'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Categories', icon: 'ri-apps-line' },
    { id: 'payment', name: 'Payments', icon: 'ri-bank-card-line' },
    { id: 'email', name: 'Email Marketing', icon: 'ri-mail-line' },
    { id: 'crm', name: 'CRM', icon: 'ri-contacts-line' },
    { id: 'social', name: 'Social Media', icon: 'ri-share-line' },
    { id: 'marketing', name: 'Marketing', icon: 'ri-megaphone-line' },
    { id: 'accounting', name: 'Accounting', icon: 'ri-calculator-line' },
    { id: 'communication', name: 'Communication', icon: 'ri-message-line' },
    { id: 'events', name: 'Events', icon: 'ri-calendar-event-line' },
    { id: 'workplace', name: 'Corporate Giving', icon: 'ri-building-line' },
    { id: 'fundraising', name: 'Fundraising', icon: 'ri-heart-line' }
  ];

  const filteredIntegrations = integrations.filter(integration => {
    const matchesSearch = integration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         integration.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || integration.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusBadge = (status: string) => {
    const badges = {
      connected: 'bg-green-100 text-green-800',
      available: 'bg-blue-100 text-blue-800',
      'coming-soon': 'bg-gray-100 text-gray-600'
    };
    const labels = {
      connected: 'Connected',
      available: 'Available',
      'coming-soon': 'Coming Soon'
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${badges[status as keyof typeof badges]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  const getComplexityBadge = (complexity: string) => {
    const badges = {
      easy: 'bg-green-50 text-green-700 border-green-200',
      medium: 'bg-yellow-50 text-yellow-700 border-yellow-200',
      advanced: 'bg-red-50 text-red-700 border-red-200'
    };
    return (
      <span className={`px-2 py-1 rounded border text-xs font-medium ${badges[complexity as keyof typeof badges]}`}>
        {complexity.charAt(0).toUpperCase() + complexity.slice(1)} Setup
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="p-6">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Integrations</h1>
              <p className="text-muted-foreground mt-2">Connect your favorite tools to streamline your fundraising efforts</p>
            </div>
            <button className="inline-flex items-center justify-center font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer bg-primary text-primary-foreground hover:opacity-90 px-4 py-2 text-sm">
              <i className="ri-add-line mr-2"></i>
              Request Integration
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"></i>
              <input
                type="text"
                placeholder="Search integrations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-ring text-sm bg-card text-foreground"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-ring text-sm pr-8 bg-card text-foreground"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex space-x-1 bg-muted p-1 rounded-lg w-fit">
            {categories.slice(0, 6).map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  selectedCategory === category.id
                    ? 'bg-card text-primary shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <i className={`${category.icon} mr-2`}></i>
                {category.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIntegrations.map(integration => (
            <div key={integration.id} className="bg-card rounded-lg border border-border p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                    <i className={`${integration.icon} text-xl text-muted-foreground`}></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{integration.name}</h3>
                    {getStatusBadge(integration.status)}
                  </div>
                </div>
              </div>

              <p className="text-muted-foreground mb-4 text-sm leading-relaxed">{integration.description}</p>

              <div className="mb-4">
                <h4 className="text-sm font-medium text-foreground mb-2">Features</h4>
                <div className="flex flex-wrap gap-1">
                  {integration.features.slice(0, 3).map(feature => (
                    <span key={feature} className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded">
                      {feature}
                    </span>
                  ))}
                  {integration.features.length > 3 && (
                    <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded">
                      +{integration.features.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                {getComplexityBadge(integration.setupComplexity)}
              </div>

              <div className="flex space-x-2">
                {integration.status === 'connected' ? (
                  <>
                    <button className="flex-1 inline-flex items-center justify-center font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer bg-green-600 text-white hover:bg-green-700 px-3 py-2 text-sm">
                      <i className="ri-check-line mr-2"></i>
                      Connected
                    </button>
                    <button className="inline-flex items-center justify-center font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer border border-border text-foreground hover:bg-muted px-3 py-2 text-sm">
                      <i className="ri-settings-line"></i>
                    </button>
                  </>
                ) : integration.status === 'available' ? (
                  <button className="flex-1 inline-flex items-center justify-center font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer bg-primary text-primary-foreground hover:opacity-90 px-3 py-2 text-sm">
                    <i className="ri-plug-line mr-2"></i>
                    Connect
                  </button>
                ) : (
                  <button
                    disabled
                    className="flex-1 inline-flex items-center justify-center font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed border border-border text-muted-foreground px-3 py-2 text-sm"
                  >
                    <i className="ri-time-line mr-2"></i>
                    Coming Soon
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredIntegrations.length === 0 && (
          <div className="text-center py-12">
            <i className="ri-search-line text-4xl text-muted mb-4"></i>
            <h3 className="text-lg font-medium text-foreground mb-2">No integrations found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
          </div>
        )}

        <div className="mt-12 bg-secondary rounded-lg p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <i className="ri-lightbulb-line text-2xl text-primary"></i>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-foreground mb-2">Need a custom integration?</h3>
              <p className="text-muted-foreground mb-4">Our team can help you connect with any tool your organization uses. Get in touch to discuss custom integration options.</p>
              <button className="inline-flex items-center justify-center font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer bg-primary text-primary-foreground hover:opacity-90 px-4 py-2 text-sm">
                <i className="ri-chat-3-line mr-2"></i>
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
