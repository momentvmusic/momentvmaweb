import React, { useState, useEffect, useRef } from 'react';

// ─── REAL MOMENTVM LOGO (extracted from Brand Book PDF) ──────────────
const MOMENTVM_LOGO_B64 = "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";
const LOGO_SRC = `data:image/png;base64,${MOMENTVM_LOGO_B64}`;

// ─── PHASES DATA ─────────────────────────────────────────────────────
const PHASES = [
  { id: 'phase0', title: 'Fase 0 — Pre-producción', subtitle: '16–10 semanas antes · DRI: Alex',
    steps: [
      { id: 'p0_1', n: 1, title: 'Recibir demo (SoundCloud private link only)',
        desc: 'Único método de recepción. NO email attachments, NO WeTransfer, NO Dropbox.',
        fields: [{ id: 'sc_link', label: 'SoundCloud private link', type: 'url' }] },
      { id: 'p0_2', n: 2, title: 'Evaluar el track',
        desc: '¿Encaja en House / Afro House / Indie Dance? ¿Calidad broadcast-ready? ¿Fit con sound DNA Momentvm?' },
      { id: 'p0_3', n: 3, title: 'Asignar tier',
        desc: 'Default T3. Subir a T2 si roster con momentum. T1 si Sevenkey o colab grande. T1 Deluxe solo en momentos cumbre.' },
      { id: 'p0_4', n: 4, title: 'Enviar Google Form al artista',
        desc: 'Form único con 7 secciones: legal, identidad, track, splits, banking, declaraciones, info adicional.',
        fields: [{ id: 'form_sent_date', label: 'Fecha envío del form', type: 'date' }] },
      { id: 'p0_5', n: 5, title: 'Generar contrato',
        desc: '50/50 sobre el 70% net · Master rights only · 3 años · 2 sem Beatport exclusive.',
        fields: [{ id: 'contract_signed', label: 'Fecha firma del contrato', type: 'date' }] },
      { id: 'p0_6', n: 6, title: 'Sign-off y entrar al pipeline',
        desc: 'Track entra al pipeline. Alex agenda release date al calendario.' }
    ] },
  { id: 'phase1', title: 'Fase 1 — Scouting y Relaciones', subtitle: '12–10 semanas antes · DRI: Alex',
    steps: [
      { id: 'p1_7', n: 7, title: 'Identificar relaciones a activar',
        desc: 'Según tier: ver tabla de activación. T1 Deluxe activa todo + PR pago. T3 solo playlist propia + ads mínimas.' },
      { id: 'p1_8', n: 8, title: 'Email a playlists relacionales',
        desc: 'Template a Felipe / Christian / Mosh con SoundCloud link, contexto, fecha. Sin presión.',
        subTasks: [
          { id: 'sub_felipe', label: 'Felipe contactado' },
          { id: 'sub_christian', label: 'Christian contactado' },
          { id: 'sub_mosh', label: 'Mosh contactado' }
        ] },
      { id: 'p1_9', n: 9, title: 'Contactar influencers',
        desc: 'T1 Deluxe: 5–8 · T1: 3–5 · T2: 1–2 · T3: skip. Brief con audio + sugerencia de momento del track.',
        fields: [{ id: 'influencers_count', label: 'Cuántos influencers contactados', type: 'number' }] },
      { id: 'p1_10', n: 10, title: 'Pitch a media pago (T1 Deluxe only)',
        desc: 'DJ Mag LatAm + 1001 Tracklists + alternar GigMag. Solo T1 Deluxe.',
        tierOnly: ['T1_DELUXE'],
        subTasks: [
          { id: 'sub_djmag', label: 'DJ Mag LatAm pitcheado' },
          { id: 'sub_1001', label: '1001 Tracklists pago contratado' },
          { id: 'sub_gigmag', label: 'GigMag LatAm (alternar)' }
        ] }
    ] },
  { id: 'phase2', title: 'Fase 2 — Setup en Proton', subtitle: '10–8 semanas antes · DRI: Coordinador de Releases',
    steps: [
      { id: 'p2_11', n: 11, title: 'Crear release en Proton',
        desc: 'Metadata completa, master WAV, artwork 3000x3000, splits 50/50 sobre 70% net.',
        fields: [{ id: 'proton_url', label: 'URL del release en Proton', type: 'url' }] },
      { id: 'p2_12', n: 12, title: 'Configurar Beatport exclusive (2 semanas)',
        desc: 'Marcar flag de exclusividad. Confirmar con Proton support. REGLA UNIVERSAL.' },
      { id: 'p2_13', n: 13, title: 'Verificar / activar Beatport Hype',
        desc: 'Si subscription no está activa → activar ($9.99/mes). Verificar elegibilidad <$15K vendidos.' },
      { id: 'p2_14', n: 14, title: 'Configurar pre-order y pre-save',
        desc: 'Beatport pre-order 2 sem antes. Spotify/Apple pre-save vía Release Link de Proton.',
        fields: [{ id: 'release_link', label: 'Release Link unificado de Proton', type: 'url' }] },
      { id: 'p2_15', n: 15, title: 'Configurar Streaming Singles',
        desc: 'Original = release principal. Radio Edit = Streaming Single separado. Extended = bloqueado de Spotify.' },
      { id: 'p2_16', n: 16, title: 'Distribución a stores',
        desc: 'Spotify, Apple, Beatport, YouTube Music, SoundCloud, Deezer, Amazon, Tidal. YouTube Content ID activado.' }
    ] },
  { id: 'phase3', title: 'Fase 3 — Pitching Editorial', subtitle: '8–4 semanas antes · DRI: Alex',
    steps: [
      { id: 'p3_17', n: 17, title: 'Pitch a Spotify Editorial',
        desc: 'Mínimo 7 días antes (recomendado 2–3 sem). 300 caracteres: género + mood + 3–5 playlists + labels comparables.',
        fields: [{ id: 'spotify_pitch', label: 'Texto del pitch (300 chars max)', type: 'textarea' }] },
      { id: 'p3_18', n: 18, title: 'Pitch a Beatport vía Proton',
        desc: 'Material de soporte 3 sem antes: DJ feedback, achievements, story angle. Proton pitchea los lunes 2 sem antes.' },
      { id: 'p3_19', n: 19, title: 'Pitch a Beatport Hype',
        desc: 'Submit a Hype vía form de Proton. Adicional al pitch general. REGLA UNIVERSAL.' },
      { id: 'p3_20', n: 20, title: 'Pitch a Apple Music',
        desc: 'Vía Apple Music for Artists. Targets: Pure Dance, Up Late, Dance XL.' },
      { id: 'p3_21', n: 21, title: 'Submit a 1001 Tracklists pago (T1 Deluxe only)',
        desc: 'Solo T1 Deluxe usa servicio pago. Otros tiers: orgánico únicamente.',
        tierOnly: ['T1_DELUXE'] },
      { id: 'p3_22', n: 22, title: 'SubmitHub / Groover (T2 / T3 only)',
        desc: '$30–80 USD por release. Discount Proton (support@protonradio.com). T1 Deluxe y T1 skip.',
        tierOnly: ['T2', 'T3'] }
    ] },
  { id: 'phase4', title: 'Fase 4 — Pre-release Marketing', subtitle: '4–1 semanas antes · DRI: Alex + Coord. Contenido',
    steps: [
      { id: 'p4_23', n: 23, title: 'Sem -3: Iniciar producción de contenido',
        desc: 'Batch shooting. Primeros 10 TikToks (teasers abstractos), Reel teaser, primer carrusel teaser.' },
      { id: 'p4_24', n: 24, title: 'Sem -2: Stories ciclo 1 + más TikToks',
        desc: 'Snippet + pre-save. 12 TikToks adicionales. Primer ad activo en TikTok Spark + Meta. Newsletter pre-release.' },
      { id: 'p4_25', n: 25, title: 'Sem -1: Cover reveal + countdown',
        desc: 'Stories ciclo 2 (countdown + reveal). 12 TikToks adicionales. Spotify Canvas listo. Re-confirmar red.' },
      { id: 'p4_26', n: 26, title: 'Día -2: Final check assets',
        desc: 'Verificar content programado. Reels release-day en cola. Push final a influencers.' },
      { id: 'p4_27', n: 27, title: 'Activar ads pagadas',
        desc: 'T1D: $400–800 · T1: $200–400 · T2: $80–150 · T3: $30–80. Creatives = mejores TikToks performando.',
        fields: [{ id: 'ads_budget', label: 'Budget de ads asignado (USD)', type: 'number' }] }
    ] },
  { id: 'phase5', title: 'Fase 5 — Sync Licensing', subtitle: 'Paralelo a Fases 2–4 · DRI: Alex',
    steps: [
      { id: 'p5_28', n: 28, title: 'Submit a libraries de sync',
        desc: 'T1D vocal: Musicbed + Marmoset · T1 instrumental: Bodega Sync + Marmoset · T2: Artlist · T3: skip salvo potencial obvio.' },
      { id: 'p5_29', n: 29, title: 'Tagging completo',
        desc: 'Mood, context, technical tags. Crítico para que supervisores encuentren el track.' },
      { id: 'p5_30', n: 30, title: 'Default: non-exclusivo',
        desc: 'Track puede licenciarse en múltiples libraries. Solo exclusivo si library top ofrece premium.' }
    ] },
  { id: 'phase6', title: 'Fase 6 — Release Week', subtitle: 'Semana 0 · DRI: Alex coordina',
    steps: [
      { id: 'p6_31', n: 31, title: 'Día -1: Push final a la red',
        desc: 'Re-confirmación influencers, Felipe/Christian/Mosh. Newsletter pre-release. Stories countdown final.' },
      { id: 'p6_32', n: 32, title: '00:00 UTC: Release goes live',
        desc: 'Track en todas las plataformas. Spotify aplica pitch. Verificar Beatport exclusivity flag.' },
      { id: 'p6_33', n: 33, title: '08:00 UTC: Primera revisión',
        desc: 'Songstats. Verificar track en todas plataformas. 8 TikToks programados para release day.' },
      { id: 'p6_34', n: 34, title: '14:00 UTC: Posts principales',
        desc: 'IG carrusel release-day + Reel out-now + Stories Out Now. Spotify Artist Pick + Apple actualizados.' },
      { id: 'p6_35', n: 35, title: '18:00 UTC: TikTok + YouTube + SoundCloud',
        desc: 'TikTok videos del día. YouTube video o Short. SoundCloud upload. Ads creatives swap a "Out Now".' },
      { id: 'p6_36', n: 36, title: '20:00 UTC: Activar red',
        desc: 'Push a influencers. Felipe/Christian/Mosh confirman adds. Playlist Momentvm añade el track.' },
      { id: 'p6_37', n: 37, title: '+24h: Primera revisión de tracción',
        desc: 'Songstats: chart, streams. Beatport: posición + ventas. Aplicar tabla KPIs y disparadores.' }
    ] },
  { id: 'phase7', title: 'Fase 7 — Post-release Momentum', subtitle: 'Semanas 1–8 post · DRI: Alex',
    steps: [
      { id: 'p7_38', n: 38, title: 'Continuar producción de TikToks (sem +1 a +3)',
        desc: '20 TikToks adicionales: snippets, fan reactions, DJ feedback, BTS, recap.' },
      { id: 'p7_39', n: 39, title: 'Reactivar según disparadores',
        desc: 'Aplicar tabla de Disparadores y Acciones. Cualquier evento positivo → reaccionar dentro de 2 horas.' },
      { id: 'p7_40', n: 40, title: 'Producir DJ mix mensual',
        desc: '60 min, 60–80% catálogo Momentvm + 20–40% complementos. Subir a Spotify, Apple, SoundCloud vía Proton.' },
      { id: 'p7_41', n: 41, title: 'Re-pitch a curators que dijeron "next time"',
        desc: '4–6 sem post: re-confirmar con tracción acumulada (Songstats screenshots, charts).' },
      { id: 'p7_42', n: 42, title: 'Decidir paid promotion adicional',
        desc: 'Crece orgánicamente → Discovery Mode. T1D con presupuesto → Marquee. Meta retargeting a pre-savers.' },
      { id: 'p7_43', n: 43, title: 'Re-pitch sync con data probada',
        desc: 'Tracción comprobada → Musicbed/Marmoset/Bodega con métricas updated. Aumenta probability.' }
    ] },
  { id: 'phase89', title: 'Fases 8–9 — Catalog & Reporting', subtitle: 'Mes 3+ · trimestral · anual',
    steps: [
      { id: 'p8_44', n: 44, title: 'Mantener DJ mix mensual',
        desc: 'Continuar cadencia mensual. Tras 3–6 meses evaluar mensual vs bi-mensual.' },
      { id: 'p8_45', n: 45, title: 'Storytelling trimestral',
        desc: 'Cada Q identificar track del sello con más tracción. Newsletter especial + IG long-form + YouTube.' },
      { id: 'p9_46', n: 46, title: 'Reporte trimestral por release',
        desc: 'Streams, Beatport sales/charts, save rate, Active Listeners, playlist appearances, sync, ROI por tier.' },
      { id: 'p9_47', n: 47, title: 'Análisis trimestral',
        desc: '¿Qué tier funcionó mejor en ROI? ¿Qué playlist generó más streams? ¿Vale Hype, DJ Mag, 1001 TL?' },
      { id: 'p9_48', n: 48, title: 'Revisión anual (Q4)',
        desc: 'Ajustar tiers, presupuestos, frecuencia. Decidir si arrancar compilaciones en 2027.' }
    ] }
];

