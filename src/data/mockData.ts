import { Project, Proposal, UnitCatalogItem, CompanyProfile } from '../types';

export const initialCompanyProfile: CompanyProfile = {
  name: 'ElektroVolt',
  tagline: 'İnşaat & Endüstriyel Elektrik Taahhüt Mühendisliği',
  tradeTitle: 'ElektroVolt Elektrik Mühendislik San. ve Tic. A.Ş.',
  taxOffice: 'Mecidiyeköy V.D.',
  taxNo: '334 098 7122',
  phone: '+90 (212) 385 40 20',
  email: 'teklif@elektrovolt.com.tr',
  website: 'www.elektrovolt.com.tr',
  address: 'Büyükdere Cad. No: 184 Kat: 9 Levent, İstanbul',
  bankInfo: {
    bankName: 'Türkiye Garanti Bankası A.Ş.',
    branch: 'Levent Kurumsal Şubesi (Şube Kodu: 104)',
    ibanTry: 'TR44 0006 2000 1040 0006 2819 01',
    ibanUsd: 'TR17 0006 2000 1040 0006 2819 02',
  },
  stats: {
    completedProjects: 248,
    totalKvaInstalled: 112000,
    squareMetersWired: 1450000,
    experienceYears: 19,
  },
};

export const initialProjects: Project[] = [
  {
    id: 'proj-1',
    title: 'Metro Loft & Rezidans Kuleleri',
    clientName: 'Sinpaş & Rönesans Ortak Girişimi',
    category: 'Konut & Rezidans',
    location: 'Ataşehir, İstanbul',
    completionYear: 2025,
    durationMonths: 14,
    squareMeters: 48000,
    installedPowerKva: 3200,
    scopeTags: [
      '2x1600 kVA Trafo Merkezi',
      'AG Dağıtım & Kompanzasyon Panoları',
      'KNX Akıllı Ev & Aydınlatma Otomasyonu',
      'Adresli Yangın Algılama & Tahliye',
      '2x1100 kVA Senkron Jeneratör Altyapısı',
      'IP Interkom & Kartlı Geçiş'
    ],
    summary: '42 katlı 2 bloktan oluşan prestijli karma yaşam projesinin A\'dan Z\'ye tüm AG/OG şalt, zayıf akım ve otomasyon taahhüt işleri.',
    fullDescription: 'Metro Loft projesinde 380 konut bağımsız bölümü, ticari dükkanlar ve 4 katlı kapalı otoparkın tüm elektrik altyapısı anahtar teslim tamamlanmıştır. TSE ve EN normlarına uygun Halogen Free (N2XH/NHXMH) kablolama, 3200 kVA trafo merkezi kuru tip dökme reçineli trafolarla kurulmuş, ABB kompakt şalterli form 4b tip testli ana dağıtım panoları devreye alınmıştır. Her dairede KNX tabanlı aydınlatma ve iklimlendirme otomasyonu uygulanmıştır.',
    imageUrl: '/src/assets/images/hero_electrical_contractor_1790847506737.jpg',
    technicalSpecs: [
      { label: 'Trafo Kurulu Gücü', value: '2 x 1600 kVA Kuru Tip Trafo' },
      { label: 'Yedek Güç Grubu', value: '2 x 1100 kVA Cummins Dizel Senkron Jeneratör' },
      { label: 'Kablo Dağıtım Tipi', value: 'Halogen Free (HF) Alev İletmeyen N2XH' },
      { label: 'Otomasyon Protokolü', value: 'KNX / DALI Entegre Aydınlatma Kontrolü' },
      { label: 'Yangın Algılama', value: 'Schrack Seconet 8 Çevrimli Adresli Sistem' },
      { label: 'Topraklama & Paratoner', value: 'Faraday Kafesi + Erken Akış Uyarılı E.S.E.' }
    ],
    keyHighlights: [
      '14 ayda sıfır iş kazası ile tam zamanında şantiye teslimi',
      'Enerji izleme yazılımı ile bina genelinde %18 enerji verimliliği artışı',
      'Müteahhit firma tarafından "Yılın En İyi Alt Yüklenicisi" ödülü'
    ],
    clientTestimonial: {
      quote: 'ElektroVolt mühendislik ekibi, 42 katlı zorlu şantiyemizde hem malzeme kalitesi hem de proje revizyonlarına anında getirdikleri çözüm odaklı yaklaşımla projemizin zamanında teslim edilmesinde kilit rol oynadı.',
      person: 'İnş. Yük. Müh. Burak Candan',
      role: 'Proje Koordinatörü',
      company: 'Rönesans Proje Yönetimi'
    },
    budgetRange: '42.500.000 ₺',
    status: 'Tamamlandı'
  },
  {
    id: 'proj-2',
    title: 'Atlas Otomotiv Pres & Gövde Fabrikası',
    clientName: 'Atlas Otomotiv Endüstri A.Ş.',
    category: 'Endüstriyel & Fabrika',
    location: 'TOSB Otomotiv Yan Sanayi İhtisas OSB, Kocaeli',
    completionYear: 2025,
    durationMonths: 10,
    squareMeters: 32000,
    installedPowerKva: 5000,
    scopeTags: [
      '34.5 kV Gaz Yalıtımlı OG Hücre Grubu',
      '2x2500 kVA Hermetik Yağlı Trafo',
      '4000A & 2500A Busbar Dağıtım Hatları',
      'Harmonik Filtreli Aktif Kompanzasyon',
      'Ex-Proof Boyahane Aydınlatması',
      'Endüstriyel SCADA & Enerji Analizörleri'
    ],
    summary: 'Ağır sanayi pres hatları ve robotik kaynak hücrelerine sahip 32.000 m² kapalı alanlı fabrikanın yüksek güç elektrik taahhüdü.',
    fullDescription: 'Otomotiv pres hatlarının yüksek pik deşarj akımlarına uygun olarak 4000A bakır iletkenli kompakt busbar sistemi ve 7 basamaklı aktif harmonik filtreli kompanzasyon panoları dizayn edilip montajı yapılmıştır. Boyahane kimyasal alanlarında Zone 1 ATEX sertifikalı ex-proof aydınlatma armatürleri ve zırhlı kablo rakorları kullanılmıştır. Tüm fabrika SCADA üzerinden anlık harmonik ve reaktif güç takibine açılmıştır.',
    imageUrl: '/src/assets/images/project_industrial_plant_1790847517720.jpg',
    technicalSpecs: [
      { label: 'OG Hücre Tipi', value: 'Schneider SM6 36 kV SF6 Gaz Yalıtımlı' },
      { label: 'Trafo Kapasitesi', value: '2 x 2500 kVA 34.5/0.4 kV Yağlı Trafo' },
      { label: 'Enerji Taşıma', value: 'EAE E-Line KX 4000A / 2500A Bakır Busbar' },
      { label: 'Güç Faktörü Cos φ', value: 'Aktif filtre ile 0.99 dengeli güç faktörü' },
      { label: 'Zayıf Akım Omurga', value: 'OM4 Fiber Optik 10G Ring Yedekli Altyapı' },
      { label: 'Yıldırımlık Sistemi', value: 'Bakır İletkenli Faraday Kafesi Şebekesi' }
    ],
    keyHighlights: [
      'Pres tezgâhlarında 0ms kesintisiz geçişli güç dağıtım omurgası',
      'Reaktif cezaya girme riskini sıfıra indiren aktif kompanzasyon tasarımı',
      '1.2 km ağır hizmet sıcak daldırma galvaniz kablo tavası montajı'
    ],
    clientTestimonial: {
      quote: 'Sanayi tesisimizde robotik hatların kurulumunda elektrik altyapısının kusursuz olması şarttı. ElektroVolt ekibi devreye alma testlerini ve TEDAŞ kabul sürecini sorunsuz tamamladı.',
      person: 'Dr. Serhat Güngör',
      role: 'Fabrika Müdürü',
      company: 'Atlas Otomotiv Endüstri'
    },
    budgetRange: '58.000.000 ₺',
    status: 'Tamamlandı'
  },
  {
    id: 'proj-3',
    title: 'Terrace Vista Alışveriş & Ticaret Merkezi',
    clientName: 'Vista Gayrimenkul Yatırım Ortaklığı',
    category: 'Ticari & AVM',
    location: 'Çankaya, Ankara',
    completionYear: 2024,
    durationMonths: 16,
    squareMeters: 65000,
    installedPowerKva: 6400,
    scopeTags: [
      '4x1600 kVA Trafo Dağıtım Merkezi',
      'DALI Mimari Lineer Aydınlatma Otomasyonu',
      'Merkezi Seslendirme & EN54 Tahliye',
      'CCTV (420 IP Kamera) & Video Analitik',
      'AVM Sayaç Otomasyonu (AMR/M-Bus)',
      'Merkezi UPS & Acil Kaçış Yönlendirme'
    ],
    summary: '140 mağaza, sinema kompleksi ve açık hava yeme-içme meydanına sahip 65.000 m² AVM kompleksi elektrik taahhüdü.',
    fullDescription: 'AVM iç ve dış mimari aydınlatma konsepti DALI-2 protokolü ile gün ışığı senaryolarına tam entegre edilmiştir. 140 bağımsız mağazanın elektrik tüketimini merkezi olarak okuyan uzaktan sayaç okuma (AMR) sistemi kurulmuştur. Yangın durumunda tüm duman tahliye kapaklarını ve acil kaçış aydınlatmasını tetikleyen EN54 sertifikalı seslendirme ve acil anons sistemi entegre edilmiştir.',
    imageUrl: '/src/assets/images/project_commercial_center_1790847528531.jpg',
    technicalSpecs: [
      { label: 'Kurulu Trafo Gücü', value: '4 x 1600 kVA Kuru Tip Dökme Reçineli' },
      { label: 'Jeneratör Kapasitesi', value: '3 x 1400 kVA Otomatik Senkronizasyonlu' },
      { label: 'Aydınlatma Yönetimi', value: 'Helvar / Tridonic DALI-2 Akıllı Kontrol' },
      { label: 'Güvenlik Kamera Ağı', value: '420 Adet 4K Axis IP Kamera + NVR Depolama' },
      { label: 'Yangın Algılama & Anons', value: 'Bosch Praesideo EN54-16 Tahliye Sistemi' },
      { label: 'Kablo Yönetimi', value: '18.000 m Kablo Tavası + Yangına Dayanıklı E90' }
    ],
    keyHighlights: [
      'Akıllı DALI aydınlatma otomasyonu ile yıllık 420.000 kWh enerji tasarrufu',
      'Yangın senaryolarında 1.2 saniyede tam duman ve acil çıkış entegrasyonu',
      'Mağaza açılış tarihlerine 3 hafta önce hazır hale getirilen şalt panoları'
    ],
    budgetRange: '74.200.000 ₺',
    status: 'Tamamlandı'
  },
  {
    id: 'proj-4',
    title: 'Medikent İhtisas Hastanesi & Cerrahi Blok',
    clientName: 'Medikent Sağlık Grubu',
    category: 'Sağlık & Hastane',
    location: 'Nilüfer, Bursa',
    completionYear: 2026,
    durationMonths: 12,
    squareMeters: 38000,
    installedPowerKva: 4000,
    scopeTags: [
      'Grup 2 Odalar için IT Pano İzole Güç Sistemleri',
      '2x1000 kVA Yedekli Online Modüler UPS',
      'Ameliyathane Hijyenik Dokunmatik Paneller',
      'IP Tabanlı Hemşire Çağrı & Mavi Kod Sistemi',
      'Tıbbi Gaz & Yangın Söndürme Entegrasyonu',
      'Hastane Topraklama Baraları & Potansiyel Dengeleme'
    ],
    summary: '12 ameliyathane, 60 yoğun bakım yatağı ve görüntüleme merkezine sahip A+ sınıfı cerrahi hastane elektrik altyapısı.',
    fullDescription: 'IEC 60364-7-710 standartlarına uygun olarak ameliyathane ve yoğun bakım ünitelerinde hata akım izleme cihazlı (Bender marka) medikal izole güç panoları tesis edilmiştir. Enerji kesintisi durumunda 0 milisaniye kesintiyle devreye giren modüler N+1 UPS sistemleri ile hayati destek cihazları korunmuştur. Ameliyathaneler için antibakteriyel dokunmatik cerrahi kontrol panelleri ve ameliyat lambası altyapısı devreye alınmıştır.',
    imageUrl: '/src/assets/images/project_hospital_infrastructure_1790847539331.jpg',
    technicalSpecs: [
      { label: 'Medikal İzole Güç', value: 'Bender 10 kVA IT Panoları (18 Adet Mahal)' },
      { label: 'UPS Güç Grubu', value: '2 x 1000 kVA Modüler Paralel Yedekli Online UPS' },
      { label: 'Acil Güç Jeneratörü', value: '2 x 1250 kVA 8 saniyede tam yüke giren jeneratör' },
      { label: 'Topraklama Sistemi', value: 'Tüm kritik mahallerde Eşpotansiyel Bakır Baralar' },
      { label: 'Hemşire Çağrı', value: 'ZKR Full IP Dokunmatik Oda & Yatak Üniteleri' },
      { label: 'Kablo Standardı', value: 'Yangın Altında 120 Dakika Çalışan (FE180/E90)' }
    ],
    keyHighlights: [
      'Kritik cerrahi mahallerde %100 kesintisiz ve dalgalanmasız güç temini',
      'İl Sağlık Müdürlüğü ve T.C. Sağlık Bakanlığı teknik denetiminden ilk seferde tam onay',
      'Elektrostatik yük boşaltımına karşı özel iletken zemin topraklaması'
    ],
    clientTestimonial: {
      quote: 'Hastanemizin ameliyathane izole güç panolarında ve UPS dağıtımında gösterilen titizlik olağanüstüydü. Sağlık yapılarındaki teknik şartnamelere olan hakimiyetleri bizi çok rahatlattı.',
      person: 'Prof. Dr. Selçuk Erdem',
      role: 'Yönetim Kurulu Üyesi',
      company: 'Medikent Sağlık Grubu'
    },
    budgetRange: '63.800.000 ₺',
    status: 'Tamamlandı'
  },
  {
    id: 'proj-5',
    title: 'SolarPark 2.4 MWp Çatı Güneş Enerji Santrali',
    clientName: 'Erkal Lojistik & Soğuk Hava Depoları',
    category: 'Altyapı & GES',
    location: 'Çorlu, Tekirdağ',
    completionYear: 2026,
    durationMonths: 5,
    squareMeters: 22000,
    installedPowerKva: 2400,
    scopeTags: [
      '5340 Adet 450W Tier-1 Güneş Paneli',
      '20 Adet 110 kW String Dizi İnverter',
      '34.5 kV GES Dağıtım & Sayaç Hücresi',
      'Alüminyum Konstrüksiyon & DC Kablolama',
      'Meteoroloji İstasyonu & IoT SCADA İzleme',
      'Çatı Statik Yük Dağıtımı & Topraklama Ağı'
    ],
    summary: '22.000 m² soğuk hava depolama tesisinin çatısına anahtar teslim kurulan 2.4 MWp lisanssız güneş enerji santrali.',
    fullDescription: 'Projede 5340 adet yüksek verimli Half-Cut monocrystalline güneş paneli ve Huawei marka akıllı string inverterler kullanılmıştır. 34.5 kV şebeke bağlantısı için TEDAŞ şartnamesine uygun koruma röleli hücre montajı yapılmış ve TEDAŞ kabulü alınmıştır. Tesis yıllık 3.650.000 kWh temiz elektrik üreterek deponun tüm tüketimini karşılamakta ve fazla enerjiyi şebekeye satmaktadır.',
    imageUrl: '/src/assets/images/hero_electrical_contractor_1790847506737.jpg',
    technicalSpecs: [
      { label: 'Kurulu Panel Gücü', value: '2.403 kWp Monokristal Half-Cut' },
      { label: 'İnverter Sayısı / Marka', value: '20 x Huawei SUN2000 110KTL Akıllı İnverter' },
      { label: 'Şebeke Gerilimi', value: '34.5 kV Orta Gerilim Hat Bağlantısı' },
      { label: 'Yıllık Beklenen Üretim', value: '3.650.000 kWh / Yıl Temiz Enerji' },
      { label: 'Amortisman Süresi', value: '3.4 Yıl Geri Dönüş Süresi' },
      { label: 'İzleme & Teşhis', value: 'Akıllı IV Eğrisi Tarama + SCADA Bulut Portalı' }
    ],
    keyHighlights: [
      'TEDAŞ onay ve proje süreci dahil 5 ayda tamamlanan anahtar teslim kurulum',
      'Yılda yaklaşık 2.100 ton karbon salınımı engelleme kapasitesi',
      'DC tarafta alev iletmez özel solar kablo ve IP68 MC4 konnektör montajı'
    ],
    budgetRange: '31.500.000 ₺',
    status: 'Devam Ediyor'
  }
];

