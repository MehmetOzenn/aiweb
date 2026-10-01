import React, { useState, useMemo } from 'react';
import { Proposal, ProposalStatus } from '../types';
import { calculateProposalSummary, formatCurrency } from '../utils/storage';
import { Search, Plus, FileText, Printer, Edit3, Copy, Trash2, CheckCircle2, Clock, AlertCircle, Check, XCircle } from 'lucide-react';

interface ProposalListProps {
  proposals: Proposal[];
  onNewProposal: () => void;
  onEditProposal: (proposal: Proposal) => void;
  onPrintProposal: (proposal: Proposal) => void;
  onDuplicateProposal: (proposal: Proposal) => void;
  onDeleteProposal: (id: string) => void;
  onChangeStatus: (id: string, newStatus: ProposalStatus) => void;
}

export const ProposalList: React.FC<ProposalListProps> = ({
  proposals,
  onNewProposal,
  onEditProposal,
  onPrintProposal,
  onDuplicateProposal,
  onDeleteProposal,
  onChangeStatus,
}) => {
  const [selectedStatus, setSelectedStatus] = useState<string>('Tümü');
  const [searchQuery, setSearchQuery] = useState('');

  const statusOptions: (ProposalStatus | 'Tümü')[] = [
    'Tümü',
    'Taslak',
    'Müşteriye Sunuldu',
    'Revizyon İstendi',
    'Onaylandı',
    'Reddedildi',
  ];

  // Aggregate Stats
  const stats = useMemo(() => {
    let totalVolume = 0;
    let approvedVolume = 0;
    let approvedCount = 0;
    let pendingCount = 0;

    proposals.forEach((p) => {
      const summary = calculateProposalSummary(p);
      totalVolume += summary.grandTotal;
      if (p.status === 'Onaylandı') {
        approvedVolume += summary.grandTotal;
        approvedCount += 1;
      } else if (p.status === 'Müşteriye Sunuldu' || p.status === 'Revizyon İstendi') {
        pendingCount += 1;
      }
    });

    const winRate = proposals.length > 0 ? Math.round((approvedCount / proposals.length) * 100) : 0;

    return {
      totalVolume,
      approvedVolume,
      approvedCount,
      pendingCount,
      winRate,
      count: proposals.length,
    };
  }, [proposals]);

  const filteredProposals = useMemo(() => {
    return proposals.filter((p) => {
      const matchesStatus = selectedStatus === 'Tümü' || p.status === selectedStatus;
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        p.proposalNo.toLowerCase().includes(q) ||
        p.title.toLowerCase().includes(q) ||
        p.client.company.toLowerCase().includes(q) ||
        p.client.name.toLowerCase().includes(q) ||
        p.projectLocation.toLowerCase().includes(q);

      return matchesStatus && matchesQuery;
    });
  }, [proposals, selectedStatus, searchQuery]);

  const getStatusBadge = (status: ProposalStatus) => {
    switch (status) {
      case 'Onaylandı':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Onaylandı</span>
          </span>
        );
      case 'Müşteriye Sunuldu':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-400">
            <Clock className="w-3.5 h-3.5" />
            <span>Müşteriye Sunuldu</span>
          </span>
        );
      case 'Revizyon İstendi':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-sky-400">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>Revizyon İstendi</span>
          </span>
        );
      case 'Reddedildi':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-rose-400">
            <XCircle className="w-3.5 h-3.5" />
            <span>Reddedildi</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400">
            <Clock className="w-3.5 h-3.5" />
            <span>Taslak</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Top Header & Quick Metrics */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Teklif & Keşif Yönetimi
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            İnşaat elektrik keşif metraj cetvelleri, malzeme-işçilik analizleri ve resmi teklif mektupları.
          </p>
        </div>

        <button
          onClick={onNewProposal}
          className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors shadow-sm self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Yeni Teklif Oluştur</span>
        </button>
      </div>

      {/* Financial Summary Bento Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-5 rounded-2xl bg-slate-900 border border-slate-800">
        <div>
          <div className="text-xs text-slate-400">Toplam Teklif Hacmi</div>
          <div className="text-xl sm:text-2xl font-bold text-white font-mono tabular-nums mt-1">
            {formatCurrency(stats.totalVolume, 'TRY')}
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">{stats.count} Aktif Teklif Kaydı</div>
        </div>

        <div>
          <div className="text-xs text-slate-400">Onaylanan Sözleşmeler</div>
          <div className="text-xl sm:text-2xl font-bold text-emerald-400 font-mono tabular-nums mt-1">
            {formatCurrency(stats.approvedVolume, 'TRY')}
          </div>
          <div className="text-[11px] text-emerald-500/80 mt-0.5">{stats.approvedCount} Proje İmzalandı</div>
        </div>

        <div>
          <div className="text-xs text-slate-400">Değerlendirmedeki Teklifler</div>
          <div className="text-xl sm:text-2xl font-bold text-amber-400 font-mono tabular-nums mt-1">
            {stats.pendingCount} Adet
          </div>
          <div className="text-[11px] text-amber-500/80 mt-0.5">Müşteri Kararı Bekleniyor</div>
        </div>

        <div>
          <div className="text-xs text-slate-400">Kazanma Oranı (Win Rate)</div>
          <div className="text-xl sm:text-2xl font-bold text-white font-mono tabular-nums mt-1">
            %{stats.winRate}
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">Teklif/Sözleşme Dönüşümü</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto p-1 bg-slate-900 border border-slate-800 rounded-xl scrollbar-none">
          {statusOptions.map((st) => {
            const isActive = selectedStatus === st;
            return (
              <button
                key={st}
                onClick={() => setSelectedStatus(st)}
                className={`px-3 py-1.5 text-xs rounded-lg transition-colors whitespace-nowrap ${
                  isActive
                    ? 'bg-amber-400 text-slate-950 font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {st}
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Teklif No, firma veya proje adı ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
          />
        </div>
      </div>

      {/* Proposals High-Density Table */}
      {filteredProposals.length === 0 ? (
        <div className="text-center py-16 px-4 border border-dashed border-slate-800 rounded-2xl bg-slate-900/40 space-y-3">
          <FileText className="w-10 h-10 text-slate-600 mx-auto" />
          <h3 className="text-base font-semibold text-slate-300">Teklif kaydı bulunamadı</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Seçili filtrelere uygun teklif bulunamadı. Yeni bir teklif hazırlayabilir veya filtreleri temizleyebilirsiniz.
          </p>
          <button
            onClick={onNewProposal}
            className="px-4 py-2 text-xs font-semibold text-amber-400 bg-amber-400/10 hover:bg-amber-400/20 rounded-lg transition-colors"
          >
            Hemen Teklif Oluştur
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900 shadow-sm">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-800 bg-slate-950/60 text-slate-400 uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-3.5 px-4">Teklif No & Tarih</th>
                <th className="py-3.5 px-4">Proje / İşveren Bilgisi</th>
                <th className="py-3.5 px-4">Kategori / Lokasyon</th>
                <th className="py-3.5 px-4 text-right">Kalemler</th>
                <th className="py-3.5 px-4 text-right">Toplam Tutar (KDV Dahil)</th>
                <th className="py-3.5 px-4 text-center">Durum</th>
                <th className="py-3.5 px-4 text-right">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70 text-slate-300">
              {filteredProposals.map((proposal) => {
                const summary = calculateProposalSummary(proposal);

                return (
                  <tr
                    key={proposal.id}
                    className="hover:bg-slate-800/40 transition-colors group"
                  >
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="font-mono font-semibold text-white">
                        {proposal.proposalNo}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        {proposal.createdAt} · {proposal.estimatedDuration}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 max-w-xs">
                      <div className="font-semibold text-white group-hover:text-amber-400 transition-colors truncate">
                        {proposal.title}
                      </div>
                      <div className="text-[11px] text-slate-400 truncate mt-0.5">
                        {proposal.client.company} ({proposal.client.name})
                      </div>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="text-slate-300">{proposal.projectCategory}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5 truncate max-w-[150px]">
                        {proposal.projectLocation}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-right font-mono tabular-nums text-slate-400 whitespace-nowrap">
                      {proposal.items.length} Poz
                    </td>

                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="font-bold text-white font-mono tabular-nums text-sm">
                        {formatCurrency(summary.grandTotal, proposal.currency)}
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono tabular-nums">
                        Matrah: {formatCurrency(summary.netAfterDiscount, proposal.currency)}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      <div className="inline-block">
                        <select
                          value={proposal.status}
                          onChange={(e) => onChangeStatus(proposal.id, e.target.value as ProposalStatus)}
                          className="bg-slate-950 border border-slate-700/80 rounded-md px-2 py-1 text-xs text-slate-200 focus:outline-none focus:border-amber-400 cursor-pointer"
                        >
                          <option value="Taslak">Taslak</option>
                          <option value="Müşteriye Sunuldu">Müşteriye Sunuldu</option>
                          <option value="Revizyon İstendi">Revizyon İstendi</option>
                          <option value="Onaylandı">Onaylandı</option>
                          <option value="Reddedildi">Reddedildi</option>
                        </select>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => onPrintProposal(proposal)}
                          className="p-1.5 text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 rounded-md transition-colors"
                          title="Resmi Teklif Mektubunu Görüntüle ve Yazdır / PDF"
                        >
                          <Printer className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => onEditProposal(proposal)}
                          className="p-1.5 text-amber-400 hover:text-amber-300 bg-amber-400/10 hover:bg-amber-400/20 rounded-md transition-colors"
                          title="Keşif Cetvelini Düzenle"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => onDuplicateProposal(proposal)}
                          className="p-1.5 text-slate-400 hover:text-slate-200 bg-slate-800/80 hover:bg-slate-700 rounded-md transition-colors"
                          title="Teklifi Kopyala (Şablon Olarak Kullan)"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => onDeleteProposal(proposal.id)}
                          className="p-1.5 text-rose-400 hover:text-rose-300 bg-rose-400/10 hover:bg-rose-400/20 rounded-md transition-colors"
                          title="Teklifi Sil"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
