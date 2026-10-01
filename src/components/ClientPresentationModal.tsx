import React, { useState, useEffect } from 'react';
import { Project } from '../types';
import { X, ChevronLeft, ChevronRight, MapPin, Gauge, Shield, Award, Sparkles, FileText } from 'lucide-react';
import { formatNumber } from '../utils/storage';

interface ClientPresentationModalProps {
  projects: Project[];
  initialIndex?: number;
  isOpen: boolean;
  onClose: () => void;
  onCreateProposal: (project: Project) => void;
}

export const ClientPresentationModal: React.FC<ClientPresentationModalProps> = ({
  projects,
  initialIndex = 0,
  isOpen,
  onClose,
  onCreateProposal,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'ArrowRight') {
        setCurrentIndex((prev) => (prev + 1) % projects.length);
      } else if (e.key === 'ArrowLeft') {
        setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, projects.length, onClose]);

  if (!isOpen || projects.length === 0) return null;

  const currentProject = projects[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-950 text-white overflow-hidden animate-in fade-in duration-200">
      {/* Top Presentation Bar */}
      <div className="flex h-14 items-center justify-between px-6 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md shrink-0">
        <div className="flex items-center gap-4">
          <span className="text-lg font-bold tracking-tight text-white">ElektroVolt</span>
          <span className="text-slate-600">/</span>
          <span className="text-xs text-slate-400">Müşteri Sunum Modu</span>
          <span className="text-xs font-mono text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded">
            {currentIndex + 1} / {projects.length}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              onClose();
              onCreateProposal(currentProject);
            }}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors shadow-sm"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Bu Projeden Teklif Oluştur</span>
          </button>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            title="Sunumu Kapat (ESC)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Slide Area */}
      <div className="relative flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left Side: Visual Hero Container with subtle gradient scrim */}
        <div className="relative lg:w-3/5 h-64 lg:h-full bg-slate-900 overflow-hidden">
          <img
            src={currentProject.imageUrl}
            alt={currentProject.title}
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-950/30 to-slate-950 hidden lg:block" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent lg:hidden" />

          {/* Floating Category Tag */}
          <div className="absolute top-6 left-6 flex items-center gap-2 bg-slate-950/80 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-slate-800 text-xs font-semibold text-amber-300">
            <span>{currentProject.category}</span>
            <span aria-hidden="true">·</span>
            <span>{currentProject.status}</span>
          </div>
        </div>

        {/* Right Side: Editorial Story & Technical Highlights */}
        <div className="lg:w-2/5 p-6 sm:p-10 lg:p-12 overflow-y-auto flex flex-col justify-between space-y-6 bg-slate-950">
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>{currentProject.location}</span>
                <span aria-hidden="true">·</span>
                <span>{currentProject.clientName}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                {currentProject.title}
              </h2>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              {currentProject.fullDescription}
            </p>

            {/* Quantitative Scale Indicators */}
            <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-slate-900/90 border border-slate-800">
              <div>
                <div className="text-[11px] text-slate-400 uppercase tracking-wider">Kurulu Güç</div>
                <div className="text-xl font-bold text-amber-400 font-mono mt-0.5">
                  {formatNumber(currentProject.installedPowerKva)} kVA
                </div>
              </div>
              <div>
                <div className="text-[11px] text-slate-400 uppercase tracking-wider">Kapalı Alan</div>
                <div className="text-xl font-bold text-white font-mono mt-0.5">
                  {formatNumber(currentProject.squareMeters)} m²
                </div>
              </div>
              <div>
                <div className="text-[11px] text-slate-400 uppercase tracking-wider">Şantiye Teslim</div>
                <div className="text-xl font-bold text-white mt-0.5">
                  {currentProject.durationMonths} Ay
                </div>
              </div>
            </div>

            {/* Scope Elements */}
            <div className="space-y-2.5">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Taahhüt Kapsamındaki Sistemler
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                {currentProject.scopeTags.map((tag, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-slate-900/60 p-2 rounded-lg border border-slate-800/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                    <span className="truncate">{tag}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Client Testimonial Proof */}
            {currentProject.clientTestimonial && (
              <div className="p-4 rounded-xl bg-slate-900 border-l-2 border-amber-400 space-y-2">
                <p className="text-xs text-slate-300 italic leading-relaxed">
                  "{currentProject.clientTestimonial.quote}"
                </p>
                <div className="text-[11px] text-slate-400">
                  <span className="font-semibold text-white">{currentProject.clientTestimonial.person}</span>
                  <span> · {currentProject.clientTestimonial.company}</span>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Controls in Presentation Mode */}
          <div className="pt-6 border-t border-slate-900 flex items-center justify-between">
            <button
              onClick={handlePrev}
              className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-300 bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors border border-slate-800"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Önceki Proje</span>
            </button>

            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors"
            >
              <span>Sonraki Proje</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Thumbnail Strip */}
      <div className="h-18 px-6 bg-slate-950 border-t border-slate-800/80 flex items-center gap-3 overflow-x-auto scrollbar-none shrink-0 py-2">
        {projects.map((proj, idx) => (
          <button
            key={proj.id}
            onClick={() => setCurrentIndex(idx)}
            className={`flex items-center gap-3 p-1.5 rounded-lg border transition-all shrink-0 ${
              currentIndex === idx
                ? 'bg-slate-900 border-amber-400/80 shadow-md'
                : 'bg-slate-950/60 border-slate-800/60 opacity-60 hover:opacity-100'
            }`}
          >
            <img
              src={proj.imageUrl}
              alt={proj.title}
              className="w-12 h-9 object-cover rounded"
            />
            <div className="text-left text-xs pr-2 hidden sm:block">
              <div className="font-medium text-white truncate max-w-[140px]">{proj.title}</div>
              <div className="text-[10px] text-slate-400">{proj.installedPowerKva} kVA</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
