import React, { useState } from 'react';
import { Proposal, ProposalItem, ProposalItemCategory, UnitCatalogItem } from '../types';
import { calculateProposalSummary, formatCurrency } from '../utils/storage';
import { Plus, Trash2, BookOpen, Save, ArrowLeft, X, Layers, Percent, DollarSign, Check } from 'lucide-react';

interface ProposalEditorProps {
  initialProposal: Proposal;
  catalog: UnitCatalogItem[];
  onSave: (updatedProposal: Proposal) => void;
  onCancel: () => void;
  onPrintPreview: (proposal: Proposal) => void;
}

export const ProposalEditor: React.FC<ProposalEditorProps> = ({
  initialProposal,
  catalog,
  onSave,
  onCancel,
  onPrintPreview,
}) => {
  const [proposal, setProposal] = useState<Proposal>(initialProposal);
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [selectedCatalogCategory, setSelectedCatalogCategory] = useState<string>('Tümü');
  const [catalogSearch, setCatalogSearch] = useState('');

  const summary = calculateProposalSummary(proposal);

  const categories: ProposalItemCategory[] = [
    'AG Dağıtım & Panolar',
    'Kablo & Kablo Taşıma',
    'Zayıf Akım Sistemleri',
    'Aydınlatma & Şalt',
    'OG & Trafo & Jeneratör',
    'Topraklama & Paratoner',
    'İşçilik & Mühendislik Hizmetleri',
  ];

  const handleAddItem = (category: ProposalItemCategory = 'AG Dağıtım & Panolar') => {
    const newItem: ProposalItem = {
      id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      category,
      pozNo: 'ELK-ÖZEL',
      description: 'Yeni Keşif Kalemi (Açıklama giriniz)',
      unit: 'Adet',
      quantity: 1,
      unitMaterialPrice: 1000,
      unitLaborPrice: 300,
      notes: '',
    };

    setProposal((prev) => ({
      ...prev,
      items: [...prev.items, newItem],
    }));
  };

  const handleAddFromCatalog = (catItem: UnitCatalogItem) => {
    const newItem: ProposalItem = {
      id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      category: catItem.category,
      pozNo: catItem.pozNo,
      description: catItem.description,
      unit: catItem.unit,
      quantity: 1,
      unitMaterialPrice: catItem.defaultMaterialPrice,
      unitLaborPrice: catItem.defaultLaborPrice,
      notes: catItem.brandSuggestion ? `Önerilen Marka: ${catItem.brandSuggestion}` : '',
    };

    setProposal((prev) => ({
      ...prev,
      items: [...prev.items, newItem],
    }));
    setIsCatalogOpen(false);
  };

  const handleUpdateItem = (index: number, updates: Partial<ProposalItem>) => {
    setProposal((prev) => {
      const nextItems = [...prev.items];
      nextItems[index] = { ...nextItems[index], ...updates };
      return { ...prev, items: nextItems };
    });
  };

  const handleRemoveItem = (index: number) => {
    setProposal((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  const handleAddCondition = () => {
    setProposal((prev) => ({
      ...prev,
      paymentTerms: [...prev.paymentTerms, 'Yeni ödeme vadesi şartı'],
    }));
  };

  const handleUpdateCondition = (index: number, val: string) => {
    setProposal((prev) => {
      const next = [...prev.paymentTerms];
      next[index] = val;
      return { ...prev, paymentTerms: next };
    });
  };

  const handleRemoveCondition = (index: number) => {
    setProposal((prev) => ({
      ...prev,
      paymentTerms: prev.paymentTerms.filter((_, i) => i !== index),
    }));
  };

  const filteredCatalog = catalog.filter((item) => {
    const matchCat = selectedCatalogCategory === 'Tümü' || item.category === selectedCatalogCategory;
    const matchSearch =
      !catalogSearch ||
      item.description.toLowerCase().includes(catalogSearch.toLowerCase()) ||
      item.pozNo.toLowerCase().includes(catalogSearch.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="space-y-8 pb-20">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <button
            onClick={onCancel}
            className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-white">
                {proposal.proposalNo} - Keşif & Teklif Düzenle
              </h1>
              <span className="text-xs px-2 py-0.5 rounded bg-amber-400/10 text-amber-400 font-mono">
                {proposal.status}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              İnşaat elektrik metraj pozları ve birim fiyat dökümü.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onPrintPreview(proposal)}
            className="px-4 py-2 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors"
          >
            Önizle & Yazdır
          </button>
          <button
            onClick={() => onSave(proposal)}
            className="flex items-center gap-2 px-5 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors shadow-sm"
          >
            <Save className="w-4 h-4" />
            <span>Teklifi Kaydet</span>
          </button>
        </div>
      </div>

      {/* Basic Info & Client Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Proposal & Project Info */}
        <div className="lg:col-span-2 p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
          <div className="font-semibold text-slate-200 text-sm border-b border-slate-800 pb-2">
            Teklif ve Proje Bilgileri
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-400 mb-1">Teklif Başlığı *</label>
              <input
                type="text"
                value={proposal.title}
                onChange={(e) => setProposal({ ...proposal, title: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-medium focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Teklif Numarası</label>
              <input
                type="text"
                value={proposal.proposalNo}
                onChange={(e) => setProposal({ ...proposal, proposalNo: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-slate-400 mb-1">Proje Kategorisi</label>
              <select
                value={proposal.projectCategory}
                onChange={(e) => setProposal({ ...proposal, projectCategory: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-400"
              >
                <option value="Konut & Rezidans">Konut & Rezidans</option>
                <option value="Endüstriyel & Fabrika">Endüstriyel & Fabrika</option>
                <option value="Ticari & AVM">Ticari & AVM</option>
                <option value="Sağlık & Hastane">Sağlık & Hastane</option>
                <option value="Altyapı & GES">Altyapı & GES</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Şantiye Lokasyonu</label>
              <input
                type="text"
                value={proposal.projectLocation}
                onChange={(e) => setProposal({ ...proposal, projectLocation: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Öngörülen Süre</label>
              <input
                type="text"
                value={proposal.estimatedDuration}
                onChange={(e) => setProposal({ ...proposal, estimatedDuration: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Geçerlilik Tarihi</label>
              <input
                type="date"
                value={proposal.validUntil}
                onChange={(e) => setProposal({ ...proposal, validUntil: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>
        </div>

        {/* Right 1 Col: Client Contact Information */}
        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
          <div className="font-semibold text-slate-200 text-sm border-b border-slate-800 pb-2">
            Müşteri & Muhatap Bilgileri
          </div>

          <div>
            <label className="block text-slate-400 mb-1">Firma / Kurum Adı *</label>
            <input
              type="text"
              value={proposal.client.company}
              onChange={(e) =>
                setProposal({
                  ...proposal,
                  client: { ...proposal.client, company: e.target.value },
                })
              }
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-medium focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-400 mb-1">Yetkili Kişi</label>
              <input
                type="text"
                value={proposal.client.name}
                onChange={(e) =>
                  setProposal({
                    ...proposal,
                    client: { ...proposal.client, name: e.target.value },
                  })
                }
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Telefon</label>
              <input
                type="text"
                value={proposal.client.phone}
                onChange={(e) =>
                  setProposal({
                    ...proposal,
                    client: { ...proposal.client, phone: e.target.value },
                  })
                }
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-400 mb-1">E-Posta</label>
            <input
              type="email"
              value={proposal.client.email}
              onChange={(e) =>
                setProposal({
                  ...proposal,
                  client: { ...proposal.client, email: e.target.value },
                })
              }
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>
      </div>

      {/* Keşif & Metraj Tablosu (Proposal Items) */}
      <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div>
            <h2 className="text-base font-bold text-white">
              Elektrik İmalat Keşif & Metraj Cetveli
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              İmalat kalemleri, malzeme birim maliyetleri ve montaj işçilik bedelleri.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsCatalogOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-amber-400 bg-amber-400/10 hover:bg-amber-400/20 border border-amber-400/30 rounded-lg transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Birim Fiyat Kataloğundan Ekle</span>
            </button>

            <button
              onClick={() => handleAddItem()}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Serbest Poz Ekle</span>
            </button>
          </div>
        </div>

        {/* Table of items */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-slate-400 font-semibold border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-3 w-10 text-center">#</th>
                <th className="py-2.5 px-3 w-32">Kategori</th>
                <th className="py-2.5 px-3">Poz & İmalat Açıklaması</th>
                <th className="py-2.5 px-3 w-20">Birim</th>
                <th className="py-2.5 px-3 w-24 text-right">Miktar</th>
                <th className="py-2.5 px-3 w-28 text-right">Malzeme (₺)</th>
                <th className="py-2.5 px-3 w-28 text-right">İşçilik (₺)</th>
                <th className="py-2.5 px-3 w-32 text-right">Tutar (₺)</th>
                <th className="py-2.5 px-2 w-10 text-center"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {proposal.items.map((item, index) => {
                const itemTotal = (item.quantity || 0) * ((item.unitMaterialPrice || 0) + (item.unitLaborPrice || 0));

                return (
                  <tr key={item.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-2.5 px-3 text-center text-slate-500 font-mono">
                      {index + 1}
                    </td>

                    <td className="py-2.5 px-3">
                      <select
                        value={item.category}
                        onChange={(e) =>
                          handleUpdateItem(index, { category: e.target.value as ProposalItemCategory })
                        }
                        className="w-full bg-slate-950 border border-slate-800 rounded p-1 text-slate-300 text-[11px]"
                      >
                        {categories.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </td>

                    <td className="py-2.5 px-3 space-y-1">
                      <input
                        type="text"
                        value={item.description}
                        onChange={(e) => handleUpdateItem(index, { description: e.target.value })}
                        placeholder="Kalem açıklaması..."
                        className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1 text-white font-medium"
                      />
                      <input
                        type="text"
                        value={item.notes || ''}
                        onChange={(e) => handleUpdateItem(index, { notes: e.target.value })}
                        placeholder="Marka şartı veya teknik detay notu (isteğe bağlı)..."
                        className="w-full bg-transparent border-none text-[11px] text-slate-400 placeholder-slate-600 focus:outline-none px-1"
                      />
                    </td>

                    <td className="py-2.5 px-3">
                      <select
                        value={item.unit}
                        onChange={(e) => handleUpdateItem(index, { unit: e.target.value as any })}
                        className="w-full bg-slate-950 border border-slate-800 rounded p-1 text-slate-300 text-[11px]"
                      >
                        <option value="Metre">Metre</option>
                        <option value="Adet">Adet</option>
                        <option value="Takım">Takım</option>
                        <option value="Set">Set</option>
                        <option value="Adam/Gün">Adam/Gün</option>
                        <option value="Mahal">Mahal</option>
                      </select>
                    </td>

                    <td className="py-2.5 px-3 text-right">
                      <input
                        type="number"
                        min="0"
                        step="any"
                        value={item.quantity}
                        onChange={(e) => handleUpdateItem(index, { quantity: Number(e.target.value) })}
                        className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1 text-right font-mono text-white"
                      />
                    </td>

                    <td className="py-2.5 px-3 text-right">
                      <input
                        type="number"
                        min="0"
                        step="any"
                        value={item.unitMaterialPrice}
                        onChange={(e) =>
                          handleUpdateItem(index, { unitMaterialPrice: Number(e.target.value) })
                        }
                        className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1 text-right font-mono text-slate-200"
                      />
                    </td>

                    <td className="py-2.5 px-3 text-right">
                      <input
                        type="number"
                        min="0"
                        step="any"
                        value={item.unitLaborPrice}
                        onChange={(e) =>
                          handleUpdateItem(index, { unitLaborPrice: Number(e.target.value) })
                        }
                        className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1 text-right font-mono text-slate-200"
                      />
                    </td>

                    <td className="py-2.5 px-3 text-right font-bold text-white font-mono tabular-nums whitespace-nowrap">
                      {formatCurrency(itemTotal, 'TRY')}
                    </td>

                    <td className="py-2.5 px-2 text-center">
                      <button
                        onClick={() => handleRemoveItem(index)}
                        className="p-1 text-slate-500 hover:text-rose-400 transition-colors"
                        title="Kalemi Sil"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {proposal.items.length === 0 && (
          <div className="text-center py-8 text-xs text-slate-500 border border-dashed border-slate-800 rounded-lg">
            Henüz keşif kalemi eklenmedi. Yukarıdaki butonlardan poz ekleyebilirsiniz.
          </div>
        )}
      </div>

      {/* Financial Totals & Discount & Terms */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Payment Terms & General Conditions */}
        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="font-semibold text-slate-200 text-sm">Ödeme Planı & Şartname Koşulları</span>
            <button
              onClick={handleAddCondition}
              className="text-amber-400 hover:text-amber-300 flex items-center gap-1 font-medium"
            >
              <Plus className="w-3 h-3" />
              <span>Madde Ekle</span>
            </button>
          </div>

          <div className="space-y-2">
            {proposal.paymentTerms.map((term, tIdx) => (
              <div key={tIdx} className="flex items-center gap-2">
                <input
                  type="text"
                  value={term}
                  onChange={(e) => handleUpdateCondition(tIdx, e.target.value)}
                  className="flex-1 bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-slate-200 text-xs focus:outline-none focus:border-amber-400"
                />
                <button
                  onClick={() => handleRemoveCondition(tIdx)}
                  className="p-1 text-slate-500 hover:text-rose-400"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          <div>
            <label className="block text-slate-400 mb-1">Garanti Taahhüdü</label>
            <textarea
              rows={2}
              value={proposal.warrantyTerms}
              onChange={(e) => setProposal({ ...proposal, warrantyTerms: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>

        {/* Financial Calculation Box */}
        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3 text-xs">
          <div className="font-semibold text-slate-200 text-sm border-b border-slate-800 pb-2">
            Mali Cetvel ve KDV Hesaplaması
          </div>

          <div className="space-y-2 font-mono tabular-nums">
            <div className="flex justify-between py-1 border-b border-slate-800/60">
              <span className="text-slate-400 font-sans">Malzeme Maliyeti Toplamı:</span>
              <span className="text-white">{formatCurrency(summary.totalMaterial, proposal.currency)}</span>
            </div>

            <div className="flex justify-between py-1 border-b border-slate-800/60">
              <span className="text-slate-400 font-sans">Montaj & İşçilik Toplamı:</span>
              <span className="text-white">{formatCurrency(summary.totalLabor, proposal.currency)}</span>
            </div>

            <div className="flex justify-between py-1 font-semibold border-b border-slate-800/60">
              <span className="text-slate-300 font-sans">Ara Toplam:</span>
              <span className="text-white">{formatCurrency(summary.subtotal, proposal.currency)}</span>
            </div>

            <div className="flex items-center justify-between py-1">
              <div className="flex items-center gap-2">
                <span className="text-slate-400 font-sans">İskonto Oranı (%):</span>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={proposal.discountPercent}
                  onChange={(e) =>
                    setProposal({ ...proposal, discountPercent: Number(e.target.value) })
                  }
                  className="w-16 bg-slate-950 border border-slate-800 rounded px-2 py-0.5 text-right text-amber-400 font-mono"
                />
              </div>
              <span className="text-amber-400">-{formatCurrency(summary.discountAmount, proposal.currency)}</span>
            </div>

            <div className="flex justify-between py-1 border-b border-slate-800/60">
              <span className="text-slate-400 font-sans">KDV Matrahı:</span>
              <span className="text-white">{formatCurrency(summary.netAfterDiscount, proposal.currency)}</span>
            </div>

            <div className="flex items-center justify-between py-1 border-b border-slate-800/60">
              <div className="flex items-center gap-2">
                <span className="text-slate-400 font-sans">KDV Oranı (%):</span>
                <span className="text-slate-300">%{proposal.taxPercent}</span>
              </div>
              <span className="text-slate-300">+{formatCurrency(summary.taxAmount, proposal.currency)}</span>
            </div>

            <div className="flex justify-between pt-2 text-base font-bold">
              <span className="text-amber-400 font-sans">GENEL TOPLAM (KDV Dahil):</span>
              <span className="text-amber-400 text-lg">
                {formatCurrency(summary.grandTotal, proposal.currency)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Catalog Item Picker Modal */}
      {isCatalogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 text-slate-100 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 shrink-0">
              <div>
                <h3 className="text-lg font-bold text-white">Birim Fiyat Kataloğundan Poz Seç</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Standart elektrik keşif kütüphanesinden tek tıkla teklifinize ekleyin.
                </p>
              </div>
              <button
                onClick={() => setIsCatalogOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-3 shrink-0">
              <input
                type="text"
                placeholder="Poz no veya malzeme adı ile filtreleyin..."
                value={catalogSearch}
                onChange={(e) => setCatalogSearch(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />

              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
                {['Tümü', ...categories].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCatalogCategory(cat)}
                    className={`px-2.5 py-1 rounded-md whitespace-nowrap transition-colors ${
                      selectedCatalogCategory === cat
                        ? 'bg-amber-400 text-slate-950 font-semibold'
                        : 'text-slate-400 hover:text-white bg-slate-800/60'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-y-auto flex-1 divide-y divide-slate-800/80 border border-slate-800 rounded-xl bg-slate-950/40">
              {filteredCatalog.map((catItem) => (
                <div
                  key={catItem.id}
                  className="p-3 hover:bg-slate-800/40 transition-colors flex items-center justify-between gap-4 text-xs"
                >
                  <div className="space-y-1 max-w-lg">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-amber-400 font-semibold">{catItem.pozNo}</span>
                      <span className="text-[11px] text-slate-400">· {catItem.category}</span>
                    </div>
                    <div className="font-medium text-white">{catItem.description}</div>
                    {catItem.brandSuggestion && (
                      <div className="text-[11px] text-slate-500">
                        Marka: {catItem.brandSuggestion}
                      </div>
                    )}
                  </div>

                  <div className="text-right shrink-0 space-y-1">
                    <div className="font-mono text-white font-semibold">
                      {formatCurrency(catItem.defaultMaterialPrice + catItem.defaultLaborPrice, 'TRY')}
                    </div>
                    <div className="text-[10px] text-slate-400">
                      Malzeme: {formatCurrency(catItem.defaultMaterialPrice, 'TRY')} · İşçilik: {formatCurrency(catItem.defaultLaborPrice, 'TRY')} / {catItem.unit}
                    </div>
                    <button
                      onClick={() => handleAddFromCatalog(catItem)}
                      className="px-3 py-1 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded transition-colors"
                    >
                      Teklife Ekle
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