export const initialUnitCatalog: UnitCatalogItem[] = [
  // AG Dağıtım & Panolar
  { id: 'cat-1', category: 'AG Dağıtım & Panolar', pozNo: 'ELK-PN-01', description: 'Ana Dağıtım Panosu (ADP) - 2500A Form 4b Tip Testli Dikili Tip Karkas', unit: 'Adet', defaultMaterialPrice: 185000, defaultLaborPrice: 35000, brandSuggestion: 'EAE / Siemens / Schneider' },
  { id: 'cat-2', category: 'AG Dağıtım & Panolar', pozNo: 'ELK-PN-02', description: 'Kat Tali Dağıtım Panosu (KDP) - 125A 36 Modül Sıva Altı/Üstü', unit: 'Adet', defaultMaterialPrice: 12500, defaultLaborPrice: 3800, brandSuggestion: 'Schneider Acti9 / Legrand' },
  { id: 'cat-3', category: 'AG Dağıtım & Panolar', pozNo: 'ELK-PN-03', description: 'Otomatik Harmonik Filtreli Kompanzasyon Panosu 250 kVAr', unit: 'Adet', defaultMaterialPrice: 85000, defaultLaborPrice: 16000, brandSuggestion: 'Entes / EAE / Epcos' },
  { id: 'cat-4', category: 'AG Dağıtım & Panolar', pozNo: 'ELK-PN-04', description: 'Motor Kontrol Panosu (MCC) - 15 kW Frekans İnvertörlü Pompa Panosu', unit: 'Adet', defaultMaterialPrice: 42000, defaultLaborPrice: 9500, brandSuggestion: 'Danfoss / ABB / Siemens' },
  { id: 'cat-5', category: 'AG Dağıtım & Panolar', pozNo: 'ELK-PN-05', description: 'Otomatik Transfer Panosu (ATS) - 1600A 4 Kutuplu Motor Mekanizmalı', unit: 'Adet', defaultMaterialPrice: 65000, defaultLaborPrice: 14000, brandSuggestion: 'Socomec / ABB / Schneider' },

  // Kablo & Kablo Taşıma
  { id: 'cat-6', category: 'Kablo & Kablo Taşıma', pozNo: 'ELK-KB-01', description: 'N2XH 3x2.5 mm² Halogen-Free Alev İletmeyen Enerji Kablosu', unit: 'Metre', defaultMaterialPrice: 62, defaultLaborPrice: 28, brandSuggestion: 'Prysmian / Nexans / Hes' },
  { id: 'cat-7', category: 'Kablo & Kablo Taşıma', pozNo: 'ELK-KB-02', description: 'N2XH 5x6 mm² Halogen-Free Güç Besleme Kablosu', unit: 'Metre', defaultMaterialPrice: 195, defaultLaborPrice: 45, brandSuggestion: 'Prysmian / Nexans' },
  { id: 'cat-8', category: 'Kablo & Kablo Taşıma', pozNo: 'ELK-KB-03', description: 'N2XH 4x70+35 mm² Ana Besleme Enerji Kablosu', unit: 'Metre', defaultMaterialPrice: 1650, defaultLaborPrice: 180, brandSuggestion: 'Prysmian / Hes' },
  { id: 'cat-9', category: 'Kablo & Kablo Taşıma', pozNo: 'ELK-KB-04', description: '300x50 mm Ağır Hizmet Sıcak Daldırma Galvaniz Perfore Kablo Tavası', unit: 'Metre', defaultMaterialPrice: 380, defaultLaborPrice: 140, brandSuggestion: 'EAE / Tempa Pano' },
  { id: 'cat-10', category: 'Kablo & Kablo Taşıma', pozNo: 'ELK-KB-05', description: '500x100 mm Ağır Hizmet Kablo Merdiveni ve Konsol Askı Sistemi', unit: 'Metre', defaultMaterialPrice: 620, defaultLaborPrice: 220, brandSuggestion: 'EAE E-Line KM' },
  { id: 'cat-11', category: 'Kablo & Kablo Taşıma', pozNo: 'ELK-KB-06', description: '1000A Kompakt Alüminyum İletkenli Busbar Dağıtım Kanalı', unit: 'Metre', defaultMaterialPrice: 3200, defaultLaborPrice: 650, brandSuggestion: 'EAE E-Line KX' },

  // Zayıf Akım Sistemleri
  { id: 'cat-12', category: 'Zayıf Akım Sistemleri', pozNo: 'ELK-ZA-01', description: 'Akıllı Adresli Optik Duman Dedektörü ve Standart Soketi', unit: 'Adet', defaultMaterialPrice: 850, defaultLaborPrice: 280, brandSuggestion: 'Schrack Seconet / Mavigard / Bosch' },
  { id: 'cat-13', category: 'Zayıf Akım Sistemleri', pozNo: 'ELK-ZA-02', description: 'Adresli Yangın İhbar Butonu (Kır-Bas Tipi LED Göstergeli)', unit: 'Adet', defaultMaterialPrice: 680, defaultLaborPrice: 240, brandSuggestion: 'Schrack Seconet / Mavigard' },
  { id: 'cat-14', category: 'Zayıf Akım Sistemleri', pozNo: 'ELK-ZA-03', description: 'Yangın Flaşörlü Elektronik Siren (85dB/1m)', unit: 'Adet', defaultMaterialPrice: 920, defaultLaborPrice: 290, brandSuggestion: 'Schrack / Mavigard' },
  { id: 'cat-15', category: 'Zayıf Akım Sistemleri', pozNo: 'ELK-ZA-04', description: '4MP WDR IR Dome IP Güvenlik Kamerası (PoE Destekli)', unit: 'Adet', defaultMaterialPrice: 2800, defaultLaborPrice: 650, brandSuggestion: 'Hikvision / Dahua / Axis' },
  { id: 'cat-16', category: 'Zayıf Akım Sistemleri', pozNo: 'ELK-ZA-05', description: 'Cat.6A F/UTP LSOH 23 AWG Veri İletişim Kablosu', unit: 'Metre', defaultMaterialPrice: 32, defaultLaborPrice: 18, brandSuggestion: 'HCS / Legrand / CommScope' },
  { id: 'cat-17', category: 'Zayıf Akım Sistemleri', pozNo: 'ELK-ZA-06', description: '42U 800x1000 Server Rack Kabinet ve PDU Güç Dağıtım Ünitesi', unit: 'Takım', defaultMaterialPrice: 24500, defaultLaborPrice: 4200, brandSuggestion: 'Canovate / Estap' },

  // Aydınlatma & Şalt
  { id: 'cat-18', category: 'Aydınlatma & Şalt', pozNo: 'ELK-AY-01', description: '60x60 Backlight 36W 4000K Ofis/Konut LED Panel Armatür', unit: 'Adet', defaultMaterialPrice: 750, defaultLaborPrice: 220, brandSuggestion: 'Philips / Pelsan / Osram' },
  { id: 'cat-19', category: 'Aydınlatma & Şalt', pozNo: 'ELK-AY-02', description: '100W IP65 Endüstriyel High-Bay Yüksek Tavan LED Armatür', unit: 'Adet', defaultMaterialPrice: 2400, defaultLaborPrice: 580, brandSuggestion: 'Philips CoreLine / Pelsan' },
  { id: 'cat-20', category: 'Aydınlatma & Şalt', pozNo: 'ELK-AY-03', description: '3 Saat Bataryalı LED Acil Kaçış & Çıkış Yönlendirme Armatürü', unit: 'Adet', defaultMaterialPrice: 950, defaultLaborPrice: 260, brandSuggestion: 'Beş A / Eaton / Pelsan' },
  { id: 'cat-21', category: 'Aydınlatma & Şalt', pozNo: 'ELK-AY-04', description: '16A 230V Topraklı Priz ve Çerçeve Montajı (Çocuk Korumalı)', unit: 'Adet', defaultMaterialPrice: 180, defaultLaborPrice: 85, brandSuggestion: 'Schneider Sedna / Viko / Legrand' },
  { id: 'cat-22', category: 'Aydınlatma & Şalt', pozNo: 'ELK-AY-05', description: 'KNX 4 Kanal Üniversal Dimmer Aktüatörü (DALI Destekli)', unit: 'Adet', defaultMaterialPrice: 9800, defaultLaborPrice: 1900, brandSuggestion: 'ABB / Schneider SpaceLogic' },

  // OG & Trafo & Jeneratör
  { id: 'cat-23', category: 'OG & Trafo & Jeneratör', pozNo: 'ELK-OG-01', description: '1600 kVA 34.5/0.4 kV Kuru Tip Dökme Reçineli Dağıtım Trafosu', unit: 'Adet', defaultMaterialPrice: 980000, defaultLaborPrice: 85000, brandSuggestion: 'Schneider Trihal / ABB / Astor' },
  { id: 'cat-24', category: 'OG & Trafo & Jeneratör', pozNo: 'ELK-OG-02', description: '36 kV SF6 Gaz Yalıtımlı Yük Ayırıcılı Giriş-Çıkış Hücresi', unit: 'Adet', defaultMaterialPrice: 380000, defaultLaborPrice: 42000, brandSuggestion: 'Schneider SM6 / Eaton' },
  { id: 'cat-25', category: 'OG & Trafo & Jeneratör', pozNo: 'ELK-OG-03', description: '1100 kVA Otomatik Kabinli Dizel Jeneratör Grubu', unit: 'Takım', defaultMaterialPrice: 1650000, defaultLaborPrice: 110000, brandSuggestion: 'Aksa / Teksan / Çukurova' },

  // Topraklama & Paratoner
  { id: 'cat-26', category: 'Topraklama & Paratoner', pozNo: 'ELK-TP-01', description: '30x3.5 mm Sıcak Daldırma Galvaniz Şerit Temel Topraklaması', unit: 'Metre', defaultMaterialPrice: 145, defaultLaborPrice: 65, brandSuggestion: 'Standart TSE' },
  { id: 'cat-27', category: 'Topraklama & Paratoner', pozNo: 'ELK-TP-02', description: '20 mm Çap 1.5m Bakır Kaplı Çelik Topraklama Çubuğu ve Kazığı', unit: 'Adet', defaultMaterialPrice: 950, defaultLaborPrice: 450, brandSuggestion: 'TSE Standart' },
  { id: 'cat-28', category: 'Topraklama & Paratoner', pozNo: 'ELK-TP-03', description: 'Δt=60 µs Erken Akış Uyarılı (ESE) Aktif Paratoner Başlığı ve Direği', unit: 'Takım', defaultMaterialPrice: 34000, defaultLaborPrice: 8500, brandSuggestion: 'Forend / Liva / Ingesco' },

  // İşçilik & Mühendislik Hizmetleri
  { id: 'cat-29', category: 'İşçilik & Mühendislik Hizmetleri', pozNo: 'ELK-MH-01', description: 'TEDAŞ/EDAŞ Onaylı Elektrik Uygulama ve Ruhsat Projesi Çizimi', unit: 'Mahal', defaultMaterialPrice: 0, defaultLaborPrice: 85000, brandSuggestion: 'EMO Tescilli Mühendislik' },
  { id: 'cat-30', category: 'İşçilik & Mühendislik Hizmetleri', pozNo: 'ELK-MH-02', description: 'Topraklama Geçiş Direnci ve Şebeke Harmonik Ölçüm Raporlaması', unit: 'Takım', defaultMaterialPrice: 0, defaultLaborPrice: 18000, brandSuggestion: 'Kalibre Megger Test Cihazı' }
];

