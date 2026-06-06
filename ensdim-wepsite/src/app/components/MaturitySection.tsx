import { Link } from 'react-router';
import { useLanguage } from '../../contexts/LanguageContext';

/* ─── Custom ENSDIM icons for each maturity stage ─────────────────────────
   Build  → Layered foundation blocks with first signal rising
   Start  → Nodes connecting into an active workflow path
   Growth → Expanding data network with controlled scale structure
   ─────────────────────────────────────────────────────────────────────── */

function BuildIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <style>{`
        @keyframes build-layer-1 { 0%, 100% { opacity: 0.25; transform: translateY(0); } 50% { opacity: 0.35; transform: translateY(-1px); } }
        @keyframes build-layer-2 { 0%, 100% { opacity: 0.5; transform: translateY(0); } 50% { opacity: 0.65; transform: translateY(-1px); } }
        @keyframes build-layer-3 { 0%, 100% { opacity: 0.8; transform: translateY(0); } 50% { opacity: 1; transform: translateY(-1px); } }
        @keyframes build-pulse { 0%, 100% { opacity: 0.6; r: 2.5px; } 50% { opacity: 1; r: 3.5px; } }
        @keyframes build-rays { 0%, 100% { opacity: 0.3; } 50% { opacity: 0.7; } }
        .build-layer-1 { animation: build-layer-1 2.5s ease-in-out infinite; animation-delay: 0s; }
        .build-layer-2 { animation: build-layer-2 2.5s ease-in-out infinite; animation-delay: 0.2s; }
        .build-layer-3 { animation: build-layer-3 2.5s ease-in-out infinite; animation-delay: 0.4s; }
        .build-pulse { animation: build-pulse 2s ease-in-out infinite; }
        .build-ray-1 { animation: build-rays 2s ease-in-out infinite; animation-delay: 0s; }
        .build-ray-2 { animation: build-rays 2s ease-in-out infinite; animation-delay: 0.15s; }
      `}</style>
      {/* Foundation layer — widest, bottom */}
      <rect x="6" y="36" width="36" height="5" rx="2" fill="white" className="build-layer-1"/>
      {/* Middle layer */}
      <rect x="11" y="28" width="26" height="5" rx="2" fill="white" className="build-layer-2"/>
      {/* Top layer */}
      <rect x="16" y="20" width="16" height="5" rx="2" fill="white" className="build-layer-3"/>
      {/* Signal rising from center — first activation */}
      <line x1="24" y1="19" x2="24" y2="12" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
      {/* Signal dot at top */}
      <circle cx="24" cy="10" r="2.5" fill="white" className="build-pulse"/>
      {/* Radiating pulse lines */}
      <line x1="24" y1="10" x2="19" y2="6" stroke="white" strokeWidth="1.2" strokeLinecap="round" className="build-ray-1"/>
      <line x1="24" y1="10" x2="29" y2="6" stroke="white" strokeWidth="1.2" strokeLinecap="round" className="build-ray-2"/>
    </svg>
  );
}

function StartIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <style>{`
        @keyframes start-path { 0% { stroke-dashoffset: 32; } 100% { stroke-dashoffset: 0; } }
        @keyframes start-node-1 { 0%, 100% { opacity: 0.3; } 50% { opacity: 0.5; } }
        @keyframes start-node-2 { 0%, 100% { opacity: 0.7; r: 5px; } 50% { opacity: 1; r: 6px; } }
        @keyframes start-node-3 { 0%, 100% { opacity: 0.8; } 50% { opacity: 1; } }
        @keyframes start-arrow { 0%, 100% { opacity: 0.6; transform: translateX(0); } 50% { opacity: 1; transform: translateX(2px); } }
        @keyframes start-branch { 0%, 100% { opacity: 0.4; } 50% { opacity: 0.7; } }
        .start-path { animation: start-path 3s linear infinite; }
        .start-node-1 { animation: start-node-1 2.5s ease-in-out infinite; }
        .start-node-2 { animation: start-node-2 2s ease-in-out infinite; }
        .start-node-3 { animation: start-node-3 2s ease-in-out infinite; animation-delay: 0.3s; }
        .start-arrow { animation: start-arrow 1.5s ease-in-out infinite; }
        .start-branch-1 { animation: start-branch 2.5s ease-in-out infinite; animation-delay: 0s; }
        .start-branch-2 { animation: start-branch 2.5s ease-in-out infinite; animation-delay: 0.2s; }
      `}</style>
      {/* Horizontal workflow path */}
      <line x1="8" y1="24" x2="40" y2="24" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeDasharray="3 2" className="start-path"/>
      {/* Node 1 — inactive */}
      <circle cx="10" cy="24" r="4" fill="white" className="start-node-1"/>
      {/* Node 2 — activating */}
      <circle cx="24" cy="24" r="5" fill="white" className="start-node-2"/>
      <circle cx="24" cy="24" r="2.5" fill="white"/>
      {/* Node 3 — active destination */}
      <circle cx="38" cy="24" r="4" stroke="white" strokeWidth="1.8" fill="none" className="start-node-3"/>
      {/* Arrow indicating direction */}
      <g className="start-arrow" style={{ transformOrigin: '36px 24px' }}>
        <path d="M34 20 L38 24 L34 28" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
      {/* Vertical branch from active node — showing workflow expanding */}
      <line x1="24" y1="19" x2="24" y2="12" stroke="white" strokeWidth="1.6" strokeLinecap="round" className="start-branch-1"/>
      <circle cx="24" cy="10.5" r="2.5" stroke="white" strokeWidth="1.5" fill="none" className="start-branch-1"/>
      <line x1="24" y1="29" x2="24" y2="36" stroke="white" strokeWidth="1.6" strokeLinecap="round" className="start-branch-2"/>
      <circle cx="24" cy="37.5" r="2.5" stroke="white" strokeWidth="1.5" fill="none" className="start-branch-2"/>
    </svg>
  );
}

function GrowthIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <style>{`
        @keyframes growth-core { 0%, 100% { r: 4.5px; } 50% { r: 5px; } }
        @keyframes growth-ring-1 { 0% { r: 9px; opacity: 0.25; } 50% { r: 10px; opacity: 0.4; } 100% { r: 9px; opacity: 0.25; } }
        @keyframes growth-ring-2 { 0% { r: 16px; opacity: 0.12; } 50% { r: 17px; opacity: 0.25; } 100% { r: 16px; opacity: 0.12; } }
        @keyframes growth-spoke { 0%, 100% { opacity: 0.5; } 50% { opacity: 0.8; } }
        @keyframes growth-node { 0%, 100% { opacity: 0.7; } 50% { opacity: 1; } }
        .growth-core { animation: growth-core 2.5s ease-in-out infinite; }
        .growth-ring-1 { animation: growth-ring-1 3s ease-in-out infinite; }
        .growth-ring-2 { animation: growth-ring-2 3.5s ease-in-out infinite; animation-delay: 0.3s; }
      `}</style>
      {/* Center core node */}
      <circle cx="24" cy="24" r="4.5" fill="white" className="growth-core"/>
      {/* Inner ring */}
      <circle cx="24" cy="24" r="9" stroke="white" strokeWidth="1" fill="none" className="growth-ring-1"/>
      {/* Outer ring */}
      <circle cx="24" cy="24" r="16" stroke="white" strokeWidth="0.8" fill="none" className="growth-ring-2"/>
      {/* 6 satellite nodes expanding outward */}
      {[0, 60, 120, 180, 240, 300].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        const x1 = 24 + 9.5 * Math.cos(rad);
        const y1 = 24 + 9.5 * Math.sin(rad);
        const x2 = 24 + 16 * Math.cos(rad);
        const y2 = 24 + 16 * Math.sin(rad);
        const isActive = i % 2 === 0;
        return (
          <g key={i} style={{ animation: `growth-spoke 2s ease-in-out infinite`, animationDelay: `${i * 0.15}s` }}>
            {/* spoke line */}
            <line x1={x1} y1={y1} x2={x2} y2={y2}
              stroke="white" strokeWidth="1.2" strokeLinecap="round" opacity={isActive ? 0.7 : 0.35}/>
            {/* outer node */}
            <circle cx={x2} cy={y2} r={isActive ? 3 : 2}
              fill={isActive ? 'white' : 'none'}
              stroke="white" strokeWidth="1.4"
              style={{ animation: `growth-node 2s ease-in-out infinite`, animationDelay: `${i * 0.15}s` }}/>
          </g>
        );
      })}
    </svg>
  );
}

