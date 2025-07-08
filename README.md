# Türkiye Okulları Veritabanı Uygulaması

Bu uygulama Türkiye'deki tüm okulların kapsamlı bir veritabanını sunar. Modern React, TypeScript ve Tailwind CSS kullanılarak geliştirilmiştir.

## Özellikler

- 📚 **Kapsamlı Okul Listesi**: Türkiye'deki tüm okul türlerini içerir
- 🗺️ **Harita Entegrasyonu**: Google Maps ve basit harita görünümleri
- 🔍 **Gelişmiş Filtreleme**: İl, ilçe, okul türü ve arama
- 📱 **Responsive Tasarım**: Mobil ve masaüstü uyumlu
- 📊 **İstatistikler**: Okul, öğrenci ve öğretmen sayıları
- 🎨 **Modern UI**: Temiz ve kullanıcı dostu arayüz

## Kurulum

1. Bağımlılıkları yükleyin:
```bash
npm install
```

2. Google Maps API anahtarınızı ekleyin:
   - `src/components/GoogleMapView.tsx` dosyasında `YOUR_GOOGLE_MAPS_API_KEY` kısmını gerçek API anahtarınızla değiştirin

3. Uygulamayı başlatın:
```bash
npm run dev
```

## API Entegrasyonu

### Google Maps API
- Google Cloud Console'dan Maps JavaScript API'yi etkinleştirin
- API anahtarınızı `GoogleMapView.tsx` dosyasına ekleyin

### MEB Veri Entegrasyonu
- `src/data/schoolDataCollector.ts` dosyasında MEB API entegrasyonu için hazır fonksiyonlar bulunur
- `fetchMEBSchools()` fonksiyonunu gerçek MEB API endpoint'i ile güncelleyin

### Geocoding
- `src/utils/geocoding.ts` dosyasında Google ve Yandex geocoding fonksiyonları mevcuttur
- Toplu adres koordinatlarını almak için `batchGeocode()` fonksiyonunu kullanın

## Veri Yapısı

```typescript
interface School {
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
```

## Veri Kaynakları

1. **MEB Açık Veri Portalı**: Resmi okul bilgileri
2. **Google Maps Geocoding API**: Adres koordinatları
3. **Yandex Maps Geocoding API**: Alternatif koordinat kaynağı

## Geliştirme

### Yeni Okul Ekleme
`src/data/schools.ts` dosyasına yeni okul verilerini ekleyin.

### Yeni Özellik Ekleme
- Bileşenler: `src/components/`
- Tipler: `src/types/`
- Yardımcı fonksiyonlar: `src/utils/`

### Performans Optimizasyonu
- Büyük veri setleri için sayfalama ekleyin
- Harita görünümünde clustering kullanın
- Lazy loading uygulayın

## Teknolojiler

- **React 18** - UI framework
- **TypeScript** - Tip güvenliği
- **Tailwind CSS** - Styling
- **Lucide React** - İkonlar
- **Google Maps API** - Harita entegrasyonu
- **Vite** - Build tool

## Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add some amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request açın

## Destek

Sorularınız için issue açabilir veya e-posta gönderebilirsiniz.