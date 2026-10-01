import React from 'react';
import { Presentation, PlusCircle } from 'lucide-react';

export type ActiveTab = 'portfolio' | 'proposals' | 'catalog' | 'calculator' | 'company';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenPresentation: () => void;
  onNewProposal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenPresentation,
  onNewProposal,
}) => {
  const navItems: { id: ActiveTab; label: string }[] = [
    { id: 'portfolio', label: 'Portfolyo' },
    { id: 'proposals', label: 'Teklifler' },
    { id: 'catalog', label: 'Birim Fiyatlar' },
    { id: 'calculator', label: 'Teknik Hesaplayıcı' },
    { id: 'company', label: 'Kurumsal' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md no-print">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            setActiveTab('portfolio');
          }}
          className="text-xl font-bold tracking-tight text-white hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
        >
          ElektroVolt
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`transition-colors whitespace-nowrap py-1 relative ${
                  isActive
                    ? 'text-amber-400 font-semibold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-400 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenPresentation}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 rounded-lg transition-colors whitespace-nowrap shrink-0"
            title="Müşteri toplantısında tam ekran sunum yapmak için açın"
          >
            <Presentation className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Sunum Modu</span>
          </button>

          <button
            onClick={onNewProposal}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors shadow-sm whitespace-nowrap shrink-0"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Yeni Teklif</span>
          </button>
        </div>
      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="flex md:hidden overflow-x-auto px-4 py-2.5 border-t border-slate-800/60 bg-slate-900/60 gap-4 text-xs font-medium scrollbar-none">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`whitespace-nowrap px-2.5 py-1 rounded-md transition-colors ${
                isActive
                  ? 'bg-amber-400/20 text-amber-300 font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </header>
  );
};
