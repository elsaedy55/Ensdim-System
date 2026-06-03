export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-(--bg-base) px-4 py-12">
      {/* Logo */}
      <div className="mb-8">
        <span className="text-2xl font-bold tracking-tight text-(--text-primary)">
          Ensdim
        </span>
      </div>
      {children}
    </div>
  );
}
