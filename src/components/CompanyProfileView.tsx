import React, { useState } from 'react';
import { CompanyProfile } from '../types';
import { Building2, Save, RotateCcw, ShieldCheck, Award, Phone, Mail, MapPin, CreditCard } from 'lucide-react';
import { formatNumber } from '../utils/storage';

interface CompanyProfileViewProps {
  company: CompanyProfile;
  onSave: (updated: CompanyProfile) => void;
  onResetData: () => void;
}

export const CompanyProfileView: React.FC<CompanyProfileViewProps> = ({
  company,
  onSave,
  onResetData,
}) => {
  const [profile, setProfile] = useState<CompanyProfile>(company);
  const [isSavedNotice, setIsSavedNotice] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(profile);
    setIsSavedNotice(true);
    setTimeout(() => setIsSavedNotice(false), 3000);
  };

  const certifications = [
    { title: 'ISO 9001:2015', desc: 'Kalite Yönetim Sistemi' },
    { title: 'ISO 45001:2018', desc: 'İş Sağlığı ve Güvenliği Yönetim Sistemi' },
    { title: 'ISO 14001:2015', desc: 'Çevre Yönetim Sistemi' },
    { title: 'EMO Tescil Belgesi', desc: 'TMMOB Elektrik Mühendisleri Odası SMM Büro Tescili' },
    { title: 'TSE Hizmet Yeterlilik', desc: 'TS 12540 Elektrik Tesisatı Hizmet Yeterlilik' },
    { title: 'TEDAŞ / EDAŞ Yetkisi', desc: '34.5 kV OG Hücre & Trafo Tesis Yetki Belgesi' },
  ];

  return (
    <div className="space-y-8 pb-16 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Kurumsal Firma & Teklif Ayarları
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Teklif formlarında ve sözleşmelerde yer alan antetli firma ve banka bilgileri.
          </p>
        </div>

        {isSavedNotice && (
          <span className="text-xs font-semibold text-emerald-400 bg-emerald-400/10 px-3 py-1.5 rounded-lg border border-emerald-400/30">
            Firma Bilgileri Güncellendi
          </span>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Brand & Trade Info */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
          <div className="font-semibold text-slate-200 text-sm border-b border-slate-800 pb-2">
            Şirket ve Ticari Bilgiler
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-400 mb-1">Marka / Kısa Ad *</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-medium focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Slogan / Faaliyet Alanı</label>
              <input
                type="text"
                value={profile.tagline}
                onChange={(e) => setProfile({ ...profile, tagline: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-400 mb-1">Resmi Ticaret Ünvanı</label>
            <input
              type="text"
              value={profile.tradeTitle}
              onChange={(e) => setProfile({ ...profile, tradeTitle: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-400 mb-1">Vergi Dairesi</label>
              <input
                type="text"
                value={profile.taxOffice}
                onChange={(e) => setProfile({ ...profile, taxOffice: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Vergi Numarası</label>
              <input
                type="text"
                value={profile.taxNo}
                onChange={(e) => setProfile({ ...profile, taxNo: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
          <div className="font-semibold text-slate-200 text-sm border-b border-slate-800 pb-2">
            İletişim ve Adres
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-slate-400 mb-1">Telefon Numarası</label>
              <input
                type="text"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Teklif / İletişim E-Postası</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Web Sitesi</label>
              <input
                type="text"
                value={profile.website}
                onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-400 mb-1">Merkez Ofis Adresi</label>
            <input
              type="text"
              value={profile.address}
              onChange={(e) => setProfile({ ...profile, address: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>

        {/* Bank Account Info for Proposals */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
          <div className="font-semibold text-slate-200 text-sm border-b border-slate-800 pb-2">
            Banka Hesap ve IBAN Bilgileri (Teklif Mektubu İçin)
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-400 mb-1">Banka Adı</label>
              <input
                type="text"
                value={profile.bankInfo.bankName}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    bankInfo: { ...profile.bankInfo, bankName: e.target.value },
                  })
                }
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Şube Adı</label>
              <input
                type="text"
                value={profile.bankInfo.branch}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    bankInfo: { ...profile.bankInfo, branch: e.target.value },
                  })
                }
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-400 mb-1">IBAN (Türk Lirası - TRY)</label>
              <input
                type="text"
                value={profile.bankInfo.ibanTry}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    bankInfo: { ...profile.bankInfo, ibanTry: e.target.value },
                  })
                }
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">IBAN (Döviz - USD/EUR)</label>
              <input
                type="text"
                value={profile.bankInfo.ibanUsd}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    bankInfo: { ...profile.bankInfo, ibanUsd: e.target.value },
                  })
                }
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>
        </div>

        {/* Contractor Certifications & Credentials Grid */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="font-semibold text-slate-200 text-sm border-b border-slate-800 pb-2">
            Müteahhitlik ve Mühendislik Yeterlilik Belgeleri
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {certifications.map((cert, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs space-y-1">
                <div className="flex items-center gap-1.5 text-amber-400 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{cert.title}</span>
                </div>
                <div className="text-slate-400 text-[11px]">{cert.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
          <button
            type="button"
            onClick={onResetData}
            className="flex items-center gap-2 text-xs text-slate-500 hover:text-rose-400 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Tüm Verileri Örnek Duruma Sıfırla</span>
          </button>

          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2.5 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors shadow-sm"
          >
            <Save className="w-4 h-4" />
            <span>Firma Bilgilerini Kaydet</span>
          </button>
        </div>
      </form>
    </div>
  );
};