const TIERS = {
  T1_DELUXE: { label: 'TIER 1 DELUXE', short: 'T1D', color: '#FF5E3A',
    budget: '$1,800–3,500', timeline: '16 semanas', frequency: '1–2 / año max',
    desc: 'Releases especiales · Anniversaries · Momentos cumbre · DJ Mag + 1001 Tracklists' },
  T1: { label: 'TIER 1', short: 'T1', color: '#FF5E3A',
    budget: '$800–1,500', timeline: '16 semanas', frequency: '2–4 / año',
    desc: 'Sevenkey + colabs grandes' },
  T2: { label: 'TIER 2', short: 'T2', color: '#00E5FF',
    budget: '$300–500', timeline: '12 semanas', frequency: 'Periodic',
    desc: 'Roster del sello · SubmitHub activo' },
  T3: { label: 'TIER 3 BASELINE', short: 'T3', color: '#888888',
    budget: '$100–250', timeline: '8–12 semanas', frequency: 'Cada release',
    desc: 'Default mínimo · SubmitHub activo · Ads mínimas' }
};

const GENRES = ['House', 'Afro House', 'Indie Dance'];

const API = '/.netlify/functions/data';
const CACHE_KEY = 'mvm-cache';

const readLocal = () => {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    return raw ? JSON.parse(raw) : { index: [], releases: [] };
  } catch { return { index: [], releases: [] }; }
};

