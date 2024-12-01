export type Lodge = {
  id: string;
  name: string;
  address: string;
  city: string;
  monthlyRent: number;
  type: 'Flat' | 'PG' | 'Mess';
  images: string[];
  amenities: string[];
  description: string;
};

export type User = {
  id: string;
  email: string;
  password: string;
  name: string;
  role: 'user' | 'admin';
};

export type Booking = {
  id: string;
  userId: string;
  lodgeId: string;
  checkInDate: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
};