export const initialProposals: Proposal[] = [
  {
    id: 'prop-1',
    proposalNo: 'EV-2026-084',
    title: 'Vadi Konakları 4 Blok AG Dağıtım & Zayıf Akım Taahhüt İşi',
    client: {
      name: 'Mimar Sinan Arslan',
      company: 'Vadi Yapı İnşaat Taahhüt Ltd. Şti.',
      phone: '+90 (532) 412 88 90',
      email: 'sinan@vadiyapi.com.tr',
      address: 'Ayazağa Mah. Cendere Cad. No: 42 Sarıyer, İstanbul',
      taxOffice: 'Sarıyer V.D.',
      taxNumber: '921 004 5519'
    },
    projectCategory: 'Konut & Rezidans',
    projectLocation: 'Sarıyer / Ayazağa, İstanbul',
    estimatedDuration: '7 Ay',
    createdAt: '2026-09-18',
    validUntil: '2026-10-18',
    status: 'Müşteriye Sunuldu',
    currency: 'TRY',
    items: [
      {
        id: 'pi-1',
        category: 'AG Dağıtım & Panolar',
        pozNo: 'ELK-PN-01',
        description: 'Ana Dağıtım Panosu (ADP) - 2000A Form 3b Siemens Şaltlı Dikili Karkas',
        unit: 'Adet',
        quantity: 2,
        unitMaterialPrice: 165000,
        unitLaborPrice: 28000,
        notes: '2 Blok girişine bağımsız yerleşim'
      },
      {
        id: 'pi-2',
        category: 'AG Dağıtım & Panolar',
        pozNo: 'ELK-PN-02',
        description: 'Kat Tali Dağıtım Panosu (KDP) - Schneider Acti9 36 Modül',
        unit: 'Adet',
        quantity: 28,
        unitMaterialPrice: 11800,
        unitLaborPrice: 3400,
        notes: 'Her katta bağımsız yangın algılama röleli'
      },
      {
        id: 'pi-3',
        category: 'Kablo & Kablo Taşıma',
        pozNo: 'ELK-KB-01',
        description: 'N2XH 3x2.5 mm² Halogen-Free Alev İletmeyen Enerji Kablosu',
        unit: 'Metre',
        quantity: 12500,
        unitMaterialPrice: 62,
        unitLaborPrice: 26,
        notes: 'Daire içi aydınlatma ve priz linye hatları'
      },
      {
        id: 'pi-4',
        category: 'Kablo & Kablo Taşıma',
        pozNo: 'ELK-KB-04',
        description: '300x50 mm Ağır Hizmet Sıcak Daldırma Galvaniz Perfore Kablo Tavası',
        unit: 'Metre',
        quantity: 850,
        unitMaterialPrice: 380,
        unitLaborPrice: 130,
        notes: 'Bodrum kat ortak şaft geçişleri'
      },
      {
        id: 'pi-5',
        category: 'Zayıf Akım Sistemleri',
        pozNo: 'ELK-ZA-01',
        description: 'Akıllı Adresli Optik Duman Dedektörü ve Standart Soketi',
        unit: 'Adet',
        quantity: 240,
        unitMaterialPrice: 820,
        unitLaborPrice: 260,
        notes: 'Mavigard / Schrack uyumlu'
      },
      {
        id: 'pi-6',
        category: 'Topraklama & Paratoner',
        pozNo: 'ELK-TP-03',
        description: 'Δt=60 µs Erken Akış Uyarılı (ESE) Aktif Paratoner Başlığı ve İletkeni',
        unit: 'Takım',
        quantity: 2,
        unitMaterialPrice: 34000,
        unitLaborPrice: 8000,
        notes: 'Blok çatılarında test klemensi dahil montaj'
      }
    ],
    discountPercent: 5,
    taxPercent: 20,
    paymentTerms: [
      '%30 Sözleşme imzalanmasında peşinat avansı',
      '%40 Şantiye imalat hakedişlerine paralel aylık nakit ödeme',
      '%20 Kabloların çekilmesi ve pano montajı tamamlanmasında',
      '%10 Geçici kabul ve TEDAŞ enerjilendirme tutanağının imzalanmasında'
    ],
    generalConditions: [
      'Tüm malzemeler 1. sınıf TSE, CE ve ISO 9001 sertifikalı markalardan temin edilecektir.',
      'Şantiye süresince İş Sağlığı ve Güvenliği (İSG) mevzuatına %100 riayet edilecek, tüm personel sigortalı olacaktır.',
      'Kullanılacak kablolar TEDAŞ onaylı ve alev iletmez (Halogen Free) sınıfta olacaktır.',
      'Enerji açma, TEDAŞ muayene ve kabul işlemleri mühendislik ekibimiz koordinasyonunda yapılacaktır.'
    ],
    warrantyTerms: 'Tüm montaj ve işçilik hatalarına karşı 5 Yıl, malzeme ve şalt cihazlarına karşı üretici garantisi kapsamında 2 Yıl koşulsuz garanti taahhüt edilmektedir.',
    authorizedPerson: {
      name: 'Müh. Kaan Yıldırım',
      title: 'Teknik Müdür & Elektrik Proje Koordinatörü',
      phone: '+90 (533) 290 14 55',
      email: 'kaan.yildirim@elektrovolt.com.tr'
    },
    notes: 'Keşif bedeli mimari avan proje üzerinden hesaplanmıştır. Kesin metraj şantiye hakediş ataşmanları ile netleşecektir.'
  },
  {
    id: 'prop-2',
    proposalNo: 'EV-2026-079',
    title: 'Ege Lojistik Depo & Antrepo Aydınlatma ve Busbar Hattı',
    client: {
      name: 'Hakan Demirbilek',
      company: 'Ege Global Lojistik Depoculuk A.Ş.',
      phone: '+90 (542) 710 44 20',
      email: 'hakan@egelojistik.com',
      address: 'Kemalpaşa OSB 4. Cadde No: 18 İzmir',
      taxOffice: 'Kemalpaşa V.D.',
      taxNumber: '419 092 1104'
    },
    projectCategory: 'Endüstriyel & Fabrika',
    projectLocation: 'Kemalpaşa OSB, İzmir',
    estimatedDuration: '3 Ay',
    createdAt: '2026-08-10',
    validUntil: '2026-09-10',
    status: 'Onaylandı',
    currency: 'TRY',
    items: [
      {
        id: 'pi-21',
        category: 'Kablo & Kablo Taşıma',
        pozNo: 'ELK-KB-11',
        description: '800A Alüminyum İletkenli Plug-in Busbar Dağıtım Hattı',
        unit: 'Metre',
        quantity: 340,
        unitMaterialPrice: 2850,
        unitLaborPrice: 520,
        notes: 'EAE E-Line serisi çıkış kutuları dahil'
      },
      {
        id: 'pi-22',
        category: 'Aydınlatma & Şalt',
        pozNo: 'ELK-AY-02',
        description: '150W IP65 Endüstriyel High-Bay LED Armatür (160 lm/W)',
        unit: 'Adet',
        quantity: 180,
        unitMaterialPrice: 2950,
        unitLaborPrice: 620,
        notes: 'Depo koridor aydınlatması için dar açılı lens'
      },
      {
        id: 'pi-23',
        category: 'AG Dağıtım & Panolar',
        pozNo: 'ELK-PN-03',
        description: 'Otomatik Harmonik Filtreli Kompanzasyon Panosu 200 kVAr',
        unit: 'Adet',
        quantity: 1,
        unitMaterialPrice: 78000,
        unitLaborPrice: 14500,
        notes: 'TEDAŞ ceza önleme garantili reaktif röleli'
      }
    ],
    discountPercent: 3,
    taxPercent: 20,
    paymentTerms: [
      '%40 Sözleşme avansı',
      '%40 Malzeme şantiye tesliminde',
      '%20 Test ve devreye alma kabulünde'
    ],
    generalConditions: [
      'Armatürler 50.000 saat L80 ömürlü ve Osram sürücülüdür.',
      'Busbar montajında tork anahtarı kullanılacak ve tork raporu teslim edilecektir.'
    ],
    warrantyTerms: 'Armatürler 5 Yıl, montaj işçiliği 3 Yıl garantilidir.',
    authorizedPerson: {
      name: 'Kaan Yıldırım',
      title: 'Teknik Müdür',
      phone: '+90 (533) 290 14 55',
      email: 'kaan.yildirim@elektrovolt.com.tr'
    },
    notes: 'Sözleşme akdedilmiş olup şantiye imalatı planlanan takvimde ilerlemektedir.'
  },
  {
    id: 'prop-3',
    proposalNo: 'EV-2026-088',
    title: 'Modern Plaza Kat 12-14 Ofis Elektrik Yenileme & KNX',
    client: {
      name: 'Av. Zeynep Koçer',
      company: 'Koçer Hukuk & Danışmanlık Bürosu',
      phone: '+90 (530) 998 12 34',
      email: 'zeynep@kocerhukuk.com',
      address: 'Büyükdere Cad. Kristal Kule Kat: 12 Şişli, İstanbul',
      taxOffice: 'Şişli V.D.',
      taxNumber: '612 881 2940'
    },
    projectCategory: 'Ticari & AVM',
    projectLocation: 'Şişli, İstanbul',
    estimatedDuration: '45 Gün',
    createdAt: '2026-09-29',
    validUntil: '2026-10-29',
    status: 'Taslak',
    currency: 'TRY',
    items: [
      {
        id: 'pi-31',
        category: 'Aydınlatma & Şalt',
        pozNo: 'ELK-AY-05',
        description: 'KNX DALI-2 Gateway ve Aydınlatma Varlık Sensörü Paketi',
        unit: 'Takım',
        quantity: 1,
        unitMaterialPrice: 48000,
        unitLaborPrice: 12000,
        notes: 'Toplantı salonu ve ofis bölümleri senaryo kontrolü'
      },
      {
        id: 'pi-32',
        category: 'Zayıf Akım Sistemleri',
        pozNo: 'ELK-ZA-05',
        description: 'Cat.6A F/UTP Yapısal Kablolama ve Zemin Priz Kutusu Hattı',
        unit: 'Metre',
        quantity: 3200,
        unitMaterialPrice: 34,
        unitLaborPrice: 20,
        notes: 'Legrand zemin buatlarına sonlandırma'
      }
    ],
    discountPercent: 0,
    taxPercent: 20,
    paymentTerms: [
      '%50 Sipariş onayı ile peşin',
      '%50 İmalat ve devreye alma bitiminde'
    ],
    generalConditions: [
      'Gürültülü işler bina yönetmeliği gereği hafta sonu veya akşam saatlerinde yapılacaktır.'
    ],
    warrantyTerms: '2 Yıl Yerinde Teknik Servis Garantisi',
    authorizedPerson: {
      name: 'Müh. Kaan Yıldırım',
      title: 'Teknik Müdür',
      phone: '+90 (533) 290 14 55',
      email: 'kaan.yildirim@elektrovolt.com.tr'
    },
    notes: 'Mimari revizyon onaylandığında kesin teklif formuna dönüştürülecektir.'
  }
];