const writeLocal = (data) => {
  try { localStorage.setItem(CACHE_KEY, JSON.stringify(data)); } catch {}
};

// Background sync: push every local release up to the cloud (best-effort)
const syncLocalToCloud = (local) => {
  if (!local || !local.releases) return;
  local.releases.forEach(r => {
    fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key: `mvm-release-${r.id}`, value: JSON.stringify(r) })
    }).catch(() => {});
  });
  fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ key: 'mvm-index', value: JSON.stringify(local.index || []) })
  }).catch(() => {});
};

const STORAGE = {
  // localStorage is the primary source of truth.
  // Cloud is opportunistic — only use it when it has MORE data than local
  // (i.e., changes from another device that haven't been synced down yet).
  async getAll() {
    const local = readLocal();
    try {
      const r = await fetch(`${API}?all=true`);
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const cloud = await r.json();
      const cloudCount = (cloud.releases || []).length;
      const localCount = (local.releases || []).length;
      if (cloudCount > localCount) {
        // Cloud has more — assume new data from another device
        writeLocal(cloud);
        return cloud;
      }
      // Local has equal or more — push up to cloud (best effort) and use local
      if (localCount > cloudCount) syncLocalToCloud(local);
      return local;
    } catch (e) {
      console.warn('Cloud unavailable, using local data:', e);
      return local;
    }
  },
  async getIndex() {
    return readLocal().index || [];
  },
  async setIndex(ids) {
    const local = readLocal();
    local.index = ids;
    writeLocal(local);
    fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key: 'mvm-index', value: JSON.stringify(ids) })
    }).catch(e => console.warn('setIndex cloud sync failed:', e));
  },
  async setRelease(id, data) {
    // Update local cache synchronously — cannot fail silently
    const local = readLocal();
    const idx = local.releases.findIndex(r => r.id === id);
    if (idx >= 0) local.releases[idx] = data;
    else local.releases.unshift(data);
    if (!local.index.includes(id)) local.index.push(id);
    writeLocal(local);
    // Best-effort cloud sync
    fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key: `mvm-release-${id}`, value: JSON.stringify(data) })
    }).catch(e => console.warn('setRelease cloud sync failed:', e));
  },
  async deleteRelease(id) {
    const local = readLocal();
    local.releases = local.releases.filter(r => r.id !== id);
    local.index = local.index.filter(x => x !== id);
    writeLocal(local);
    fetch(`${API}?key=mvm-release-${id}`, { method: 'DELETE' })
      .catch(e => console.warn('deleteRelease cloud sync failed:', e));
    fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key: 'mvm-index', value: JSON.stringify(local.index) })
    }).catch(() => {});
  }
};

// One-time migration from old localStorage keys (mvm-index + mvm-release-{id}) to new mvm-cache
const migrateLocalStorage = async () => {
  if (typeof localStorage === 'undefined') return;
  if (localStorage.getItem('mvm-migrated-v2')) return;
  try {
    const oldIndex = localStorage.getItem('mvm-index');
    if (oldIndex) {
      const ids = JSON.parse(oldIndex);
      const releases = [];
      for (const id of ids) {
        const data = localStorage.getItem(`mvm-release-${id}`);
        if (data) releases.push(JSON.parse(data));
      }
      if (releases.length > 0) {
        const merged = readLocal();
        for (const r of releases) {
          if (!merged.releases.find(x => x.id === r.id)) {
            merged.releases.push(r);
            if (!merged.index.includes(r.id)) merged.index.push(r.id);
          }
        }
        writeLocal(merged);
        syncLocalToCloud(merged);
        console.log(`Migración local: ${releases.length} releases recuperados.`);
      }
    }
    localStorage.setItem('mvm-migrated-v2', '1');
  } catch (e) {
    console.error('Migración falló:', e);
  }
};

const newReleaseId = () => `r${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`;

const createEmptyRelease = (basics) => ({
  id: newReleaseId(),
  trackTitle: basics.trackTitle, artist: basics.artist, genre: basics.genre,
  tier: basics.tier, releaseDate: basics.releaseDate,
  createdAt: new Date().toISOString(),
  steps: {},
  content: { tiktoks: 0, reels: 0, carousels: 0,
    storiesPre1: false, storiesPre2: false,
    storiesOut0: false, storiesOut1: false, storiesOut3: false }
});

const calcProgress = (release) => {
  if (!release) return 0;
  const tier = release.tier;
  const allSteps = PHASES.flatMap(ph => ph.steps).filter(s => !s.tierOnly || s.tierOnly.includes(tier));
  const total = allSteps.length;
  const done = allSteps.filter(s => release.steps[s.id]?.done).length;
  return total === 0 ? 0 : Math.round((done / total) * 100);
};

const calcContentProgress = (release) => {
  const targets = { tiktoks: 50, reels: 2, carousels: 3, stories: 5 };
  const c = release.content;
  const storiesDone = ['storiesPre1','storiesPre2','storiesOut0','storiesOut1','storiesOut3'].filter(k => c[k]).length;
  const ratios = [
    Math.min(c.tiktoks / targets.tiktoks, 1),
    Math.min(c.reels / targets.reels, 1),
    Math.min(c.carousels / targets.carousels, 1),
    storiesDone / targets.stories
  ];
  return Math.round(ratios.reduce((a,b)=>a+b,0) / ratios.length * 100);
};

