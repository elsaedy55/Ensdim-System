"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormField } from "@/components/ui/form-field";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";
import { Check, Building2, Users, ChevronRight, ChevronLeft, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useAuthStore } from "@/store/auth.store";

// ─── Step indicator ───────────────────────────────────────────────

function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-2 mb-8">
      {Array.from({ length: total }).map((_, i) => (
        <React.Fragment key={i}>
          <div className={cn(
            "flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition-all",
            i < current  ? "bg-(--success) text-white" :
            i === current ? "bg-(--accent) text-white" :
            "bg-(--bg-muted) text-(--text-muted)",
          )}>
            {i < current ? <Check className="h-4 w-4" /> : i + 1}
          </div>
          {i < total - 1 && (
            <div className={cn("flex-1 h-0.5 rounded-full transition-colors", i < current ? "bg-(--success)" : "bg-(--border)")} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

// ─── Step 1: Company Info ─────────────────────────────────────────

function Step1({
  onNext,
}: {
  onNext: (data: { companyName: string; industry: string }) => void;
}) {
  const schema = z.object({
    companyName: z.string().min(2, "Company name must be at least 2 characters"),
    industry:    z.string().min(1, "Please select an industry"),
  });
  type Form = z.infer<typeof schema>;

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<Form>({
    resolver: zodResolver(schema),
  });

  const INDUSTRIES = [
    "Software Agency", "Design Agency", "Marketing Agency",
    "Development Studio", "Consulting", "Other",
  ];

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-5">
      <div className="text-center mb-6">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-(--accent-subtle)">
          <Building2 className="h-7 w-7 text-(--accent)" />
        </div>
        <h1 className="text-2xl font-bold text-(--text-primary)">Welcome to Ensdim 👋</h1>
        <p className="mt-1 text-sm text-(--text-muted)">Let's set up your workspace in a few steps.</p>
      </div>

      <FormField label="Company Name" required htmlFor="co-name" error={errors.companyName?.message}>
        <Input
          id="co-name"
          placeholder="Ensdim Agency"
          leftElement={<Building2 className="h-4 w-4" />}
          autoFocus
          {...register("companyName")}
        />
      </FormField>

      <FormField label="Industry" required error={errors.industry?.message}>
        <Select onValueChange={(v) => setValue("industry", v, { shouldValidate: true })}>
          <SelectTrigger><SelectValue placeholder="Select industry" /></SelectTrigger>
          <SelectContent>
            {INDUSTRIES.map((ind) => <SelectItem key={ind} value={ind}>{ind}</SelectItem>)}
          </SelectContent>
        </Select>
      </FormField>

      <Button type="submit" size="lg" className="w-full">
        Get Started <ChevronRight className="h-4 w-4 ms-1 rtl:scale-x-[-1]" />
      </Button>
    </form>
  );
}

// ─── Step 2: Role Selection ────────────────────────────────────────

function Step2({
  onNext,
  onBack,
}: {
  onNext: (role: "client" | "admin") => void;
  onBack: () => void;
}) {
  const [selected, setSelected] = React.useState<"client" | "admin" | null>(null);

  const ROLES = [
    {
      id: "client" as const,
      emoji: "👤",
      title: "Client",
      description: "I'm a client tracking my project progress and deliverables.",
    },
    {
      id: "admin" as const,
      emoji: "🏢",
      title: "Agency",
      description: "I manage an agency, my team, and client projects.",
    },
  ];

  return (
    <div className="space-y-5">
      <div className="text-center mb-6">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-(--accent-subtle)">
          <Users className="h-7 w-7 text-(--accent)" />
        </div>
        <h1 className="text-2xl font-bold text-(--text-primary)">What's your role?</h1>
        <p className="mt-1 text-sm text-(--text-muted)">This helps us set up the right experience for you.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {ROLES.map((role) => (
          <button
            key={role.id}
            type="button"
            onClick={() => setSelected(role.id)}
            className={cn(
              "flex flex-col items-start gap-3 rounded-2xl border-2 p-5 text-start transition-all",
              selected === role.id
                ? "border-(--accent) bg-(--accent-subtle)"
                : "border-(--border) hover:border-(--accent-muted) hover:bg-(--bg-muted)",
            )}
          >
            <span className="text-3xl">{role.emoji}</span>
            <div>
              <p className="text-sm font-semibold text-(--text-primary)">{role.title}</p>
              <p className="mt-0.5 text-xs text-(--text-muted) leading-relaxed">{role.description}</p>
            </div>
            {selected === role.id && (
              <div className="ms-auto mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-(--accent)">
                <Check className="h-3 w-3 text-white" />
              </div>
            )}
          </button>
        ))}
      </div>

      <div className="flex gap-3">
        <Button variant="secondary" size="lg" onClick={onBack} className="flex-1">
          <ChevronLeft className="h-4 w-4 me-1 rtl:scale-x-[-1]" /> Back
        </Button>
        <Button
          size="lg"
          className="flex-1"
          disabled={!selected}
          onClick={() => selected && onNext(selected)}
        >
          Continue <ChevronRight className="h-4 w-4 ms-1 rtl:scale-x-[-1]" />
        </Button>
      </div>
    </div>
  );
}

// ─── Step 3: Success ──────────────────────────────────────────────

function Step3({
  role,
  onFinish,
  loading,
}: {
  role: "client" | "admin";
  onFinish: () => void;
  loading: boolean;
}) {
  const FEATURES = role === "admin"
    ? ["Create and manage projects", "Track team milestones", "Send invoices to clients", "Manage roles & permissions"]
    : ["Track your project progress", "Review and approve milestones", "Download deliverables", "View and pay invoices"];

  return (
    <div className="space-y-6 text-center">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-(--success-subtle) ring-4 ring-(--success-muted)">
        <Check className="h-10 w-10 text-(--success)" />
      </div>

      <div>
        <h1 className="text-2xl font-bold text-(--text-primary)">Your workspace is ready! 🎉</h1>
        <p className="mt-2 text-sm text-(--text-muted)">Here's what you can do now:</p>
      </div>

      <ul className="space-y-2 text-start">
        {FEATURES.map((f) => (
          <li key={f} className="flex items-center gap-2.5 text-sm text-(--text-secondary)">
            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-(--success-subtle)">
              <Check className="h-3 w-3 text-(--success)" />
            </div>
            {f}
          </li>
        ))}
      </ul>

      <Button size="lg" className="w-full" onClick={onFinish} loading={loading}>
        Go to Dashboard <ChevronRight className="h-4 w-4 ms-1 rtl:scale-x-[-1]" />
      </Button>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────

export default function OnboardingPage() {
  const router      = useRouter();
  const initialize  = useAuthStore((s) => s.initialize);

  const [step,        setStep]       = React.useState(0);
  const [companyName, setCompanyName] = React.useState("");
  const [industry,    setIndustry]   = React.useState("");
  const [role,        setRole]       = React.useState<"client" | "admin">("admin");
  const [finishing,   setFinishing]  = React.useState(false);

  const handleStep1 = (data: { companyName: string; industry: string }) => {
    setCompanyName(data.companyName);
    setIndustry(data.industry);
    setStep(1);
  };

  const handleStep2 = (selectedRole: "client" | "admin") => {
    setRole(selectedRole);
    setStep(2);
  };

  const handleFinish = async () => {
    setFinishing(true);
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // Get user's workspace
      const { data: profile } = await supabase
        .from("profiles")
        .select("workspace_id")
        .eq("id", user.id)
        .single();

      if (profile?.workspace_id) {
        // Update workspace name
        await supabase
          .from("workspaces")
          .update({ name: companyName })
          .eq("id", profile.workspace_id);
      }

      // Update profile role if needed
      await supabase
        .from("profiles")
        .update({ role })
        .eq("id", user.id);

      // Mark onboarding complete in user_metadata
      await supabase.auth.updateUser({
        data: { onboarding_complete: true, role },
      });

      // Refresh the auth store
      await initialize();

      // Redirect based on role
      if (role === "client") {
        router.push(ROUTES.CLIENT.DASHBOARD);
      } else {
        router.push(ROUTES.ADMIN.OVERVIEW);
      }
      router.refresh();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Setup failed. Please try again.");
      setFinishing(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-(--bg-base) px-4 py-12">
      <div className="w-full max-w-md">
        {/* Brand */}
        <div className="mb-8 text-center">
          <span className="text-2xl font-bold tracking-tight text-(--text-primary)">Ensdim</span>
        </div>

        <div className="surface p-8 shadow-(--shadow-md)">
          <StepIndicator current={step} total={3} />

          {step === 0 && <Step1 onNext={handleStep1} />}
          {step === 1 && <Step2 onNext={handleStep2} onBack={() => setStep(0)} />}
          {step === 2 && <Step3 role={role} onFinish={handleFinish} loading={finishing} />}
        </div>

        {/* Step count */}
        <p className="mt-4 text-center text-xs text-(--text-muted)">
          Step {step + 1} of 3
        </p>
      </div>
    </div>
  );
}
