'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/feature/Navbar';
import Card from '@/components/base/Card';
import Button from '@/components/base/Button';
import { mockCampaigns, mockDonations } from '@/lib/mocks';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';

export const dynamic = 'force-dynamic';

export default function Reports() {
  const [dateRange, setDateRange] = useState('30');
  const [reportType, setReportType] = useState('overview');
  const [monthlyData, setMonthlyData] = useState<any[]>([]);
  const [donorData, setDonorData] = useState<any[]>([]);
  const [campaignPerformance, setCampaignPerformance] = useState<any[]>([]);

  useEffect(() => {
    // Generate monthly donation data
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthlyData = months.map((month, index) => ({
      month,
      donations: Math.floor(Math.random() * 15000) + 5000,
      donors: Math.floor(Math.random() * 200) + 50,
      campaigns: Math.floor(Math.random() * 8) + 2,
      avgDonation: Math.floor(Math.random() * 200) + 100
    }));
    setMonthlyData(monthlyData);

    // Generate donor demographics data
    const donorData = [
      { ageGroup: '18-25', count: 145, percentage: 15 },
      { ageGroup: '26-35', count: 320, percentage: 33 },
      { ageGroup: '36-45', count: 280, percentage: 29 },
      { ageGroup: '46-55', count: 150, percentage: 15 },
      { ageGroup: '56+', count: 75, percentage: 8 }
    ];
    setDonorData(donorData);

    // Generate campaign performance data
    const campaignPerformance = mockCampaigns.map(campaign => ({
      name: campaign.title.substring(0, 15) + '...',
      raised: campaign.raised,
      goal: campaign.goal,
      donors: campaign.donorCount,
      completion: (campaign.raised / campaign.goal) * 100,
      avgDonation: campaign.raised / campaign.donorCount
    }));
    setCampaignPerformance(campaignPerformance);
  }, []);

  const totalStats = {
    totalRaised: mockCampaigns.reduce((sum, c) => sum + c.raised, 0),
    totalDonors: mockCampaigns.reduce((sum, c) => sum + c.donorCount, 0),
    avgDonation: mockDonations.reduce((sum, d) => sum + d.amount, 0) / mockDonations.length,
    conversionRate: 12.5,
    retentionRate: 68.3,
    growthRate: 24.7
  };

  const categoryData = mockCampaigns.reduce((acc: any[], campaign) => {
    const existing = acc.find(item => item.name === campaign.category);
    if (existing) {
      existing.value += campaign.raised;
      existing.campaigns += 1;
    } else {
      acc.push({
        name: campaign.category,
        value: campaign.raised,
        campaigns: 1,
        donors: campaign.donorCount
      });
    }
    return acc;
  }, []);

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

  const exportReport = () => {
    const reportData = {
      generatedAt: new Date().toISOString(),
      dateRange: `Last ${dateRange} days`,
      summary: totalStats,
      campaigns: campaignPerformance,
      categories: categoryData,
      monthlyTrends: monthlyData
    };

    const dataStr = JSON.stringify(reportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `fundraising-report-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics & Reports</h1>
                <p className="text-gray-600">Comprehensive insights into your fundraising performance</p>
              </div>
              <div className="flex items-center space-x-4">
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="7">Last 7 days</option>
                  <option value="30">Last 30 days</option>
                  <option value="90">Last 90 days</option>
                  <option value="365">Last year</option>
                </select>
                <Button onClick={exportReport}>
                  <i className="ri-download-line mr-2"></i>
                  Export Report
                </Button>
              </div>
            </div>
          </div>

          {/* Report Type Tabs */}
          <div className="mb-8">
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
              {[
                { id: 'overview', label: 'Overview', icon: 'ri-dashboard-line' },
                { id: 'campaigns', label: 'Campaigns', icon: 'ri-megaphone-line' },
                { id: 'donors', label: 'Donors', icon: 'ri-group-line' },
                { id: 'financial', label: 'Financial', icon: 'ri-money-dollar-circle-line' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setReportType(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    reportType === tab.id
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <i className={`${tab.icon} text-lg`}></i>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
            <Card className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <i className="ri-money-dollar-circle-line text-2xl text-blue-600"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">${totalStats.totalRaised.toLocaleString()}</h3>
              <p className="text-sm text-gray-600">Total Raised</p>
              <div className="mt-2 text-xs text-green-600">
                +{totalStats.growthRate}% vs last period
              </div>
            </Card>

            <Card className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <i className="ri-group-line text-2xl text-green-600"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{totalStats.totalDonors.toLocaleString()}</h3>
              <p className="text-sm text-gray-600">Total Donors</p>
              <div className="mt-2 text-xs text-green-600">
                +18.2% new donors
              </div>
            </Card>

            <Card className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <i className="ri-heart-line text-2xl text-purple-600"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">${totalStats.avgDonation.toFixed(0)}</h3>
              <p className="text-sm text-gray-600">Avg Donation</p>
              <div className="mt-2 text-xs text-purple-600">
                +5.3% increase
              </div>
            </Card>

            <Card className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <i className="ri-arrow-up-line text-2xl text-orange-600"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{totalStats.conversionRate}%</h3>
              <p className="text-sm text-gray-600">Conversion Rate</p>
              <div className="mt-2 text-xs text-orange-600">
                +2.1% improvement
              </div>
            </Card>

            <Card className="text-center">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <i className="ri-refresh-line text-2xl text-red-600"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{totalStats.retentionRate}%</h3>
              <p className="text-sm text-gray-600">Retention Rate</p>
              <div className="mt-2 text-xs text-red-600">
                +4.7% retention
              </div>
            </Card>

            <Card className="text-center">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <i className="ri-megaphone-line text-2xl text-indigo-600"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{mockCampaigns.length}</h3>
              <p className="text-sm text-gray-600">Active Campaigns</p>
              <div className="mt-2 text-xs text-indigo-600">
                3 launching soon
              </div>
            </Card>
          </div>

          {/* Charts Section */}
          {reportType === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <Card>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Donation Trends</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value, name) => [`$${value.toLocaleString()}`, 'Donations']} />
                    <Area type="monotone" dataKey="donations" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </Card>

              <Card>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Donations by Category</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${percent ? (percent * 100).toFixed(0) : 0}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Amount']} />
                  </PieChart>
                </ResponsiveContainer>
              </Card>
            </div>
          )}

          {reportType === 'campaigns' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <Card>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Campaign Performance</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={campaignPerformance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value, name) => [
                      name === 'raised' ? `$${value.toLocaleString()}` : value,
                      name === 'raised' ? 'Raised' : name === 'goal' ? 'Goal' : 'Donors'
                    ]} />
                    <Bar dataKey="raised" fill="#3B82F6" />
                    <Bar dataKey="goal" fill="#E5E7EB" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>

              <Card>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Campaign Completion Rates</h3>
                <div className="space-y-4">
                  {campaignPerformance.slice(0, 5).map((campaign, index) => (
                    <div key={index} className="border-b border-gray-100 pb-4 last:border-b-0">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900 text-sm">{campaign.name}</h4>
                        <span className="text-sm text-gray-600">{campaign.completion.toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min(campaign.completion, 100)}%` }}
                        ></div>
                      </div>
                      <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                        <span>{campaign.donors} donors</span>
                        <span>${campaign.avgDonation.toFixed(0)} avg</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {reportType === 'donors' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <Card>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Donor Demographics</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={donorData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="ageGroup" />
                    <YAxis />
                    <Tooltip formatter={(value) => [value, 'Donors']} />
                    <Bar dataKey="count" fill="#10B981" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>

              <Card>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Donor Growth</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [value, 'New Donors']} />
                    <Line type="monotone" dataKey="donors" stroke="#10B981" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </Card>
            </div>
          )}

          {reportType === 'financial' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <Card>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trends</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']} />
                    <Area type="monotone" dataKey="donations" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </Card>

              <Card>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Average Donation Trends</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value}`, 'Avg Donation']} />
                    <Line type="monotone" dataKey="avgDonation" stroke="#EF4444" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </Card>
            </div>
          )}

          {/* Detailed Tables */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Top Performing Campaigns</h3>
                <Button variant="outline" size="sm">
                  <i className="ri-external-link-line mr-2"></i>
                  View All
                </Button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 text-gray-600">Campaign</th>
                      <th className="text-right py-2 text-gray-600">Raised</th>
                      <th className="text-right py-2 text-gray-600">Goal</th>
                      <th className="text-right py-2 text-gray-600">Progress</th>
                    </tr>
                  </thead>
                  <tbody>
                    {campaignPerformance.slice(0, 5).map((campaign, index) => (
                      <tr key={index} className="border-b border-gray-100">
                        <td className="py-3 font-medium text-gray-900">{campaign.name}</td>
                        <td className="py-3 text-right text-green-600">${campaign.raised.toLocaleString()}</td>
                        <td className="py-3 text-right text-gray-600">${campaign.goal.toLocaleString()}</td>
                        <td className="py-3 text-right">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            campaign.completion >= 100 ? 'bg-green-100 text-green-800' :
                            campaign.completion >= 75 ? 'bg-blue-100 text-blue-800' :
                            campaign.completion >= 50 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {campaign.completion.toFixed(1)}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            <Card>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Category Performance</h3>
                <Button variant="outline" size="sm">
                  <i className="ri-pie-chart-line mr-2"></i>
                  Details
                </Button>
              </div>
              <div className="space-y-4">
                {categoryData.map((category, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      ></div>
                      <div>
                        <p className="font-medium text-gray-900">{category.name}</p>
                        <p className="text-xs text-gray-500">{category.campaigns} campaigns</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">${category.value.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">{category.donors} donors</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
