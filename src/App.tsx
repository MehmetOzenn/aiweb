/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Project, Proposal, UnitCatalogItem, CompanyProfile, ProposalStatus } from './types';
import {
  getStoredProjects,
  saveStoredProjects,
  getStoredProposals,
  saveStoredProposals,
  getStoredCatalog,
  saveStoredCatalog,
  getStoredCompany,
  saveStoredCompany,
  resetAllToDefaults,
} from './utils/storage';
import { Navbar, ActiveTab } from './components/Navbar';
import { PortfolioShowcase } from './components/PortfolioShowcase';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { ClientPresentationModal } from './components/ClientPresentationModal';
import { NewProjectModal } from './components/NewProjectModal';
import { ProposalList } from './components/ProposalList';
import { ProposalEditor } from './components/ProposalEditor';
import { ProposalPrintView } from './components/ProposalPrintView';
import { PriceCatalogView } from './components/PriceCatalogView';
import { EngineeringCalculator } from './components/EngineeringCalculator';
import { CompanyProfileView } from './components/CompanyProfileView';

export default function App() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [catalog, setCatalog] = useState<UnitCatalogItem[]>([]);
  const [company, setCompany] = useState<CompanyProfile | null>(null);

  const [activeTab, setActiveTab] = useState<ActiveTab>('portfolio');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isPresentationOpen, setIsPresentationOpen] = useState(false);
  const [presentationIndex, setPresentationIndex] = useState(0);
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);

  // Proposal workflow states
  const [editingProposal, setEditingProposal] = useState<Proposal | null>(null);
  const [printingProposal, setPrintingProposal] = useState<Proposal | null>(null);

  // Load from local storage on mount
  useEffect(() => {
    setProjects(getStoredProjects());
    setProposals(getStoredProposals());
    setCatalog(getStoredCatalog());
    setCompany(getStoredCompany());
  }, []);

  // Handlers for Project actions
  const handleAddProject = (newProject: Project) => {
    const updated = [newProject, ...projects];
    setProjects(updated);
    saveStoredProjects(updated);
  };

  const handleOpenPresentation = (index: number = 0) => {
    setPresentationIndex(index);
    setIsPresentationOpen(true);
  };

  // Handlers for Proposals
  const handleStartNewProposal = () => {
    const nextNum = Math.floor(100 + Math.random() * 900);
    const today = new Date().toISOString().split('T')[0];
    const validUntilDate = new Date();
    validUntilDate.setDate(validUntilDate.getDate() + 30);
    const validUntil = validUntilDate.toISOString().split('T')[0];

    const newProposal: Proposal = {
      id: `prop-${Date.now()}`,
      proposalNo: `EV-2026-${nextNum}`,
      title: 'Yeni İnşaat Elektrik Taahhüt İşi',
      client: {
        name: 'Sayın Yetkili',
        company: 'Müşteri Firma Ünvanı',
        phone: '+90 (5xx) xxx xx xx',
        email: 'info@firma.com',
        address: 'İstanbul',
        taxOffice: '',
        taxNumber: '',
      },
      projectCategory: 'Konut & Rezidans',
      projectLocation: 'İstanbul',
      estimatedDuration: '4 Ay',
      createdAt: today,
      validUntil,
      status: 'Taslak',
      currency: 'TRY',
      items: [
        {
          id: `item-${Date.now()}-1`,
          category: 'AG Dağıtım & Panolar',
          pozNo: 'ELK-PN-01',
          description: 'Ana Dağıtım Panosu (ADP) - 1600A Form 3b Tip Testli',
          unit: 'Adet',
          quantity: 1,
          unitMaterialPrice: 145000,
          unitLaborPrice: 24000,
          notes: 'Schneider / Siemens şalt donanımlı',
        },
        {
          id: `item-${Date.now()}-2`,
          category: 'Kablo & Kablo Taşıma',
          pozNo: 'ELK-KB-01',
          description: 'N2XH 3x2.5 mm² Halogen-Free Alev İletmeyen Enerji Kablosu',
          unit: 'Metre',
          quantity: 3500,
          unitMaterialPrice: 62,
          unitLaborPrice: 28,
        },
        {
          id: `item-${Date.now()}-3`,
          category: 'Topraklama & Paratoner',
          pozNo: 'ELK-TP-01',
          description: '30x3.5 mm Sıcak Daldırma Galvaniz Şerit Temel Topraklaması',
          unit: 'Metre',
          quantity: 450,
          unitMaterialPrice: 145,
          unitLaborPrice: 65,
        },
      ],
      discountPercent: 0,
      taxPercent: 20,
      paymentTerms: [
        '%30 Sözleşme imzalanmasında peşinat avansı',
        '%50 Şantiye imalat hakedişlerine paralel aylık nakit ödeme',
        '%20 Geçici kabul ve TEDAŞ enerjilendirme tutanağının imzalanmasında',
      ],
      generalConditions: [
        'Tüm malzemeler 1. sınıf TSE, CE ve ISO 9001 sertifikalı markalardan temin edilecektir.',
        'Şantiye süresince İş Sağlığı ve Güvenliği (İSG) mevzuatına %100 riayet edilecek, tüm personel sigortalı olacaktır.',
        'Kullanılacak kablolar TEDAŞ onaylı ve alev iletmez (Halogen Free) sınıfta olacaktır.',
      ],
      warrantyTerms: 'Tüm montaj ve işçilik hatalarına karşı 5 Yıl, malzeme ve şalt cihazlarına karşı üretici garantisi kapsamında 2 Yıl koşulsuz garanti taahhüt edilmektedir.',
      authorizedPerson: {
        name: 'Müh. Kaan Yıldırım',
        title: 'Teknik Müdür & Elektrik Proje Koordinatörü',
        phone: '+90 (533) 290 14 55',
        email: 'kaan.yildirim@elektrovolt.com.tr',
      },
      notes: '',
    };

    setEditingProposal(newProposal);
    setPrintingProposal(null);
    setActiveTab('proposals');
  };

  const handleCreateProposalFromProject = (project: Project) => {
    const nextNum = Math.floor(100 + Math.random() * 900);
    const today = new Date().toISOString().split('T')[0];
    const validUntilDate = new Date();
    validUntilDate.setDate(validUntilDate.getDate() + 30);

    const fromProjectProposal: Proposal = {
      id: `prop-${Date.now()}`,
      proposalNo: `EV-2026-${nextNum}`,
      title: `${project.title} Emsali Elektrik Taahhüt İşi`,
      client: {
        name: 'İlgili Mühendis / Proje Müdürü',
        company: `${project.clientName} (Yeni Proje Teklifi)`,
        phone: '+90 (5xx) xxx xx xx',
        email: 'proje@firma.com',
        address: project.location,
      },
      projectCategory: project.category,
      projectLocation: project.location,
      estimatedDuration: `${project.durationMonths} Ay`,
      createdAt: today,
      validUntil: validUntilDate.toISOString().split('T')[0],
      status: 'Taslak',
      currency: 'TRY',
      items: [
        {
          id: `item-${Date.now()}-1`,
          category: 'OG & Trafo & Jeneratör',
          pozNo: 'ELK-OG-01',
          description: `${project.installedPowerKva} kVA 34.5/0.4 kV Trafo ve Hücre Montajı`,
          unit: 'Adet',
          quantity: 1,
          unitMaterialPrice: 850000,
          unitLaborPrice: 85000,
          notes: 'TEDAŞ onayı ve kabul işlemleri dahil',
        },
        {
          id: `item-${Date.now()}-2`,
          category: 'AG Dağıtım & Panolar',
          pozNo: 'ELK-PN-01',
          description: 'Ana Dağıtım Panosu (ADP) - Form 4b Karkaslı Tip Testli',
          unit: 'Adet',
          quantity: 2,
          unitMaterialPrice: 175000,
          unitLaborPrice: 32000,
        },
        {
          id: `item-${Date.now()}-3`,
          category: 'Kablo & Kablo Taşıma',
          pozNo: 'ELK-KB-04',
          description: 'Ağır Hizmet Sıcak Daldırma Galvaniz Kablo Tavası Hattı',
          unit: 'Metre',
          quantity: 1200,
          unitMaterialPrice: 380,
          unitLaborPrice: 140,
        },
        {
          id: `item-${Date.now()}-4`,
          category: 'Zayıf Akım Sistemleri',
          pozNo: 'ELK-ZA-01',
          description: 'Adresli Yangın Algılama & Tahliye Sistemi Paketi',
          unit: 'Takım',
          quantity: 1,
          unitMaterialPrice: 195000,
          unitLaborPrice: 42000,
        },
      ],
      discountPercent: 5,
      taxPercent: 20,
      paymentTerms: [
        '%30 Sözleşme avansı',
        '%50 İmalat hakedişlerine paralel',
        '%20 Geçici kabul ve TEDAŞ onayında',
      ],
      generalConditions: [
        'Malzemeler 1. sınıf TSE sertifikalıdır.',
        'İş güvenliği mevzuatına %100 riayet edilir.',
      ],
      warrantyTerms: '5 Yıl İşçilik ve Montaj Garantisi, 2 Yıl Malzeme Garantisi',
      authorizedPerson: {
        name: 'Müh. Kaan Yıldırım',
        title: 'Teknik Müdür',
        phone: '+90 (533) 290 14 55',
        email: 'kaan.yildirim@elektrovolt.com.tr',
      },
    };

    setEditingProposal(fromProjectProposal);
    setPrintingProposal(null);
    setActiveTab('proposals');
  };

  const handleDuplicateProposal = (proposal: Proposal) => {
    const nextNum = Math.floor(100 + Math.random() * 900);
    const duplicated: Proposal = {
      ...proposal,
      id: `prop-${Date.now()}`,
      proposalNo: `EV-2026-${nextNum}`,
      title: `${proposal.title} (Kopya)`,
      status: 'Taslak',
      createdAt: new Date().toISOString().split('T')[0],
    };

    const updated = [duplicated, ...proposals];
    setProposals(updated);
    saveStoredProposals(updated);
  };

  const handleDeleteProposal = (id: string) => {
    if (confirm('Bu teklif kaydını silmek istediğinize emin misiniz?')) {
      const updated = proposals.filter((p) => p.id !== id);
      setProposals(updated);
      saveStoredProposals(updated);
      if (editingProposal?.id === id) setEditingProposal(null);
      if (printingProposal?.id === id) setPrintingProposal(null);
    }
  };

  const handleChangeProposalStatus = (id: string, newStatus: ProposalStatus) => {
    const updated = proposals.map((p) => (p.id === id ? { ...p, status: newStatus } : p));
    setProposals(updated);
    saveStoredProposals(updated);
  };

  const handleSaveProposal = (savedProposal: Proposal) => {
    const exists = proposals.some((p) => p.id === savedProposal.id);
    let updated: Proposal[];
    if (exists) {
      updated = proposals.map((p) => (p.id === savedProposal.id ? savedProposal : p));
    } else {
      updated = [savedProposal, ...proposals];
    }
    setProposals(updated);
    saveStoredProposals(updated);
    setEditingProposal(null);
    setPrintingProposal(savedProposal);
  };

  const handleSaveCatalog = (newCatalog: UnitCatalogItem[]) => {
    setCatalog(newCatalog);
    saveStoredCatalog(newCatalog);
  };

  const handleSaveCompany = (updated: CompanyProfile) => {
    setCompany(updated);
    saveStoredCompany(updated);
  };

  const handleResetData = () => {
    if (confirm('Tüm portfolyo projeleri, teklifler ve birim fiyatları ilk örnek haline getirmek istiyor musunuz?')) {
      resetAllToDefaults();
      setProjects(getStoredProjects());
      setProposals(getStoredProposals());
      setCatalog(getStoredCatalog());
      setCompany(getStoredCompany());
      setEditingProposal(null);
      setPrintingProposal(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Strict Top Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setEditingProposal(null);
          setPrintingProposal(null);
        }}
        onOpenPresentation={() => handleOpenPresentation(0)}
        onNewProposal={handleStartNewProposal}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-8">
        {/* If in printing/official view for a proposal */}
        {printingProposal && company ? (
          <ProposalPrintView
            proposal={printingProposal}
            company={company}
            onBack={() => setPrintingProposal(null)}
            onEdit={() => {
              setEditingProposal(printingProposal);
              setPrintingProposal(null);
            }}
          />
        ) : editingProposal ? (
          /* If editing a proposal */
          <ProposalEditor
            initialProposal={editingProposal}
            catalog={catalog}
            onSave={handleSaveProposal}
            onCancel={() => setEditingProposal(null)}
            onPrintPreview={(prop) => {
              setEditingProposal(null);
              setPrintingProposal(prop);
            }}
          />
        ) : activeTab === 'portfolio' ? (
          /* Portfolio Showcase View */
          <PortfolioShowcase
            projects={projects}
            onSelectProject={(proj) => setSelectedProject(proj)}
            onOpenNewProjectModal={() => setIsNewProjectModalOpen(true)}
            onOpenPresentation={handleOpenPresentation}
            onCreateProposalFromProject={handleCreateProposalFromProject}
          />
        ) : activeTab === 'proposals' ? (
          /* Proposals List View */
          <ProposalList
            proposals={proposals}
            onNewProposal={handleStartNewProposal}
            onEditProposal={(prop) => setEditingProposal(prop)}
            onPrintProposal={(prop) => setPrintingProposal(prop)}
            onDuplicateProposal={handleDuplicateProposal}
            onDeleteProposal={handleDeleteProposal}
            onChangeStatus={handleChangeProposalStatus}
          />
        ) : activeTab === 'catalog' ? (
          /* Unit Price Catalog View */
          <PriceCatalogView
            catalog={catalog}
            onUpdateCatalog={handleSaveCatalog}
          />
        ) : activeTab === 'calculator' ? (
          /* Engineering Estimator View */
          <EngineeringCalculator />
        ) : activeTab === 'company' && company ? (
          /* Company Profile & Credentials View */
          <CompanyProfileView
            company={company}
            onSave={handleSaveCompany}
            onResetData={handleResetData}
          />
        ) : null}
      </main>

      {/* Modals */}
      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onCreateProposal={handleCreateProposalFromProject}
        />
      )}

      {isPresentationOpen && (
        <ClientPresentationModal
          projects={projects}
          initialIndex={presentationIndex}
          isOpen={isPresentationOpen}
          onClose={() => setIsPresentationOpen(false)}
          onCreateProposal={handleCreateProposalFromProject}
        />
      )}

      {isNewProjectModalOpen && (
        <NewProjectModal
          isOpen={isNewProjectModalOpen}
          onClose={() => setIsNewProjectModalOpen(false)}
          onAddProject={handleAddProject}
        />
      )}

      {/* Quiet Corporate Footer (no-print, anti-slop) */}
      <footer className="mt-auto border-t border-slate-900 bg-slate-950 py-8 no-print text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-bold text-slate-300">ElektroVolt</span>
            <span aria-hidden="true">·</span>
            <span>İnşaat & Endüstriyel Elektrik Taahhüt Mühendisliği</span>
          </div>

          <div className="flex items-center gap-4 text-slate-500">
            <span>TMMOB EMO Tescilli</span>
            <span aria-hidden="true">·</span>
            <span>TSE-HYB TS 12540</span>
            <span aria-hidden="true">·</span>
            <span>Tüm Hakları Saklıdır © {new Date().getFullYear()}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
