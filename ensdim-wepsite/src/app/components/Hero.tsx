import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

/* ─── Custom hero visualization ───────────────────────────────────────────
   Represents: scattered customer signals → organized operational intelligence
   Pure SVG + CSS animation — no external images
   ─────────────────────────────────────────────────────────────────────── */

// Simplified version for mobile - only nodes, lines, and hub
function HeroVizSimple() {
  const nodes = [
    { cx: 72,  cy: 52,  r: 4,   delay: '0s',    dur: '3.2s' },
    { cx: 148, cy: 28,  r: 3,   delay: '0.6s',  dur: '2.8s' },
    { cx: 220, cy: 60,  r: 4.5, delay: '1.1s',  dur: '3.6s' },
    { cx: 48,  cy: 108, r: 3,   delay: '0.3s',  dur: '2.5s' },
    { cx: 130, cy: 90,  r: 3.5, delay: '1.8s',  dur: '3s'   },
    { cx: 196, cy: 112, r: 3,   delay: '0.9s',  dur: '3.4s' },
    { cx: 260, cy: 44,  r: 3,   delay: '1.4s',  dur: '2.9s' },
    { cx: 290, cy: 100, r: 4,   delay: '0.5s',  dur: '3.1s' },
  ];

  const hubX = 200;
  const hubY = 204;

  const lines = nodes.map((n, i) => ({
    x1: n.cx, y1: n.cy, x2: hubX, y2: hubY,
    delay: `${i * 0.18}s`,
  }));

  return (
    <div className="relative w-full h-full select-none pointer-events-none" aria-hidden="true">
      <style>{`
        @keyframes node-pulse {
          0%, 100% { opacity: 0.45; transform: scale(1); }
          50%       { opacity: 0.9;  transform: scale(1.6); }
        }
        @keyframes line-draw {
          0%   { stroke-dashoffset: 320; opacity: 0; }
          20%  { opacity: 1; }
          100% { stroke-dashoffset: 0; opacity: 0.22; }
        }
        @keyframes ring-expand {
          0%   { r: 28; opacity: 0.3; }
          100% { r: 52; opacity: 0; }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .viz-node { animation: node-pulse var(--dur, 3s) var(--delay, 0s) ease-in-out infinite; }
        .viz-line { stroke-dasharray: 320; animation: line-draw 2.4s var(--delay, 0s) ease-out forwards; }
        .hub-ring { animation: ring-expand 2.8s ease-out infinite; }
        .viz-wrap { animation: fade-in-up 1s 0.4s ease-out both; }
      `}</style>

      <svg
        viewBox="0 0 380 300"
        className="viz-wrap absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="dotgrid-mobile" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="1" fill="#6D5DF6" opacity="0.12" />
          </pattern>
          <radialGradient id="hubGlow-mobile" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#6D5DF6" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#6D5DF6" stopOpacity="0"    />
          </radialGradient>
        </defs>

        <rect width="380" height="300" fill="url(#dotgrid-mobile)" />

        {/* Flow lines */}
        {lines.map((l, i) => (
          <line
            key={i}
            x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
            stroke="#6D5DF6"
            strokeWidth="1"
            strokeLinecap="round"
            className="viz-line"
            style={{ '--delay': l.delay } as React.CSSProperties}
          />
        ))}

        {/* Hub glow */}
        <circle cx={hubX} cy={hubY} r="60" fill="url(#hubGlow-mobile)" />

        {/* Expanding rings */}
        <circle cx={hubX} cy={hubY} className="hub-ring" r="28" fill="none" stroke="#6D5DF6" strokeWidth="1" opacity="0.3" />
        <circle cx={hubX} cy={hubY} className="hub-ring" r="28" fill="none" stroke="#6D5DF6" strokeWidth="1" opacity="0.3"
          style={{ animationDelay: '1.4s' }} />

        {/* Hub core */}
        <circle cx={hubX} cy={hubY} r="22" fill="#6D5DF6" opacity="0.15" />
        <circle cx={hubX} cy={hubY} r="14" fill="#6D5DF6" opacity="0.5" />
        <circle cx={hubX} cy={hubY} r="7"  fill="#ffffff" opacity="0.85" />

        {/* Scattered signal nodes */}
        {nodes.map((n, i) => (
          <circle
            key={i}
            cx={n.cx} cy={n.cy} r={n.r}
            fill="#6D5DF6"
            className="viz-node"
            style={{ '--delay': n.delay, '--dur': n.dur } as React.CSSProperties}
          />
        ))}

        {/* Small connector dots */}
        {nodes.map((n, i) => {
          const t = 0.42;
          const mx = n.cx + (hubX - n.cx) * t;
          const my = n.cy + (hubY - n.cy) * t;
          return (
            <circle key={`m${i}`} cx={mx} cy={my} r="1.5"
              fill="#EEEAFE" opacity="0.35"
            />
          );
        })}

        {/* Red accent node */}
        <circle cx="310" cy="68" r="3.5" fill="#D63A3A" opacity="0.7" className="viz-node"
          style={{ '--delay': '2s', '--dur': '2.6s' } as React.CSSProperties} />
        <line x1="310" y1="68" x2={hubX} y2={hubY}
          stroke="#D63A3A" strokeWidth="0.8" opacity="0.15" strokeDasharray="3 2"
        />
      </svg>
    </div>
  );
}

