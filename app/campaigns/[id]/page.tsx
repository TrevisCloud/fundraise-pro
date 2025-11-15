'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/components/feature/Navbar';
import { mockCampaigns, mockDonations } from '@/lib/mocks';

interface Campaign {
  id: string;
  title: string;
  description: string;
  goal: number;
  raised: number;
  startDate: string;
  endDate: string;
  status: string;
  category: string;
  donorCount: number;
  image: string;
}

interface Donation {
  id: string;
  campaignId: string;
  amount: number;
  donorName: string;
  date: string;
  message: string;
}

export const dynamic = 'force-dynamic';

export default function CampaignDetail() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [showDonateModal, setShowDonateModal] = useState(false);
  const [donationAmount, setDonationAmount] = useState('');
  const [donorName, setDonorName] = useState('');
  const [donorMessage, setDonorMessage] = useState('');

  useEffect(() => {
    const foundCampaign = mockCampaigns.find(c => c.id === id);
    if (foundCampaign) {
      // Valid use of setState in effect: Setting derived state from props (id)
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCampaign(foundCampaign);
      const campaignDonations = mockDonations.filter(d => d.campaignId === id);
      setDonations(campaignDonations);
    }
  }, [id]);

  if (!campaign) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground mb-2">Campaign Not Found</h2>
            <p className="text-muted-foreground mb-4">The campaign you&apos;re looking for doesn&apos;t exist.</p>
            <button
              onClick={() => router.push('/campaigns')}
              className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:opacity-90"
            >
              Back to Campaigns
            </button>
          </div>
        </div>
      </div>
    );
  }

  const progressPercentage = (campaign.raised / campaign.goal) * 100;
  const daysLeft = Math.ceil((new Date(campaign.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  const handleDonate = () => {
    if (!donationAmount || !donorName) return;

    const newDonation: Donation = {
      id: Date.now().toString(),
      campaignId: campaign.id,
      amount: parseFloat(donationAmount),
      donorName,
      date: new Date().toISOString().split('T')[0],
      message: donorMessage
    };

    setDonations([newDonation, ...donations]);
    setCampaign({
      ...campaign,
      raised: campaign.raised + parseFloat(donationAmount),
      donorCount: campaign.donorCount + 1
    });

    setShowDonateModal(false);
    setDonationAmount('');
    setDonorName('');
    setDonorMessage('');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      {/* Header */}
      <div className="bg-card shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.push('/campaigns')}
              className="flex items-center text-primary hover:opacity-80"
            >
              <i className="ri-arrow-left-line mr-2"></i>
              Back to Campaigns
            </button>
            <div className="flex space-x-3">
              <button className="px-4 py-2 border border-border text-foreground rounded-lg hover:bg-muted">
                <i className="ri-share-line mr-2"></i>
                Share
              </button>
              <button className="px-4 py-2 border border-border text-foreground rounded-lg hover:bg-muted">
                <i className="ri-edit-line mr-2"></i>
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Hero Image */}
            <div className="relative mb-8">
              <img
                src={campaign.image}
                alt={campaign.title}
                className="w-full h-96 object-cover rounded-lg"
              />
              <div className="absolute top-4 left-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  campaign.status === 'active' ? 'bg-green-100 text-green-800' :
                  campaign.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                </span>
              </div>
            </div>

            {/* Campaign Info */}
            <div className="bg-card rounded-lg shadow-sm border border-border p-6 mb-8">
              <div className="mb-4">
                <span className="text-sm text-primary font-medium">{campaign.category}</span>
                <h1 className="text-3xl font-bold text-foreground mt-2">{campaign.title}</h1>
              </div>

              <p className="text-muted-foreground leading-relaxed mb-6">{campaign.description}</p>

              {/* Progress Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">${campaign.raised.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Raised</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">${campaign.goal.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Goal</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">{campaign.donorCount}</div>
                  <div className="text-sm text-muted-foreground">Donors</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">{daysLeft}</div>
                  <div className="text-sm text-muted-foreground">Days Left</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-foreground">{progressPercentage.toFixed(1)}% funded</span>
                  <span className="text-sm text-muted-foreground">Ends {new Date(campaign.endDate).toLocaleDateString()}</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-3">
                  <div
                    className="h-3 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(progressPercentage, 100)}%`, backgroundColor: '#F97316' }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Recent Donations */}
            <div className="bg-card rounded-lg shadow-sm border border-border p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">Recent Donations</h2>
              {donations.length > 0 ? (
                <div className="space-y-4">
                  {donations.slice(0, 10).map((donation) => (
                    <div key={donation.id} className="flex items-start justify-between p-4 bg-muted rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-foreground">{donation.donorName}</span>
                          <span className="text-lg font-semibold text-primary">${donation.amount}</span>
                        </div>
                        <div className="text-sm text-muted-foreground mb-1">{new Date(donation.date).toLocaleDateString()}</div>
                        {donation.message && (
                          <p className="text-sm text-muted-foreground italic">&quot;{donation.message}&quot;</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-8">No donations yet. Be the first to donate!</p>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              {/* Donate Card */}
              <div className="bg-card rounded-lg shadow-sm border border-border p-6 mb-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Support This Campaign</h3>
                <button
                  onClick={() => setShowDonateModal(true)}
                  className="w-full bg-primary text-primary-foreground py-3 px-4 rounded-lg font-medium hover:opacity-90 transition-opacity"
                >
                  Donate Now
                </button>
              </div>

              {/* Campaign Stats */}
              <div className="bg-card rounded-lg shadow-sm border border-border p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Campaign Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Start Date</span>
                    <span className="font-medium text-foreground">{new Date(campaign.startDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">End Date</span>
                    <span className="font-medium text-foreground">{new Date(campaign.endDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Category</span>
                    <span className="font-medium text-foreground">{campaign.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status</span>
                    <span className="font-medium capitalize text-foreground">{campaign.status}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Donate Modal */}
      {showDonateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-card rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-foreground">Make a Donation</h3>
              <button
                onClick={() => setShowDonateModal(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Donation Amount</label>
                <input
                  type="number"
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-ring bg-background text-foreground"
                  placeholder="Enter amount"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Your Name</label>
                <input
                  type="text"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-ring bg-background text-foreground"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Message (Optional)</label>
                <textarea
                  value={donorMessage}
                  onChange={(e) => setDonorMessage(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-ring bg-background text-foreground"
                  rows={3}
                  placeholder="Leave a message of support"
                />
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowDonateModal(false)}
                className="flex-1 px-4 py-2 border border-border text-foreground rounded-lg hover:bg-muted"
              >
                Cancel
              </button>
              <button
                onClick={handleDonate}
                disabled={!donationAmount || !donorName}
                className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Donate ${donationAmount}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
