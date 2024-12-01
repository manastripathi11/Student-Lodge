import React, { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { useBookingStore } from '../store/bookingStore';
import { Lodge } from '../types';
import { X } from 'lucide-react';

interface BookingModalProps {
  lodge: Lodge;
  onClose: () => void;
}

export function BookingModal({ lodge, onClose }: BookingModalProps) {
  const { user, isAuthenticated } = useAuthStore();
  const { addBooking } = useBookingStore();
  const [checkInDate, setCheckInDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated || !user) {
      alert('Please login to book a lodge');
      return;
    }

    const booking = {
      id: Math.random().toString(36).substr(2, 9),
      userId: user.id,
      lodgeId: lodge.id,
      checkInDate,
      status: 'pending' as const,
      createdAt: new Date().toISOString(),
    };

    addBooking(booking);
    onClose();
    alert('Booking submitted successfully!');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Book {lodge.name}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>

        {!isAuthenticated ? (
          <div className="text-center py-4">
            <p className="text-gray-600 mb-4">Please login to book this accommodation</p>
            <button
              onClick={onClose}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Check-in Date
              </label>
              <input
                type="date"
                required
                value={checkInDate}
                onChange={(e) => setCheckInDate(e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div className="text-gray-600">
              <p>Monthly Rent: ₹{lodge.monthlyRent.toLocaleString()}</p>
              <p>Type: {lodge.type}</p>
              <p>Address: {lodge.address}</p>
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
            >
              Confirm Booking
            </button>
          </form>
        )}
      </div>
    </div>
  );
}