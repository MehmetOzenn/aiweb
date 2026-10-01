import React from 'react';
import { Proposal, CompanyProfile } from '../types';
import { calculateProposalSummary, formatCurrency } from '../utils/storage';
import { ArrowLeft, Printer, Download, CheckCircle, ShieldCheck } from 'lucide-react';

interface ProposalPrintViewProps {
  proposal: Proposal;
  company: CompanyProfile;
  onBack: () => void;
  onEdit: () => void;
}

export const ProposalPrintView: React.FC<ProposalPrintViewProps> = ({
  proposal,
  company,
  onBack,
  onEdit,
}) => {
  const summary = calculateProposalSummary(proposal);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Non-print Top Controls Bar */}
      <div className="flex items-center justify-between p-4 bg-slate-900 border border-slate-800 rounded-xl no-print">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Teklif Listesine Dön</span>
          </button>
          <span className="text-xs text-slate-400">
            Resmi Teklif Mektubu Önizlemesi ({proposal.proposalNo})
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onEdit}
            className="px-3.5 py-1.5 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors"
          >
            Düzenle
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors shadow-sm"
          >
            <Printer className="w-4 h-4" />
            <span>Yazdır / PDF Olarak Kaydet</span>
          </button>
        </div>
      </div>

      {/* Official Printable Proposal Sheet (A4 format with pristine corporate styling) */}
      <div className="mx-auto max-w-4xl bg-white text-slate-900 p-8 sm:p-12 rounded-xl shadow-2xl border border-slate-200 print:border-none print:shadow-none print:p-0 print:m-0 font-sans">
        {/* Antetli Header / Company Letterhead */}
        <div className="flex flex-col sm:flex-row justify-between items-start border-b-2 border-slate-900 pb-6 gap-6">
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950">
              {company.name}
            </div>
            <div className="text-xs font-semibold text-amber-700 tracking-wider uppercase mt-0.5">
              {company.tagline}
            </div>
            <div className="text-[11px] text-slate-600 mt-2 space-y-0.5">
              <div>{company.tradeTitle}</div>
              <div>{company.address}</div>
              <div>Tel: {company.phone} · E-Posta: {company.email}</div>
              <div>{company.taxOffice} - V.No: {company.taxNo}</div>
            </div>
          </div>

          <div className="sm:text-right shrink-0 text-xs text-slate-600 space-y-1">
            <div className="inline-block bg-slate-100 border border-slate-300 px-3 py-1 rounded text-slate-900 font-mono font-bold text-sm">
              TEKLİF NO: {proposal.proposalNo}
            </div>
            <div className="mt-2">Düzenleme Tarihi: <strong className="text-slate-900 font-mono">{proposal.createdAt}</strong></div>
            <div>Geçerlilik Tarihi: <strong className="text-slate-900 font-mono">{proposal.validUntil}</strong></div>
            <div>Öngörülen İmalat: <strong className="text-slate-900">{proposal.estimatedDuration}</strong></div>
            <div className="text-[11px] text-slate-500">Para Birimi: {proposal.currency} (Türk Lirası)</div>
          </div>
        </div>

        {/* Client & Project Destination Box */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-6 p-4 rounded-lg bg-slate-50 border border-slate-200 text-xs">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
              Sayın / İşveren Bilgileri
            </div>
            <div className="text-sm font-bold text-slate-900">{proposal.client.company}</div>
            <div className="text-slate-700 font-medium mt-0.5">İlgili: {proposal.client.name}</div>
            <div className="text-slate-600 mt-1">{proposal.client.address}</div>
            <div className="text-slate-600">Tel: {proposal.client.phone} · {proposal.client.email}</div>
            {proposal.client.taxOffice && (
              <div className="text-slate-500 text-[10px] mt-0.5">
                {proposal.client.taxOffice} / {proposal.client.taxNumber}
              </div>
            )}
          </div>

          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
              İşin Tanımı ve Şantiye Yeri
            </div>
            <div className="text-sm font-bold text-slate-900">{proposal.title}</div>
            <div className="text-slate-700 mt-0.5">Kategori: {proposal.projectCategory}</div>
            <div className="text-slate-600 mt-1">Uygulama Yeri: {proposal.projectLocation}</div>
            <div className="text-slate-500 text-[11px] mt-1">
              Bu teklif mektubu, belirtilen mahaldeki alçak gerilim, zayıf akım ve mühendislik imalatlarını kapsamaktadır.
            </div>
          </div>
        </div>

        {/* Keşif & Metraj İmalat Cetveli */}
        <div className="my-6">
          <div className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
            İnşaat Elektrik İmalat Keşif Cetveli ve Birim Fiyat Tablosu
          </div>

          <table className="w-full text-left text-xs border border-slate-300">
            <thead className="bg-slate-100 text-slate-800 font-semibold border-b border-slate-300">
              <tr>
                <th className="p-2 border-r border-slate-300 text-center w-8">#</th>
                <th className="p-2 border-r border-slate-300 w-24">Poz No</th>
                <th className="p-2 border-r border-slate-300">İmalat Açıklaması</th>
                <th className="p-2 border-r border-slate-300 text-center w-16">Birim</th>
                <th className="p-2 border-r border-slate-300 text-right w-16">Miktar</th>
                <th className="p-2 border-r border-slate-300 text-right w-24">Malzeme (₺)</th>
                <th className="p-2 border-r border-slate-300 text-right w-24">İşçilik (₺)</th>
                <th className="p-2 text-right w-28">Toplam (₺)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {proposal.items.map((item, idx) => {
                const rowTotal = (item.quantity || 0) * ((item.unitMaterialPrice || 0) + (item.unitLaborPrice || 0));

                return (
                  <tr key={item.id} className={idx % 2 === 1 ? 'bg-slate-50/70' : 'bg-white'}>
                    <td className="p-2 border-r border-slate-200 text-center text-slate-500 font-mono text-[11px]">
                      {idx + 1}
                    </td>
                    <td className="p-2 border-r border-slate-200 font-mono text-slate-700 text-[11px]">
                      {item.pozNo || '-'}
                    </td>
                    <td className="p-2 border-r border-slate-200">
                      <div className="font-semibold text-slate-900">{item.description}</div>
                      {item.notes && (
                        <div className="text-[10px] text-slate-500 italic mt-0.5">{item.notes}</div>
                      )}
                    </td>
                    <td className="p-2 border-r border-slate-200 text-center text-slate-600">
                      {item.unit}
                    </td>
                    <td className="p-2 border-r border-slate-200 text-right font-mono tabular-nums">
                      {item.quantity}
                    </td>
                    <td className="p-2 border-r border-slate-200 text-right font-mono tabular-nums text-slate-700">
                      {formatCurrency(item.unitMaterialPrice, proposal.currency)}
                    </td>
                    <td className="p-2 border-r border-slate-200 text-right font-mono tabular-nums text-slate-700">
                      {formatCurrency(item.unitLaborPrice, proposal.currency)}
                    </td>
                    <td className="p-2 text-right font-mono tabular-nums font-bold text-slate-900">
                      {formatCurrency(rowTotal, proposal.currency)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mali Özet & Toplam Cetveli */}
        <div className="flex justify-end my-6">
          <div className="w-full sm:w-80 border border-slate-300 rounded bg-slate-50 p-4 text-xs space-y-2 font-mono tabular-nums">
            <div className="flex justify-between py-0.5 text-slate-700">
              <span className="font-sans">Malzeme Toplamı:</span>
              <span>{formatCurrency(summary.totalMaterial, proposal.currency)}</span>
            </div>
            <div className="flex justify-between py-0.5 text-slate-700">
              <span className="font-sans">Montaj & İşçilik Toplamı:</span>
              <span>{formatCurrency(summary.totalLabor, proposal.currency)}</span>
            </div>
            <div className="flex justify-between py-0.5 font-bold text-slate-900 border-t border-slate-300 pt-1">
              <span className="font-sans">Ara Toplam:</span>
              <span>{formatCurrency(summary.subtotal, proposal.currency)}</span>
            </div>

            {proposal.discountPercent > 0 && (
              <div className="flex justify-between py-0.5 text-amber-800">
                <span className="font-sans">İskonto (%{proposal.discountPercent}):</span>
                <span>-{formatCurrency(summary.discountAmount, proposal.currency)}</span>
              </div>
            )}

            <div className="flex justify-between py-0.5 text-slate-700">
              <span className="font-sans">KDV Matrahı:</span>
              <span>{formatCurrency(summary.netAfterDiscount, proposal.currency)}</span>
            </div>

            <div className="flex justify-between py-0.5 text-slate-700">
              <span className="font-sans">KDV Tutarı (%{proposal.taxPercent}):</span>
              <span>+{formatCurrency(summary.taxAmount, proposal.currency)}</span>
            </div>

            <div className="flex justify-between pt-2 border-t-2 border-slate-900 text-sm font-extrabold text-slate-950">
              <span className="font-sans">GENEL TOPLAM:</span>
              <span className="text-amber-800">{formatCurrency(summary.grandTotal, proposal.currency)}</span>
            </div>
          </div>
        </div>

        {/* Conditions & Terms */}
        <div className="my-6 space-y-4 text-xs text-slate-700 border-t border-slate-300 pt-4 print-break-inside-avoid">
          <div>
            <div className="font-bold text-slate-900 uppercase tracking-wider mb-1.5">
              1. Ödeme Planı ve Vade Koşulları
            </div>
            <ul className="list-disc pl-5 space-y-1">
              {proposal.paymentTerms.map((term, tIdx) => (
                <li key={tIdx}>{term}</li>
              ))}
            </ul>
          </div>

          <div>
            <div className="font-bold text-slate-900 uppercase tracking-wider mb-1.5">
              2. Teknik Şartname & Kalite Güvencesi
            </div>
            <ul className="list-disc pl-5 space-y-1">
              {proposal.generalConditions.map((cond, cIdx) => (
                <li key={cIdx}>{cond}</li>
              ))}
            </ul>
          </div>

          <div>
            <div className="font-bold text-slate-900 uppercase tracking-wider mb-1">
              3. Garanti & Servis Taahhüdü
            </div>
            <p>{proposal.warrantyTerms}</p>
          </div>

          <div className="p-3 bg-slate-100 rounded border border-slate-200 text-[11px] text-slate-600">
            <strong>Banka Hesap Bilgileri:</strong> {company.bankInfo.bankName} - {company.bankInfo.branch} · 
            IBAN (TRY): <span className="font-mono font-bold text-slate-900">{company.bankInfo.ibanTry}</span>
          </div>
        </div>

        {/* Signatures & Seal Box */}
        <div className="grid grid-cols-2 gap-8 pt-8 mt-6 border-t-2 border-slate-900 print-break-inside-avoid text-xs">
          <div className="space-y-12">
            <div>
              <div className="font-bold text-slate-900 uppercase">Teklifi Veren Yüklenici</div>
              <div className="font-medium text-slate-700">{company.tradeTitle}</div>
            </div>
            <div className="border-t border-slate-400 pt-2 text-[11px] text-slate-600">
              <div>Yetkili: {proposal.authorizedPerson.name}</div>
              <div>Ünvan: {proposal.authorizedPerson.title}</div>
              <div className="text-slate-400 italic mt-3">[Kaşe & İmza]</div>
            </div>
          </div>

          <div className="space-y-12 text-right">
            <div>
              <div className="font-bold text-slate-900 uppercase">Teklifi Onaylayan İşveren</div>
              <div className="font-medium text-slate-700">{proposal.client.company}</div>
            </div>
            <div className="border-t border-slate-400 pt-2 text-[11px] text-slate-600">
              <div>Yetkili İsim / Soyisim: ___________________________</div>
              <div>Onay Tarihi: _____ / _____ / 2026</div>
              <div className="text-slate-400 italic mt-3">[Kaşe & İmza]</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
