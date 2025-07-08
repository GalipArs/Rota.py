import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { School } from '../types/school';
import { MapPin, Navigation, Loader2 } from 'lucide-react';

interface GoogleMapViewProps {
  schools: School[];
  onSchoolClick: (school: School) => void;
}

export const GoogleMapView: React.FC<GoogleMapViewProps> = ({ schools, onSchoolClick }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);

  useEffect(() => {
    const initMap = async () => {
      try {
        setIsLoading(true);
        
        // Google Maps API anahtarınızı buraya ekleyin
        const loader = new Loader({
          apiKey: 'YOUR_GOOGLE_MAPS_API_KEY', // Bu kısmı gerçek API anahtarınızla değiştirin
          version: 'weekly',
          libraries: ['places']
        });

        const google = await loader.load();
        
        if (!mapRef.current) return;

        // Türkiye merkez koordinatları
        const turkeyCenter = { lat: 39.9334, lng: 32.8597 };
        
        const mapInstance = new google.maps.Map(mapRef.current, {
          center: turkeyCenter,
          zoom: 6,
          styles: [
            {
              featureType: 'poi.school',
              elementType: 'geometry',
              stylers: [{ color: '#3B82F6' }]
            }
          ]
        });

        setMap(mapInstance);
        setError(null);
      } catch (err) {
        console.error('Google Maps yüklenirken hata:', err);
        setError('Harita yüklenirken bir hata oluştu. Lütfen API anahtarınızı kontrol edin.');
      } finally {
        setIsLoading(false);
      }
    };

    initMap();
  }, []);

  useEffect(() => {
    if (!map || !window.google) return;

    // Önceki işaretçileri temizle
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];

    // Yeni işaretçiler ekle
    schools.forEach(school => {
      const marker = new google.maps.Marker({
        position: { lat: school.coordinates.lat, lng: school.coordinates.lng },
        map: map,
        title: school.name,
        icon: {
          url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" fill="#3B82F6"/>
              <circle cx="12" cy="12" r="3" fill="white"/>
            </svg>
          `),
          scaledSize: new google.maps.Size(24, 24),
          anchor: new google.maps.Point(12, 12)
        }
      });

      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div style="padding: 8px; max-width: 250px;">
            <h3 style="margin: 0 0 8px 0; color: #1f2937; font-size: 16px; font-weight: 600;">${school.name}</h3>
            <p style="margin: 4px 0; color: #6b7280; font-size: 14px;">
              <strong>Tür:</strong> ${school.type}
            </p>
            <p style="margin: 4px 0; color: #6b7280; font-size: 14px;">
              <strong>Konum:</strong> ${school.district}, ${school.province}
            </p>
            <p style="margin: 4px 0; color: #6b7280; font-size: 14px;">
              <strong>Öğrenci:</strong> ${school.studentCount || 'Bilgi yok'}
            </p>
            <button 
              onclick="window.schoolDetailHandler('${school.id}')"
              style="
                margin-top: 8px;
                background: #3B82F6;
                color: white;
                border: none;
                padding: 6px 12px;
                border-radius: 4px;
                cursor: pointer;
                font-size: 12px;
              "
            >
              Detayları Görüntüle
            </button>
          </div>
        `
      });

      marker.addListener('click', () => {
        infoWindow.open(map, marker);
      });

      markersRef.current.push(marker);
    });

    // Global handler for school details
    (window as any).schoolDetailHandler = (schoolId: string) => {
      const school = schools.find(s => s.id === schoolId);
      if (school) {
        onSchoolClick(school);
      }
    };

    // Haritayı okullara göre ayarla
    if (schools.length > 0) {
      const bounds = new google.maps.LatLngBounds();
      schools.forEach(school => {
        bounds.extend({ lat: school.coordinates.lat, lng: school.coordinates.lng });
      });
      map.fitBounds(bounds);
      
      // Çok yakın zoom'u önle
      const listener = google.maps.event.addListener(map, 'idle', () => {
        if (map.getZoom()! > 15) map.setZoom(15);
        google.maps.event.removeListener(listener);
      });
    }
  }, [map, schools, onSchoolClick]);

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <div className="flex items-center mb-4">
          <Navigation className="w-5 h-5 text-red-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">Harita Görünümü</h3>
        </div>
        <div className="text-center py-12">
          <div className="flex flex-col items-center">
            <MapPin className="w-12 h-12 text-red-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Harita Yüklenemedi</h3>
            <p className="text-gray-500 mb-4">{error}</p>
            <p className="text-sm text-gray-400">
              Google Maps API anahtarı gereklidir. Lütfen src/components/GoogleMapView.tsx dosyasında API anahtarınızı ekleyin.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Navigation className="w-5 h-5 text-blue-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">Google Harita Görünümü</h3>
          </div>
          {isLoading && (
            <div className="flex items-center text-blue-600">
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              <span className="text-sm">Yükleniyor...</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="relative">
        <div 
          ref={mapRef} 
          className="w-full h-96 rounded-b-lg"
          style={{ minHeight: '400px' }}
        />
        
        {isLoading && (
          <div className="absolute inset-0 bg-gray-100 rounded-b-lg flex items-center justify-center">
            <div className="text-center">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
              <p className="text-gray-600">Harita yükleniyor...</p>
            </div>
          </div>
        )}
      </div>
      
      <div className="p-4 bg-gray-50 rounded-b-lg">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-600 rounded-full mr-2"></div>
            <span>Okul Konumu ({schools.length} okul)</span>
          </div>
          <div className="text-right">
            <p>Harita üzerindeki işaretçilere tıklayarak detayları görüntüleyebilirsiniz</p>
          </div>
        </div>
      </div>
    </div>
  );
};