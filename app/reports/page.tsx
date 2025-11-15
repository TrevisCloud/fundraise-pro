'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/feature/Navbar';
import Card from '@/components/base/Card';
import Button from '@/components/base/Button';
import { mockCampaigns, mockDonations } from '@/lib/mocks';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';

export const dynamic = 'force-dynamic';

interface MonthlyDataPoint {
  month: string;
  donations: number;
  donors: number;
  campaigns: number;
  avgDonation: number;
}

interface DonorDataPoint {
  ageGroup: string;
  count: number;
  percentage: number;
}

interface CampaignPerformance {
  name: string;
  raised: number;
  goal: number;
  donors: number;
  completion: number;
  avgDonation: number;
}

interface CategoryData {
  name: string;
  value: number;
  campaigns: number;
  donors: number;
  [key: string]: string | number;  // Index signature for Recharts compatibility
}

export default function Reports() {
  const [dateRange, setDateRange] = useState('30');
  const [reportType, setReportType] = useState('overview');
  const [monthlyData, setMonthlyData] = useState<MonthlyDataPoint[]>([]);
  const [donorData, setDonorData] = useState<DonorDataPoint[]>([]);
  const [campaignPerformance, setCampaignPerformance] = useState<CampaignPerformance[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check if dark mode is active
    const updateTheme = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };

    updateTheme();

    // Watch for theme changes
    const observer = new MutationObserver(() => {
      updateTheme();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Generate monthly donation data
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthlyData = months.map((month) => ({
      month,
      donations: Math.floor(Math.random() * 15000) + 5000,
      donors: Math.floor(Math.random() * 200) + 50,
      campaigns: Math.floor(Math.random() * 8) + 2,
      avgDonation: Math.floor(Math.random() * 200) + 100
    }));
    // eslint-disable-next-line react-hooks/set-state-in-effect
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

  const categoryData = mockCampaigns.reduce((acc: CategoryData[], campaign) => {
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

  const COLORS = ['#F9A67A', '#F5C9A8', '#F4DCC8', '#C4614F', '#E4806D'];

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
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Analytics & Reports</h1>
                <p className="text-muted-foreground">Comprehensive insights into your fundraising performance</p>
              </div>
              <div className="flex items-center space-x-4">
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="px-4 py-2 border border-border rounded-lg bg-card text-foreground focus:ring-2 focus:ring-ring focus:border-ring"
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
            <div className="flex space-x-1 bg-muted p-1 rounded-lg w-fit">
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
                      ? 'bg-card text-primary shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
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
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <i className="ri-money-dollar-circle-line text-2xl text-primary"></i>
              </div>
              <h3 className="text-2xl font-bold text-foreground">${totalStats.totalRaised.toLocaleString()}</h3>
              <p className="text-sm text-muted-foreground">Total Raised</p>
              <div className="mt-2 text-xs text-primary">
                +{totalStats.growthRate}% vs last period
              </div>
            </Card>

            <Card className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <i className="ri-group-line text-2xl text-primary"></i>
              </div>
              <h3 className="text-2xl font-bold text-foreground">{totalStats.totalDonors.toLocaleString()}</h3>
              <p className="text-sm text-muted-foreground">Total Donors</p>
              <div className="mt-2 text-xs text-primary">
                +18.2% new donors
              </div>
            </Card>

            <Card className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <i className="ri-heart-line text-2xl text-primary"></i>
              </div>
              <h3 className="text-2xl font-bold text-foreground">${totalStats.avgDonation.toFixed(0)}</h3>
              <p className="text-sm text-muted-foreground">Avg Donation</p>
              <div className="mt-2 text-xs text-primary">
                +5.3% increase
              </div>
            </Card>

            <Card className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <i className="ri-arrow-up-line text-2xl text-primary"></i>
              </div>
              <h3 className="text-2xl font-bold text-foreground">{totalStats.conversionRate}%</h3>
              <p className="text-sm text-muted-foreground">Conversion Rate</p>
              <div className="mt-2 text-xs text-primary">
                +2.1% improvement
              </div>
            </Card>

            <Card className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <i className="ri-refresh-line text-2xl text-primary"></i>
              </div>
              <h3 className="text-2xl font-bold text-foreground">{totalStats.retentionRate}%</h3>
              <p className="text-sm text-muted-foreground">Retention Rate</p>
              <div className="mt-2 text-xs text-primary">
                +4.7% retention
              </div>
            </Card>

            <Card className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <i className="ri-megaphone-line text-2xl text-primary"></i>
              </div>
              <h3 className="text-2xl font-bold text-foreground">{mockCampaigns.length}</h3>
              <p className="text-sm text-muted-foreground">Active Campaigns</p>
              <div className="mt-2 text-xs text-primary">
                3 launching soon
              </div>
            </Card>
          </div>

          {/* Charts Section */}
          {reportType === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <Card>
                <h3 className="text-lg font-semibold text-foreground mb-4">Monthly Donation Trends</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Donations']} />
                    <Area type="monotone" dataKey="donations" stroke="#F97316" fill="#F97316" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </Card>

              <Card>
                <h3 className="text-lg font-semibold text-foreground mb-4">Donations by Category</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent, x, y, cx }) => {
                        const isLeft = x < cx;
                        return (
                          <text
                            x={x}
                            y={y}
                            fill={isDarkMode ? '#e5e5e5' : '#292524'}
                            textAnchor={isLeft ? 'end' : 'start'}
                            dominantBaseline="central"
                            fontSize="14"
                            fontWeight="500"
                          >
                            {`${name} ${percent ? (percent * 100).toFixed(0) : 0}%`}
                          </text>
                        );
                      }}
                      outerRadius={80}
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
                <h3 className="text-lg font-semibold text-foreground mb-4">Campaign Performance</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={campaignPerformance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value, name) => [
                      name === 'raised' ? `$${value.toLocaleString()}` : value,
                      name === 'raised' ? 'Raised' : name === 'goal' ? 'Goal' : 'Donors'
                    ]} />
                    <Bar dataKey="raised" fill="#F97316" />
                    <Bar dataKey="goal" fill="hsl(var(--muted))" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>

              <Card>
                <h3 className="text-lg font-semibold text-foreground mb-4">Campaign Completion Rates</h3>
                <div className="space-y-4">
                  {campaignPerformance.slice(0, 5).map((campaign, index) => (
                    <div key={index} className="border-b border-border pb-4 last:border-b-0">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-foreground text-sm">{campaign.name}</h4>
                        <span className="text-sm text-muted-foreground">{campaign.completion.toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min(campaign.completion, 100)}%` }}
                        ></div>
                      </div>
                      <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
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
                <h3 className="text-lg font-semibold text-foreground mb-4">Donor Demographics</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={donorData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="ageGroup" />
                    <YAxis />
                    <Tooltip formatter={(value) => [value, 'Donors']} />
                    <Bar dataKey="count" fill="#F97316" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>

              <Card>
                <h3 className="text-lg font-semibold text-foreground mb-4">Donor Growth</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [value, 'New Donors']} />
                    <Line type="monotone" dataKey="donors" stroke="#F97316" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </Card>
            </div>
          )}

          {reportType === 'financial' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <Card>
                <h3 className="text-lg font-semibold text-foreground mb-4">Revenue Trends</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']} />
                    <Area type="monotone" dataKey="donations" stroke="#F97316" fill="#F97316" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </Card>

              <Card>
                <h3 className="text-lg font-semibold text-foreground mb-4">Average Donation Trends</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value}`, 'Avg Donation']} />
                    <Line type="monotone" dataKey="avgDonation" stroke="#F97316" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </Card>
            </div>
          )}

          {/* Detailed Tables */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">Top Performing Campaigns</h3>
                <Button variant="outline" size="sm">
                  <i className="ri-external-link-line mr-2"></i>
                  View All
                </Button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 text-muted-foreground">Campaign</th>
                      <th className="text-right py-2 text-muted-foreground">Raised</th>
                      <th className="text-right py-2 text-muted-foreground">Goal</th>
                      <th className="text-right py-2 text-muted-foreground">Progress</th>
                    </tr>
                  </thead>
                  <tbody>
                    {campaignPerformance.slice(0, 5).map((campaign, index) => (
                      <tr key={index} className="border-b border-border">
                        <td className="py-3 font-medium text-foreground">{campaign.name}</td>
                        <td className="py-3 text-right text-primary">${campaign.raised.toLocaleString()}</td>
                        <td className="py-3 text-right text-muted-foreground">${campaign.goal.toLocaleString()}</td>
                        <td className="py-3 text-right">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            campaign.completion >= 100 ? 'bg-primary/20 text-primary' :
                            campaign.completion >= 75 ? 'bg-primary/15 text-primary' :
                            campaign.completion >= 50 ? 'bg-primary/10 text-primary' :
                            'bg-muted text-muted-foreground'
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
                <h3 className="text-lg font-semibold text-foreground">Category Performance</h3>
                <Button variant="outline" size="sm">
                  <i className="ri-pie-chart-line mr-2"></i>
                  Details
                </Button>
              </div>
              <div className="space-y-4">
                {categoryData.map((category, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      ></div>
                      <div>
                        <p className="font-medium text-foreground">{category.name}</p>
                        <p className="text-xs text-muted-foreground">{category.campaigns} campaigns</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-foreground">${category.value.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">{category.donors} donors</p>
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
