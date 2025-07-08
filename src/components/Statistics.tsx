import React from 'react';
import { School } from '../types/school';
import { Users, GraduationCap, Building, MapPin } from 'lucide-react';

interface StatisticsProps {
  schools: School[];
}

export const Statistics: React.FC<StatisticsProps> = ({ schools }) => {
  const totalStudents = schools.reduce((sum, school) => sum + (school.studentCount || 0), 0);
  const totalTeachers = schools.reduce((sum, school) => sum + (school.teacherCount || 0), 0);
  const totalProvinces = new Set(schools.map(school => school.province)).size;
  const totalDistricts = new Set(schools.map(school => `${school.province}-${school.district}`)).size;

  const stats = [
    {
      icon: Building,
      title: 'Toplam Okul',
      value: schools.length.toLocaleString(),
      color: 'blue'
    },
    {
      icon: Users,
      title: 'Toplam Öğrenci',
      value: totalStudents.toLocaleString(),
      color: 'green'
    },
    {
      icon: GraduationCap,
      title: 'Toplam Öğretmen',
      value: totalTeachers.toLocaleString(),
      color: 'purple'
    },
    {
      icon: MapPin,
      title: 'İl/İlçe',
      value: `${totalProvinces}/${totalDistricts}`,
      color: 'orange'
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: 'bg-blue-100 text-blue-800',
      green: 'bg-green-100 text-green-800',
      purple: 'bg-purple-100 text-purple-800',
      orange: 'bg-orange-100 text-orange-800'
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex items-center">
            <div className={`p-3 rounded-full ${getColorClasses(stat.color)}`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};