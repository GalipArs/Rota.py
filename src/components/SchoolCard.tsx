import React from 'react';
import { School } from '../types/school';
import { MapPin, Phone, Mail, Globe, Users, GraduationCap } from 'lucide-react';

interface SchoolCardProps {
  school: School;
  onViewDetails: (school: School) => void;
}

export const SchoolCard: React.FC<SchoolCardProps> = ({ school, onViewDetails }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border border-gray-200">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{school.name}</h3>
          <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
            {school.type}
          </span>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center text-gray-600">
          <MapPin className="w-4 h-4 mr-2 text-gray-400" />
          <span className="text-sm">{school.district}, {school.province}</span>
        </div>
        
        <div className="flex items-center text-gray-600">
          <Phone className="w-4 h-4 mr-2 text-gray-400" />
          <span className="text-sm">{school.phone}</span>
        </div>
        
        {school.email && (
          <div className="flex items-center text-gray-600">
            <Mail className="w-4 h-4 mr-2 text-gray-400" />
            <span className="text-sm">{school.email}</span>
          </div>
        )}
        
        {school.website && (
          <div className="flex items-center text-gray-600">
            <Globe className="w-4 h-4 mr-2 text-gray-400" />
            <a href={`https://${school.website}`} target="_blank" rel="noopener noreferrer" 
               className="text-sm text-blue-600 hover:text-blue-800">
              {school.website}
            </a>
          </div>
        )}
        
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div className="flex items-center text-gray-600">
            <Users className="w-4 h-4 mr-2 text-gray-400" />
            <span className="text-sm">{school.studentCount} öğrenci</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <GraduationCap className="w-4 h-4 mr-2 text-gray-400" />
            <span className="text-sm">{school.teacherCount} öğretmen</span>
          </div>
        </div>
      </div>
      
      <button
        onClick={() => onViewDetails(school)}
        className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
      >
        Detayları Görüntüle
      </button>
    </div>
  );
};