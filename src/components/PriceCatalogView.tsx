import React, { useState, useMemo } from 'react';
import { UnitCatalogItem, ProposalItemCategory } from '../types';
import { formatCurrency } from '../utils/storage';
import { Search, Plus, Edit2, Trash2, Check, X, BookOpen, Layers } from 'lucide-react';

interface PriceCatalogViewProps {
  catalog: UnitCatalogItem[];
  onUpdateCatalog: (newCatalog: UnitCatalogItem[]) => void;
  onUseItemInProposal?: (item: UnitCatalogItem) => void;
}

export const PriceCatalogView: React.FC<PriceCatalogViewProps> = ({
  catalog,
  onUpdateCatalog,
  onUseItemInProposal,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Tümü');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editMaterialPrice, setEditMaterialPrice] = useState<number>(0);
  const [editLaborPrice, setEditLaborPrice] = useState<number>(0);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New item form state
  const [newCategory, setNewCategory] = useState<ProposalItemCategory>('AG Dağıtım & Panolar');
  const [newPozNo, setNewPozNo] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newUnit, setNewUnit] = useState<UnitCatalogItem['unit']>('Metre');
  const [newMaterialPrice, setNewMaterialPrice] = useState<number>(100);
  const [newLaborPrice, setNewLaborPrice] = useState<number>(50);
  const [newBrand, setNewBrand] = useState('');

  const categories: (ProposalItemCategory | 'Tümü')[] = [
    'Tümü',
    'AG Dağıtım & Panolar',
    'Kablo & Kablo Taşıma',
    'Zayıf Akım Sistemleri',
    'Aydınlatma & Şalt',
    'OG & Trafo & Jeneratör',
    'Topraklama & Paratoner',
    'İşçilik & Mühendislik Hizmetleri',
  ];

  const filteredItems = useMemo(() => {
    return catalog.filter((item) => {
      const matchCat = selectedCategory === 'Tümü' || item.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchQuery =
        !q ||
        item.description.toLowerCase().includes(q) ||
        item.pozNo.toLowerCase().includes(q) ||
        (item.brandSuggestion && item.brandSuggestion.toLowerCase().includes(q));

      return matchCat && matchQuery;
    });
  }, [catalog, selectedCategory, searchQuery]);

  const handleStartEdit = (item: UnitCatalogItem) => {
    setEditingId(item.id);
    setEditMaterialPrice(item.defaultMaterialPrice);
    setEditLaborPrice(item.defaultLaborPrice);
  };

  const handleSaveEdit = (id: string) => {
    const updated = catalog.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          defaultMaterialPrice: Number(editMaterialPrice) || 0,
          defaultLaborPrice: Number(editLaborPrice) || 0,
        };
      }
      return item;
    });
    onUpdateCatalog(updated);
    setEditingId(null);
  };

  const handleDeleteItem = (id: string) => {
    const updated = catalog.filter((i) => i.id !== id);
    onUpdateCatalog(updated);
  };

  const handleAddNewItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDescription.trim()) return;

    const newItem: UnitCatalogItem = {
      id: `cat-${Date.now()}`,
      category: newCategory,
      pozNo: newPozNo.trim() || `ELK-${Math.floor(100 + Math.random() * 900)}`,
      description: newDescription.trim(),
      unit: newUnit,
      defaultMaterialPrice: Number(newMaterialPrice) || 0,
      defaultLaborPrice: Number(newLaborPrice) || 0,
      brandSuggestion: newBrand.trim() || undefined,
    };

    onUpdateCatalog([newItem, ...catalog]);
    setIsAddModalOpen(false);
    // Reset
    setNewDescription('');
    setNewPozNo('');
    setNewBrand('');
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Elektrik Birim Fiyat Kataloğu
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Şantiye keşif ve metrajlarında kullanılan güncel malzeme ve montaj işçilik pozları.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors shadow-sm self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Yeni Poz Ekle</span>
        </button>
      </div>

      {/* Filter and Search */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 overflow-x-auto p-1 bg-slate-900 border border-slate-800 rounded-xl scrollbar-none text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-amber-400 text-slate-950 font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Poz no, marka veya malzeme ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>
        </div>

        <div className="text-xs text-slate-400 px-1">
          Toplam <strong className="text-white font-mono">{filteredItems.length}</strong> imalat pozu listeleniyor.
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900 shadow-sm">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-slate-800 bg-slate-950/60 text-slate-400 uppercase tracking-wider font-semibold">
            <tr>
              <th className="py-3 px-4 w-28">Poz No</th>
              <th className="py-3 px-4 w-40">Kategori</th>
              <th className="py-3 px-4">İmalat Açıklaması & Şartname</th>
              <th className="py-3 px-4 text-center w-20">Birim</th>
              <th className="py-3 px-4 text-right w-32">Malzeme (₺)</th>
              <th className="py-3 px-4 text-right w-32">İşçilik (₺)</th>
              <th className="py-3 px-4 text-right w-36">Birim Toplam</th>
              <th className="py-3 px-4 text-right w-24">İşlem</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/70 text-slate-300">
            {filteredItems.map((item) => {
              const isEditing = editingId === item.id;
              const totalUnitPrice = isEditing
                ? (Number(editMaterialPrice) || 0) + (Number(editLaborPrice) || 0)
                : item.defaultMaterialPrice + item.defaultLaborPrice;

              return (
                <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-mono font-semibold text-amber-400 whitespace-nowrap">
                    {item.pozNo}
                  </td>

                  <td className="py-3 px-4 text-slate-400 whitespace-nowrap">
                    {item.category}
                  </td>

                  <td className="py-3 px-4">
                    <div className="font-medium text-white">{item.description}</div>
                    {item.brandSuggestion && (
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        Örnek Marka / Standart: {item.brandSuggestion}
                      </div>
                    )}
                  </td>

                  <td className="py-3 px-4 text-center text-slate-400">
                    {item.unit}
                  </td>

                  <td className="py-3 px-4 text-right font-mono tabular-nums">
                    {isEditing ? (
                      <input
                        type="number"
                        value={editMaterialPrice}
                        onChange={(e) => setEditMaterialPrice(Number(e.target.value))}
                        className="w-24 bg-slate-950 border border-slate-700 rounded px-2 py-1 text-right text-white font-mono text-xs"
                      />
                    ) : (
                      formatCurrency(item.defaultMaterialPrice, 'TRY')
                    )}
                  </td>

                  <td className="py-3 px-4 text-right font-mono tabular-nums">
                    {isEditing ? (
                      <input
                        type="number"
                        value={editLaborPrice}
                        onChange={(e) => setEditLaborPrice(Number(e.target.value))}
                        className="w-24 bg-slate-950 border border-slate-700 rounded px-2 py-1 text-right text-white font-mono text-xs"
                      />
                    ) : (
                      formatCurrency(item.defaultLaborPrice, 'TRY')
                    )}
                  </td>

                  <td className="py-3 px-4 text-right font-mono font-bold text-white tabular-nums">
                    {formatCurrency(totalUnitPrice, 'TRY')}
                  </td>

                  <td className="py-3 px-4 text-right whitespace-nowrap">
                    {isEditing ? (
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleSaveEdit(item.id)}
                          className="p-1 text-emerald-400 hover:bg-emerald-400/10 rounded"
                          title="Kaydet"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="p-1 text-slate-400 hover:bg-slate-800 rounded"
                          title="İptal"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleStartEdit(item)}
                          className="p-1 text-slate-400 hover:text-amber-400 hover:bg-slate-800 rounded transition-colors"
                          title="Fiyatı Güncelle"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteItem(item.id)}
                          className="p-1 text-slate-500 hover:text-rose-400 hover:bg-slate-800 rounded transition-colors"
                          title="Sil"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Add New Item Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 text-slate-100">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">Yeni Elektrik Pozu Ekle</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddNewItem} className="space-y-4 pt-4 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Poz Numarası</label>
                <input
                  type="text"
                  value={newPozNo}
                  onChange={(e) => setNewPozNo(e.target.value)}
                  placeholder="Örn: ELK-PN-08"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Kategori</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                >
                  {categories.filter((c) => c !== 'Tümü').map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">İmalat Açıklaması *</label>
                <textarea
                  required
                  rows={2}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Malzeme ve montaj detayını yazınız..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Birim</label>
                  <select
                    value={newUnit}
                    onChange={(e) => setNewUnit(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2 py-2 text-white"
                  >
                    <option value="Metre">Metre</option>
                    <option value="Adet">Adet</option>
                    <option value="Takım">Takım</option>
                    <option value="Set">Set</option>
                    <option value="Adam/Gün">Adam/Gün</option>
                    <option value="Mahal">Mahal</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Malzeme (₺)</label>
                  <input
                    type="number"
                    value={newMaterialPrice}
                    onChange={(e) => setNewMaterialPrice(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono text-right"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">İşçilik (₺)</label>
                  <input
                    type="number"
                    value={newLaborPrice}
                    onChange={(e) => setNewLaborPrice(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono text-right"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Önerilen Marka / Norm</label>
                <input
                  type="text"
                  value={newBrand}
                  onChange={(e) => setNewBrand(e.target.value)}
                  placeholder="Örn: Siemens / Prysmian / EAE"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-slate-400 hover:text-white"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors"
                >
                  Kataloğa Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
