import React from 'react';
import { OptimizedRoute } from '../types/route';
import { MapPin, Clock, Fuel, DollarSign, Navigation, ArrowRight } from 'lucide-react';

interface RouteDisplayProps {
  route: OptimizedRoute;
}

export const RouteDisplay: React.FC<RouteDisplayProps> = ({ route }) => {
  const formatTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}s ${mins}dk`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200">
      {/* Rota Başlığı */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{route.name}</h2>
            <p className="text-gray-600 mt-1">
              {new Date(route.createdAt).toLocaleDateString('tr-TR')} - 
              {route.startTime} - {route.endTime}
            </p>
          </div>
          <div className="flex items-center space-x-2 text-green-600">
            <div className="w-3 h-3 bg-green-600 rounded-full animate-pulse"></div>
            <span className="font-medium">Aktif Rota</span>
          </div>
        </div>
      </div>

      {/* Rota İstatistikleri */}
      <div className="p-6 border-b border-gray-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mx-auto mb-2">
              <MapPin className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{route.totalDistance} km</p>
            <p className="text-sm text-gray-600">Toplam Mesafe</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mx-auto mb-2">
              <Clock className="w-6 h-6 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{formatTime(route.totalDuration)}</p>
            <p className="text-sm text-gray-600">Toplam Süre</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full mx-auto mb-2">
              <Fuel className="w-6 h-6 text-orange-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{route.estimatedFuelConsumption} L</p>
            <p className="text-sm text-gray-600">Yakıt Tüketimi</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mx-auto mb-2">
              <DollarSign className="w-6 h-6 text-red-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{route.estimatedFuelCost} ₺</p>
            <p className="text-sm text-gray-600">Yakıt Maliyeti</p>
          </div>
        </div>
      </div>

      {/* Rota Detayları */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Navigation className="w-5 h-5 mr-2" />
          Rota Detayları
        </h3>
        
        <div className="space-y-4">
          {/* Başlangıç Noktası */}
          <div className="flex items-center p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
            <div className="flex items-center justify-center w-8 h-8 bg-green-500 text-white rounded-full text-sm font-bold mr-4">
              S
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">Başlangıç Noktası</p>
              <p className="text-sm text-gray-600">
                {route.startLocation.lat.toFixed(6)}, {route.startLocation.lng.toFixed(6)}
              </p>
              <p className="text-sm text-green-600 font-medium">{route.startTime}</p>
            </div>
          </div>

          {/* Rota Segmentleri */}
          {route.segments.map((segment, index) => {
            if (segment.to.id === 'end') return null; // Dönüş segmentini ayrı göstereceğiz
            
            return (
              <div key={index} className="relative">
                {/* Bağlantı Çizgisi */}
                <div className="absolute left-4 top-0 w-0.5 h-full bg-gray-300"></div>
                
                <div className="flex items-start">
                  <div className="flex items-center justify-center w-8 h-8 bg-blue-500 text-white rounded-full text-sm font-bold mr-4 relative z-10">
                    {segment.to.order}
                  </div>
                  <div className="flex-1 pb-4">
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{segment.to.name}</h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {segment.distance} km
                          </span>
                          <span className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {formatTime(segment.duration)}
                          </span>
                        </div>
                      </div>
                      
                      {segment.to.estimatedArrival && (
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-green-600">
                            Varış: {segment.to.estimatedArrival}
                          </span>
                          <span className="text-blue-600">
                            Ayrılış: {segment.to.estimatedDeparture}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Dönüş Segmenti */}
          {route.segments.length > 0 && (
            <div className="relative">
              <div className="absolute left-4 top-0 w-0.5 h-8 bg-gray-300"></div>
              <div className="flex items-center p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
                <div className="flex items-center justify-center w-8 h-8 bg-red-500 text-white rounded-full text-sm font-bold mr-4">
                  E
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Başlangıç Noktasına Dönüş</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                    <span className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {route.segments[route.segments.length - 1]?.distance} km
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {formatTime(route.segments[route.segments.length - 1]?.duration || 0)}
                    </span>
                  </div>
                  <p className="text-sm text-red-600 font-medium mt-1">{route.endTime}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};