import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Lodge } from '../types';
import lodgeData from '../data/lodges.json';
import { Building, Trash2 } from 'lucide-react';

export function AdminPage() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [lodges, setLodges] = useState<Lodge[]>(lodgeData.lodges);
  const [newLodge, setNewLodge] = useState<Partial<Lodge>>({
    type: 'PG',
    images: [],
    amenities: [],
  });

  if (!user || user.role !== 'admin') {
    navigate('/');
    return null;
  }

  const handleAddLodge = (e: React.FormEvent) => {
    e.preventDefault();
    const lodge: Lodge = {
      id: Math.random().toString(36).substr(2, 9),
      name: newLodge.name!,
      address: newLodge.address!,
      city: newLodge.city!,
      monthlyRent: Number(newLodge.monthlyRent),
      type: newLodge.type as 'Flat' | 'PG' | 'Mess',
      images: [newLodge.images![0]],
      amenities: newLodge.amenities!,
      description: newLodge.description!,
    };

    setLodges([...lodges, lodge]);
    lodgeData.lodges.push(lodge);
    setNewLodge({
      type: 'PG',
      images: [],
      amenities: [],
    });
  };

  const handleRemoveLodge = (id: string) => {
    const updatedLodges = lodges.filter((lodge) => lodge.id !== id);
    setLodges(updatedLodges);
    lodgeData.lodges = updatedLodges;
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Add New Lodge</h2>
        <form onSubmit={handleAddLodge} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                required
                value={newLodge.name || ''}
                onChange={(e) =>
                  setNewLodge({ ...newLodge, name: e.target.value })
                }
                className="w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <input
                type="text"
                required
                value={newLodge.city || ''}
                onChange={(e) =>
                  setNewLodge({ ...newLodge, city: e.target.value })
                }
                className="w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <input
                type="text"
                required
                value={newLodge.address || ''}
                onChange={(e) =>
                  setNewLodge({ ...newLodge, address: e.target.value })
                }
                className="w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Monthly Rent
              </label>
              <input
                type="number"
                required
                value={newLodge.monthlyRent || ''}
                onChange={(e) =>
                  setNewLodge({ ...newLodge, monthlyRent: e.target.value })
                }
                className="w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type
              </label>
              <select
                value={newLodge.type}
                onChange={(e) =>
                  setNewLodge({ ...newLodge, type: e.target.value as Lodge['type'] })
                }
                className="w-full rounded-md border-gray-300 shadow-sm"
              >
                <option value="PG">PG</option>
                <option value="Flat">Flat</option>
                <option value="Mess">Mess</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image URL
              </label>
              <input
                type="url"
                required
                value={newLodge.images?.[0] || ''}
                onChange={(e) =>
                  setNewLodge({ ...newLodge, images: [e.target.value] })
                }
                className="w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              required
              value={newLodge.description || ''}
              onChange={(e) =>
                setNewLodge({ ...newLodge, description: e.target.value })
              }
              className="w-full rounded-md border-gray-300 shadow-sm"
              rows={3}
            />
          </div>
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            Add Lodge
          </button>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Manage Lodges</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lodges.map((lodge) => (
            <div
              key={lodge.id}
              className="border rounded-lg p-4 relative group"
            >
              <img
                src={lodge.images[0]}
                alt={lodge.name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="font-semibold">{lodge.name}</h3>
              <p className="text-gray-600">{lodge.city}</p>
              <div className="flex items-center text-gray-600 mt-2">
                <Building className="h-4 w-4 mr-2" />
                <span>{lodge.type}</span>
              </div>
              <button
                onClick={() => handleRemoveLodge(lodge.id)}
                className="absolute top-2 right-2 bg-red-100 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="h-4 w-4 text-red-600" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}