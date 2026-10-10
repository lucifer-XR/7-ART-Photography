import type { ReactNode } from "react";

export function Field({ label, error, children }: { label: string; error?: string | undefined; children: ReactNode }) {
  return (
    <label className="block">
      <span className="eyebrow text-muted-foreground">{label}</span>
      {children}
      {error && <span role="alert" className="mt-1 block text-xs text-destructive">{error}</span>}
    </label>
  );
}

export function Notice({ children }: { children: ReactNode }) {
  return <p role="status" className="border border-champagne bg-card p-4 text-sm">{children}</p>;
}
