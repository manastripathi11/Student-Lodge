import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Building2, Users, BookOpen, Coffee, Wifi } from 'lucide-react';
import Image from "../assets/air-2340300_640.webp"; // Default image if specific image not found
import Delhi from "../assets/delhi.webp";
import Mumbai from "../assets/miumbai.webp";
import Chennai from "../assets/Chennai.webp";
import Hyderabad from "../assets/Hyderabad.webp";
import Pune from "../assets/pune.webp";
import Kolkata from "../assets/Kolkata.webp";
import Jaipur from "../assets/Jaipur.webp";
import Lucknow from "../assets/Lucknow.webp";
import Ahmedabad from "../assets/Ahmedabad.webp";
import Indore from "../assets/Indore.webp";
import Surat from "../assets/Surat.webp";

// List of cities
const cities = [
  'Delhi',
  'Mumbai',
  'Bengaluru',
  'Chennai',
  'Hyderabad',
  'Pune',
  'Kolkata',
  'Jaipur',
  'Lucknow',
  'Ahmedabad',
  'Indore',
  'Surat',
];

// Mapping city names to their respective images
const cityImages = {
  Delhi: Delhi,
  Mumbai: Mumbai,
  Bengaluru: Image, // Default image if specific image not found
  Chennai: Chennai,
  Hyderabad: Hyderabad,
  Pune: Pune,
  Kolkata: Kolkata,
  Jaipur: Jaipur,
  Lucknow: Lucknow,
  Ahmedabad: Ahmedabad,
  Indore: Indore,
  Surat: Surat,
};

// List of features
const features = [
  {
    icon: <Building2 className="h-8 w-8 text-indigo-600" />,
    title: 'Quality Accommodations',
    description: 'Carefully selected PGs, hostels, and apartments for students',
  },
  {
    icon: <Users className="h-8 w-8 text-indigo-600" />,
    title: 'Student Community',
    description: 'Connect with fellow students and build lasting friendships',
  },
  {
    icon: <BookOpen className="h-8 w-8 text-indigo-600" />,
    title: 'Study Environment',
    description: 'Dedicated study areas and peaceful atmosphere',
  },
  {
    icon: <Coffee className="h-8 w-8 text-indigo-600" />,
    title: 'Modern Amenities',
    description: 'WiFi, food, laundry, and other essential services',
  },
];

export function HomePage() {
  return (
    <div className="space-y-16">
      <div className="relative h-[500px] -mt-6 mb-8">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1600&h=900)',
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-5xl font-bold text-white mb-6">
              Find Your Perfect Student Home
            </h1>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl">
              Discover comfortable and affordable accommodations across major Indian cities
            </p>
          </div>
        </div>
      </div>

      <section className="py-12 bg-gray-50 rounded-xl">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col items-center text-center">
                  {feature.icon}
                  <h3 className="text-xl font-semibold mt-4 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-center mb-12">
          Popular Cities
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {cities.map((city) => (
            <Link
              key={city}
              to={`/city/${city.toLowerCase()}`}
              className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div
                className="h-64 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-300"
                style={{
                  backgroundImage: `url(${cityImages[city] || Image})`, // Set the image for each city
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center text-white">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span className="text-xl font-semibold">{city}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