export function MaturitySection() {
  const { t } = useLanguage();

  const stages = [
    {
      Icon: BuildIcon,
      stage: t('maturity.stage1'),
      title: t('maturity.stage1Title'),
      description: t('maturity.stage1Desc'),
      bestFor: t('maturity.stage1BestFor'),
      cta: t('maturity.stage1CTA'),
      href: '/solutions/build',
      gradient: 'from-[#3B2A78] to-[#5040A0]',
      accent: '#6D5DF6',
    },
    {
      Icon: StartIcon,
      stage: t('maturity.stage2'),
      title: t('maturity.stage2Title'),
      description: t('maturity.stage2Desc'),
      bestFor: t('maturity.stage2BestFor'),
      cta: t('maturity.stage2CTA'),
      href: '/solutions/start',
      gradient: 'from-[#1a1a2e] to-[#3B2A78]',
      accent: '#8B7BF7',
    },
    {
      Icon: GrowthIcon,
      stage: t('maturity.stage3'),
      title: t('maturity.stage3Title'),
      description: t('maturity.stage3Desc'),
      bestFor: t('maturity.stage3BestFor'),
      cta: t('maturity.stage3CTA'),
      href: '/solutions/growth',
      gradient: 'from-[#6D5DF6] to-[#3B2A78]',
      accent: '#9B8BFF',
    },
  ];

  return (
    <section className="py-20 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <h2 className="text-2xl sm:text-4xl font-bold text-[#101418] mb-3">
            {t('maturity.title')}
          </h2>
          <p className="text-base sm:text-lg text-[#69717D] max-w-2xl mx-auto">
            {t('maturity.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {stages.map((item, index) => (
            <Link
              key={index}
              to={item.href}
              className="group relative flex flex-col bg-white rounded-2xl border border-[#EBEBEB] hover:border-[#6D5DF6]/50 hover:shadow-[0_20px_60px_rgba(109,93,246,0.15)] hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer"
            >
              {/* Gradient icon panel */}
              <div className={`bg-gradient-to-br ${item.gradient} px-7 pt-8 pb-7 relative overflow-hidden group-hover:pb-8 transition-all duration-500`}>
                <div className="absolute inset-0 opacity-20 group-hover:opacity-35 transition-opacity duration-500" style={{ background: 'radial-gradient(ellipse 80% 80% at 50% 0%, rgba(255,255,255,0.12) 0%, transparent 70%)' }} />
                {/* Animated glow effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'radial-gradient(circle at 50% 30%, rgba(255,255,255,0.15) 0%, transparent 60%)' }} />
                <div className="relative w-20 h-20 sm:w-16 sm:h-16 mb-4 group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
                  <item.Icon />
                </div>
                <span className="relative text-base sm:text-sm font-extrabold uppercase tracking-[0.2em] text-white/80 group-hover:text-white transition-colors duration-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
                  {item.stage}
                </span>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-7">
                <h3 className="text-xl font-bold text-[#101418] mb-3 leading-snug group-hover:text-[#6D5DF6] transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-sm text-[#69717D] mb-5 leading-relaxed">
                  {item.description}
                </p>

                <div className="mb-6 flex-1">
                  <p className="text-[10px] font-semibold text-[#69717D] uppercase tracking-wider mb-3">
                    {t('maturity.bestFor')}
                  </p>
                  <div className="space-y-2.5">
                    {Array.isArray(item.bestFor) && item.bestFor.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2.5 group/item">
                        <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 group-hover/item:scale-150 transition-transform duration-300" style={{ backgroundColor: item.accent }} />
                        <span className="text-sm text-[#101418] group-hover/item:text-[#6D5DF6] transition-colors duration-200">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="w-full mt-auto inline-flex items-center justify-center gap-2 px-4 py-3 border border-[#E5E5E5] text-[#69717D] rounded-xl group-hover:border-[#6D5DF6] group-hover:text-white group-hover:bg-[#6D5DF6] group-hover:shadow-lg group-hover:shadow-[#6D5DF6]/25 transition-all duration-300 text-sm font-semibold">
                  {item.cta}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