const TierBadge = ({ tier, large = false }) => {
  const t = TIERS[tier];
  if (!t) return null;
  return (<span style={{
    background: t.color, color: '#0A0A0A',
    padding: large ? '6px 14px' : '3px 10px',
    fontFamily: 'JetBrains Mono, monospace',
    fontSize: large ? '12px' : '10px',
    fontWeight: 700, letterSpacing: '0.08em', display: 'inline-block'
  }}>{t.label}</span>);
};

const ProgressRing = ({ percent, size = 60 }) => {
  const r = (size - 6) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (percent / 100) * c;
  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={size/2} cy={size/2} r={r} stroke="#222" strokeWidth="3" fill="none" />
      <circle cx={size/2} cy={size/2} r={r} stroke="#FF5E3A" strokeWidth="3" fill="none"
        strokeDasharray={c} strokeDashoffset={offset}
        style={{ transition: 'stroke-dashoffset 0.5s' }} />
      <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle"
        fill="#fff" fontSize="13" fontFamily="JetBrains Mono, monospace"
        fontWeight="700" style={{ transform: 'rotate(90deg)', transformOrigin: 'center' }}>
        {percent}%
      </text>
    </svg>
  );
};

const Field = ({ label, children }) => (
  <div style={{ marginBottom: '16px' }}>
    <label style={{
      display: 'block', color: '#888', fontFamily: 'JetBrains Mono, monospace',
      fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', marginBottom: '6px',
      textTransform: 'uppercase'
    }}>{label}</label>
    {children}
  </div>
);

const inputStyle = {
  width: '100%', padding: '10px 12px', background: '#0A0A0A', border: '1px solid #2A2A2A',
  color: '#fff', fontFamily: 'Space Grotesk, sans-serif', fontSize: '14px',
  outline: 'none', boxSizing: 'border-box'
};

const btnStyle = {
  padding: '12px 16px', fontFamily: 'JetBrains Mono, monospace', fontSize: '11px',
  fontWeight: 700, letterSpacing: '0.08em', border: 'none', cursor: 'pointer',
  textTransform: 'uppercase'
};

const CreateReleaseModal = ({ onClose, onCreate }) => {
  const [trackTitle, setTrackTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [genre, setGenre] = useState('House');
  const [tier, setTier] = useState('T3');
  const [releaseDate, setReleaseDate] = useState('');

  const handleCreate = () => {
    if (!trackTitle.trim() || !artist.trim()) return;
    onCreate({ trackTitle: trackTitle.trim(), artist: artist.trim(), genre, tier, releaseDate });
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100,
      padding: '20px', backdropFilter: 'blur(8px)', overflowY: 'auto'
    }}>
      <div style={{
        background: '#0F0F0F', border: '1px solid #2A2A2A', maxWidth: '520px',
        width: '100%', padding: '32px', maxHeight: '90vh', overflowY: 'auto'
      }}>
        <h2 style={{
          color: '#FF5E3A', fontFamily: 'Space Grotesk, sans-serif',
          fontWeight: 700, fontSize: '22px', marginBottom: '6px', letterSpacing: '0.02em'
        }}>NUEVO RELEASE</h2>
        <p style={{ color: '#888', fontSize: '13px', marginBottom: '24px',
          fontFamily: 'Space Grotesk, sans-serif' }}>
          Configura los datos básicos. Podrás llenar el resto al entrar al release.
        </p>

        <Field label="Track Title">
          <input value={trackTitle} onChange={e => setTrackTitle(e.target.value)}
            placeholder="ej. Falling Into You" style={inputStyle} />
        </Field>
        <Field label="Artista">
          <input value={artist} onChange={e => setArtist(e.target.value)}
            placeholder="ej. Sevenkey" style={inputStyle} />
        </Field>
        <Field label="Género">
          <div style={{ display: 'flex', gap: '8px' }}>
            {GENRES.map(g => (
              <button key={g} onClick={() => setGenre(g)}
                style={{
                  flex: 1, padding: '10px', background: genre === g ? '#FF5E3A' : 'transparent',
                  color: genre === g ? '#0A0A0A' : '#fff', border: '1px solid #333',
                  fontFamily: 'JetBrains Mono, monospace', fontSize: '11px',
                  letterSpacing: '0.05em', cursor: 'pointer', fontWeight: 700
                }}>{g.toUpperCase()}</button>
            ))}
          </div>
        </Field>
        <Field label="Tier inicial">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {Object.entries(TIERS).map(([k, t]) => (
              <button key={k} onClick={() => setTier(k)}
                style={{
                  padding: '10px 12px', background: tier === k ? '#1A1A1A' : 'transparent',
                  border: tier === k ? `1px solid ${t.color}` : '1px solid #2A2A2A',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  cursor: 'pointer', textAlign: 'left'
                }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{
                    background: t.color, color: '#0A0A0A', padding: '2px 8px',
                    fontFamily: 'JetBrains Mono, monospace', fontSize: '9px',
                    fontWeight: 700, letterSpacing: '0.08em'
                  }}>{t.short}</span>
                  <span style={{ color: '#fff', fontSize: '12px',
                    fontFamily: 'Space Grotesk, sans-serif' }}>{t.desc}</span>
                </div>
                <span style={{ color: '#666', fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '10px' }}>{t.budget}</span>
              </button>
            ))}
          </div>
        </Field>
        <Field label="Fecha tentativa de release">
          <input type="date" value={releaseDate} onChange={e => setReleaseDate(e.target.value)}
            style={inputStyle} />
        </Field>

        <div style={{ display: 'flex', gap: '10px', marginTop: '24px' }}>
          <button onClick={onClose} style={{ ...btnStyle, background: 'transparent',
            border: '1px solid #333', color: '#888' }}>Cancelar</button>
          <button onClick={handleCreate}
            disabled={!trackTitle.trim() || !artist.trim()}
            style={{ ...btnStyle, background: '#FF5E3A', color: '#0A0A0A', flex: 1,
              opacity: (!trackTitle.trim() || !artist.trim()) ? 0.4 : 1
            }}>Crear release</button>
        </div>
      </div>
    </div>
  );
};

