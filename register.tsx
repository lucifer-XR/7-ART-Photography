import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { AuthShell } from "@/components/AuthShell";
import { Field, Notice } from "@/components/FormBits";

const schema = z.object({
  name: z.string().trim().min(2, "Enter your full name").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().regex(/^\+?[0-9 ]{9,15}$/, "Enter a valid phone number"),
  password: z.string().min(8, "At least 8 characters").regex(/[A-Z]/, "Include an uppercase letter").regex(/[0-9]/, "Include a number"),
  confirm: z.string(),
}).refine((d) => d.password === d.confirm, { path: ["confirm"], message: "Passwords do not match" });

export const Route = createFileRoute("/register")({
  head: () => ({ meta: [
    { title: "Create Account — 7 ART Photography" },
    { name: "description", content: "Create your 7 ART Photography customer account." },
    { property: "og:title", content: "Create Account — 7 ART Photography" },
    { property: "og:description", content: "Join 7 ART Photography." },
  ] }),
  component: Register,
});

function Register() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [msg, setMsg] = useState("");
  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const r = schema.safeParse(Object.fromEntries(new FormData(e.currentTarget)));
    if (!r.success) { setErrors(Object.fromEntries(r.error.issues.map((i) => [i.path[0], i.message]))); return; }
    setErrors({});
    setMsg("Details look good. Account creation is not connected yet — arriving in the next build step.");
  }
  return (
    <AuthShell title="Create Your Account.">
      <form onSubmit={submit} noValidate className="space-y-7">
        <Field label="Full name" error={errors["name"]}><input name="name" autoComplete="name" className="field" /></Field>
        <Field label="Email" error={errors["email"]}><input name="email" type="email" autoComplete="email" className="field" /></Field>
        <Field label="Phone" error={errors["phone"]}><input name="phone" type="tel" autoComplete="tel" className="field" /></Field>
        <Field label="Password" error={errors["password"]}><input name="password" type="password" autoComplete="new-password" className="field" /></Field>
        <Field label="Confirm password" error={errors["confirm"]}><input name="confirm" type="password" autoComplete="new-password" className="field" /></Field>
        {msg && <Notice>{msg}</Notice>}
        <button className="btn-ink w-full">Register</button>
        <p className="text-sm text-muted-foreground">Already a member? <Link to="/login" className="eyebrow border-b border-foreground pb-1 text-foreground">Login</Link></p>
      </form>
    </AuthShell>
  );
}
