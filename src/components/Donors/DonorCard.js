'use client';

import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export const DonorCard = ({ donor }) => {
  const getBloodTypeColor = (bloodType) => {
    const colors = {
      'A+': 'bg-red-100 text-red-800',
      'A-': 'bg-red-200 text-red-900',
      'B+': 'bg-blue-100 text-blue-800',
      'B-': 'bg-blue-200 text-blue-900',
      'AB+': 'bg-purple-100 text-purple-800',
      'AB-': 'bg-purple-200 text-purple-900',
      'O+': 'bg-green-100 text-green-800',
      'O-': 'bg-green-200 text-green-900',
    };
    return colors[bloodType] || 'bg-gray-100 text-gray-800';
  };

  const getLastDonationStatus = (lastDonation) => {
    if (!lastDonation) return { text: 'Never donated', color: 'text-gray-500' };
    
    const daysSince = Math.floor((new Date() - new Date(lastDonation)) / (1000 * 60 * 60 * 24));
    
    if (daysSince < 56) {
      return { text: `${daysSince} days ago`, color: 'text-red-500' };
    } else if (daysSince < 90) {
      return { text: `${daysSince} days ago`, color: 'text-yellow-500' };
    } else {
      return { text: `${daysSince} days ago`, color: 'text-green-500' };
    }
  };

  const lastDonationStatus = getLastDonationStatus(donor.lastDonation);

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{donor.name}</h3>
            <p className="text-sm text-gray-600">{donor.location}</p>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getBloodTypeColor(donor.bloodType)}`}>
            {donor.bloodType}
          </span>
        </div>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            {donor.phone}
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {donor.location}
          </div>
          
          <div className="flex items-center text-sm">
            <span className="text-gray-600 mr-2">Last donation:</span>
            <span className={lastDonationStatus.color}>{lastDonationStatus.text}</span>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Button size="sm" className="flex-1">
            Contact
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            View Profile
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