const Dashboard = ({ releases, onSelect, onNew, onDelete }) => (
  <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 24px' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between',
      alignItems: 'flex-end', marginBottom: '40px', flexWrap: 'wrap', gap: '16px' }}>
      <div>
        <div style={{
          color: '#FF5E3A', fontFamily: 'JetBrains Mono, monospace',
          fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', marginBottom: '6px'
        }}>RELEASES</div>
        <h1 style={{
          color: '#fff', fontFamily: 'Space Grotesk, sans-serif',
          fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 700, margin: 0,
          letterSpacing: '-0.02em', lineHeight: 1.05
        }}>Release Journey</h1>
        <p style={{ color: '#888', fontFamily: 'Space Grotesk, sans-serif', fontSize: '15px',
          marginTop: '10px', maxWidth: '480px', lineHeight: 1.5 }}>
          {releases.length === 0
            ? 'Empieza creando tu primer release. Cada uno tendrá su propio Track Journey.'
            : `${releases.length} release${releases.length === 1 ? '' : 's'} en pipeline.`}
        </p>
      </div>
      <button onClick={onNew} style={{
        ...btnStyle, background: '#FF5E3A', color: '#0A0A0A',
        padding: '14px 22px', fontSize: '12px'
      }}>+ Nuevo release</button>
    </div>

    {releases.length === 0 ? (
      <div style={{
        border: '1px dashed #2A2A2A', padding: '60px 24px', textAlign: 'center',
        color: '#555', fontFamily: 'Space Grotesk, sans-serif'
      }}>Aún no hay releases. Crea uno para empezar.</div>
    ) : (
      <div style={{ display: 'grid', gap: '12px' }}>
        {releases.map(r => {
          const progress = calcProgress(r);
          return (
            <div key={r.id} onClick={() => onSelect(r.id)}
              style={{
                background: '#0F0F0F', border: '1px solid #1F1F1F', padding: '20px 24px',
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '20px',
                transition: 'border-color 0.2s'
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = '#FF5E3A'}
              onMouseLeave={e => e.currentTarget.style.borderColor = '#1F1F1F'}>
              <ProgressRing percent={progress} size={54} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px',
                  marginBottom: '4px', flexWrap: 'wrap' }}>
                  <TierBadge tier={r.tier} />
                  <span style={{ color: '#666', fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '10px', letterSpacing: '0.08em' }}>
                    {r.genre.toUpperCase()}
                  </span>
                  {r.releaseDate && (
                    <span style={{ color: '#666', fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '10px' }}>· {r.releaseDate}</span>
                  )}
                </div>
                <div style={{
                  color: '#fff', fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '18px', fontWeight: 600, marginBottom: '2px',
                  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
                }}>{r.trackTitle}</div>
                <div style={{ color: '#888', fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '13px' }}>{r.artist}</div>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); if (confirm(`Eliminar "${r.trackTitle}"?`)) onDelete(r.id); }}
                style={{
                  background: 'transparent', border: '1px solid #2A2A2A', color: '#666',
                  padding: '6px 10px', cursor: 'pointer', fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '14px'
                }}>×</button>
            </div>
          );
        })}
      </div>
    )}

    <div style={{ marginTop: '60px', borderTop: '1px solid #1F1F1F', paddingTop: '24px' }}>
      <div style={{ color: '#FF5E3A', fontFamily: 'JetBrains Mono, monospace',
        fontSize: '10px', fontWeight: 700, letterSpacing: '0.15em', marginBottom: '8px' }}>
        REGLAS UNIVERSALES
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
        gap: '10px', color: '#888', fontFamily: 'Space Grotesk, sans-serif', fontSize: '13px' }}>
        <div>· Solo demos vía SoundCloud private link</div>
        <div>· Beatport exclusive 2 semanas (todos)</div>
        <div>· Beatport Hype pitch (todos)</div>
        <div>· Splits 50/50 sobre 70% net</div>
        <div>· Master rights only (no publishing)</div>
        <div>· Géneros: House · Afro House · Indie Dance</div>
        <div>· DJ mix mensual con cada release</div>
        <div>· Solo singles en 2026</div>
      </div>
    </div>
  </div>
);

