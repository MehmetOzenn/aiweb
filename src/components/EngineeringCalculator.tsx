import React, { useState } from 'react';
import { Calculator, Zap, ArrowRight, ShieldAlert, CheckCircle2, Sliders, Info } from 'lucide-react';
import { formatNumber } from '../utils/storage';

export const EngineeringCalculator: React.FC = () => {
  // Tab 1: Transformer & Power Calculator
  const [installedKw, setInstalledKw] = useState<number>(1800);
  const [diversityFactor, setDiversityFactor] = useState<number>(0.75);
  const [powerFactorCosPhi, setPowerFactorCosPhi] = useState<number>(0.90);

  // Tab 2: Voltage Drop & Cable Sizing
  const [cableLengthMeters, setCableLengthMeters] = useState<number>(120);
  const [loadPowerKw, setLoadPowerKw] = useState<number>(250);
  const [selectedSectionMm2, setSelectedSectionMm2] = useState<number>(150);
  const [circuitType, setCircuitType] = useState<'feeder' | 'lighting'>('feeder');

  // Math for Transformer & Main Breaker
  const demandKw = installedKw * diversityFactor;
  const demandKva = powerFactorCosPhi > 0 ? demandKw / powerFactorCosPhi : 0;

  // Standard transformer tiers
  const standardTransformers = [160, 250, 400, 630, 800, 1000, 1250, 1600, 2000, 2500, 3150];
  const recommendedTransformer =
    standardTransformers.find((t) => t >= demandKva * 1.1) || 3150;

  // Nominal Current: In = S / (sqrt(3) * 400) = demandKva * 1000 / (1.732 * 400) = demandKva * 1.443
  const nominalCurrentAmps = Math.round(demandKva * 1.4434);

  // Recommended Breaker (TMŞ) standard ratings
  const standardBreakers = [250, 400, 630, 800, 1000, 1250, 1600, 2000, 2500, 3200, 4000];
  const recommendedBreaker =
    standardBreakers.find((b) => b >= nominalCurrentAmps * 1.15) || 4000;

  // Math for Voltage Drop
  // Trifaze 400V Bakır (k=56 m / ohm.mm2): %e = (0.0124 * L * P) / S
  // L in meters, P in kW, S in mm2
  const voltageDropPercent =
    selectedSectionMm2 > 0
      ? (0.0124 * cableLengthMeters * loadPowerKw) / selectedSectionMm2
      : 0;

  const maxAllowedDrop = circuitType === 'lighting' ? 1.5 : 3.0;
  const isVoltageDropSafe = voltageDropPercent <= maxAllowedDrop;

  // Recommended compensation calculation (Target cos phi = 0.99)
  // tan(phi1) - tan(phi2)
  const phi1 = Math.acos(Math.min(powerFactorCosPhi, 0.999));
  const phi2 = Math.acos(0.99);
  const requiredKvar = Math.max(0, Math.round(demandKw * (Math.tan(phi1) - Math.tan(phi2))));

  return (
    <div className="space-y-8 pb-16">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Şantiye & Mühendislik Hızlı Hesaplayıcısı
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Müşteri toplantılarında ve şantiye ön keşiflerinde anında trafo, kablo kesiti ve kompanzasyon boyutlandırması yapın.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Module 1: Transformer & Main Switchgear Sizing */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
          <div className="flex items-center gap-2 text-amber-400 border-b border-slate-800 pb-3">
            <Zap className="w-5 h-5 fill-amber-400" />
            <h2 className="text-base font-bold text-white">
              01. Trafo & Ana Şalter Güç Boyutlandırması
            </h2>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Toplam Kurulu Güç (P kurulu)</span>
                <span className="font-mono font-bold text-white">{formatNumber(installedKw)} kW</span>
              </div>
              <input
                type="range"
                min="50"
                max="5000"
                step="50"
                value={installedKw}
                onChange={(e) => setInstalledKw(Number(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Eşzamanlılık Katsayısı (Diversite Ke)</span>
                <span className="font-mono font-bold text-white">{diversityFactor}</span>
              </div>
              <input
                type="range"
                min="0.30"
                max="1.0"
                step="0.05"
                value={diversityFactor}
                onChange={(e) => setDiversityFactor(Number(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer"
              />
              <span className="text-[10px] text-slate-500">
                Konut için ~0.60, Sanayi için ~0.75-0.85, Hastane/Veri Merkezi için ~0.90
              </span>
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Tesis Güç Faktörü (Cos φ)</span>
                <span className="font-mono font-bold text-white">{powerFactorCosPhi}</span>
              </div>
              <input
                type="range"
                min="0.70"
                max="0.99"
                step="0.02"
                value={powerFactorCosPhi}
                onChange={(e) => setPowerFactorCosPhi(Number(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer"
              />
            </div>
          </div>

          {/* Results Box */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3 font-mono text-xs">
            <div className="flex justify-between text-slate-400">
              <span className="font-sans">Hesaplanan Talep Gücü (P talep):</span>
              <span className="text-white font-bold">{Math.round(demandKw)} kW</span>
            </div>

            <div className="flex justify-between text-slate-400">
              <span className="font-sans">Görünür Güç İhtiyacı (S):</span>
              <span className="text-amber-400 font-bold">{Math.round(demandKva)} kVA</span>
            </div>

            <div className="flex justify-between text-slate-400">
              <span className="font-sans">Nominal Hat Akımı (In):</span>
              <span className="text-white font-bold">{nominalCurrentAmps} A</span>
            </div>

            <div className="pt-2 border-t border-slate-800 flex justify-between items-center">
              <span className="font-sans font-semibold text-slate-200">Önerilen Dağıtım Trafosu:</span>
              <span className="text-sm font-extrabold text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded">
                {recommendedTransformer} kVA Trafo
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="font-sans font-semibold text-slate-200">Önerilen Ana Şalter (TMŞ):</span>
              <span className="text-sm font-bold text-white bg-slate-800 px-2.5 py-1 rounded">
                {recommendedBreaker} Amper
              </span>
            </div>

            <div className="flex justify-between items-center text-slate-400">
              <span className="font-sans text-[11px]">Reaktif Ceza Önleyici Kompanzasyon (Qc):</span>
              <span className="text-emerald-400 font-semibold">{requiredKvar} kVAr</span>
            </div>
          </div>
        </div>

        {/* Module 2: Voltage Drop & Cable Sizing */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
          <div className="flex items-center gap-2 text-amber-400 border-b border-slate-800 pb-3">
            <Calculator className="w-5 h-5" />
            <h2 className="text-base font-bold text-white">
              02. Trifaze Kablo Kesiti & Gerilim Düşümü (%e)
            </h2>
          </div>

          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 mb-1">Hat Mesafesi (L Metre)</label>
                <input
                  type="number"
                  min="5"
                  max="1000"
                  value={cableLengthMeters}
                  onChange={(e) => setCableLengthMeters(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Taşınan Güç (P kW)</label>
                <input
                  type="number"
                  min="1"
                  max="2000"
                  value={loadPowerKw}
                  onChange={(e) => setLoadPowerKw(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 mb-1">Bakır İletken Kesiti (S mm²)</label>
                <select
                  value={selectedSectionMm2}
                  onChange={(e) => setSelectedSectionMm2(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono focus:outline-none focus:border-amber-400"
                >
                  {[2.5, 4, 6, 10, 16, 25, 35, 50, 70, 95, 120, 150, 185, 240, 300].map((s) => (
                    <option key={s} value={s}>
                      {s} mm² Bakır (Cu)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Devre Standardı</label>
                <select
                  value={circuitType}
                  onChange={(e) => setCircuitType(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="feeder">Ana Besleme / Motor (Max %3.0)</option>
                  <option value="lighting">Aydınlatma Linyesi (Max %1.5)</option>
                </select>
              </div>
            </div>

            <div className="text-[11px] text-slate-500 bg-slate-950 p-2.5 rounded border border-slate-800/80">
              Formül: %e = (100 × L × P) / (k × S × U²) = (0.0124 × L × P) / S (Elektrik İç Tesisleri Yönetmeliği)
            </div>
          </div>

          {/* Results Box */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3 font-mono text-xs">
            <div className="flex justify-between items-center">
              <span className="font-sans text-slate-300">Hesaplanan Gerilim Düşümü (%e):</span>
              <span className={`text-xl font-extrabold ${isVoltageDropSafe ? 'text-emerald-400' : 'text-rose-400'}`}>
                %{voltageDropPercent.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between text-slate-400">
              <span className="font-sans">Yönetmelik İzin Verilen Limit:</span>
              <span>%{maxAllowedDrop.toFixed(1)}</span>
            </div>

            <div className="pt-2 border-t border-slate-800">
              {isVoltageDropSafe ? (
                <div className="flex items-center gap-2 text-emerald-400 font-sans font-semibold">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Kesit Yönetmeliğe Uygundur. Gerilim düşümü emniyetli sınırlar içerisindedir.</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-rose-400 font-sans font-semibold">
                  <ShieldAlert className="w-4 h-4 shrink-0" />
                  <span>Yetersiz Kesit! Gerilim düşümü sınırı aşıldı. Lütfen bir üst kablo kesiti seçiniz.</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
