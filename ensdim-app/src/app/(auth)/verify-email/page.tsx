"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { verifyOtp, resendVerification } from "@/lib/auth.service";

const OTP_LENGTH = 6;

function OtpInput({ value, onChange, digitLabel }: {
  value: string;
  onChange: (v: string) => void;
  digitLabel: (n: number) => string;
}) {
  const inputRefs = React.useRef<Array<HTMLInputElement | null>>([]);

  const handleKey = (idx: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !value[idx] && idx > 0) {
      inputRefs.current[idx - 1]?.focus();
    }
  };

  const handleChange = (idx: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const digit = e.target.value.replace(/\D/g, "").slice(-1);
    const arr = value.split("");
    arr[idx] = digit;
    const next = arr.join("").padEnd(OTP_LENGTH, "").slice(0, OTP_LENGTH);
    onChange(next.trimEnd());
    if (digit && idx < OTP_LENGTH - 1) inputRefs.current[idx + 1]?.focus();
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    onChange(text);
    inputRefs.current[Math.min(text.length, OTP_LENGTH - 1)]?.focus();
    e.preventDefault();
  };

  return (
    <div className="flex gap-2 justify-center" onPaste={handlePaste}>
      {Array.from({ length: OTP_LENGTH }).map((_, idx) => (
        <input
          key={idx}
          ref={(el) => { inputRefs.current[idx] = el; }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[idx] ?? ""}
          onChange={(e) => handleChange(idx, e)}
          onKeyDown={(e) => handleKey(idx, e)}
          className="h-12 w-10 rounded-md border border-(--border) bg-(--bg-surface) text-center text-lg font-bold text-(--text-primary) focus:border-(--accent) focus:ring-2 focus:ring-(--accent)/20 outline-none transition-colors"
          aria-label={digitLabel(idx + 1)}
        />
      ))}
    </div>
  );
}

export default function VerifyEmailPage() {
  const t      = useTranslations("auth.verifyEmail");
  const router = useRouter();
  const searchParams = useSearchParams();
  const email  = searchParams.get("email") ?? "";

  const [otp, setOtp]         = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError]     = React.useState<string | null>(null);
  const [verified, setVerified] = React.useState(false);
  const [cooldown, setCooldown] = React.useState(0);

  React.useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length < OTP_LENGTH) { setError(t("errors.invalidOtp")); return; }
    setError(null);
    setLoading(true);
    try {
      await verifyOtp(email, otp);
      setVerified(true);
    } catch {
      setError(t("errors.invalidOtp"));
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email) return;
    setCooldown(60);
    try { await resendVerification(email); } catch { /* ignore */ }
  };

  if (verified) {
    return (
      <div className="w-full max-w-sm">
        <div className="surface p-8 shadow-(--shadow-md) text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-(--success-subtle)">
            <CheckCircle className="h-7 w-7 text-(--success)" />
          </div>
          <h2 className="text-lg font-bold text-(--text-primary)">{t("success.title")}</h2>
          <p className="mt-2 text-sm text-(--text-muted)">{t("success.body")}</p>
          <Button className="mt-6 w-full" onClick={() => router.push(ROUTES.LOGIN)}>
            {t("success.button")}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm">
      <div className="surface p-8 shadow-(--shadow-md)">
        <div className="mb-5 flex flex-col items-center text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-(--accent-subtle)">
            <Mail className="h-7 w-7 text-(--accent)" />
          </div>
          <h1 className="text-xl font-bold text-(--text-primary)">{t("title")}</h1>
          <p className="mt-1.5 text-sm text-(--text-muted)">{t("body", { email: email || "your email" })}</p>
        </div>

        <form onSubmit={handleVerify} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-(--text-secondary) mb-2.5 text-center">{t("otpLabel")}</label>
            <OtpInput value={otp} onChange={setOtp} digitLabel={(n) => t("otpDigitLabel", { n })} />
          </div>
          {error && <p className="text-center text-sm text-(--danger)">{error}</p>}
          <Button type="submit" className="w-full" size="lg" loading={loading} disabled={otp.length < OTP_LENGTH}>
            {t("submitButton")}
          </Button>
        </form>

        <div className="mt-5 text-center">
          <p className="text-sm text-(--text-muted)">{t("didntReceive")}</p>
          {cooldown > 0 ? (
            <p className="text-sm text-(--text-muted) mt-1">{t("resendIn", { seconds: cooldown })}</p>
          ) : (
            <button type="button" onClick={handleResend} className="mt-1 text-sm font-medium text-(--accent) hover:text-(--accent-hover) transition-colors">
              {t("resendButton")}
            </button>
          )}
        </div>
      </div>

      <p className="mt-6 text-center text-sm text-(--text-muted)">
        <Link href={ROUTES.REGISTER} className="inline-flex items-center gap-1 font-medium text-(--accent) hover:text-(--accent-hover)">
          <ArrowLeft className="h-3.5 w-3.5 rtl:scale-x-[-1]" /> {t("wrongEmail")} {t("goBack")}
        </Link>
      </p>
    </div>
  );
}
