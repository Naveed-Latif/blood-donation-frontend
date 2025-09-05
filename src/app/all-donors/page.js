'use client';

import { ProtectedRoute } from '@/components/Auth/ProtectedRoute';
import { DonorList } from '@/components/Donors/DonorList';

export default function AllDonorsPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">All Donors</h1>
            <p className="mt-2 text-gray-600">Browse all registered blood donors</p>
          </div>
          
          <DonorList />
        </div>
      </div>
    </ProtectedRoute>
  );
}
