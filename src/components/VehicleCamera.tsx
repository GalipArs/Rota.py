import React, { useState } from 'react';
import { Vehicle } from '../types/route';
import { Camera, Monitor, Wifi, WifiOff } from 'lucide-react';

interface VehicleCameraProps {
  vehicles: Vehicle[];
  onVehicleSelect: (vehicleId: string) => void;
}

export const VehicleCamera: React.FC<VehicleCameraProps> = ({ vehicles, onVehicleSelect }) => {
  const [selectedVehicle, setSelectedVehicle] = useState<string>('');
  const [isConnected, setIsConnected] = useState(false);

  const handleVehicleSelect = (vehicleId: string) => {
    setSelectedVehicle(vehicleId);
    onVehicleSelect(vehicleId);
    // Simüle kamera bağlantısı
    setIsConnected(true);
  };

  const selectedVehicleData = vehicles.find(v => v.id === selectedVehicle);

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Camera className="w-5 h-5 text-blue-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">Araç Kamerası</h3>
          </div>
          <div className="flex items-center space-x-2">
            {isConnected ? (
              <>
                <Wifi className="w-4 h-4 text-green-600" />
                <span className="text-sm text-green-600">Bağlı</span>
              </>
            ) : (
              <>
                <WifiOff className="w-4 h-4 text-red-600" />
                <span className="text-sm text-red-600">Bağlantı Yok</span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Araç Seçimi */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Araç Seçin
          </label>
          <select
            value={selectedVehicle}
            onChange={(e) => handleVehicleSelect(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Araç seçin...</option>
            {vehicles.map(vehicle => (
              <option key={vehicle.id} value={vehicle.id}>
                {vehicle.licensePlate} {vehicle.isActive ? '(Aktif)' : '(Pasif)'}
              </option>
            ))}
          </select>
        </div>

        {/* Kamera Görüntüsü */}
        <div className="relative bg-gray-900 rounded-lg overflow-hidden" style={{ aspectRatio: '16/9' }}>
          {selectedVehicleData && isConnected ? (
            <div className="relative w-full h-full">
              {/* Simüle kamera görüntüsü */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                <div className="text-center text-white">
                  <Monitor className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium">Canlı Kamera Görüntüsü</p>
                  <p className="text-sm opacity-75">{selectedVehicleData.licensePlate}</p>
                </div>
              </div>
              
              {/* Kamera overlay bilgileri */}
              <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-3 py-2 rounded">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">CANLI</span>
                </div>
              </div>
              
              <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-3 py-2 rounded">
                <span className="text-sm">{new Date().toLocaleTimeString('tr-TR')}</span>
              </div>
              
              <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-2 rounded">
                <span className="text-sm">{selectedVehicleData.licensePlate}</span>
              </div>
              
              {/* Simüle yol görüntüsü */}
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-gray-600 to-transparent opacity-30"></div>
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <div className="text-center">
                <Camera className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg">
                  {selectedVehicle ? 'Kameraya bağlanıyor...' : 'Araç seçin'}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Kamera Kontrolleri */}
        {selectedVehicleData && (
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Kayıt Al
              </button>
              <button className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">
                Ekran Görüntüsü
              </button>
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span>Kalite:</span>
              <select className="border border-gray-300 rounded px-2 py-1">
                <option>HD (720p)</option>
                <option>Full HD (1080p)</option>
                <option>4K</option>
              </select>
            </div>
          </div>
        )}

        {/* Araç Bilgileri */}
        {selectedVehicleData && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Araç Bilgileri</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Plaka:</span>
                <span className="ml-2 font-medium">{selectedVehicleData.licensePlate}</span>
              </div>
              <div>
                <span className="text-gray-600">Yakıt Tüketimi:</span>
                <span className="ml-2 font-medium">{selectedVehicleData.fuelConsumption} L/100km</span>
              </div>
              <div>
                <span className="text-gray-600">Durum:</span>
                <span className={`ml-2 font-medium ${selectedVehicleData.isActive ? 'text-green-600' : 'text-red-600'}`}>
                  {selectedVehicleData.isActive ? 'Aktif' : 'Pasif'}
                </span>
              </div>
              <div>
                <span className="text-gray-600">Kamera:</span>
                <span className="ml-2 font-medium text-green-600">Bağlı</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};