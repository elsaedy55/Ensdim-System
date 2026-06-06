// Custom ENSDIM brand icon system
// Stroke-based, rounded, 24x24 viewport, consistent 1.5px stroke weight

interface IconProps {
  className?: string;
  size?: number;
  color?: string;
}

const base = (size: number, className: string, color?: string) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: color || 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  className,
});

// Problems Icons

export function IconScatteredFollowup({ size = 24, className = '', color }: IconProps) {
  return (
    <svg {...base(size, className, color)}>
      <circle cx="4" cy="12" r="2" />
      <circle cx="12" cy="5" r="2" />
      <circle cx="20" cy="12" r="2" />
      <circle cx="12" cy="19" r="2" />
      <path d="M6 12h2.5M13.5 12H18" strokeDasharray="2 1.5" opacity="0.5" />
      <path d="M12 7v2.5M12 13.5V17" strokeDasharray="2 1.5" opacity="0.5" />
      <path d="M5.5 10.5l3.5-3.5M15 7l3.5 3.5" strokeDasharray="2 1.5" opacity="0.5" />
    </svg>
  );
}

export function IconInvisibleData({ size = 24, className = '', color }: IconProps) {
  return (
    <svg {...base(size, className, color)}>
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <path d="M7 10h2M7 14h4" />
      <path d="M15 10l4 4M19 10l-4 4" strokeWidth={1.5} />
      <path d="M3 3l18 18" strokeWidth={1} opacity="0.3" />
    </svg>
  );
}

export function IconWhatsAppChaos({ size = 24, className = '', color }: IconProps) {
  return (
    <svg {...base(size, className, color)}>
      <path d="M4 6h10a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H8l-3 2v-2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z" />
      <path d="M14 4h4a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-1" opacity="0.5" />
      <path d="M8 10h4" />
      <path d="M8 13.5h2" />
    </svg>
  );
}

export function IconUnclearWorkflow({ size = 24, className = '', color }: IconProps) {
  return (
    <svg {...base(size, className, color)}>
      <rect x="2" y="4" width="5" height="5" rx="1" />
      <rect x="9.5" y="9.5" width="5" height="5" rx="1" />
      <rect x="17" y="15" width="5" height="5" rx="1" />
      <path d="M7 6.5h1.5M14.5 12h1.5" strokeDasharray="1.5 1.5" opacity="0.5" />
      <path d="M9 9l1.5-1.5" strokeDasharray="1.5 1.5" opacity="0.5" />
      <path d="M16.5 14.5l1-1" strokeDasharray="1.5 1.5" opacity="0.5" />
      <circle cx="8.5" cy="6.5" r="0.5" fill="currentColor" />
      <circle cx="16" cy="12" r="0.5" fill="currentColor" />
    </svg>
  );
}

export function IconNoVisibility({ size = 24, className = '', color }: IconProps) {
  return (
    <svg {...base(size, className, color)}>
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M6 17v4M18 17v4M3 21h18" />
      <path d="M6 10v3M9 8v5M12 11v2M15 7v6M18 9v4" opacity="0.4" strokeDasharray="1 1" />
      <circle cx="12" cy="10" r="1.5" opacity="0.3" />
    </svg>
  );
}

