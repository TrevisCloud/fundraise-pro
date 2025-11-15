'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/feature/Navbar';
import Card from '@/components/base/Card';
import Button from '@/components/base/Button';
import { mockCampaigns, mockDonations } from '@/lib/mocks';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Legend } from 'recharts';
import { TrendingUp } from 'lucide-react';
import { ChartContainer } from '@/components/ui/chart';

export const dynamic = 'force-dynamic';

interface ChartDataPoint {
  date: string;
  donations: number;
  donors: number;
}

interface CategoryData {
  category: string;
  categoryName: string;
  amount: number;
  fill: string;
  [key: string]: string | number;  // Index signature for Recharts compatibility
}

interface ChartConfig {
  [key: string]: {
    label?: string;
    color?: string;
  };
}

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalRaised: 0,
    totalGoal: 0,
    activeCampaigns: 0,
    totalDonors: 0,
    avgDonation: 0
  });

  const [recentDonations, setRecentDonations] = useState(mockDonations.slice(0, 5));
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);

  useEffect(() => {
    // Calculate stats
    const totalRaised = mockCampaigns.reduce((sum, campaign) => sum + campaign.raised, 0);
    const totalGoal = mockCampaigns.reduce((sum, campaign) => sum + campaign.goal, 0);
    const activeCampaigns = mockCampaigns.filter(c => c.status === 'active').length;
    const totalDonors = mockCampaigns.reduce((sum, campaign) => sum + campaign.donorCount, 0);
    const avgDonation = totalRaised / mockDonations.length;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStats({
      totalRaised,
      totalGoal,
      activeCampaigns,
      totalDonors,
      avgDonation
    });

    // Generate chart data for last 7 days
    const chartData = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      return {
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        donations: Math.floor(Math.random() * 5000) + 1000,
        donors: Math.floor(Math.random() * 50) + 10
      };
    });
    setChartData(chartData);

    // Simulate real-time updates
    const interval = setInterval(() => {
      setRecentDonations(prev => {
        const newDonation = {
          id: Date.now().toString(),
          campaignId: mockCampaigns[Math.floor(Math.random() * mockCampaigns.length)].id,
          amount: Math.floor(Math.random() * 500) + 25,
          donorName: ['Alex Smith', 'Maria Garcia', 'John Doe', 'Jane Wilson'][Math.floor(Math.random() * 4)],
          date: new Date().toISOString().split('T')[0],
          message: 'Keep up the great work!'
        };
        return [newDonation, ...prev.slice(0, 4)];
      });
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const categoryData = mockCampaigns.reduce((acc: CategoryData[], campaign) => {
    const existing = acc.find(item => item.categoryName === campaign.category);
    if (existing) {
      existing.amount += campaign.raised;
    } else {
      const categoryKey = campaign.category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-');
      acc.push({
        category: categoryKey,
        categoryName: campaign.category,
        amount: campaign.raised,
        fill: `var(--color-${categoryKey})`
      });
    }
    return acc;
  }, []);

  const chartConfig: ChartConfig = categoryData.reduce((config, item, index) => {
    const colors = ['var(--chart-1)', 'var(--chart-2)', 'var(--chart-3)', 'var(--chart-4)', 'var(--chart-5)'];

    config[item.category] = {
      label: item.categoryName,
      color: colors[index % colors.length]
    };
    return config;
  }, { amount: { label: "Amount", color: '' } } as ChartConfig);

  const totalCategoryAmount = categoryData.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Fundraising Dashboard</h1>
            <p className="text-muted-foreground">Monitor your campaigns and track donation progress in real-time</p>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            <Card className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <i className="ri-money-dollar-circle-line text-2xl text-primary"></i>
              </div>
              <h3 className="text-2xl font-bold text-foreground">${stats.totalRaised.toLocaleString()}</h3>
              <p className="text-sm text-muted-foreground">Total Raised</p>
              <div className="mt-2 text-xs text-primary">
                {((stats.totalRaised / stats.totalGoal) * 100).toFixed(1)}% of goal
              </div>
            </Card>

            <Card className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <i className="ri-flag-line text-2xl text-primary"></i>
              </div>
              <h3 className="text-2xl font-bold text-foreground">${stats.totalGoal.toLocaleString()}</h3>
              <p className="text-sm text-muted-foreground">Total Goal</p>
              <div className="mt-2 text-xs text-primary">
                ${(stats.totalGoal - stats.totalRaised).toLocaleString()} remaining
              </div>
            </Card>

            <Card className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <i className="ri-megaphone-line text-2xl text-primary"></i>
              </div>
              <h3 className="text-2xl font-bold text-foreground">{stats.activeCampaigns}</h3>
              <p className="text-sm text-muted-foreground">Active Campaigns</p>
              <div className="mt-2 text-xs text-primary">
                {mockCampaigns.length - stats.activeCampaigns} completed
              </div>
            </Card>

            <Card className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <i className="ri-group-line text-2xl text-primary"></i>
              </div>
              <h3 className="text-2xl font-bold text-foreground">{stats.totalDonors.toLocaleString()}</h3>
              <p className="text-sm text-muted-foreground">Total Donors</p>
              <div className="mt-2 text-xs text-primary">
                Across all campaigns
              </div>
            </Card>

            <Card className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <i className="ri-heart-line text-2xl text-primary"></i>
              </div>
              <h3 className="text-2xl font-bold text-foreground">${stats.avgDonation.toFixed(0)}</h3>
              <p className="text-sm text-muted-foreground">Avg Donation</p>
              <div className="mt-2 text-xs text-primary">
                Per transaction
              </div>
            </Card>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <h3 className="text-lg font-semibold text-foreground mb-4">Daily Donations Trend</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip formatter={(value, name) => [`$${value}`, name === 'donations' ? 'Donations' : 'Donors']} />
                  <Line type="monotone" dataKey="donations" stroke="#F97316" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            <Card className="flex flex-col">
              <div className="pb-0 mb-4">
                <h3 className="text-lg font-semibold text-foreground mb-1">Donations by Category</h3>
                <p className="text-sm text-muted-foreground">Campaign category breakdown</p>
              </div>
              <div className="flex-1 pb-0">
                <ChartContainer
                  config={chartConfig}
                  className="mx-auto aspect-square max-h-[350px]"
                >
                  <PieChart>
                    <Tooltip
                      formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Amount']}
                    />
                    <Pie
                      data={categoryData}
                      dataKey="amount"
                      nameKey="categoryName"
                      cx="50%"
                      cy="45%"
                      outerRadius={80}
                      label={({ percent }: { percent?: number }) => `${((percent || 0) * 100).toFixed(0)}%`}
                      labelLine={false}
                    />
                    <Legend
                      verticalAlign="bottom"
                      height={36}
                      content={(props) => {
                        const payload = props.payload as Array<{ value: string; color: string }> | undefined;
                        return (
                          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-4">
                            {payload?.map((entry, index: number) => (
                              <div key={`legend-${index}`} className="flex items-center gap-2">
                                <div
                                  className="w-3 h-3 rounded-sm"
                                  style={{ backgroundColor: entry.color }}
                                />
                                <span className="text-xs text-muted-foreground">
                                  {entry.value}
                                </span>
                              </div>
                            ))}
                          </div>
                        );
                      }}
                    />
                  </PieChart>
                </ChartContainer>
              </div>
              <div className="flex-col gap-2 text-sm pt-4 border-t">
                <div className="flex items-center gap-2 font-medium leading-none">
                  Total raised: ${totalCategoryAmount.toLocaleString()} <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground mt-2">
                  Showing donation distribution across all categories
                </div>
              </div>
            </Card>
          </div>

          {/* Campaign Progress and Recent Donations */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">Campaign Progress</h3>
                <Button variant="outline" size="sm">
                  <i className="ri-eye-line mr-2"></i>
                  View All
                </Button>
              </div>
              <div className="space-y-4">
                {mockCampaigns.slice(0, 4).map((campaign) => (
                  <div key={campaign.id} className="border-b border-border pb-4 last:border-b-0">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-foreground text-sm">{campaign.title}</h4>
                      <span className="text-sm text-muted-foreground">
                        ${campaign.raised.toLocaleString()} / ${campaign.goal.toLocaleString()}
                      </span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div
                        className="h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${Math.min((campaign.raised / campaign.goal) * 100, 100)}%`,
                          backgroundColor: '#F97316'
                        }}
                      ></div>
                    </div>
                    <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                      <span>{campaign.donorCount} donors</span>
                      <span>{((campaign.raised / campaign.goal) * 100).toFixed(1)}% complete</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">Recent Donations</h3>
                <div className="flex items-center text-sm" style={{color: '#059669'}}>
                  <div className="w-2 h-2 rounded-full mr-2 animate-pulse" style={{backgroundColor: '#059669'}}></div>
                  Live Updates
                </div>
              </div>
              <div className="space-y-3">
                {recentDonations.map((donation, index) => {
                  const campaign = mockCampaigns.find(c => c.id === donation.campaignId);
                  const initials = donation.donorName.split(' ').map(n => n[0]).join('');
                  const avatarColors = [
                    { bg: '#DBEAFE', text: '#2563EB' },
                    { bg: '#D1FAE5', text: '#059669' },
                    { bg: '#E9D5FF', text: '#9333EA' },
                    { bg: '#FFEDD5', text: '#F97316' },
                    { bg: '#FEE2E2', text: '#DC2626' }
                  ];
                  const colorScheme = avatarColors[index % avatarColors.length];

                  return (
                    <div key={donation.id} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm"
                          style={{backgroundColor: colorScheme.bg, color: colorScheme.text}}
                        >
                          {initials}
                        </div>
                        <div>
                          <p className="font-medium text-foreground text-sm">{donation.donorName}</p>
                          <p className="text-xs text-muted-foreground">
                            {campaign?.title.substring(0, 30)}...
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold" style={{color: '#059669'}}>${donation.amount}</p>
                        <p className="text-xs text-muted-foreground">{donation.date}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
