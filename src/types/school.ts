export interface School {
  id: string;
  name: string;
  type: 'İlkokul' | 'Ortaokul' | 'Lise' | 'Anaokulu' | 'Özel Okul';
  province: string;
  district: string;
  address: string;
  phone?: string;
  email?: string;
  website?: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  studentCount?: number;
  teacherCount?: number;
  foundedYear?: number;
}

export interface FilterOptions {
  province: string;
  district: string;
  type: string;
  searchTerm: string;
}