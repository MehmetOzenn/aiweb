export type ProjectCategory = 
  | 'Tümü'
  | 'Konut & Rezidans'
  | 'Endüstriyel & Fabrika'
  | 'Ticari & AVM'
  | 'Sağlık & Hastane'
  | 'Altyapı & GES';

export interface ProjectTechnicalSpec {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  title: string;
  clientName: string;
  category: 'Konut & Rezidans' | 'Endüstriyel & Fabrika' | 'Ticari & AVM' | 'Sağlık & Hastane' | 'Altyapı & GES';
  location: string;
  completionYear: number;
  durationMonths: number;
  squareMeters: number;
  installedPowerKva: number;
  scopeTags: string[];
  summary: string;
  fullDescription: string;
  imageUrl: string;
  additionalImages?: string[];
  technicalSpecs: ProjectTechnicalSpec[];
  keyHighlights: string[];
  clientTestimonial?: {
    quote: string;
    person: string;
    role: string;
    company: string;
  };
  budgetRange?: string;
  status: 'Tamamlandı' | 'Devam Ediyor';
}

export type ProposalItemCategory = 
  | 'AG Dağıtım & Panolar'
  | 'Kablo & Kablo Taşıma'
  | 'Zayıf Akım Sistemleri'
  | 'Aydınlatma & Şalt'
  | 'OG & Trafo & Jeneratör'
  | 'Topraklama & Paratoner'
  | 'İşçilik & Mühendislik Hizmetleri';

export interface ProposalItem {
  id: string;
  category: ProposalItemCategory;
  pozNo?: string;
  description: string;
  unit: 'Metre' | 'Adet' | 'Takım' | 'Set' | 'Adam/Gün' | 'Mahal';
  quantity: number;
  unitMaterialPrice: number;
  unitLaborPrice: number;
  notes?: string;
}

export type ProposalStatus = 
  | 'Taslak'
  | 'Müşteriye Sunuldu'
  | 'Revizyon İstendi'
  | 'Onaylandı'
  | 'Reddedildi';

export interface ClientInfo {
  name: string;
  company: string;
  phone: string;
  email: string;
  address: string;
  taxOffice?: string;
  taxNumber?: string;
}

export interface Proposal {
  id: string;
  proposalNo: string;
  title: string;
  client: ClientInfo;
  projectCategory: string;
  projectLocation: string;
  estimatedDuration: string;
  createdAt: string;
  validUntil: string;
  status: ProposalStatus;
  currency: 'TRY' | 'USD' | 'EUR';
  items: ProposalItem[];
  discountPercent: number;
  taxPercent: number; // default 20
  paymentTerms: string[];
  generalConditions: string[];
  warrantyTerms: string;
  authorizedPerson: {
    name: string;
    title: string;
    phone: string;
    email: string;
  };
  notes?: string;
}

export interface UnitCatalogItem {
  id: string;
  category: ProposalItemCategory;
  pozNo: string;
  description: string;
  unit: 'Metre' | 'Adet' | 'Takım' | 'Set' | 'Adam/Gün' | 'Mahal';
  defaultMaterialPrice: number;
  defaultLaborPrice: number;
  brandSuggestion?: string;
}

export interface CompanyProfile {
  name: string;
  tagline: string;
  tradeTitle: string;
  taxOffice: string;
  taxNo: string;
  phone: string;
  email: string;
  website: string;
  address: string;
  bankInfo: {
    bankName: string;
    branch: string;
    ibanTry: string;
    ibanUsd: string;
  };
  stats: {
    completedProjects: number;
    totalKvaInstalled: number;
    squareMetersWired: number;
    experienceYears: number;
  };
}
