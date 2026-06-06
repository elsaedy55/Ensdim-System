interface EnsdimWordmarkProps {
  variant?: 'dark' | 'light';
  className?: string;
}

export function EnsdimWordmark({ variant = 'dark', className = '' }: EnsdimWordmarkProps) {
  const sdimColor = variant === 'light' ? '#ffffff' : '#101418';

  return (
    <span
      className={className}
      style={{
        fontFamily: 'var(--font-heading)',
        fontWeight: 800,
        letterSpacing: '-0.03em',
        lineHeight: 1,
        display: 'inline-block',
      }}
    >
      <span style={{ color: '#D63A3A' }}>EN</span>
      <span style={{ color: sdimColor }}>SDIM</span>
    </span>
  );
}
