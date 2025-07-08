// MEB ve diğer kaynaklardan okul verilerini toplama yardımcı fonksiyonları

export interface MEBSchoolData {
  schoolName: string;
  schoolType: string;
  province: string;
  district: string;
  address: string;
  phone?: string;
  email?: string;
  website?: string;
  studentCount?: number;
  teacherCount?: number;
  foundedYear?: number;
}

// MEB açık veri portalından okul listesi alma (örnek)
export const fetchMEBSchools = async (): Promise<MEBSchoolData[]> => {
  // Bu fonksiyon MEB'in açık veri API'sini kullanacak
  // Şu anda örnek veri döndürüyor
  
  try {
    // MEB API endpoint'i (gerçek API URL'si ile değiştirilmeli)
    // const response = await fetch('https://data.meb.gov.tr/api/schools');
    // const data = await response.json();
    
    // Örnek veri
    const sampleData: MEBSchoolData[] = [
      {
        schoolName: 'Ankara Atatürk İlkokulu',
        schoolType: 'İlkokul',
        province: 'Ankara',
        district: 'Çankaya',
        address: 'Kızılay Mahallesi, Atatürk Bulvarı No:123',
        phone: '0312 555 0001',
        email: 'ataturk.ilkokul@meb.gov.tr',
        studentCount: 450,
        teacherCount: 28,
        foundedYear: 1925
      }
      // Daha fazla okul verisi...
    ];
    
    return sampleData;
  } catch (error) {
    console.error('MEB veri alma hatası:', error);
    return [];
  }
};

// İl bazında okul sayıları (Türkiye geneli)
export const turkishProvinces = [
  'Adana', 'Adıyaman', 'Afyonkarahisar', 'Ağrı', 'Amasya', 'Ankara', 'Antalya',
  'Artvin', 'Aydın', 'Balıkesir', 'Bilecik', 'Bingöl', 'Bitlis', 'Bolu',
  'Burdur', 'Bursa', 'Çanakkale', 'Çankırı', 'Çorum', 'Denizli', 'Diyarbakır',
  'Edirne', 'Elazığ', 'Erzincan', 'Erzurum', 'Eskişehir', 'Gaziantep', 'Giresun',
  'Gümüşhane', 'Hakkâri', 'Hatay', 'Isparta', 'Mersin', 'İstanbul', 'İzmir',
  'Kars', 'Kastamonu', 'Kayseri', 'Kırklareli', 'Kırşehir', 'Kocaeli', 'Konya',
  'Kütahya', 'Malatya', 'Manisa', 'Kahramanmaraş', 'Mardin', 'Muğla', 'Muş',
  'Nevşehir', 'Niğde', 'Ordu', 'Rize', 'Sakarya', 'Samsun', 'Siirt', 'Sinop',
  'Sivas', 'Tekirdağ', 'Tokat', 'Trabzon', 'Tunceli', 'Şanlıurfa', 'Uşak',
  'Van', 'Yozgat', 'Zonguldak', 'Aksaray', 'Bayburt', 'Karaman', 'Kırıkkale',
  'Batman', 'Şırnak', 'Bartın', 'Ardahan', 'Iğdır', 'Yalova', 'Karabük', 'Kilis',
  'Osmaniye', 'Düzce'
];

// Okul türleri
export const schoolTypes = [
  'Anaokulu',
  'İlkokul', 
  'Ortaokul',
  'Lise',
  'Anadolu Lisesi',
  'Fen Lisesi',
  'Sosyal Bilimler Lisesi',
  'Güzel Sanatlar Lisesi',
  'Spor Lisesi',
  'Mesleki ve Teknik Anadolu Lisesi',
  'İmam Hatip Ortaokulu',
  'İmam Hatip Lisesi',
  'Özel Okul',
  'Uluslararası Okul'
];

// Büyük şehirlerin ilçeleri
export const districtsByProvince: Record<string, string[]> = {
  'İstanbul': [
    'Adalar', 'Arnavutköy', 'Ataşehir', 'Avcılar', 'Bağcılar', 'Bahçelievler',
    'Bakırköy', 'Başakşehir', 'Bayrampaşa', 'Beşiktaş', 'Beykoz', 'Beylikdüzü',
    'Beyoğlu', 'Büyükçekmece', 'Çatalca', 'Çekmeköy', 'Esenler', 'Esenyurt',
    'Eyüpsultan', 'Fatih', 'Gaziosmanpaşa', 'Güngören', 'Kadıköy', 'Kağıthane',
    'Kartal', 'Küçükçekmece', 'Maltepe', 'Pendik', 'Sancaktepe', 'Sarıyer',
    'Silivri', 'Sultanbeyli', 'Sultangazi', 'Şile', 'Şişli', 'Tuzla', 'Ümraniye',
    'Üsküdar', 'Zeytinburnu'
  ],
  'Ankara': [
    'Akyurt', 'Altındağ', 'Ayaş', 'Bala', 'Beypazarı', 'Çamlıdere', 'Çankaya',
    'Çubuk', 'Elmadağ', 'Etimesgut', 'Evren', 'Gölbaşı', 'Güdül', 'Haymana',
    'Kalecik', 'Kazan', 'Keçiören', 'Kızılcahamam', 'Mamak', 'Nallıhan',
    'Polatlı', 'Pursaklar', 'Sincan', 'Şereflikoçhisar', 'Yenimahalle'
  ],
  'İzmir': [
    'Aliağa', 'Balçova', 'Bayındır', 'Bayraklı', 'Bergama', 'Beydağ', 'Bornova',
    'Buca', 'Çeşme', 'Çiğli', 'Dikili', 'Foça', 'Gaziemir', 'Güzelbahçe',
    'Karabağlar', 'Karaburun', 'Karşıyaka', 'Kemalpaşa', 'Kınık', 'Kiraz',
    'Konak', 'Menderes', 'Menemen', 'Narlıdere', 'Ödemiş', 'Seferihisar',
    'Selçuk', 'Tire', 'Torbalı', 'Urla'
  ]
};

// Veri toplama ve işleme fonksiyonu
export const collectAllSchoolData = async (
  googleApiKey?: string,
  yandexApiKey?: string
): Promise<any[]> => {
  console.log('Okul verilerini toplama işlemi başlatılıyor...');
  
  try {
    // 1. MEB verilerini al
    const mebData = await fetchMEBSchools();
    console.log(`MEB'den ${mebData.length} okul verisi alındı`);
    
    // 2. Koordinatları geocoding ile al
    if (googleApiKey || yandexApiKey) {
      console.log('Koordinatlar geocoding ile alınıyor...');
      // Geocoding işlemi burada yapılacak
    }
    
    // 3. Verileri standart formata çevir
    const processedData = mebData.map((school, index) => ({
      id: (index + 1).toString(),
      name: school.schoolName,
      type: school.schoolType,
      province: school.province,
      district: school.district,
      address: school.address,
      phone: school.phone,
      email: school.email,
      website: school.website,
      coordinates: { lat: 39.9334 + (Math.random() - 0.5) * 10, lng: 32.8597 + (Math.random() - 0.5) * 10 }, // Geçici koordinatlar
      studentCount: school.studentCount,
      teacherCount: school.teacherCount,
      foundedYear: school.foundedYear
    }));
    
    console.log(`Toplam ${processedData.length} okul verisi işlendi`);
    return processedData;
    
  } catch (error) {
    console.error('Veri toplama hatası:', error);
    return [];
  }
};