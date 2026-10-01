import React, { useState } from 'react';
import { Project, ProjectCategory } from '../types';
import { X, Plus, Upload, Building, Check } from 'lucide-react';

interface NewProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProject: (newProject: Project) => void;
}

export const NewProjectModal: React.FC<NewProjectModalProps> = ({
  isOpen,
  onClose,
  onAddProject,
}) => {
  const [title, setTitle] = useState('');
  const [clientName, setClientName] = useState('');
  const [category, setCategory] = useState<Project['category']>('Konut & Rezidans');
  const [location, setLocation] = useState('');
  const [squareMeters, setSquareMeters] = useState<number>(15000);
  const [installedPowerKva, setInstalledPowerKva] = useState<number>(1250);
  const [durationMonths, setDurationMonths] = useState<number>(8);
  const [completionYear, setCompletionYear] = useState<number>(2026);
  const [summary, setSummary] = useState('');
  const [fullDescription, setFullDescription] = useState('');
  const [scopeTagsInput, setScopeTagsInput] = useState('AG Dağıtım Panoları, N2XH Kablolama, Aydınlatma Otomasyonu, Yangın Algılama');
  const [selectedImage, setSelectedImage] = useState('/src/assets/images/hero_electrical_contractor_1790847506737.jpg');
  const [status, setStatus] = useState<'Tamamlandı' | 'Devam Ediyor'>('Tamamlandı');

  if (!isOpen) return null;

  const sampleImages = [
    { label: 'Şalt & Pano Merkezi', url: '/src/assets/images/hero_electrical_contractor_1790847506737.jpg' },
    { label: 'Endüstriyel Fabrika', url: '/src/assets/images/project_industrial_plant_1790847517720.jpg' },
    { label: 'Ticari & Mimari Aydınlatma', url: '/src/assets/images/project_commercial_center_1790847528531.jpg' },
    { label: 'Hastane & Kritik Altyapı', url: '/src/assets/images/project_hospital_infrastructure_1790847539331.jpg' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const tags = scopeTagsInput
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const newProject: Project = {
      id: `proj-${Date.now()}`,
      title: title.trim(),
      clientName: clientName.trim() || 'Gizli İşveren',
      category,
      location: location.trim() || 'İstanbul',
      completionYear,
      durationMonths,
      squareMeters: Number(squareMeters) || 1000,
      installedPowerKva: Number(installedPowerKva) || 500,
      scopeTags: tags.length > 0 ? tags : ['AG Dağıtım', 'Kablolama'],
      summary: summary.trim() || `${title} elektrik taahhüt ve altyapı işleri başarıyla tamamlanmıştır.`,
      fullDescription: fullDescription.trim() || `${title} projesinde alçak gerilim ve zayıf akım sistemleri teknik şartnameye uygun olarak teslim edilmiştir.`,
      imageUrl: selectedImage,
      technicalSpecs: [
        { label: 'Kurulu Trafo Gücü', value: `${installedPowerKva} kVA` },
        { label: 'Kablo Standardı', value: 'Halogen Free N2XH TSE' },
        { label: 'Şalt Ekipmanları', value: 'Tip Testli Form 3b / Form 4' },
      ],
      keyHighlights: [
        'Şantiye teslimi iş programına uygun olarak gerçekleştirildi',
        'TEDAŞ ve EDAŞ kabul tutanakları eksiksiz onaylandı',
      ],
      status,
    };

    onAddProject(newProject);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 text-slate-100 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <h2 className="text-xl font-bold text-white">Yeni Portfolyo Projesi Ekle</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Müşterilerinize sunmak istediğiniz referans projenin teknik bilgilerini girin.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 pt-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-slate-300 mb-1">Proje Adı *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Örn: Sky Garden Rezidans Elektrik İşleri"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-300 mb-1">İşveren / Müteahhit Firma</label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Örn: Emlak Konut / Rönesans İnşaat"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-medium text-slate-300 mb-1">Kategori</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
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
              <label className="block font-medium text-slate-300 mb-1">Şehir / Lokasyon</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Örn: Kadıköy, İstanbul"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-300 mb-1">Proje Durumu</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-400"
              >
                <option value="Tamamlandı">Tamamlandı</option>
                <option value="Devam Ediyor">Devam Ediyor</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <label className="block font-medium text-slate-300 mb-1">Kapalı Alan (m²)</label>
              <input
                type="number"
                value={squareMeters}
                onChange={(e) => setSquareMeters(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono focus:outline-none focus:border-amber-400"
              />
            </div>
            <div>
              <label className="block font-medium text-slate-300 mb-1">Kurulu Güç (kVA)</label>
              <input
                type="number"
                value={installedPowerKva}
                onChange={(e) => setInstalledPowerKva(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono focus:outline-none focus:border-amber-400"
              />
            </div>
            <div>
              <label className="block font-medium text-slate-300 mb-1">Süre (Ay)</label>
              <input
                type="number"
                value={durationMonths}
                onChange={(e) => setDurationMonths(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono focus:outline-none focus:border-amber-400"
              />
            </div>
            <div>
              <label className="block font-medium text-slate-300 mb-1">Tamamlanma Yılı</label>
              <input
                type="number"
                value={completionYear}
                onChange={(e) => setCompletionYear(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium text-slate-300 mb-1">
              Taahhüt Kapsamındaki Sistemler (Virgülle Ayırın)
            </label>
            <input
              type="text"
              value={scopeTagsInput}
              onChange={(e) => setScopeTagsInput(e.target.value)}
              placeholder="AG Pano, Busbar, Yangın Algılama, Jeneratör Senkron, CCTV"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="block font-medium text-slate-300 mb-1">Kısa Özet</label>
            <textarea
              rows={2}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Projenin ana kapsamını ve müşteriye sağlanan katma değeri özetleyin..."
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="block font-medium text-slate-300 mb-1">Görsel Seçimi</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {sampleImages.map((img, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedImage(img.url)}
                  className={`relative cursor-pointer rounded-lg overflow-hidden border transition-all ${
                    selectedImage === img.url
                      ? 'border-amber-400 ring-2 ring-amber-400/40'
                      : 'border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <img src={img.url} alt={img.label} className="w-full h-16 object-cover" />
                  <div className="p-1 text-[10px] text-center text-slate-300 truncate bg-slate-950/80">
                    {img.label}
                  </div>
                  {selectedImage === img.url && (
                    <div className="absolute top-1 right-1 bg-amber-400 text-slate-950 rounded-full p-0.5">
                      <Check className="w-3 h-3" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-slate-400 hover:text-white transition-colors"
            >
              İptal
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-slate-950 font-semibold bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors shadow-sm"
            >
              Projeyi Portfolyoya Kaydet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
