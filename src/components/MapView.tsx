import React from 'react';
import { School } from '../types/school';
import { MapPin, Navigation, Globe } from 'lucide-react';
import { GoogleMapView } from './GoogleMapView';

interface MapViewProps {
  schools: School[];
  onSchoolClick: (school: School) => void;
}

export const MapView: React.FC<MapViewProps> = ({ schools, onSchoolClick }) => {
  const [useGoogleMaps, setUseGoogleMaps] = React.useState(false);
  
  if (useGoogleMaps) {
    return <GoogleMapView schools={schools} onSchoolClick={onSchoolClick} />;
  }

  // Turkey center coordinates
  const centerLat = 39.9334;
  const centerLng = 32.8597;
  
  const minLat = Math.min(...schools.map(s => s.coordinates.lat));
  const maxLat = Math.max(...schools.map(s => s.coordinates.lat));
  const minLng = Math.min(...schools.map(s => s.coordinates.lng));
  const maxLng = Math.max(...schools.map(s => s.coordinates.lng));
  
  const mapWidth = 800;
  const mapHeight = 600;
  
  const getPosition = (lat: number, lng: number) => {
    const x = ((lng - minLng) / (maxLng - minLng)) * mapWidth;
    const y = ((maxLat - lat) / (maxLat - minLat)) * mapHeight;
    return { x, y };
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <div className="flex items-center mb-4">
        <Navigation className="w-5 h-5 text-blue-600 mr-2" />
        <h3 className="text-lg font-semibold text-gray-900">Basit Harita Görünümü</h3>
        <button
          onClick={() => setUseGoogleMaps(true)}
          className="ml-auto flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors duration-200 text-sm"
        >
          <Globe className="w-4 h-4 mr-1" />
          Google Maps
        </button>
      </div>
      
      <div className="relative bg-gradient-to-b from-blue-50 to-green-50 rounded-lg overflow-hidden">
        <svg width={mapWidth} height={mapHeight} className="w-full h-auto">
          {/* Background grid */}
          <defs>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#e0e7ff" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          {/* School markers */}
          {schools.map((school) => {
            const position = getPosition(school.coordinates.lat, school.coordinates.lng);
            return (
              <g key={school.id}>
                <circle
                  cx={position.x}
                  cy={position.y}
                  r="8"
                  fill="#3B82F6"
                  stroke="#ffffff"
                  strokeWidth="2"
                  className="cursor-pointer hover:fill-blue-700 transition-colors duration-200"
                  onClick={() => onSchoolClick(school)}
                />
                <text
                  x={position.x}
                  y={position.y - 15}
                  textAnchor="middle"
                  className="text-xs font-medium fill-gray-700 pointer-events-none"
                  style={{ fontSize: '10px' }}
                >
                  {school.name.length > 20 ? school.name.substring(0, 20) + '...' : school.name}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      
      <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-blue-600 rounded-full mr-2"></div>
          <span>Okul Konumu</span>
        </div>
        <div className="text-right">
          <p>{schools.length} okul görüntüleniyor • Google Maps için API anahtarı gerekli</p>
        </div>
      </div>
    </div>
  );
};