import React, { useState, useEffect } from 'react';
import { School } from '../types/school';
import { OptimizedRoute, Vehicle, FuelSettings } from '../types/route';
import { createOptimizedRoute } from '../utils/routeOptimizer';
import { MapPin, Clock, Fuel, DollarSign, Truck, Camera, Settings, Play, Square } from 'lucide-react';

interface RouteOptimizerProps {
  schools: School[];
  onRouteCreated: (route: OptimizedRoute) => void;
}

export const RouteOptimizer: React.FC<RouteOptimizerProps> = ({ schools, onRouteCreated }) => {
  const [selectedSchools, setSelectedSchools] = useState<School[]>(schools);
  const [startLocation, setStartLocation] = useState({ lat: 40.0781, lng: 29.5135 });
  const [startTime, setStartTime] = useState('08:00');
  const [routeName, setRouteName] = useState('İnegöl Okul Rotası');
  const [fuelSettings, setFuelSettings] = useState<FuelSettings>({
    fuelPrice: 32,
    averageConsumption: 25
  });
  const [vehicles, setVehicles] = useState<Vehicle[]>([
    {
      id: '1',
      licensePlate: '16 ABC 123',
      fuelConsumption: 25,
      cameraUrl: 'https://example.com/camera1',
      isActive: true
    }
  ]);
  const [selectedVehicle, setSelectedVehicle] = useState<string>('1');
  const [isRouteActive, setIsRouteActive] = useState(false);

  const handleSchoolToggle = (school: School) => {
    setSelectedSchools(prev => {
      const exists = prev.find(s => s.id === school.id);
      if (exists) {
        return prev.filter(s => s.id !== school.id);
      } else {
        return [...prev, school];
      }
    });
  };

  const handleSelectAll = () => {
    setSelectedSchools(schools);
  };

  const handleDeselectAll = () => {
    setSelectedSchools([]);
  };

  const handleCreateRoute = () => {
    if (selectedSchools.length === 0) return;

    const vehicle = vehicles.find(v => v.id === selectedVehicle);
    const consumption = vehicle?.fuelConsumption || fuelSettings.averageConsumption;

    const route = createOptimizedRoute(
      routeName,
      startLocation,
      selectedSchools,
      startTime,
      consumption,
      fuelSettings.fuelPrice
    );

    onRouteCreated(route);
  };

  const handleStartRoute = () => {
    setIsRouteActive(true);
  };

  const handleStopRoute = () => {
    setIsRouteActive(false);
  };

  const addVehicle = () => {
    const newVehicle: Vehicle = {
      id: Date.now().toString(),
      licensePlate: '',
      fuelConsumption: 25,
      isActive: false
    };
    setVehicles([...vehicles, newVehicle]);
  };

  const updateVehicle = (id: string, updates: Partial<Vehicle>) => {
    setVehicles(prev => prev.map(v => v.id === id ? { ...v, ...updates } : v));
  };

  const deleteVehicle = (id: string) => {
    setVehicles(prev => prev.filter(v => v.id !== id));
    if (selectedVehicle === id) {
      setSelectedVehicle(vehicles[0]?.id || '');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <div className="flex items-center mb-6">
        <Truck className="w-6 h-6 text-blue-600 mr-3" />
        <h2 className="text-2xl font-bold text-gray-900">Rota Optimizasyonu</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sol Panel - Rota Ayarları */}
        <div className="space-y-6">
          {/* Temel Ayarlar */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Rota Ayarları</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rota Adı
                </label>
                <input
                  type="text"
                  value={routeName}
                  onChange={(e) => setRouteName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Başlangıç Enlem
                  </label>
                  <input
                    type="number"
                    step="0.000001"
                    value={startLocation.lat}
                    onChange={(e) => setStartLocation(prev => ({ ...prev, lat: parseFloat(e.target.value) }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Başlangıç Boylam
                  </label>
                  <input
                    type="number"
                    step="0.000001"
                    value={startLocation.lng}
                    onChange={(e) => setStartLocation(prev => ({ ...prev, lng: parseFloat(e.target.value) }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Clock className="w-4 h-4 inline mr-1" />
                  Başlangıç Saati
                </label>
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Yakıt Ayarları */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              <Settings className="w-5 h-5 inline mr-2" />
              Yakıt Ayarları
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Fuel className="w-4 h-4 inline mr-1" />
                  Yakıt Fiyatı (₺/L)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={fuelSettings.fuelPrice}
                  onChange={(e) => setFuelSettings(prev => ({ ...prev, fuelPrice: parseFloat(e.target.value) }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tüketim (L/100km)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={fuelSettings.averageConsumption}
                  onChange={(e) => setFuelSettings(prev => ({ ...prev, averageConsumption: parseFloat(e.target.value) }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Araç Seçimi */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              <Truck className="w-5 h-5 inline mr-2" />
              Araç Seçimi
            </h3>
            
            <div className="space-y-3">
              {vehicles.map(vehicle => (
                <div key={vehicle.id} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="vehicle"
                      value={vehicle.id}
                      checked={selectedVehicle === vehicle.id}
                      onChange={(e) => setSelectedVehicle(e.target.value)}
                      className="mr-3"
                    />
                    <div>
                      <p className="font-medium">{vehicle.licensePlate || 'Plaka Girilmemiş'}</p>
                      <p className="text-sm text-gray-600">{vehicle.fuelConsumption} L/100km</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {vehicle.cameraUrl && (
                      <button className="p-1 text-green-600 hover:bg-green-100 rounded">
                        <Camera className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => deleteVehicle(vehicle.id)}
                      className="p-1 text-red-600 hover:bg-red-100 rounded"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
              
              <button
                onClick={addVehicle}
                className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600"
              >
                + Araç Ekle
              </button>
            </div>
          </div>
        </div>

        {/* Sağ Panel - Okul Seçimi */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              Okul Seçimi ({selectedSchools.length}/{schools.length})
            </h3>
            <div className="space-x-2">
              <button
                onClick={handleSelectAll}
                className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
              >
                Tümünü Seç
              </button>
              <button
                onClick={handleDeselectAll}
                className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
              >
                Temizle
              </button>
            </div>
          </div>

          <div className="max-h-96 overflow-y-auto border border-gray-200 rounded-lg">
            {schools.map(school => (
              <div key={school.id} className="flex items-center p-3 border-b border-gray-100 hover:bg-gray-50">
                <input
                  type="checkbox"
                  checked={selectedSchools.some(s => s.id === school.id)}
                  onChange={() => handleSchoolToggle(school)}
                  className="mr-3"
                />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{school.name}</p>
                  <p className="text-sm text-gray-600">{school.type}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Alt Panel - Rota Kontrolleri */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleCreateRoute}
              disabled={selectedSchools.length === 0}
              className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
            >
              <MapPin className="w-5 h-5 mr-2" />
              Rota Oluştur
            </button>

            {!isRouteActive ? (
              <button
                onClick={handleStartRoute}
                className="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
              >
                <Play className="w-5 h-5 mr-2" />
                Rotayı Başlat
              </button>
            ) : (
              <button
                onClick={handleStopRoute}
                className="flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium"
              >
                <Square className="w-5 h-5 mr-2" />
                Rotayı Durdur
              </button>
            )}
          </div>

          {isRouteActive && (
            <div className="flex items-center space-x-2 text-green-600">
              <div className="w-3 h-3 bg-green-600 rounded-full animate-pulse"></div>
              <span className="font-medium">Rota Aktif</span>
            </div>
          )}
        </div>

        {selectedSchools.length > 0 && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center">
                <MapPin className="w-4 h-4 text-blue-600 mr-2" />
                <span>{selectedSchools.length} okul</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 text-blue-600 mr-2" />
                <span>~{Math.round(selectedSchools.length * 0.5)} saat</span>
              </div>
              <div className="flex items-center">
                <Fuel className="w-4 h-4 text-blue-600 mr-2" />
                <span>~{Math.round(selectedSchools.length * 2)} L</span>
              </div>
              <div className="flex items-center">
                <DollarSign className="w-4 h-4 text-blue-600 mr-2" />
                <span>~{Math.round(selectedSchools.length * 2 * fuelSettings.fuelPrice)} ₺</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};