function HeroVizArabic() {
  const nodes = [
    { cx: 72,  cy: 52,  r: 4,   delay: '0s',    dur: '3.2s' },
    { cx: 148, cy: 28,  r: 3,   delay: '0.6s',  dur: '2.8s' },
    { cx: 220, cy: 60,  r: 4.5, delay: '1.1s',  dur: '3.6s' },
    { cx: 48,  cy: 108, r: 3,   delay: '0.3s',  dur: '2.5s' },
    { cx: 130, cy: 90,  r: 3.5, delay: '1.8s',  dur: '3s'   },
    { cx: 196, cy: 112, r: 3,   delay: '0.9s',  dur: '3.4s' },
    { cx: 260, cy: 44,  r: 3,   delay: '1.4s',  dur: '2.9s' },
    { cx: 290, cy: 100, r: 4,   delay: '0.5s',  dur: '3.1s' },
  ];

  const hubX = 200;
  const hubY = 204;

  const lines = nodes.map((n, i) => ({
    x1: n.cx, y1: n.cy, x2: hubX, y2: hubY,
    delay: `${i * 0.18}s`,
  }));

  // Arabic cards - larger and repositioned with Arabic labels
  const cards = [
    { x: 18,  y: 235, label: 'عملاء محتملون', value: '142', sub: 'هذا الأسبوع', color: '#6D5DF6', barW: 0.78 },
    { x: 141, y: 250, label: 'متابعات مرسلة', value: '98%', sub: 'في الموعد', color: '#3B2A78', barW: 0.98 },
    { x: 264, y: 235, label: 'زيادة التحويل', value: '+34%', sub: 'مقارنة سابقة', color: '#D63A3A', barW: 0.62 },
  ];

  return (
    <div className="relative w-full h-full select-none pointer-events-none" aria-hidden="true">
      <style>{`
        @keyframes node-pulse {
          0%, 100% { opacity: 0.45; transform: scale(1); }
          50%       { opacity: 0.9;  transform: scale(1.6); }
        }
        @keyframes line-draw {
          0%   { stroke-dashoffset: 320; opacity: 0; }
          20%  { opacity: 1; }
          100% { stroke-dashoffset: 0; opacity: 0.22; }
        }
        @keyframes hub-pulse {
          0%, 100% { opacity: 0.5; r: 18; }
          50%       { opacity: 0.9; r: 22; }
        }
        @keyframes card-float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-5px); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes ring-expand {
          0%   { r: 28; opacity: 0.3; }
          100% { r: 52; opacity: 0; }
        }
        .viz-node { animation: node-pulse var(--dur, 3s) var(--delay, 0s) ease-in-out infinite; }
        .viz-line { stroke-dasharray: 320; animation: line-draw 2.4s var(--delay, 0s) ease-out forwards; }
        .hub-ring { animation: ring-expand 2.8s ease-out infinite; }
        .card-0 { animation: card-float 4.2s 0.0s ease-in-out infinite; }
        .card-1 { animation: card-float 4.2s 0.7s ease-in-out infinite; }
        .card-2 { animation: card-float 4.2s 1.4s ease-in-out infinite; }
        .viz-wrap { animation: fade-in-up 1s 0.4s ease-out both; }
      `}</style>

      <svg
        viewBox="0 0 380 420"
        className="viz-wrap absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="dotgrid-ar" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="1" fill="#6D5DF6" opacity="0.12" />
          </pattern>
          <radialGradient id="hubGlow-ar" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#6D5DF6" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#6D5DF6" stopOpacity="0"    />
          </radialGradient>
        </defs>

        <rect width="380" height="420" fill="url(#dotgrid-ar)" />

        {/* Flow lines */}
        {lines.map((l, i) => (
          <line
            key={i}
            x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
            stroke="#6D5DF6"
            strokeWidth="1"
            strokeLinecap="round"
            className="viz-line"
            style={{ '--delay': l.delay } as React.CSSProperties}
          />
        ))}

        {/* Hub glow */}
        <circle cx={hubX} cy={hubY} r="60" fill="url(#hubGlow-ar)" />

        {/* Expanding rings */}
        <circle cx={hubX} cy={hubY} className="hub-ring" r="28" fill="none" stroke="#6D5DF6" strokeWidth="1" opacity="0.3" />
        <circle cx={hubX} cy={hubY} className="hub-ring" r="28" fill="none" stroke="#6D5DF6" strokeWidth="1" opacity="0.3"
          style={{ animationDelay: '1.4s' }} />

        {/* Hub core */}
        <circle cx={hubX} cy={hubY} r="22" fill="#6D5DF6" opacity="0.15" />
        <circle cx={hubX} cy={hubY} r="14" fill="#6D5DF6" opacity="0.5" />
        <circle cx={hubX} cy={hubY} r="7"  fill="#ffffff" opacity="0.85" />

        {/* Signal nodes */}
        {nodes.map((n, i) => (
          <circle
            key={i}
            cx={n.cx} cy={n.cy} r={n.r}
            fill="#6D5DF6"
            className="viz-node"
            style={{ '--delay': n.delay, '--dur': n.dur } as React.CSSProperties}
          />
        ))}

        {/* Connector dots */}
        {nodes.map((n, i) => {
          const t = 0.42;
          const mx = n.cx + (hubX - n.cx) * t;
          const my = n.cy + (hubY - n.cy) * t;
          return (
            <circle key={`m${i}`} cx={mx} cy={my} r="1.5"
              fill="#EEEAFE" opacity="0.35"
            />
          );
        })}

        {/* Vertical flow lines hub → cards */}
        {cards.map((c, i) => {
          const cardCX = c.x + 61;
          return (
            <line key={`vc${i}`}
              x1={hubX} y1={hubY + 14}
              x2={cardCX} y2={c.y}
              stroke="#6D5DF6" strokeWidth="0.8" opacity="0.18"
              strokeDasharray="4 3"
            />
          );
        })}

        {/* Arabic cards with labels */}
        {cards.map((c, i) => (
          <g key={`card${i}`} className={`card-${i}`}>
            {/* card bg */}
            <rect x={c.x} y={c.y} width="122" height="75" rx="8"
              fill="white" fillOpacity="0.1"
              stroke="white" strokeOpacity="0.2" strokeWidth="1"
            />
            {/* top accent */}
            <rect x={c.x} y={c.y} width="122" height="3" rx="1.5"
              fill={c.color} opacity="0.9"
            />
            {/* label - Arabic text */}
            <text x={c.x + 61} y={c.y + 14}
              fontSize="8" fontWeight="500" fill="white" fillOpacity="0.7"
              fontFamily="system-ui, sans-serif"
              textAnchor="middle" dominantBaseline="hanging">
              {c.label}
            </text>
            {/* value - centered and large */}
            <text x={c.x + 61} y={c.y + 38}
              fontSize="20" fontWeight="700" fill="white" fillOpacity="0.95"
              fontFamily="system-ui, sans-serif"
              textAnchor="middle" dominantBaseline="middle">
              {c.value}
            </text>
            {/* sub - Arabic text */}
            <text x={c.x + 61} y={c.y + 52}
              fontSize="7" fontWeight="400" fill="white" fillOpacity="0.5"
              fontFamily="system-ui, sans-serif"
              textAnchor="middle" dominantBaseline="hanging">
              {c.sub}
            </text>
            {/* progress bar track */}
            <rect x={c.x + 12} y={c.y + 65} width="98" height="3" rx="1.5"
              fill="white" fillOpacity="0.15"
            />
            {/* progress bar fill */}
            <rect x={c.x + 12} y={c.y + 65} width={98 * c.barW} height="3" rx="1.5"
              fill={c.color} opacity="0.9"
            />
          </g>
        ))}

        {/* Red accent node */}
        <circle cx="310" cy="68" r="3.5" fill="#D63A3A" opacity="0.7" className="viz-node"
          style={{ '--delay': '2s', '--dur': '2.6s' } as React.CSSProperties} />
        <line x1="310" y1="68" x2={hubX} y2={hubY}
          stroke="#D63A3A" strokeWidth="0.8" opacity="0.15" strokeDasharray="3 2"
        />
      </svg>
    </div>
  );
}

