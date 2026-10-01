import { Project, Proposal, UnitCatalogItem, CompanyProfile, ProposalItem } from '../types';
import { initialProjects, initialProposals, initialUnitCatalog, initialCompanyProfile } from '../data/mockData';

const STORAGE_KEYS = {
  PROJECTS: 'elektrovolt_projects_v1',
  PROPOSALS: 'elektrovolt_proposals_v1',
  CATALOG: 'elektrovolt_catalog_v1',
  COMPANY: 'elektrovolt_company_v1',
};

export const getStoredProjects = (): Project[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PROJECTS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(initialProjects));
      return initialProjects;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load projects from storage', e);
    return initialProjects;
  }
};

export const saveStoredProjects = (projects: Project[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
  } catch (e) {
    console.error('Failed to save projects to storage', e);
  }
};

export const getStoredProposals = (): Proposal[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PROPOSALS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.PROPOSALS, JSON.stringify(initialProposals));
      return initialProposals;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load proposals from storage', e);
    return initialProposals;
  }
};

export const saveStoredProposals = (proposals: Proposal[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.PROPOSALS, JSON.stringify(proposals));
  } catch (e) {
    console.error('Failed to save proposals to storage', e);
  }
};

export const getStoredCatalog = (): UnitCatalogItem[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CATALOG);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.CATALOG, JSON.stringify(initialUnitCatalog));
      return initialUnitCatalog;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load catalog from storage', e);
    return initialUnitCatalog;
  }
};

export const saveStoredCatalog = (catalog: UnitCatalogItem[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.CATALOG, JSON.stringify(catalog));
  } catch (e) {
    console.error('Failed to save catalog to storage', e);
  }
};

export const getStoredCompany = (): CompanyProfile => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.COMPANY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.COMPANY, JSON.stringify(initialCompanyProfile));
      return initialCompanyProfile;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load company profile from storage', e);
    return initialCompanyProfile;
  }
};

export const saveStoredCompany = (profile: CompanyProfile): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.COMPANY, JSON.stringify(profile));
  } catch (e) {
    console.error('Failed to save company profile to storage', e);
  }
};

export const resetAllToDefaults = (): void => {
  localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(initialProjects));
  localStorage.setItem(STORAGE_KEYS.PROPOSALS, JSON.stringify(initialProposals));
  localStorage.setItem(STORAGE_KEYS.CATALOG, JSON.stringify(initialUnitCatalog));
  localStorage.setItem(STORAGE_KEYS.COMPANY, JSON.stringify(initialCompanyProfile));
};

export interface ProposalCalculations {
  totalMaterial: number;
  totalLabor: number;
  subtotal: number;
  discountAmount: number;
  netAfterDiscount: number;
  taxAmount: number;
  grandTotal: number;
}

export const calculateProposalSummary = (proposal: Proposal): ProposalCalculations => {
  let totalMaterial = 0;
  let totalLabor = 0;

  proposal.items.forEach((item) => {
    totalMaterial += (item.quantity || 0) * (item.unitMaterialPrice || 0);
    totalLabor += (item.quantity || 0) * (item.unitLaborPrice || 0);
  });

  const subtotal = totalMaterial + totalLabor;
  const discountAmount = subtotal * ((proposal.discountPercent || 0) / 100);
  const netAfterDiscount = subtotal - discountAmount;
  const taxAmount = netAfterDiscount * ((proposal.taxPercent || 20) / 100);
  const grandTotal = netAfterDiscount + taxAmount;

  return {
    totalMaterial,
    totalLabor,
    subtotal,
    discountAmount,
    netAfterDiscount,
    taxAmount,
    grandTotal,
  };
};

export const formatCurrency = (amount: number, currency: 'TRY' | 'USD' | 'EUR' = 'TRY'): string => {
  const symbolMap = {
    TRY: '₺',
    USD: '$',
    EUR: '€',
  };

  const formattedNum = new Intl.NumberFormat('tr-TR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount || 0);

  return `${formattedNum} ${symbolMap[currency] || '₺'}`;
};

export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('tr-TR').format(num || 0);
};
