import React from 'react';
import { School } from '../types/school';
import { X, MapPin, Phone, Mail, Globe, Users, GraduationCap, Calendar } from 'lucide-react';

interface SchoolDetailModalProps {
  school: School;
  onClose: () => void;
}

export const SchoolDetailModal: React.FC<SchoolDetailModalProps> = ({ school, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{school.name}</h2>
              <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                {school.type}
              </span>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">İletişim Bilgileri</h3>
              
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">{school.district}, {school.province}</p>
                  <p className="text-gray-600 text-sm">{school.address}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <a href={`tel:${school.phone}`} className="text-gray-900 hover:text-blue-600">
                  {school.phone}
                </a>
              </div>
              
              {school.email && (
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <a href={`mailto:${school.email}`} className="text-gray-900 hover:text-blue-600">
                    {school.email}
                  </a>
                </div>
              )}
              
              {school.website && (
                <div className="flex items-center space-x-3">
                  <Globe className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <a href={`https://${school.website}`} target="_blank" rel="noopener noreferrer" 
                     className="text-gray-900 hover:text-blue-600">
                    {school.website}
                  </a>
                </div>
              )}
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Genel Bilgiler</h3>
              
              <div className="flex items-center space-x-3">
                <Users className="w-5 h-5 text-green-600 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">{school.studentCount} Öğrenci</p>
                  <p className="text-gray-600 text-sm">Kayıtlı öğrenci sayısı</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <GraduationCap className="w-5 h-5 text-green-600 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">{school.teacherCount} Öğretmen</p>
                  <p className="text-gray-600 text-sm">Görevli öğretmen sayısı</p>
                </div>
              </div>
              
              {school.foundedYear && (
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">{school.foundedYear}</p>
                    <p className="text-gray-600 text-sm">Kuruluş yılı</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Konum</h3>
            <div className="bg-gray-100 rounded-lg p-4">
              <div className="flex items-center space-x-2 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">
                  Koordinatlar: {school.coordinates.lat.toFixed(6)}, {school.coordinates.lng.toFixed(6)}
                </span>
              </div>
              <div className="mt-2">
                <a 
                  href={`https://www.google.com/maps?q=${school.coordinates.lat},${school.coordinates.lng}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  Google Maps'te görüntüle
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};