function HeroViz() {
  const nodes = [
    { cx: 72,  cy: 52,  r: 4,   delay: '0s',    dur: '3.2s' },
    { cx: 148, cy: 28,  r: 3,   delay: '0.6s',  dur: '2.8s' },
    { cx: 220, cy: 60,  r: 4.5, delay: '1.1s',  dur: '3.6s' },
    { cx: 48,  cy: 108, r: 3,   delay: '0.3s',  dur: '2.5s' },
    { cx: 130, cy: 90,  r: 3.5, delay: '1.8s',  dur: '3s'   },
    { cx: 196, cy: 112, r: 3,   delay: '0.9s',  dur: '3.4s' },
    { cx: 260, cy: 44,  r: 3,   delay: '1.4s',  dur: '2.9s' },
    { cx: 290, cy: 100, r: 4,   delay: '0.5s',  dur: '3.1s' },
  ];

  /* flow lines: scattered node → hub at (200, 200) */
  const hubX = 200;
  const hubY = 204;

  const lines = nodes.map((n, i) => ({
    x1: n.cx, y1: n.cy, x2: hubX, y2: hubY,
    delay: `${i * 0.18}s`,
  }));

  /* outcome cards below the hub */
  const cards = [
    { x: 30,  y: 256, label: 'Leads captured', value: '142', sub: 'this week', color: '#6D5DF6', barW: 0.78 },
    { x: 145, y: 272, label: 'Follow-ups sent', value: '98%', sub: 'on schedule', color: '#3B2A78', barW: 0.98 },
    { x: 260, y: 256, label: 'Conversion lift', value: '+34%', sub: 'vs last quarter', color: '#D63A3A', barW: 0.62 },
  ];

  return (
    <div className="relative w-full h-full select-none pointer-events-none" aria-hidden="true">
      <style>{`
        @keyframes node-pulse {
          0%, 100% { opacity: 0.45; transform: scale(1); }
          50%       { opacity: 0.9;  transform: scale(1.6); }
        }
        @keyframes line-draw {
          0%   { stroke-dashoffset: 320; opacity: 0; }
          20%  { opacity: 1; }
          100% { stroke-dashoffset: 0; opacity: 0.22; }
        }
        @keyframes hub-pulse {
          0%, 100% { opacity: 0.5; r: 18; }
          50%       { opacity: 0.9; r: 22; }
        }
        @keyframes card-float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-5px); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes ring-expand {
          0%   { r: 28; opacity: 0.3; }
          100% { r: 52; opacity: 0; }
        }
        .viz-node { animation: node-pulse var(--dur, 3s) var(--delay, 0s) ease-in-out infinite; }
        .viz-line { stroke-dasharray: 320; animation: line-draw 2.4s var(--delay, 0s) ease-out forwards; }
        .hub-ring { animation: ring-expand 2.8s ease-out infinite; }
        .card-0 { animation: card-float 4.2s 0.0s ease-in-out infinite; }
        .card-1 { animation: card-float 4.2s 0.7s ease-in-out infinite; }
        .card-2 { animation: card-float 4.2s 1.4s ease-in-out infinite; }
        .viz-wrap { animation: fade-in-up 1s 0.4s ease-out both; }
      `}</style>

      <svg
        viewBox="0 0 380 420"
        className="viz-wrap absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Subtle dot-grid background */}
        <defs>
          <pattern id="dotgrid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="1" fill="#6D5DF6" opacity="0.12" />
          </pattern>
          <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#6D5DF6" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#6D5DF6" stopOpacity="0"    />
          </radialGradient>
          <radialGradient id="cardBg" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#ffffff" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.03" />
          </radialGradient>
        </defs>

        <rect width="380" height="420" fill="url(#dotgrid)" />

        {/* Flow lines: scattered → hub */}
        {lines.map((l, i) => (
          <line
            key={i}
            x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
            stroke="#6D5DF6"
            strokeWidth="1"
            strokeLinecap="round"
            className="viz-line"
            style={{ '--delay': l.delay } as React.CSSProperties}
          />
        ))}

        {/* Hub glow area */}
        <circle cx={hubX} cy={hubY} r="60" fill="url(#hubGlow)" />

        {/* Expanding ring */}
        <circle cx={hubX} cy={hubY} className="hub-ring" r="28" fill="none" stroke="#6D5DF6" strokeWidth="1" opacity="0.3" />
        <circle cx={hubX} cy={hubY} className="hub-ring" r="28" fill="none" stroke="#6D5DF6" strokeWidth="1" opacity="0.3"
          style={{ animationDelay: '1.4s' }} />

        {/* Hub core */}
        <circle cx={hubX} cy={hubY} r="22" fill="#6D5DF6" opacity="0.15" />
        <circle cx={hubX} cy={hubY} r="14" fill="#6D5DF6" opacity="0.5" />
        <circle cx={hubX} cy={hubY} r="7"  fill="#ffffff" opacity="0.85" />

        {/* Scattered signal nodes */}
        {nodes.map((n, i) => (
          <circle
            key={i}
            cx={n.cx} cy={n.cy} r={n.r}
            fill="#6D5DF6"
            className="viz-node"
            style={{ '--delay': n.delay, '--dur': n.dur } as React.CSSProperties}
          />
        ))}

        {/* Small connector dots on lines */}
        {nodes.map((n, i) => {
          const t = 0.42;
          const mx = n.cx + (hubX - n.cx) * t;
          const my = n.cy + (hubY - n.cy) * t;
          return (
            <circle key={`m${i}`} cx={mx} cy={my} r="1.5"
              fill="#EEEAFE" opacity="0.35"
            />
          );
        })}

        {/* Vertical flow lines hub → cards */}
        {cards.map((c, i) => {
          const cardCX = c.x + 52.5;
          return (
            <line key={`vc${i}`}
              x1={hubX} y1={hubY + 14}
              x2={cardCX} y2={c.y}
              stroke="#6D5DF6" strokeWidth="0.8" opacity="0.18"
              strokeDasharray="4 3"
            />
          );
        })}

        {/* Outcome cards */}
        {cards.map((c, i) => (
          <g key={`card${i}`} className={`card-${i}`}>
            {/* card bg */}
            <rect x={c.x} y={c.y} width="105" height="60" rx="8"
              fill="white" fillOpacity="0.06"
              stroke="white" strokeOpacity="0.12" strokeWidth="0.8"
            />
            {/* top accent */}
            <rect x={c.x} y={c.y} width="105" height="2.5" rx="1"
              fill={c.color} opacity="0.7"
            />
            {/* label */}
            <text x={c.x + 10} y={c.y + 17} fontSize="7" fill="white" fillOpacity="0.45"
              fontFamily="system-ui, sans-serif" letterSpacing="0.03em">
              {c.label.toUpperCase()}
            </text>
            {/* value */}
            <text x={c.x + 10} y={c.y + 35}
              fontSize="16" fontWeight="700" fill="white" fillOpacity="0.9"
              fontFamily="system-ui, sans-serif"
              textAnchor="start">
              {c.value}
            </text>
            {/* sub */}
            <text x={c.x + 10} y={c.y + 48} fontSize="6.5" fill="white" fillOpacity="0.3"
              fontFamily="system-ui, sans-serif">
              {c.sub}
            </text>
            {/* progress bar track */}
            <rect x={c.x + 10} y={c.y + 53} width="85" height="2" rx="1"
              fill="white" fillOpacity="0.1"
            />
            {/* progress bar fill */}
            <rect x={c.x + 10} y={c.y + 53} width={85 * c.barW} height="2" rx="1"
              fill={c.color} opacity="0.7"
            />
          </g>
        ))}

        {/* Label: scattered → organized */}
        <text x="10" y="145" fontSize="7.5" fill="#6D5DF6" fillOpacity="0.5"
          fontFamily="system-ui, sans-serif" letterSpacing="0.12em">
          INCOMING SIGNALS
        </text>
        <text x="240" y="365" fontSize="7.5" fill="#6D5DF6" fillOpacity="0.5"
          fontFamily="system-ui, sans-serif" letterSpacing="0.12em">
          ORGANIZED OUTPUT
        </text>

        {/* Red accent node — one important signal */}
        <circle cx="310" cy="68" r="3.5" fill="#D63A3A" opacity="0.7" className="viz-node"
          style={{ '--delay': '2s', '--dur': '2.6s' } as React.CSSProperties} />
        <line x1="310" y1="68" x2={hubX} y2={hubY}
          stroke="#D63A3A" strokeWidth="0.8" opacity="0.15" strokeDasharray="3 2"
        />
      </svg>
    </div>
  );
}