export function IconUnstructuredGrowth({ size = 24, className = '', color }: IconProps) {
  return (
    <svg {...base(size, className, color)}>
      <path d="M3 17l5-5 3 3 4-6 4 2" />
      <path d="M17 8h4v4" />
      <path d="M3 21h18" />
      <path d="M3 17l5-5 3 3" strokeDasharray="2 1.5" opacity="0.4" />
      <circle cx="8" cy="12" r="1" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

// Solutions Icons

export function IconSmartOperations({ size = 24, className = '', color }: IconProps) {
  return (
    <svg {...base(size, className, color)}>
      <circle cx="12" cy="12" r="3" />
      <circle cx="5" cy="7" r="2" />
      <circle cx="19" cy="7" r="2" />
      <circle cx="5" cy="17" r="2" />
      <circle cx="19" cy="17" r="2" />
      <path d="M7 7.5l3.5 3M14.5 10.5l3-3M7 16.5l3.5-3M14.5 13.5l3 3" strokeWidth={1} />
      <path d="M10 12h-3M17 12h-3" strokeWidth={1} />
    </svg>
  );
}

export function IconCustomerJourney({ size = 24, className = '', color }: IconProps) {
  return (
    <svg {...base(size, className, color)}>
      <circle cx="4" cy="12" r="2" />
      <circle cx="12" cy="12" r="2" />
      <circle cx="20" cy="12" r="2" />
      <path d="M6 12h4M14 12h4" />
      <path d="M4 10V7a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v3" opacity="0.4" />
      <path d="M4 14v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3" opacity="0.4" />
      <circle cx="12" cy="5" r="1" fill="currentColor" opacity="0.5" />
      <circle cx="12" cy="19" r="1" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

export function IconAIOperations({ size = 24, className = '', color }: IconProps) {
  return (
    <svg {...base(size, className, color)}>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M8 8h8M8 12h8M8 16h5" />
      <circle cx="19" cy="16" r="2" />
      <path d="M17.5 14.5l1 1" />
    </svg>
  );
}

export function IconBusinessGrowth({ size = 24, className = '', color }: IconProps) {
  return (
    <svg {...base(size, className, color)}>
      <path d="M3 20h18" />
      <path d="M5 20V14l3-3 3 3 4-6 4 3V20" />
      <circle cx="8" cy="11" r="1" fill="currentColor" opacity="0.6" />
      <circle cx="12" cy="14" r="1" fill="currentColor" opacity="0.6" />
      <circle cx="16" cy="8" r="1" fill="currentColor" opacity="0.6" />
    </svg>
  );
}

// Client Portal Icons

export function IconProjectProgress({ size = 24, className = '', color }: IconProps) {
  return (
    <svg {...base(size, className, color)}>
      <circle cx="12" cy="12" r="9" strokeWidth={1} opacity="0.3" />
      <path d="M12 3a9 9 0 0 1 6.364 15.364" strokeWidth={1.5} />
      <path d="M12 7v5l3 3" strokeWidth={1.5} />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </svg>
  );
}

export function IconDocuments({ size = 24, className = '', color }: IconProps) {
  return (
    <svg {...base(size, className, color)}>
      <path d="M6 2h9l4 4v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" />
      <path d="M14 2v4h4" />
      <path d="M8 9h8M8 13h8M8 17h5" />
    </svg>
  );
}

export function IconPayments({ size = 24, className = '', color }: IconProps) {
  return (
    <svg {...base(size, className, color)}>
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="M2 10h20" />
      <path d="M6 15h3M14 15h4" />
      <circle cx="6" cy="7.5" r="1" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

export function IconComments({ size = 24, className = '', color }: IconProps) {
  return (
    <svg {...base(size, className, color)}>
      <path d="M4 4h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-6l-4 3v-3H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
      <path d="M7 9h10M7 13h6" />
    </svg>
  );
}

export function IconMultiProject({ size = 24, className = '', color }: IconProps) {
  return (
    <svg {...base(size, className, color)}>
      <rect x="2" y="7" width="16" height="13" rx="2" />
      <path d="M5 7V5a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2h-2" />
      <path d="M6 12h8M6 16h5" />
    </svg>
  );
}

// Methodology Icons

export function IconDiagnose({ size = 24, className = '', color }: IconProps) {
  return (
    <svg {...base(size, className, color)}>
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3-3" />
      <circle cx="11" cy="11" r="3" strokeWidth={1} opacity="0.4" />
      <path d="M11 8v2M11 12v1M8 11h2M12 11h1" strokeWidth={1} opacity="0.6" />
    </svg>
  );
}

export function IconMap({ size = 24, className = '', color }: IconProps) {
  return (
    <svg {...base(size, className, color)}>
      <circle cx="5" cy="7" r="2" />
      <circle cx="19" cy="7" r="2" />
      <circle cx="12" cy="17" r="2" />
      <path d="M7 7h10" />
      <path d="M6 9l5 6M13 15l5-6" opacity="0.6" />
      <circle cx="12" cy="7" r="1" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

export function IconDesign({ size = 24, className = '', color }: IconProps) {
  return (
    <svg {...base(size, className, color)}>
      <rect x="3" y="3" width="8" height="8" rx="1" />
      <rect x="13" y="3" width="8" height="8" rx="1" />
      <rect x="3" y="13" width="8" height="8" rx="1" />
      <rect x="13" y="13" width="8" height="8" rx="1" />
      <path d="M11 7h2M11 17h2M7 11v2M17 11v2" strokeWidth={1} opacity="0.5" />
    </svg>
  );
}

export function IconBuild({ size = 24, className = '', color }: IconProps) {
  return (
    <svg {...base(size, className, color)}>
      <rect x="3" y="15" width="18" height="4" rx="1" />
      <rect x="6" y="10" width="12" height="4" rx="1" />
      <rect x="9" y="5" width="6" height="4" rx="1" />
      <path d="M12 5V3M7 19v2M17 19v2" strokeWidth={1} opacity="0.4" />
    </svg>
  );
}

export function IconAutomate({ size = 24, className = '', color }: IconProps) {
  return (
    <svg {...base(size, className, color)}>
      <path d="M13 2L4 14h8l-1 8 9-12h-8l1-8z" />
    </svg>
  );
}

export function IconImprove({ size = 24, className = '', color }: IconProps) {
  return (
    <svg {...base(size, className, color)}>
      <path d="M3 17l5-5 3 3 4-6 4 2" />
      <circle cx="8" cy="12" r="1.5" fill="currentColor" opacity="0.5" />
      <circle cx="11" cy="15" r="1.5" fill="currentColor" opacity="0.5" />
      <circle cx="15" cy="9" r="1.5" fill="currentColor" opacity="0.5" />
      <circle cx="19" cy="11" r="1.5" fill="currentColor" opacity="0.5" />
      <path d="M19 8v3h-3" strokeWidth={1.5} />
      <path d="M3 20h18" opacity="0.3" />
    </svg>
  );
}
