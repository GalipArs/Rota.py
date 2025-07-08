export interface RoutePoint {
  id: string;
  name: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  order: number;
  estimatedArrival?: string;
  estimatedDeparture?: string;
}

export interface RouteSegment {
  from: RoutePoint;
  to: RoutePoint;
  distance: number; // km
  duration: number; // minutes
}

export interface OptimizedRoute {
  id: string;
  name: string;
  startLocation: {
    lat: number;
    lng: number;
  };
  points: RoutePoint[];
  segments: RouteSegment[];
  totalDistance: number; // km
  totalDuration: number; // minutes
  estimatedFuelConsumption: number; // liters
  estimatedFuelCost: number; // TL
  startTime?: string;
  endTime?: string;
  createdAt: string;
}

export interface Vehicle {
  id: string;
  licensePlate: string;
  fuelConsumption: number; // L/100km
  cameraUrl?: string;
  isActive: boolean;
}

export interface FuelSettings {
  fuelPrice: number; // TL per liter
  averageConsumption: number; // L/100km
}