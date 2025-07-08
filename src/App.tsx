import React, { useState } from 'react';
import { inegolSchools } from './data/inegolSchools';
import { OptimizedRoute, Vehicle } from './types/route';
import { RouteOptimizer } from './components/RouteOptimizer';
import { RouteDisplay } from './components/RouteDisplay';
import { RouteMap } from './components/RouteMap';
import { VehicleCamera } from './components/VehicleCamera';
import { Truck, Route, Camera, BarChart3 } from 'lucide-react';

function App() {
  const [currentRoute, setCurrentRoute] = useState<OptimizedRoute | null>(null);
  const [activeTab, setActiveTab] = useState<'optimizer' | 'route' | 'map' | 'camera'>('optimizer');
  const [vehicles] = useState<Vehicle[]>([
    {
      id: '1',
      licensePlate: '16 ABC 123',
      fuelConsumption: 25,
      cameraUrl: 'https://example.com/camera1',
      isActive: true
    },
    {
      id: '2',
      licensePlate: '16 DEF 456',
      fuelConsumption: 28,
      cameraUrl: 'https://example.com/camera2',
      isActive: false
    }
  ]);

  const handleRouteCreated = (route: OptimizedRoute) => {
    setCurrentRoute(route);
    setActiveTab('route');
  };

  const handleVehicleSelect = (vehicleId: string) => {
    console.log('Selected vehicle:', vehicleId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Truck className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">ToptanRotam</h1>
                <p className="text-sm text-gray-600">Okul Rota Optimizasyon Sistemi</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{inegolSchools.length} Okul</p>
                <p className="text-xs text-gray-600">Bursa - İnegöl</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('optimizer')}
              className={`flex items-center px-3 py-4 text-sm font-medium border-b-2 transition-colors duration-200 ${
                activeTab === 'optimizer'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Rota Optimizasyonu
            </button>
            
            <button
              onClick={() => setActiveTab('route')}
              disabled={!currentRoute}
              className={`flex items-center px-3 py-4 text-sm font-medium border-b-2 transition-colors duration-200 ${
                activeTab === 'route'
                  ? 'border-blue-500 text-blue-600'
                  : currentRoute
                  ? 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  : 'border-transparent text-gray-400 cursor-not-allowed'
              }`}
            >
              <Route className="w-4 h-4 mr-2" />
              Rota Detayları
            </button>
            
            <button
              onClick={() => setActiveTab('map')}
              disabled={!currentRoute}
              className={`flex items-center px-3 py-4 text-sm font-medium border-b-2 transition-colors duration-200 ${
                activeTab === 'map'
                  ? 'border-blue-500 text-blue-600'
                  : currentRoute
                  ? 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  : 'border-transparent text-gray-400 cursor-not-allowed'
              }`}
            >
              <Truck className="w-4 h-4 mr-2" />
              Harita Görünümü
            </button>
            
            <button
              onClick={() => setActiveTab('camera')}
              className={`flex items-center px-3 py-4 text-sm font-medium border-b-2 transition-colors duration-200 ${
                activeTab === 'camera'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Camera className="w-4 h-4 mr-2" />
              Araç Kamerası
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'optimizer' && (
          <RouteOptimizer
            schools={inegolSchools}
            onRouteCreated={handleRouteCreated}
          />
        )}
        
        {activeTab === 'route' && currentRoute && (
          <RouteDisplay route={currentRoute} />
        )}
        
        {activeTab === 'map' && currentRoute && (
          <RouteMap route={currentRoute} />
        )}
        
        {activeTab === 'camera' && (
          <VehicleCamera
            vehicles={vehicles}
            onVehicleSelect={handleVehicleSelect}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">ToptanRotam</h3>
              <p className="text-gray-600">
                Toptancılar ve şöförler için en optimal rota çözümü. 
                Yakıt tasarrufu ve zaman optimizasyonu.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Özellikler</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Rota optimizasyonu</li>
                <li>• Yakıt tüketimi hesaplama</li>
                <li>• Canlı araç takibi</li>
                <li>• Kamera entegrasyonu</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">İstatistikler</h3>
              <div className="space-y-2 text-gray-600">
                <p>• {inegolSchools.length} okul lokasyonu</p>
                <p>• Bursa - İnegöl bölgesi</p>
                <p>• Gerçek zamanlı optimizasyon</p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-500">
            <p>&copy; 2024 ToptanRotam. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;