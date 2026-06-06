interface EnsdimMarkProps {
  className?: string;
}

export function EnsdimMark({ className = '' }: EnsdimMarkProps) {
  return (
    <span className={`no-mirror ${className}`}>
      <span style={{ color: '#D63A3A' }}>EN</span>SDIM
    </span>
  );
}
