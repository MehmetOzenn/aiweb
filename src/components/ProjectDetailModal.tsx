import React from 'react';
import { Project } from '../types';
import { X, MapPin, Calendar, Clock, Gauge, Building, CheckCircle2, Quote, FileText, ArrowRight } from 'lucide-react';
import { formatNumber } from '../utils/storage';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
  onCreateProposal: (project: Project) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onCreateProposal,
}) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl text-slate-100 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header Media */}
        <div className="relative aspect-video sm:aspect-[21/9] w-full overflow-hidden bg-slate-950">
          <img
            src={project.imageUrl}
            alt={project.title}
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-950/70 hover:bg-slate-900 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Overlay Title */}
          <div className="absolute bottom-6 left-6 right-6">
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1">
              {project.category} · {project.status}
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {project.title}
            </h2>
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300 mt-2">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>{project.location}</span>
              </span>
              <span aria-hidden="true">·</span>
              <span>İşveren: {project.clientName}</span>
              <span aria-hidden="true">·</span>
              <span>{project.completionYear}</span>
            </div>
          </div>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 sm:p-8 space-y-8 flex-1">
          {/* Key Metrics Banner */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <div>
              <div className="text-xs text-slate-400">Kapalı Alan</div>
              <div className="text-lg font-bold text-white font-mono mt-0.5">
                {formatNumber(project.squareMeters)} m²
              </div>
            </div>
            <div>
              <div className="text-xs text-slate-400">Kurulu Güç</div>
              <div className="text-lg font-bold text-amber-400 font-mono mt-0.5">
                {formatNumber(project.installedPowerKva)} kVA
              </div>
            </div>
            <div>
              <div className="text-xs text-slate-400">Şantiye Süresi</div>
              <div className="text-lg font-bold text-white mt-0.5">
                {project.durationMonths} Ay
              </div>
            </div>
            <div>
              <div className="text-xs text-slate-400">Yaklaşık Bütçe</div>
              <div className="text-lg font-bold text-emerald-400 font-mono mt-0.5">
                {project.budgetRange || 'Teklife Göre'}
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wide">
              Proje Kapsamı ve Uygulama Detayları
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              {project.fullDescription}
            </p>
          </div>

          {/* Technical Specifications Grid */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wide">
              Mühendislik & Şalt Parametreleri
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.technicalSpecs.map((spec, sIdx) => (
                <div
                  key={sIdx}
                  className="flex items-start justify-between p-3 rounded-lg bg-slate-950/40 border border-slate-800/60 text-xs"
                >
                  <span className="text-slate-400 font-medium">{spec.label}</span>
                  <span className="text-slate-200 text-right font-semibold ml-2">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Deliverables / Highlights */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wide">
              Önemli Kazanımlar ve Şantiye Başarıları
            </h3>
            <div className="space-y-2">
              {project.keyHighlights.map((highlight, hIdx) => (
                <div key={hIdx} className="flex items-start gap-2.5 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Client Testimonial if available */}
          {project.clientTestimonial && (
            <div className="p-5 rounded-xl bg-amber-400/5 border border-amber-400/20 space-y-3">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold">
                <Quote className="w-4 h-4" />
                <span>İşveren Referans Görüşü</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed">
                "{project.clientTestimonial.quote}"
              </p>
              <div className="text-xs text-slate-400 pt-1 border-t border-amber-400/10">
                <strong className="text-white">{project.clientTestimonial.person}</strong> · {project.clientTestimonial.role}, {project.clientTestimonial.company}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="p-5 sm:p-6 bg-slate-950/80 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white transition-colors"
          >
            Kapat
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                onClose();
                onCreateProposal(project);
              }}
              className="px-5 py-2.5 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors flex items-center gap-2 shadow-sm"
            >
              <FileText className="w-4 h-4" />
              <span>Bu Projeye Benzer Teklif Hazırla</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
