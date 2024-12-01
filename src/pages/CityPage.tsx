import React, { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, IndianRupee } from 'lucide-react';
import lodgeData from '../data/lodges.json';
import { Lodge } from '../types';
import { BookingModal } from '../components/BookingModal';

// Define static city images
const cityImages = {
  Delhi: 'https://picsum.photos/1600/900?city=Delhi',
  Mumbai: 'https://picsum.photos/1600/900?city=Mumbai',
  Bengaluru: 'https://picsum.photos/1600/900?city=Bengaluru',
  Chennai: 'https://picsum.photos/1600/900?city=Chennai',
  Hyderabad: 'https://picsum.photos/1600/900?city=Hyderabad',
  Pune: 'https://picsum.photos/1600/900?city=Pune',
  Kolkata: 'https://picsum.photos/1600/900?city=Kolkata',
  Jaipur: 'https://picsum.photos/1600/900?city=Jaipur',
  Lucknow: 'https://picsum.photos/1600/900?city=Lucknow',
  Ahmedabad: 'https://picsum.photos/1600/900?city=Ahmedabad',
  Indore: 'https://picsum.photos/1600/900?city=Indore',
  Surat: 'https://picsum.photos/1600/900?city=Surat',
};

// Get image URL for the city
const fetchCityImage = (cityName: string) => {
  return cityImages[cityName] || 'https://picsum.photos/1600/900';  // Default image if city is not found
};

export function CityPage() {
  const { cityName } = useParams<{ cityName: string }>();
  const [sortBy, setSortBy] = useState<'rent' | 'type'>('rent');
  const [selectedType, setSelectedType] = useState<'all' | 'Flat' | 'PG' | 'Mess'>('all');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedLodge, setSelectedLodge] = useState<Lodge | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState<Record<string, number>>({});
  const [cityImage, setCityImage] = useState<string>('');

  // Set city image on component mount
  React.useEffect(() => {
    if (cityName) {
      setCityImage(fetchCityImage(cityName));
    }
  }, [cityName]);

  const cityLodges = useMemo(() => {
    let filtered = lodgeData.lodges.filter(
      (lodge) => lodge.city.toLowerCase() === cityName?.toLowerCase()
    );

    if (selectedType !== 'all') {
      filtered = filtered.filter((lodge) => lodge.type === selectedType);
    }

    return filtered.sort((a, b) => 
      sortBy === 'rent' 
        ? a.monthlyRent - b.monthlyRent 
        : a.type.localeCompare(b.type)
    );
  }, [cityName, sortBy, selectedType]);

  const handleBookNow = (lodge: Lodge) => {
    setSelectedLodge(lodge);
    setShowBookingModal(true);
  };

  const nextImage = (lodgeId: string, totalImages: number) => {
    setActiveImageIndex((prev) => ({
      ...prev,
      [lodgeId]: ((prev[lodgeId] || 0) + 1) % totalImages,
    }));
  };

  return (
    <div className="space-y-6">
      <div className="relative h-64 mb-8">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${cityImage})`,  // Use the city image
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50" />
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-4xl font-bold text-white">
              Student Accommodations in {cityName}
            </h1>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-wrap gap-4 justify-between items-center">
          <div className="flex space-x-4">
            <select
              className="rounded-md border-gray-300 shadow-sm px-4 py-2"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'rent' | 'type')}
            >
              <option value="rent">Sort by Rent</option>
              <option value="type">Sort by Type</option>
            </select>
            <select
              className="rounded-md border-gray-300 shadow-sm px-4 py-2"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as 'all' | 'Flat' | 'PG' | 'Mess')}
            >
              <option value="all">All Types</option>
              <option value="Flat">Flat</option>
              <option value="PG">PG</option>
              <option value="Mess">Mess</option>
            </select>
          </div>
          <p className="text-gray-600">
            {cityLodges.length} accommodations found
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cityLodges.map((lodge) => (
          <div key={lodge.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
            <div className="relative h-64">
              <img
                src={lodge.images[activeImageIndex[lodge.id] || 0]}
                alt={lodge.name}
                className="w-full h-full object-cover"
                onClick={() => nextImage(lodge.id, lodge.images.length)}
              />
              <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                {(activeImageIndex[lodge.id] || 0) + 1}/{lodge.images.length}
              </div>
              <div className="absolute top-2 right-2 bg-indigo-600 text-white px-3 py-1 rounded-full text-sm">
                {lodge.type}
              </div>
            </div>
            <div className="p-6 space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900">{lodge.name}</h2>
              <div className="flex items-center text-gray-600">
                <MapPin className="h-5 w-5 mr-2 text-indigo-600" />
                <span>{lodge.address}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <IndianRupee className="h-5 w-5 mr-2 text-indigo-600" />
                <span className="text-xl font-semibold">₹{lodge.monthlyRent.toLocaleString()}</span>
                <span className="text-gray-500 ml-1">/ month</span>
              </div>
              <div className="border-t pt-4">
                <h3 className="text-lg font-semibold mb-2">Amenities</h3>
                <div className="flex flex-wrap gap-2">
                  {lodge.amenities.map((amenity) => (
                    <span
                      key={amenity}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-gray-600">{lodge.description}</p>
              <button
                onClick={() => handleBookNow(lodge)}
                className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2"
              >
                <span>Book Now</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {showBookingModal && selectedLodge && (
        <BookingModal
          lodge={selectedLodge}
          onClose={() => setShowBookingModal(false)}
        />
      )}
    </div>
  );
}