const StepRow = ({ step, state, onChange }) => {
  const done = state?.done || false;
  const fields = state?.fields || {};
  const sub = state?.sub || {};

  return (
    <div style={{
      borderBottom: '1px solid #1A1A1A', padding: '16px 0',
      opacity: done ? 0.65 : 1, transition: 'opacity 0.2s'
    }}>
      <label style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', cursor: 'pointer' }}>
        <input type="checkbox" checked={done}
          onChange={e => onChange({ ...state, done: e.target.checked })}
          style={{
            width: '18px', height: '18px', accentColor: '#FF5E3A',
            marginTop: '2px', cursor: 'pointer', flexShrink: 0
          }} />
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '4px' }}>
            <span style={{
              color: '#FF5E3A', fontFamily: 'JetBrains Mono, monospace',
              fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em'
            }}>
              {String(step.n).padStart(2, '0')}
            </span>
            <span style={{
              color: '#fff', fontFamily: 'Space Grotesk, sans-serif',
              fontSize: '15px', fontWeight: 600,
              textDecoration: done ? 'line-through' : 'none',
              textDecorationColor: '#FF5E3A'
            }}>{step.title}</span>
          </div>
          <div style={{
            color: '#888', fontFamily: 'Space Grotesk, sans-serif',
            fontSize: '13px', lineHeight: 1.5
          }}>{step.desc}</div>
        </div>
      </label>

      {step.subTasks && (
        <div style={{ marginLeft: '32px', marginTop: '10px',
          display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
          {step.subTasks.map(st => (
            <label key={st.id} style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
              <input type="checkbox" checked={sub[st.id] || false}
                onChange={e => onChange({ ...state, sub: { ...sub, [st.id]: e.target.checked } })}
                style={{ accentColor: '#00E5FF', cursor: 'pointer' }} />
              <span style={{ color: '#aaa', fontFamily: 'Space Grotesk, sans-serif',
                fontSize: '12px' }}>{st.label}</span>
            </label>
          ))}
        </div>
      )}

      {step.fields && (
        <div style={{ marginLeft: '32px', marginTop: '10px', display: 'grid', gap: '8px' }}>
          {step.fields.map(f => (
            <div key={f.id}>
              <label style={{
                display: 'block', color: '#666', fontSize: '10px',
                fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.08em',
                marginBottom: '4px', textTransform: 'uppercase'
              }}>{f.label}</label>
              {f.type === 'textarea' ? (
                <textarea value={fields[f.id] || ''}
                  onChange={e => onChange({ ...state, fields: { ...fields, [f.id]: e.target.value } })}
                  rows={3}
                  style={{ ...inputStyle, fontFamily: 'Space Grotesk, sans-serif',
                    resize: 'vertical', maxWidth: '100%' }} />
              ) : (
                <input type={f.type || 'text'} value={fields[f.id] || ''}
                  onChange={e => onChange({ ...state, fields: { ...fields, [f.id]: e.target.value } })}
                  style={{ ...inputStyle, maxWidth: f.type === 'date' || f.type === 'number' ? '200px' : '100%' }} />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const PhaseBlock = ({ phase, release, onStepChange, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);
  const visibleSteps = phase.steps.filter(s => !s.tierOnly || s.tierOnly.includes(release.tier));
  const doneCount = visibleSteps.filter(s => release.steps[s.id]?.done).length;
  const total = visibleSteps.length;
  const phaseProgress = total === 0 ? 0 : Math.round((doneCount / total) * 100);

  return (
    <div style={{ borderTop: '1px solid #1A1A1A' }}>
      <button onClick={() => setOpen(!open)}
        style={{
          width: '100%', background: 'transparent', border: 'none', padding: '20px 0',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          cursor: 'pointer', textAlign: 'left'
        }}>
        <div>
          <h3 style={{
            color: '#fff', fontFamily: 'Space Grotesk, sans-serif',
            fontSize: '18px', fontWeight: 700, margin: 0, marginBottom: '2px',
            letterSpacing: '-0.01em'
          }}>{phase.title}</h3>
          <p style={{
            color: '#666', fontFamily: 'JetBrains Mono, monospace',
            fontSize: '11px', margin: 0, letterSpacing: '0.05em'
          }}>{phase.subtitle}</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <span style={{
            color: phaseProgress === 100 ? '#FF5E3A' : '#888',
            fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', fontWeight: 700
          }}>{doneCount}/{total}</span>
          <div style={{ width: '80px', height: '3px', background: '#1A1A1A', position: 'relative' }}>
            <div style={{
              position: 'absolute', left: 0, top: 0, bottom: 0,
              width: `${phaseProgress}%`, background: '#FF5E3A',
              transition: 'width 0.4s'
            }} />
          </div>
          <span style={{ color: '#666', fontSize: '14px',
            transform: open ? 'rotate(90deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s' }}>›</span>
        </div>
      </button>
      {open && (
        <div style={{ paddingBottom: '16px' }}>
          {visibleSteps.map(step => (
            <StepRow key={step.id} step={step} state={release.steps[step.id]}
              onChange={(newState) => onStepChange(step.id, newState)} />
          ))}
        </div>
      )}
    </div>
  );
};

const EditableCounter = ({ label, value, target, onValue }) => {
  const reached = value >= target;
  const handleChange = (e) => {
    const v = e.target.value;
    if (v === '') { onValue(0); return; }
    const n = parseInt(v, 10);
    if (!isNaN(n) && n >= 0) onValue(n);
  };
  return (
    <div style={{ background: '#0F0F0F', border: '1px solid #1F1F1F', padding: '14px 16px' }}>
      <div style={{
        color: reached ? '#FF5E3A' : '#888',
        fontFamily: 'JetBrains Mono, monospace', fontSize: '10px',
        fontWeight: 700, letterSpacing: '0.1em', marginBottom: '8px',
        textTransform: 'uppercase'
      }}>{label}</div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '10px' }}>
        <input
          type="number" min="0" value={value}
          onChange={handleChange}
          onFocus={(e) => e.target.select()}
          style={{
            width: '90px', padding: '0',
            background: 'transparent', border: 'none',
            borderBottom: '1px dashed #444',
            color: '#fff', fontFamily: 'JetBrains Mono, monospace',
            fontSize: '28px', fontWeight: 700, lineHeight: 1,
            outline: 'none', textAlign: 'left', cursor: 'text',
            MozAppearance: 'textfield'
          }}
          className="mvm-counter-input"
        />
        <span style={{
          color: '#555', fontFamily: 'JetBrains Mono, monospace', fontSize: '13px'
        }}>/ {target}</span>
      </div>
      <div style={{ display: 'flex', gap: '4px' }}>
        <button onClick={() => onValue(Math.max(0, value - 1))}
          style={{ ...btnStyle, padding: '6px 12px', background: '#1A1A1A',
            color: '#888', border: '1px solid #2A2A2A', flex: 1 }}>−</button>
        <button onClick={() => onValue(value + 1)}
          style={{ ...btnStyle, padding: '6px 12px', background: '#1A1A1A',
            color: '#888', border: '1px solid #2A2A2A', flex: 1 }}>+</button>
      </div>
      <div style={{ marginTop: '10px', height: '3px', background: '#1A1A1A', position: 'relative' }}>
        <div style={{
          position: 'absolute', inset: 0, width: `${Math.min(100, (value/target)*100)}%`,
          background: reached ? '#FF5E3A' : '#00E5FF', transition: 'width 0.3s'
        }} />
      </div>
    </div>
  );
};

const ContentTracker = ({ release, onUpdate }) => {
  const c = release.content;
  const update = (key, val) => onUpdate({ ...c, [key]: val });

  const StoryCheck = ({ id, label }) => (
    <label style={{
      display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer',
      padding: '8px 10px', background: c[id] ? '#1A0F0B' : '#0F0F0F',
      border: c[id] ? '1px solid #FF5E3A' : '1px solid #1F1F1F'
    }}>
      <input type="checkbox" checked={c[id]} onChange={e => update(id, e.target.checked)}
        style={{ accentColor: '#FF5E3A', cursor: 'pointer' }} />
      <span style={{ color: c[id] ? '#fff' : '#aaa',
        fontFamily: 'Space Grotesk, sans-serif', fontSize: '13px' }}>{label}</span>
    </label>
  );

  return (
    <div>
      <h3 style={{
        color: '#FF5E3A', fontFamily: 'JetBrains Mono, monospace',
        fontSize: '12px', fontWeight: 700, letterSpacing: '0.15em',
        marginTop: 0, marginBottom: '6px'
      }}>PRODUCCIÓN DE CONTENIDO</h3>
      <p style={{ color: '#666', fontFamily: 'Space Grotesk, sans-serif',
        fontSize: '12px', marginTop: 0, marginBottom: '16px' }}>
        Click el número para escribirlo · O usar +/−
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
        gap: '10px', marginBottom: '20px' }}>
        <EditableCounter label="TikTok videos" value={c.tiktoks} target={50}
          onValue={v => update('tiktoks', v)} />
        <EditableCounter label="Instagram Reels" value={c.reels} target={2}
          onValue={v => update('reels', v)} />
        <EditableCounter label="IG Carruseles" value={c.carousels} target={3}
          onValue={v => update('carousels', v)} />
      </div>

      <div style={{ marginBottom: '8px', color: '#888',
        fontFamily: 'JetBrains Mono, monospace', fontSize: '10px',
        fontWeight: 700, letterSpacing: '0.1em' }}>
        STORIES PRE-RELEASE (2 CICLOS)
      </div>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
        <StoryCheck id="storiesPre1" label="Ciclo 1 (sem -2)" />
        <StoryCheck id="storiesPre2" label="Ciclo 2 (sem -1)" />
      </div>

      <div style={{ marginBottom: '8px', color: '#888',
        fontFamily: 'JetBrains Mono, monospace', fontSize: '10px',
        fontWeight: 700, letterSpacing: '0.1em' }}>
        STORIES OUT NOW (3 CICLOS)
      </div>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <StoryCheck id="storiesOut0" label="Día 0 (release)" />
        <StoryCheck id="storiesOut1" label="Día 1" />
        <StoryCheck id="storiesOut3" label="Día 3" />
      </div>
    </div>
  );
};

const TierActivationCard = ({ tier }) => {
  const t = TIERS[tier];
  const activations = {
    T1_DELUXE: {
      yes: ['DJ Mag LatAm', '1001 Tracklists pago', 'GigMag LatAm', 'Felipe', 'Christian', 'Mosh',
            '5–8 influencers', 'Spotify Marquee', 'Discovery Mode', 'Sync premium libraries'],
      no: ['SubmitHub']
    },
    T1: {
      yes: ['Felipe', 'Christian', 'Mosh', '3–5 influencers', 'Discovery Mode (cond.)', 'Sync libraries'],
      no: ['DJ Mag', '1001 Tracklists pago', 'SubmitHub']
    },
    T2: {
      yes: ['Felipe (rotar)', 'Christian (rotar)', 'SubmitHub', '1–2 influencers', 'Sync Artlist'],
      no: ['DJ Mag', '1001 Tracklists pago', 'Spotify Marquee']
    },
    T3: {
      yes: ['Playlist propia', 'SubmitHub', 'Ads mínimas'],
      no: ['DJ Mag', '1001 Tracklists pago', 'Influencers (salvo conexión)', 'Spotify Marquee']
    }
  };
  const data = activations[tier];

  return (
    <div>
      <h3 style={{
        color: '#FF5E3A', fontFamily: 'JetBrains Mono, monospace',
        fontSize: '12px', fontWeight: 700, letterSpacing: '0.15em',
        marginTop: 0, marginBottom: '6px'
      }}>ACTIVACIÓN DE CANALES — {t.short}</h3>
      <p style={{ color: '#666', fontFamily: 'Space Grotesk, sans-serif',
        fontSize: '13px', marginTop: 0, marginBottom: '16px' }}>
        Budget {t.budget} · {t.frequency}
      </p>

      <div style={{ marginBottom: '14px' }}>
        <div style={{ color: '#FF5E3A', fontFamily: 'JetBrains Mono, monospace',
          fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', marginBottom: '8px' }}>ACTIVAR</div>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {data.yes.map(item => (
            <span key={item} style={{
              background: '#1A0F0B', border: '1px solid #FF5E3A40',
              color: '#fff', padding: '4px 10px',
              fontFamily: 'Space Grotesk, sans-serif', fontSize: '12px'
            }}>{item}</span>
          ))}
        </div>
      </div>

      <div>
        <div style={{ color: '#666', fontFamily: 'JetBrains Mono, monospace',
          fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', marginBottom: '8px' }}>NO APLICA</div>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {data.no.map(item => (
            <span key={item} style={{
              background: 'transparent', border: '1px solid #2A2A2A',
              color: '#555', padding: '4px 10px', textDecoration: 'line-through',
              fontFamily: 'Space Grotesk, sans-serif', fontSize: '12px'
            }}>{item}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

const ReleaseDetail = ({ release, onUpdate, onBack }) => {
  const progress = calcProgress(release);
  const contentProgress = calcContentProgress(release);

  const updateStep = (stepId, newState) => {
    onUpdate({ ...release, steps: { ...release.steps, [stepId]: newState } });
  };
  const updateContent = (newContent) => {
    onUpdate({ ...release, content: newContent });
  };
  const updateField = (key, value) => {
    onUpdate({ ...release, [key]: value });
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '24px' }}>
      <button onClick={onBack} style={{
        background: 'transparent', border: 'none', color: '#888',
        fontFamily: 'JetBrains Mono, monospace', fontSize: '11px',
        cursor: 'pointer', padding: '8px 0', marginBottom: '12px',
        letterSpacing: '0.08em'
      }}>← VOLVER</button>

      <div style={{
        background: '#0F0F0F', border: '1px solid #1F1F1F', padding: '24px',
        marginBottom: '20px', display: 'flex', gap: '24px', alignItems: 'flex-start',
        flexWrap: 'wrap'
      }}>
        <div style={{ flex: 1, minWidth: '280px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px',
            marginBottom: '10px', flexWrap: 'wrap' }}>
            <TierBadge tier={release.tier} large />
            <span style={{ color: '#666', fontFamily: 'JetBrains Mono, monospace',
              fontSize: '11px', letterSpacing: '0.1em' }}>
              {release.genre.toUpperCase()}
            </span>
          </div>
          <h2 style={{
            color: '#fff', fontFamily: 'Space Grotesk, sans-serif',
            fontSize: 'clamp(24px, 3vw, 34px)', fontWeight: 700, margin: 0,
            letterSpacing: '-0.02em', lineHeight: 1.1
          }}>{release.trackTitle}</h2>
          <p style={{ color: '#888', fontFamily: 'Space Grotesk, sans-serif',
            fontSize: '16px', margin: '6px 0 0' }}>{release.artist}</p>
          <div style={{ display: 'flex', gap: '20px', marginTop: '14px', flexWrap: 'wrap' }}>
            <div>
              <div style={{ color: '#555', fontFamily: 'JetBrains Mono, monospace',
                fontSize: '10px', letterSpacing: '0.1em', marginBottom: '4px' }}>
                RELEASE DATE
              </div>
              <input type="date" value={release.releaseDate || ''}
                onChange={e => updateField('releaseDate', e.target.value)}
                style={{
                  background: 'transparent', border: '1px solid #2A2A2A',
                  color: '#fff', fontFamily: 'JetBrains Mono, monospace', fontSize: '13px',
                  padding: '4px 8px', outline: 'none'
                }} />
            </div>
            <div>
              <div style={{ color: '#555', fontFamily: 'JetBrains Mono, monospace',
                fontSize: '10px', letterSpacing: '0.1em', marginBottom: '4px' }}>TIER</div>
              <select value={release.tier}
                onChange={e => updateField('tier', e.target.value)}
                style={{
                  background: 'transparent', border: '1px solid #2A2A2A',
                  color: '#fff', fontFamily: 'JetBrains Mono, monospace', fontSize: '12px',
                  padding: '5px 8px', outline: 'none', cursor: 'pointer'
                }}>
                {Object.entries(TIERS).map(([k, t]) => (
                  <option key={k} value={k} style={{ background: '#0F0F0F' }}>{t.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
          <ProgressRing percent={progress} size={86} />
          <div style={{ color: '#666', fontFamily: 'JetBrains Mono, monospace',
            fontSize: '10px', letterSpacing: '0.1em' }}>PIPELINE</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '16px', marginBottom: '24px' }}>
        <div style={{ background: '#0F0F0F', border: '1px solid #1F1F1F', padding: '20px' }}>
          <TierActivationCard tier={release.tier} />
        </div>
        <div style={{ background: '#0F0F0F', border: '1px solid #1F1F1F', padding: '20px' }}>
          <ContentTracker release={release} onUpdate={updateContent} />
          <div style={{ marginTop: '14px', paddingTop: '14px', borderTop: '1px solid #1A1A1A' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#888', fontFamily: 'JetBrains Mono, monospace',
                fontSize: '11px', letterSpacing: '0.08em' }}>CONTENT PROGRESS</span>
              <span style={{ color: '#FF5E3A', fontFamily: 'JetBrains Mono, monospace',
                fontSize: '14px', fontWeight: 700 }}>{contentProgress}%</span>
            </div>
            <div style={{ marginTop: '8px', height: '3px', background: '#1A1A1A', position: 'relative' }}>
              <div style={{
                position: 'absolute', inset: 0, width: `${contentProgress}%`,
                background: '#FF5E3A', transition: 'width 0.4s'
              }} />
            </div>
          </div>
        </div>
      </div>

      <div style={{ background: '#0F0F0F', border: '1px solid #1F1F1F', padding: '0 24px' }}>
        {PHASES.map((phase, i) => (
          <PhaseBlock key={phase.id} phase={phase} release={release}
            onStepChange={updateStep} defaultOpen={i === 0} />
        ))}
      </div>

      <div style={{ height: '40px' }} />
    </div>
  );
};

export default function App() {
  const [view, setView] = useState('dashboard');
  const [releases, setReleases] = useState([]);
  const [currentId, setCurrentId] = useState(null);
  const [showCreate, setShowCreate] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      await migrateLocalStorage();
      await loadAll();
    };
    init();
  }, []);

  // Auto-refresh when user returns to the tab (sync changes from other devices)
  useEffect(() => {
    const onFocus = () => {
      if (view === 'dashboard') loadAll();
    };
    window.addEventListener('focus', onFocus);
    return () => window.removeEventListener('focus', onFocus);
  }, [view]);

  const loadAll = async () => {
    try {
      const data = await STORAGE.getAll();
      const sorted = (data.releases || []).sort((a, b) =>
        (b.releaseDate || b.createdAt).localeCompare(a.releaseDate || a.createdAt)
      );
      setReleases(sorted);
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  const createRelease = async (basics) => {
    const r = createEmptyRelease(basics);
    // Update UI immediately so user never gets bounced back to dashboard
    setReleases(prev => [r, ...prev]);
    setShowCreate(false);
    setCurrentId(r.id);
    setView('release');
    // Sync to cloud in background — if it fails, the release is still in local state
    try {
      await STORAGE.setRelease(r.id, r);
      const ids = await STORAGE.getIndex();
      if (!ids.includes(r.id)) {
        await STORAGE.setIndex([...ids, r.id]);
      }
    } catch (e) {
      console.error('Cloud sync failed (release saved locally):', e);
    }
  };

  const saveTimers = useRef({});
  const updateRelease = (release) => {
    // Optimistic UI update
    setReleases(prev => prev.map(r => r.id === release.id ? release : r));
    // Debounced cloud save
    if (saveTimers.current[release.id]) {
      clearTimeout(saveTimers.current[release.id]);
    }
    saveTimers.current[release.id] = setTimeout(async () => {
      await STORAGE.setRelease(release.id, release);
    }, 800);
  };

  const deleteRelease = async (id) => {
    setReleases(prev => prev.filter(r => r.id !== id));
    try {
      await STORAGE.deleteRelease(id);
      const ids = await STORAGE.getIndex();
      await STORAGE.setIndex(ids.filter(x => x !== id));
    } catch (e) {
      console.error('Delete sync failed:', e);
    }
  };

  const currentRelease = releases.find(r => r.id === currentId);

  return (
    <div style={{
      minHeight: '100vh', background: '#0A0A0A', color: '#fff',
      fontFamily: 'Space Grotesk, sans-serif',
      backgroundImage: 'radial-gradient(circle at 20% 0%, rgba(255,94,58,0.04) 0%, transparent 50%), radial-gradient(circle at 80% 100%, rgba(0,229,255,0.03) 0%, transparent 50%)'
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet" />
      <style>{`
        .mvm-counter-input::-webkit-outer-spin-button,
        .mvm-counter-input::-webkit-inner-spin-button {
          -webkit-appearance: none; margin: 0;
        }
        .mvm-counter-input { -moz-appearance: textfield; }
      `}</style>

      <div style={{
        borderBottom: '1px solid #1A1A1A', padding: '14px 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: '#0A0A0A', position: 'sticky', top: 0, zIndex: 50
      }}>
        <div onClick={() => { setView('dashboard'); setCurrentId(null); }}
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <img src={LOGO_SRC} alt="Momentvm Music"
            style={{ height: '38px', width: 'auto', display: 'block' }} />
          <div style={{ borderLeft: '1px solid #2A2A2A', paddingLeft: '14px' }}>
            <div style={{
              color: '#fff', fontFamily: 'Space Grotesk, sans-serif',
              fontSize: '14px', fontWeight: 700, letterSpacing: '0.05em', lineHeight: 1
            }}>MOMENTVM MUSIC</div>
            <div style={{
              color: '#FF5E3A', fontFamily: 'JetBrains Mono, monospace',
              fontSize: '9px', letterSpacing: '0.15em', marginTop: '3px'
            }}>RELEASE MANAGER · v1.2</div>
          </div>
        </div>
        <div style={{ color: '#555', fontFamily: 'JetBrains Mono, monospace',
          fontSize: '10px', letterSpacing: '0.1em' }}>
          SOUND · ENERGY · MOMENTS
        </div>
      </div>

      {loading ? (
        <div style={{ padding: '60px', textAlign: 'center', color: '#666',
          fontFamily: 'JetBrains Mono, monospace', fontSize: '12px',
          letterSpacing: '0.1em' }}>
          CARGANDO PIPELINE...
        </div>
      ) : view === 'dashboard' || !currentRelease ? (
        <Dashboard releases={releases}
          onSelect={(id) => { setCurrentId(id); setView('release'); }}
          onNew={() => setShowCreate(true)}
          onDelete={deleteRelease} />
      ) : (
        <ReleaseDetail release={currentRelease}
          onUpdate={updateRelease}
          onBack={() => { setView('dashboard'); setCurrentId(null); }} />
      )}

      {showCreate && <CreateReleaseModal onClose={() => setShowCreate(false)}
        onCreate={createRelease} />}
    </div>
  );
}
