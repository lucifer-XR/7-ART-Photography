import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Eye, EyeOff } from "lucide-react";
import { AuthShell } from "@/components/AuthShell";
import { Field, Notice } from "@/components/FormBits";

const schema = z.object({
  email: z.string().trim().email("Enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [
    { title: "Sign In — 7 ART Photography" },
    { name: "description", content: "Sign in to your 7 ART Photography account." },
    { property: "og:title", content: "Sign In — 7 ART Photography" },
    { property: "og:description", content: "Welcome back." },
  ] }),
  component: Login,
});

function Login() {
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [msg, setMsg] = useState("");
  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const r = schema.safeParse(Object.fromEntries(new FormData(e.currentTarget)));
    if (!r.success) { setErrors(Object.fromEntries(r.error.issues.map((i) => [i.path[0], i.message]))); return; }
    setErrors({});
    setMsg("Sign-in is not connected yet — accounts arrive in the next build step.");
  }
  return (
    <AuthShell title="Welcome Back.">
      <form onSubmit={submit} noValidate className="space-y-8">
        <Field label="Email" error={errors["email"]}><input name="email" type="email" autoComplete="email" className="field" /></Field>
        <Field label="Password" error={errors["password"]}>
          <div className="relative">
            <input name="password" type={show ? "text" : "password"} autoComplete="current-password" className="field pr-10" />
            <button type="button" onClick={() => setShow(!show)} aria-label={show ? "Hide password" : "Show password"} className="absolute right-0 top-3 text-muted-foreground">
              {show ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </Field>
        {msg && <Notice>{msg}</Notice>}
        <button className="btn-ink w-full">Sign In</button>
        <p className="text-sm text-muted-foreground">New here? <Link to="/register" className="eyebrow border-b border-foreground pb-1 text-foreground">Create Account</Link></p>
      </form>
    </AuthShell>
  );
}
