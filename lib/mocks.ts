
export const mockCampaigns = [
  {
    id: '1',
    title: 'Clean Water for Rural Communities',
    description: 'Providing access to clean drinking water for 500 families in remote villages through well construction and water purification systems.',
    goal: 50000,
    raised: 32500,
    startDate: '2024-01-15',
    endDate: '2024-06-15',
    status: 'active',
    category: 'Water & Sanitation',
    donorCount: 245,
    image: 'https://static.readdy.ai/image/e8ecc61718eb896f3699ee035fbbe683/14466247c12660423e90b6872f81aad4.png'
  },
  {
    id: '2',
    title: 'Education for Every Child',
    description: 'Building classrooms and providing educational materials for underprivileged children in urban slums.',
    goal: 75000,
    raised: 68200,
    startDate: '2024-02-01',
    endDate: '2024-08-01',
    status: 'active',
    category: 'Education',
    donorCount: 412,
    image: 'https://static.readdy.ai/image/e8ecc61718eb896f3699ee035fbbe683/3ceed6674504257dbb2cca8669cf4926.png'
  },
  {
    id: '3',
    title: 'Emergency Food Relief',
    description: 'Providing emergency food packages to families affected by natural disasters and economic hardship.',
    goal: 25000,
    raised: 25000,
    startDate: '2024-01-01',
    endDate: '2024-03-31',
    status: 'completed',
    category: 'Emergency Relief',
    donorCount: 189,
    image: 'https://static.readdy.ai/image/e8ecc61718eb896f3699ee035fbbe683/ec02f8b9e38671fc97710db1fd64d8bf.png'
  },
  {
    id: '4',
    title: 'Medical Equipment for Rural Clinics',
    description: 'Purchasing essential medical equipment and supplies for healthcare facilities in underserved areas.',
    goal: 100000,
    raised: 15750,
    startDate: '2024-03-01',
    endDate: '2024-12-31',
    status: 'active',
    category: 'Healthcare',
    donorCount: 87,
    image: 'https://static.readdy.ai/image/e8ecc61718eb896f3699ee035fbbe683/09f0362df368ef97e7f50495a30d7367.png'
  },
  {
    id: '5',
    title: 'Wildlife Conservation Initiative',
    description: 'Protecting endangered species through habitat restoration and anti-poaching efforts in national parks.',
    goal: 80000,
    raised: 45600,
    startDate: '2024-02-15',
    endDate: '2024-10-15',
    status: 'active',
    category: 'Environment',
    donorCount: 298,
    image: 'https://static.readdy.ai/image/e8ecc61718eb896f3699ee035fbbe683/65124ecb0e51688bae41807ccc346086.png'
  }
];

export const mockDonations = [
  { id: '1', campaignId: '1', amount: 100, donorName: 'Sarah Johnson', date: '2024-01-20', message: 'Great cause!' },
  { id: '2', campaignId: '1', amount: 250, donorName: 'Michael Chen', date: '2024-01-22', message: 'Happy to help' },
  { id: '3', campaignId: '2', amount: 500, donorName: 'Emily Davis', date: '2024-02-05', message: 'Education is key' },
  { id: '4', campaignId: '1', amount: 75, donorName: 'David Wilson', date: '2024-01-25', message: '' },
  { id: '5', campaignId: '3', amount: 200, donorName: 'Lisa Anderson', date: '2024-01-15', message: 'Emergency relief needed' },
  { id: '6', campaignId: '2', amount: 150, donorName: 'Robert Taylor', date: '2024-02-10', message: 'Supporting education' },
  { id: '7', campaignId: '4', amount: 300, donorName: 'Jennifer Brown', date: '2024-03-05', message: 'Healthcare for all' },
  { id: '8', campaignId: '5', amount: 125, donorName: 'Thomas Miller', date: '2024-02-20', message: 'Save the wildlife' }
];
