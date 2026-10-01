import React, { useState, useMemo } from 'react';
import { Project, ProjectCategory } from '../types';
import { Search, Plus, ArrowUpRight, Zap, Building2, MapPin, Gauge, ShieldCheck, CheckCircle2, SlidersHorizontal } from 'lucide-react';
import { formatNumber } from '../utils/storage';

interface PortfolioShowcaseProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
  onOpenNewProjectModal: () => void;
  onOpenPresentation: (initialIndex?: number) => void;
  onCreateProposalFromProject: (project: Project) => void;
}

export const PortfolioShowcase: React.FC<PortfolioShowcaseProps> = ({
  projects,
  onSelectProject,
  onOpenNewProjectModal,
  onOpenPresentation,
  onCreateProposalFromProject,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('Tümü');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'Tümü' | 'Tamamlandı' | 'Devam Ediyor'>('Tümü');

  const categories: ProjectCategory[] = [
    'Tümü',
    'Konut & Rezidans',
    'Endüstriyel & Fabrika',
    'Ticari & AVM',
    'Sağlık & Hastane',
    'Altyapı & GES',
  ];

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchesCategory = selectedCategory === 'Tümü' || p.category === selectedCategory;
      const matchesStatus = statusFilter === 'Tümü' || p.status === statusFilter;
      const query = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !query ||
        p.title.toLowerCase().includes(query) ||
        p.location.toLowerCase().includes(query) ||
        p.clientName.toLowerCase().includes(query) ||
        p.summary.toLowerCase().includes(query) ||
        p.scopeTags.some((tag) => tag.toLowerCase().includes(query));

      return matchesCategory && matchesStatus && matchesQuery;
    });
  }, [projects, selectedCategory, statusFilter, searchQuery]);

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Banner Section */}
      <section className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80 shadow-2xl">
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/hero_electrical_contractor_1790847506737.jpg"
            alt="Endüstriyel ve Bina Elektrik Altyapısı"
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover object-center opacity-30 mix-blend-luminosity filter contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 p-8 sm:p-12 lg:p-16 max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-amber-400">
            <Zap className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span>Mühendislik & Şantiye Taahhüt Standartları</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Yüksek Gerilimden Zayıf Akıma Güvenilir Elektrik Taahhüdü
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
            Konut kuleleri, ağır sanayi tesisleri, hastaneler ve alışveriş merkezlerinde
            şartnameye tam uygun, zamanında teslim edilen AG/OG şalt, busbar, kompanzasyon
            ve akıllı otomasyon mühendisliği.
          </p>

          {/* Quick Metrics Bar adjacent to claims */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-800/80">
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-white font-mono tabular-nums">248+</div>
              <div className="text-xs text-slate-400 mt-0.5">Tamamlanan Proje</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-amber-400 font-mono tabular-nums">112.000</div>
              <div className="text-xs text-slate-400 mt-0.5">kVA Kurulu Trafo Gücü</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-white font-mono tabular-nums">1.450.000</div>
              <div className="text-xs text-slate-400 mt-0.5">m² Kablolama & Şalt</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-emerald-400 font-mono tabular-nums">%100</div>
              <div className="text-xs text-slate-400 mt-0.5">TEDAŞ Kabul Başarısı</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onOpenPresentation(0)}
              className="px-5 py-2.5 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors flex items-center gap-2 shadow-sm"
            >
              <span>Müşteri Sunum Modunu Başlat</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenNewProjectModal}
              className="px-5 py-2.5 text-xs font-semibold text-slate-200 bg-slate-800/90 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Yeni Portfolyo Projesi Ekle</span>
            </button>
          </div>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Category Tabs (Segmented interactive controls) */}
          <div className="flex items-center gap-1.5 overflow-x-auto p-1 bg-slate-900 border border-slate-800 rounded-xl scrollbar-none">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                    isActive
                      ? 'bg-amber-400 text-slate-950 font-semibold shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search & Status Filter */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="Proje, lokasyon veya kapsam ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>

            <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1 shrink-0">
              {(['Tümü', 'Tamamlandı', 'Devam Ediyor'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-2.5 py-1 text-xs rounded-lg transition-colors whitespace-nowrap ${
                    statusFilter === status
                      ? 'bg-slate-800 text-white font-medium'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Count & Active Filter Indicator */}
        <div className="flex items-center justify-between text-xs text-slate-400 px-1">
          <div className="flex items-center gap-2">
            <span>Toplam <strong className="text-white font-mono">{filteredProjects.length}</strong> proje listeleniyor</span>
            {selectedCategory !== 'Tümü' && (
              <>
                <span aria-hidden="true">·</span>
                <span className="text-amber-400">{selectedCategory}</span>
              </>
            )}
            {searchQuery && (
              <>
                <span aria-hidden="true">·</span>
                <span>Arama: "{searchQuery}"</span>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-16 px-4 border border-dashed border-slate-800 rounded-2xl bg-slate-900/40 space-y-4">
          <Building2 className="w-10 h-10 text-slate-600 mx-auto" />
          <h3 className="text-base font-semibold text-slate-300">Aramanıza uygun proje bulunamadı</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Farklı bir kategori seçebilir veya arama teriminizi değiştirebilirsiniz.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('Tümü');
              setSearchQuery('');
              setStatusFilter('Tümü');
            }}
            className="px-4 py-2 text-xs font-semibold text-amber-400 bg-amber-400/10 hover:bg-amber-400/20 rounded-lg transition-colors"
          >
            Filtreleri Temizle
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, idx) => (
            <article
              key={project.id}
              className="group flex flex-col justify-between rounded-xl border border-slate-800/80 bg-slate-900/60 hover:bg-slate-900 hover:border-slate-700 transition-all duration-200 overflow-hidden shadow-sm"
            >
              <div>
                {/* Project Image Box with measured gradient scrim */}
                <div
                  onClick={() => onSelectProject(project)}
                  className="relative aspect-video w-full overflow-hidden bg-slate-950 cursor-pointer"
                >
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                  {/* Clean unboxed metadata overlay on image with typographic separators */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-slate-300">
                    <span className="font-medium text-white">{project.category}</span>
                    <span className="font-mono text-amber-300 font-semibold">{project.installedPowerKva} kVA</span>
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-5 space-y-3.5">
                  {/* Clean unboxed metadata header */}
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" />
                      <span>{project.location}</span>
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono">{project.squareMeters.toLocaleString('tr-TR')} m²</span>
                    <span aria-hidden="true">·</span>
                    <span>{project.durationMonths} Ay</span>
                  </div>

                  <h3
                    onClick={() => onSelectProject(project)}
                    className="text-base font-bold text-white group-hover:text-amber-400 transition-colors cursor-pointer line-clamp-1"
                  >
                    {project.title}
                  </h3>

                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {project.summary}
                  </p>

                  {/* Scope badges (Clean inline text tags) */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.scopeTags.slice(0, 3).map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[11px] text-slate-300 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700/60"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.scopeTags.length > 3 && (
                      <span className="text-[11px] text-slate-500 self-center">
                        +{project.scopeTags.length - 3} kapsam
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-5 pt-0 mt-3 border-t border-slate-800/60 flex items-center justify-between gap-2">
                <button
                  onClick={() => onSelectProject(project)}
                  className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1 transition-colors py-2"
                >
                  <span>Teknik Detaylar</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => onCreateProposalFromProject(project)}
                  className="px-3 py-1.5 text-[11px] font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-md transition-colors whitespace-nowrap"
                  title="Bu projenin şablonunu kullanarak yeni teklif taslağı hazırla"
                >
                  Teklif Oluştur
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};
