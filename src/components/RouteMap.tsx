import React from 'react';
import { OptimizedRoute } from '../types/route';
import { MapPin, Navigation } from 'lucide-react';

interface RouteMapProps {
  route: OptimizedRoute;
}

export const RouteMap: React.FC<RouteMapProps> = ({ route }) => {
  // Harita boyutları
  const mapWidth = 800;
  const mapHeight = 600;
  
  // Tüm koordinatları topla (başlangıç + rota noktaları)
  const allPoints = [
    route.startLocation,
    ...route.points.map(p => p.coordinates)
  ];
  
  // Koordinat sınırlarını hesapla
  const minLat = Math.min(...allPoints.map(p => p.lat));
  const maxLat = Math.max(...allPoints.map(p => p.lat));
  const minLng = Math.min(...allPoints.map(p => p.lng));
  const maxLng = Math.max(...allPoints.map(p => p.lng));
  
  // Padding ekle
  const latPadding = (maxLat - minLat) * 0.1;
  const lngPadding = (maxLng - minLng) * 0.1;
  
  // Koordinatları SVG pozisyonlarına çevir
  const getPosition = (lat: number, lng: number) => {
    const x = ((lng - (minLng - lngPadding)) / ((maxLng + lngPadding) - (minLng - lngPadding))) * mapWidth;
    const y = (((maxLat + latPadding) - lat) / ((maxLat + latPadding) - (minLat - latPadding))) * mapHeight;
    return { x, y };
  };

  // Rota çizgisi için path oluştur
  const createRoutePath = () => {
    let path = '';
    
    // Başlangıç noktasından başla
    const startPos = getPosition(route.startLocation.lat, route.startLocation.lng);
    path += `M ${startPos.x} ${startPos.y}`;
    
    // Tüm rota noktalarını ekle
    route.points.forEach(point => {
      const pos = getPosition(point.coordinates.lat, point.coordinates.lng);
      path += ` L ${pos.x} ${pos.y}`;
    });
    
    // Başlangıç noktasına dön
    path += ` L ${startPos.x} ${startPos.y}`;
    
    return path;
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center">
          <Navigation className="w-5 h-5 text-blue-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">Rota Haritası</h3>
        </div>
      </div>
      
      <div className="p-6">
        <div className="relative bg-gradient-to-b from-blue-50 to-green-50 rounded-lg overflow-hidden">
          <svg width={mapWidth} height={mapHeight} className="w-full h-auto">
            {/* Arka plan grid */}
            <defs>
              <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#e0e7ff" strokeWidth="1"/>
              </pattern>
              
              {/* Ok işareti için marker */}
              <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="7" 
                        refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#3B82F6" />
                </marker>
              </defs>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            
            {/* Rota çizgisi */}
            <path
              d={createRoutePath()}
              fill="none"
              stroke="#3B82F6"
              strokeWidth="3"
              strokeDasharray="5,5"
              markerEnd="url(#arrowhead)"
            />
            
            {/* Başlangıç noktası */}
            <g>
              {(() => {
                const pos = getPosition(route.startLocation.lat, route.startLocation.lng);
                return (
                  <>
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r="12"
                      fill="#10B981"
                      stroke="#ffffff"
                      strokeWidth="3"
                    />
                    <text
                      x={pos.x}
                      y={pos.y + 4}
                      textAnchor="middle"
                      className="text-xs font-bold fill-white"
                    >
                      S
                    </text>
                    <text
                      x={pos.x}
                      y={pos.y - 20}
                      textAnchor="middle"
                      className="text-xs font-medium fill-gray-700"
                    >
                      Başlangıç
                    </text>
                  </>
                );
              })()}
            </g>
            
            {/* Rota noktaları */}
            {route.points.map((point, index) => {
              const pos = getPosition(point.coordinates.lat, point.coordinates.lng);
              return (
                <g key={point.id}>
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r="10"
                    fill="#3B82F6"
                    stroke="#ffffff"
                    strokeWidth="2"
                  />
                  <text
                    x={pos.x}
                    y={pos.y + 4}
                    textAnchor="middle"
                    className="text-xs font-bold fill-white"
                  >
                    {point.order}
                  </text>
                  <text
                    x={pos.x}
                    y={pos.y - 15}
                    textAnchor="middle"
                    className="text-xs font-medium fill-gray-700"
                    style={{ fontSize: '10px' }}
                  >
                    {point.name.length > 15 ? point.name.substring(0, 15) + '...' : point.name}
                  </text>
                  {point.estimatedArrival && (
                    <text
                      x={pos.x}
                      y={pos.y + 25}
                      textAnchor="middle"
                      className="text-xs fill-blue-600"
                      style={{ fontSize: '9px' }}
                    >
                      {point.estimatedArrival}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        </div>
        
        {/* Harita Açıklaması */}
        <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span>Başlangıç Noktası</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-600 rounded-full mr-2"></div>
              <span>Okul Konumu</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-0.5 bg-blue-600 mr-2" style={{ borderTop: '2px dashed #3B82F6' }}></div>
              <span>Rota</span>
            </div>
          </div>
          <div className="text-right">
            <p>{route.points.length} durak • {route.totalDistance} km • {Math.round(route.totalDuration / 60)}s {route.totalDuration % 60}dk</p>
          </div>
        </div>
      </div>
    </div>
  );
};