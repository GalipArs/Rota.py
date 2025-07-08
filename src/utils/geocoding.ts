// Google Maps Geocoding API kullanarak adres koordinatlarını alma
export const geocodeAddress = async (address: string, apiKey: string): Promise<{lat: number, lng: number} | null> => {
  try {
    const encodedAddress = encodeURIComponent(address);
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`
    );
    
    const data = await response.json();
    
    if (data.status === 'OK' && data.results.length > 0) {
      const location = data.results[0].geometry.location;
      return {
        lat: location.lat,
        lng: location.lng
      };
    }
    
    return null;
  } catch (error) {
    console.error('Geocoding hatası:', error);
    return null;
  }
};

// Yandex Maps Geocoding API kullanarak adres koordinatlarını alma
export const yandexGeocodeAddress = async (address: string, apiKey: string): Promise<{lat: number, lng: number} | null> => {
  try {
    const encodedAddress = encodeURIComponent(address);
    const response = await fetch(
      `https://geocode-maps.yandex.ru/1.x/?apikey=${apiKey}&geocode=${encodedAddress}&format=json`
    );
    
    const data = await response.json();
    
    if (data.response?.GeoObjectCollection?.featureMember?.length > 0) {
      const coordinates = data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' ');
      return {
        lat: parseFloat(coordinates[1]),
        lng: parseFloat(coordinates[0])
      };
    }
    
    return null;
  } catch (error) {
    console.error('Yandex Geocoding hatası:', error);
    return null;
  }
};

// Toplu adres koordinatlarını alma (rate limiting ile)
export const batchGeocode = async (
  addresses: string[], 
  apiKey: string, 
  provider: 'google' | 'yandex' = 'google',
  delay: number = 100
): Promise<Array<{address: string, coordinates: {lat: number, lng: number} | null}>> => {
  const results: Array<{address: string, coordinates: {lat: number, lng: number} | null}> = [];
  
  for (let i = 0; i < addresses.length; i++) {
    const address = addresses[i];
    console.log(`Geocoding ${i + 1}/${addresses.length}: ${address}`);
    
    let coordinates;
    if (provider === 'google') {
      coordinates = await geocodeAddress(address, apiKey);
    } else {
      coordinates = await yandexGeocodeAddress(address, apiKey);
    }
    
    results.push({ address, coordinates });
    
    // Rate limiting için bekleme
    if (i < addresses.length - 1) {
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  return results;
};

// MEB okul verilerini işleme yardımcı fonksiyonu
export const processMEBSchoolData = (schoolData: any[]): any[] => {
  return schoolData.map(school => ({
    id: school.id || Math.random().toString(36).substr(2, 9),
    name: school.name || school.schoolName || 'İsimsiz Okul',
    type: school.type || school.schoolType || 'Bilinmeyen',
    province: school.province || school.city || '',
    district: school.district || '',
    address: school.address || school.fullAddress || '',
    phone: school.phone || school.phoneNumber || '',
    email: school.email || '',
    website: school.website || '',
    coordinates: school.coordinates || { lat: 0, lng: 0 },
    studentCount: school.studentCount || 0,
    teacherCount: school.teacherCount || 0,
    foundedYear: school.foundedYear || null
  }));
};