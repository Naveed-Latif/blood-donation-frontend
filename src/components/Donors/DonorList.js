'use client';

import { useState, useEffect } from 'react';
import { DonorCard } from './DonorCard';
import { Button } from '@/components/ui/Button';

// Mock data for demonstration
const mockDonors = [
  {
    id: 1,
    name: 'John Doe',
    bloodType: 'O+',
    location: 'New York, NY',
    phone: '+1 (555) 123-4567',
    lastDonation: '2024-01-15',
    isAvailable: true,
  },
  {
    id: 2,
    name: 'Jane Smith',
    bloodType: 'A-',
    location: 'Los Angeles, CA',
    phone: '+1 (555) 234-5678',
    lastDonation: '2023-12-20',
    isAvailable: true,
  },
  {
    id: 3,
    name: 'Mike Johnson',
    bloodType: 'B+',
    location: 'Chicago, IL',
    phone: '+1 (555) 345-6789',
    lastDonation: null,
    isAvailable: true,
  },
  {
    id: 4,
    name: 'Sarah Wilson',
    bloodType: 'AB-',
    location: 'Houston, TX',
    phone: '+1 (555) 456-7890',
    lastDonation: '2024-02-01',
    isAvailable: false,
  },
  {
    id: 5,
    name: 'David Brown',
    bloodType: 'O-',
    location: 'Phoenix, AZ',
    phone: '+1 (555) 567-8901',
    lastDonation: '2023-11-10',
    isAvailable: true,
  },
  {
    id: 6,
    name: 'Lisa Davis',
    bloodType: 'A+',
    location: 'Philadelphia, PA',
    phone: '+1 (555) 678-9012',
    lastDonation: '2024-01-25',
    isAvailable: true,
  },
];

export const DonorList = ({ searchFilters = {} }) => {
  const [donors, setDonors] = useState(mockDonors);
  const [filteredDonors, setFilteredDonors] = useState(mockDonors);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    filterDonors();
  }, [searchFilters, donors]);

  const filterDonors = () => {
    let filtered = [...donors];

    if (searchFilters.bloodType) {
      filtered = filtered.filter(donor => donor.bloodType === searchFilters.bloodType);
    }

    if (searchFilters.location) {
      filtered = filtered.filter(donor => 
        donor.location.toLowerCase().includes(searchFilters.location.toLowerCase())
      );
    }

    // Filter by availability (last donation more than 56 days ago or never donated)
    filtered = filtered.filter(donor => {
      if (!donor.lastDonation) return true;
      const daysSince = Math.floor((new Date() - new Date(donor.lastDonation)) / (1000 * 60 * 60 * 24));
      return daysSince >= 56;
    });

    setFilteredDonors(filtered);
  };

  const handleSearch = (filters) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setSearchFilters(filters);
      setLoading(false);
    }, 500);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Donors</h2>
          <p className="text-gray-600">
            {filteredDonors.length} donor{filteredDonors.length !== 1 ? 's' : ''} found
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            Sort by Distance
          </Button>
          <Button variant="outline" size="sm">
            Sort by Availability
          </Button>
        </div>
      </div>

      {filteredDonors.length === 0 ? (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.709M15 6.291A7.962 7.962 0 0012 5c-2.34 0-4.29 1.009-5.824 2.709" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No donors found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your search filters to find more donors.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDonors.map((donor) => (
            <DonorCard key={donor.id} donor={donor} />
          ))}
        </div>
      )}

      {filteredDonors.length > 0 && (
        <div className="mt-8 flex justify-center">
          <Button variant="outline">
            Load More Donors
          </Button>
        </div>
      )}
    </div>
  );
};
