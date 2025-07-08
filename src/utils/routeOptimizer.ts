import { School } from '../types/school';
import { RoutePoint, RouteSegment, OptimizedRoute } from '../types/route';

// Haversine formula ile iki nokta arası mesafe hesaplama (km)
export const calculateDistance = (
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number => {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

// Basit TSP (Traveling Salesman Problem) çözümü - Nearest Neighbor algoritması
export const optimizeRoute = (
  startLocation: { lat: number; lng: number },
  schools: School[]
): RoutePoint[] => {
  if (schools.length === 0) return [];

  const unvisited = [...schools];
  const route: RoutePoint[] = [];
  let currentLocation = startLocation;

  while (unvisited.length > 0) {
    let nearestIndex = 0;
    let nearestDistance = calculateDistance(
      currentLocation.lat,
      currentLocation.lng,
      unvisited[0].coordinates.lat,
      unvisited[0].coordinates.lng
    );

    for (let i = 1; i < unvisited.length; i++) {
      const distance = calculateDistance(
        currentLocation.lat,
        currentLocation.lng,
        unvisited[i].coordinates.lat,
        unvisited[i].coordinates.lng
      );

      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = i;
      }
    }

    const nearestSchool = unvisited[nearestIndex];
    route.push({
      id: nearestSchool.id,
      name: nearestSchool.name,
      coordinates: nearestSchool.coordinates,
      order: route.length + 1
    });

    currentLocation = nearestSchool.coordinates;
    unvisited.splice(nearestIndex, 1);
  }

  return route;
};

// Rota segmentlerini hesaplama
export const calculateRouteSegments = (
  startLocation: { lat: number; lng: number },
  routePoints: RoutePoint[]
): RouteSegment[] => {
  const segments: RouteSegment[] = [];
  let currentLocation = startLocation;

  routePoints.forEach((point, index) => {
    const distance = calculateDistance(
      currentLocation.lat,
      currentLocation.lng,
      point.coordinates.lat,
      point.coordinates.lng
    );

    // Ortalama hız 50 km/h varsayımı ile süre hesaplama
    const duration = (distance / 50) * 60; // minutes

    segments.push({
      from: {
        id: index === 0 ? 'start' : routePoints[index - 1].id,
        name: index === 0 ? 'Başlangıç Noktası' : routePoints[index - 1].name,
        coordinates: currentLocation,
        order: index
      },
      to: point,
      distance: Math.round(distance * 100) / 100,
      duration: Math.round(duration)
    });

    currentLocation = point.coordinates;
  });

  // Başlangıç noktasına dönüş segmenti
  if (routePoints.length > 0) {
    const returnDistance = calculateDistance(
      currentLocation.lat,
      currentLocation.lng,
      startLocation.lat,
      startLocation.lng
    );

    const returnDuration = (returnDistance / 50) * 60;

    segments.push({
      from: routePoints[routePoints.length - 1],
      to: {
        id: 'end',
        name: 'Başlangıç Noktası (Dönüş)',
        coordinates: startLocation,
        order: routePoints.length + 1
      },
      distance: Math.round(returnDistance * 100) / 100,
      duration: Math.round(returnDuration)
    });
  }

  return segments;
};

// Zaman hesaplamaları
export const calculateRouteTimes = (
  segments: RouteSegment[],
  startTime: string,
  stopDuration: number = 15 // Her durakta 15 dakika bekleme
): RoutePoint[] => {
  const points: RoutePoint[] = [];
  let currentTime = new Date(`2024-01-01T${startTime}:00`);

  segments.forEach((segment, index) => {
    if (index < segments.length - 1) { // Son segment dönüş segmenti
      currentTime = new Date(currentTime.getTime() + segment.duration * 60000);
      
      const arrivalTime = currentTime.toTimeString().slice(0, 5);
      const departureTime = new Date(currentTime.getTime() + stopDuration * 60000)
        .toTimeString().slice(0, 5);

      points.push({
        ...segment.to,
        estimatedArrival: arrivalTime,
        estimatedDeparture: departureTime
      });

      currentTime = new Date(currentTime.getTime() + stopDuration * 60000);
    }
  });

  return points;
};

// Yakıt tüketimi ve maliyet hesaplama
export const calculateFuelConsumption = (
  totalDistance: number,
  fuelConsumption: number, // L/100km
  fuelPrice: number // TL/L
): { consumption: number; cost: number } => {
  const consumption = (totalDistance / 100) * fuelConsumption;
  const cost = consumption * fuelPrice;

  return {
    consumption: Math.round(consumption * 100) / 100,
    cost: Math.round(cost * 100) / 100
  };
};

// Tam rota optimizasyonu
export const createOptimizedRoute = (
  name: string,
  startLocation: { lat: number; lng: number },
  schools: School[],
  startTime: string = '08:00',
  fuelConsumption: number = 25, // L/100km
  fuelPrice: number = 32 // TL/L
): OptimizedRoute => {
  const optimizedPoints = optimizeRoute(startLocation, schools);
  const segments = calculateRouteSegments(startLocation, optimizedPoints);
  const pointsWithTimes = calculateRouteTimes(segments, startTime);
  
  const totalDistance = segments.reduce((sum, segment) => sum + segment.distance, 0);
  const totalDuration = segments.reduce((sum, segment) => sum + segment.duration, 0);
  
  const { consumption, cost } = calculateFuelConsumption(
    totalDistance,
    fuelConsumption,
    fuelPrice
  );

  // Bitiş zamanı hesaplama
  const startDateTime = new Date(`2024-01-01T${startTime}:00`);
  const endDateTime = new Date(startDateTime.getTime() + (totalDuration + (schools.length * 15)) * 60000);
  const endTime = endDateTime.toTimeString().slice(0, 5);

  return {
    id: Date.now().toString(),
    name,
    startLocation,
    points: pointsWithTimes,
    segments,
    totalDistance: Math.round(totalDistance * 100) / 100,
    totalDuration: Math.round(totalDuration + (schools.length * 15)), // Durak süreleri dahil
    estimatedFuelConsumption: consumption,
    estimatedFuelCost: cost,
    startTime,
    endTime,
    createdAt: new Date().toISOString()
  };
};