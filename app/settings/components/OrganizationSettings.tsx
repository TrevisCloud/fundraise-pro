'use client';

import { useState } from 'react';

export default function OrganizationSettings() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: 'Hope Foundation',
    ein: '12-3456789',
    website: 'https://hopefoundation.org',
    address: '123 Charity Lane',
    city: 'San Francisco',
    state: 'CA',
    zip: '94102',
    country: 'United States',
    mission: 'Empowering communities through education, healthcare, and sustainable development initiatives.',
    taxExempt: true
  });

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Organization Information</h2>
          <p className="text-sm text-muted-foreground mt-1">Manage your nonprofit organization details</p>
        </div>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-colors"
          >
            Edit Information
          </button>
        ) : (
          <div className="flex space-x-3">
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 border border-border text-foreground rounded-lg hover:bg-muted transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-colors"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>

      <div className="bg-muted rounded-lg p-6">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Organization Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              disabled={!isEditing}
              className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-ring disabled:bg-muted disabled:text-muted-foreground bg-card text-foreground"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">EIN (Tax ID)</label>
              <input
                type="text"
                value={formData.ein}
                onChange={(e) => setFormData({ ...formData, ein: e.target.value })}
                disabled={!isEditing}
                className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-ring disabled:bg-muted disabled:text-muted-foreground bg-card text-foreground"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Website</label>
              <input
                type="url"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                disabled={!isEditing}
                className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-ring disabled:bg-muted disabled:text-muted-foreground bg-card text-foreground"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Street Address</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              disabled={!isEditing}
              className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-ring disabled:bg-muted disabled:text-muted-foreground bg-card text-foreground"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">City</label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                disabled={!isEditing}
                className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-ring disabled:bg-muted disabled:text-muted-foreground bg-card text-foreground"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">State</label>
              <input
                type="text"
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                disabled={!isEditing}
                className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-ring disabled:bg-muted disabled:text-muted-foreground bg-card text-foreground"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">ZIP Code</label>
              <input
                type="text"
                value={formData.zip}
                onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                disabled={!isEditing}
                className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-ring disabled:bg-muted disabled:text-muted-foreground bg-card text-foreground"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Country</label>
            <input
              type="text"
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              disabled={!isEditing}
              className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-ring disabled:bg-muted disabled:text-muted-foreground bg-card text-foreground"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Mission Statement</label>
            <textarea
              value={formData.mission}
              onChange={(e) => setFormData({ ...formData, mission: e.target.value })}
              disabled={!isEditing}
              rows={4}
              className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-ring disabled:bg-muted disabled:text-muted-foreground bg-card text-foreground"
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-card rounded-lg border border-border">
            <div>
              <h4 className="font-medium text-foreground">Tax-Exempt Status</h4>
              <p className="text-sm text-muted-foreground">501(c)(3) nonprofit organization</p>
            </div>
            <div className="flex items-center space-x-2">
              <i className="ri-checkbox-circle-fill text-green-500 text-xl"></i>
              <span className="text-sm font-medium text-green-700">Verified</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <i className="ri-alert-line text-amber-600 text-xl mt-0.5"></i>
          <div>
            <p className="text-sm text-amber-800 font-medium">Important Information</p>
            <p className="text-sm text-amber-700 mt-1">
              Changes to your organization&apos;s legal information may require verification. Please ensure all information is accurate and up-to-date.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
