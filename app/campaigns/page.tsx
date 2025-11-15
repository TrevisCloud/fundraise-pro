'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/feature/Navbar';
import Card from '@/components/base/Card';
import Button from '@/components/base/Button';
import { mockCampaigns } from '@/lib/mocks';

export const dynamic = 'force-dynamic';

export default function Campaigns() {
  const [campaigns, setCampaigns] = useState(mockCampaigns);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesFilter = filter === 'all' || campaign.status === filter;
    const matchesSearch = campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Campaign Management</h1>
              <p className="text-gray-600">Create, monitor, and manage your fundraising campaigns</p>
            </div>
            <Button onClick={() => setShowCreateModal(true)}>
              <i className="ri-add-line mr-2"></i>
              Create Campaign
            </Button>
          </div>

          {/* Filters and Search */}
          <Card className="mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium text-gray-700">Filter:</label>
                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-8"
                  >
                    <option value="all">All Campaigns</option>
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                    <option value="paused">Paused</option>
                  </select>
                </div>
              </div>
              <div className="relative">
                <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                <input
                  type="text"
                  placeholder="Search campaigns..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>
            </div>
          </Card>

          {/* Campaign Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="text-center" padding="sm">
              <div className="text-2xl font-bold text-blue-600">{campaigns.length}</div>
              <div className="text-sm text-gray-600">Total Campaigns</div>
            </Card>
            <Card className="text-center" padding="sm">
              <div className="text-2xl font-bold text-green-600">
                {campaigns.filter(c => c.status === 'active').length}
              </div>
              <div className="text-sm text-gray-600">Active</div>
            </Card>
            <Card className="text-center" padding="sm">
              <div className="text-2xl font-bold text-purple-600">
                {campaigns.filter(c => c.status === 'completed').length}
              </div>
              <div className="text-sm text-gray-600">Completed</div>
            </Card>
            <Card className="text-center" padding="sm">
              <div className="text-2xl font-bold text-orange-600">
                ${campaigns.reduce((sum, c) => sum + c.raised, 0).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Total Raised</div>
            </Card>
          </div>

          {/* Campaign Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCampaigns.map((campaign) => (
              <Card key={campaign.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <div className="relative mb-4">
                  <img
                    src={campaign.image}
                    alt={campaign.title}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <div className="absolute top-3 right-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                      {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-blue-600 font-medium">{campaign.category}</span>
                    <span className="text-xs text-gray-500">{campaign.donorCount} donors</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{campaign.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{campaign.description}</p>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900">
                      ${campaign.raised.toLocaleString()}
                    </span>
                    <span className="text-sm text-gray-600">
                      of ${campaign.goal.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min((campaign.raised / campaign.goal) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                    <span>{((campaign.raised / campaign.goal) * 100).toFixed(1)}% funded</span>
                    <span>Ends {new Date(campaign.endDate).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Link href={`/campaigns/${campaign.id}`} className="flex-1">
                    <Button variant="primary" size="sm" className="w-full">
                      <i className="ri-eye-line mr-2"></i>
                      View Details
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm">
                    <i className="ri-edit-line"></i>
                  </Button>
                  <Button variant="outline" size="sm">
                    <i className="ri-share-line"></i>
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {filteredCampaigns.length === 0 && (
            <Card className="text-center py-12">
              <i className="ri-search-line text-4xl text-gray-400 mb-4"></i>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No campaigns found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
              <Button onClick={() => { setSearchTerm(''); setFilter('all'); }}>
                Clear Filters
              </Button>
            </Card>
          )}

          {/* Create Campaign Modal */}
          {showCreateModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Create New Campaign</h2>
                    <button
                      onClick={() => setShowCreateModal(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <i className="ri-close-line text-2xl"></i>
                    </button>
                  </div>

                  <form className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Campaign Title
                      </label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter campaign title"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category
                      </label>
                      <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-8">
                        <option>Education</option>
                        <option>Healthcare</option>
                        <option>Environment</option>
                        <option>Emergency Relief</option>
                        <option>Water & Sanitation</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Funding Goal ($)
                        </label>
                        <input
                          type="number"
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="50000"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          End Date
                        </label>
                        <input
                          type="date"
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      <textarea
                        rows={4}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Describe your campaign goals and impact..."
                        maxLength={500}
                      ></textarea>
                    </div>

                    <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
                      <Button
                        variant="outline"
                        onClick={() => setShowCreateModal(false)}
                      >
                        Cancel
                      </Button>
                      <Button>
                        Create Campaign
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
