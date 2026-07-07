import Image from "next/image";
import ensdimLogo from "../../../public/brand/ensdim-logo.png";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-(--bg-base) px-4 py-12">
      {/* Logo */}
      <div className="mb-8">
        <Image
          src={ensdimLogo}
          alt="Ensdim"
          priority
          className="h-8 w-auto object-contain auth-logo"
        />
      </div>
      {children}
    </div>
  );
}