export function Hero() {
  const { t, language } = useLanguage();
  const isRTL = language === 'ar';

  return (
    <section
      className="relative flex items-center overflow-hidden min-h-[500px] lg:min-h-[640px]"
    >
      {/* Base dark layer */}
      <div className="absolute inset-0 bg-[#0a0c12]" />

      {/* Subtle ambient glow — bottom center (from CTA button area) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 40% 35% at 20% 65%, rgba(109,93,246,0.08) 0%, transparent 50%)',
        }}
      />

      {/* Very subtle visualization glow — right side only */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 45% 50% at 85% 45%, rgba(109,93,246,0.06) 0%, transparent 60%)',
        }}
      />

      {/* Very subtle noise texture via SVG */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
          backgroundSize: '180px 180px',
        }}
      />

      {/* Horizontal rule at top — subtle brand accent */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#6D5DF6]/25 to-transparent" />

      {/* Bottom vignette */}
      <div
        className="absolute inset-x-0 bottom-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(10,12,18,0.95), transparent)' }}
      />

      {/* ── Main content grid ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 pt-20 pb-12 lg:pt-32 lg:pb-24">
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-8">

          {/* ── LEFT: Text content ── */}
          <div className="flex-shrink-0 lg:w-[52%] max-w-[560px]">

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/[0.06] border border-white/[0.11] rounded-full mb-6 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#6D5DF6] animate-pulse" />
              <p className="text-[11px] sm:text-xs text-[#EEEAFE]/60 tracking-[0.15em] uppercase font-medium">
                {t('hero.tag1')}
              </p>
            </div>

            <h1
              className={`font-bold tracking-tight text-white mb-5 ${language === 'ar' ? 'leading-[1.2]' : 'leading-[1.06]'}`}
              style={{ fontSize: language === 'ar' ? 'clamp(1.5rem, 4vw, 2.8rem)' : 'clamp(1.5rem, 5vw, 3.6rem)' }}
            >
              {t('hero.headline')}
            </h1>

            <p className="text-sm sm:text-[15px] text-[#EEEAFE]/65 leading-[1.78] mb-9 max-w-[440px]">
              {t('hero.subheadline')}
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/book-consultation"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#6D5DF6] text-white rounded-xl hover:bg-[#5d4de6] active:scale-[0.98] transition-all duration-200 text-sm font-semibold shadow-lg shadow-[#6D5DF6]/35"
              >
                {t('hero.primaryCTA')} <ArrowRight size={15} />
              </Link>
              <Link
                to="/solutions"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-white/[0.18] text-white/75 rounded-xl hover:bg-white/[0.05] hover:border-white/30 active:scale-[0.98] transition-all duration-200 text-sm font-medium"
              >
                {t('hero.secondaryCTA')}
              </Link>
            </div>

            <div className="flex items-center gap-3 mt-8">
              <div className="flex -space-x-1.5">
                {['#3B2A78','#6D5DF6','#4a3a8a'].map((c, i) => (
                  <div key={i} className="w-6 h-6 rounded-full border border-[#0a0c12]" style={{ background: c, opacity: 0.7 }} />
                ))}
              </div>
              <div className="w-px h-3 bg-white/15" />
              <p className="text-[11px] text-[#EEEAFE]/35 leading-relaxed">
                {t('hero.trustLine')}
              </p>
            </div>
          </div>

          {/* ── RIGHT: Custom visualization (desktop) ── */}
          <div
            className="hidden lg:block flex-1 relative"
            style={{ height: 'clamp(340px, 50vh, 440px)' }}
          >
            {/* Outer glow container */}
            <div
              className="absolute inset-0 rounded-3xl"
              style={{
                background: 'radial-gradient(ellipse 80% 80% at 50% 50%, rgba(109,93,246,0.07) 0%, transparent 70%)',
              }}
            />
            {isRTL ? <HeroVizArabic /> : <HeroViz />}
          </div>

        </div>
      </div>

      {/* Mobile: simplified visualization as background (no text/cards) */}
      <div
        className="absolute inset-0 lg:hidden overflow-hidden"
        style={{ pointerEvents: 'none' }}
      >
        {/* Simplified hero visualization for mobile */}
        <div
          className="absolute inset-0"
          style={{
            transform: 'scale(1.3)',
            transformOrigin: 'center 45%',
            opacity: 0.7,
          }}
        >
          <HeroVizSimple />
        </div>

        {/* Dark overlay for text readability - lighter */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(10,12,18,0.7) 0%, rgba(10,12,18,0.75) 35%, rgba(10,12,18,0.68) 100%)',
          }}
        />

        {/* Additional centered dark area behind text - softer */}
        <div
          className="absolute inset-x-0 top-0"
          style={{
            height: '65%',
            background: 'radial-gradient(ellipse 85% 70% at 50% 35%, rgba(10,12,18,0.45) 0%, transparent 55%)',
          }}
        />
      </div>
    </section>
  );
}
