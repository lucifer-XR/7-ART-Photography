import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/work", label: "Work" },
  { to: "/services", label: "Services" },
  { to: "/photographers", label: "Photographers" },
  { to: "/about", label: "About" },
  { to: "/book", label: "Book Now" },
  { to: "/login", label: "Login" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });
  const overHero = path === "/" && !scrolled;

  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${overHero ? "text-ivory" : "bg-background/95 text-foreground border-b backdrop-blur"}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link to="/" className="font-serif text-2xl tracking-[0.2em]">7 ART</Link>
        <nav className="hidden gap-8 lg:flex" aria-label="Main">
          {links.map((l) => (
            <Link key={l.to} to={l.to} className="eyebrow opacity-80 transition hover:opacity-100" activeProps={{ className: "!opacity-100 underline underline-offset-8" }} activeOptions={{ exact: l.to === "/" }}>
              {l.label}
            </Link>
          ))}
        </nav>
        <button className="lg:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && (
        <nav className="border-t bg-background text-foreground lg:hidden" aria-label="Mobile">
          {links.map((l) => (
            <Link key={l.to} to={l.to} className="eyebrow block border-b px-6 py-4">{l.label}</Link>
          ))}
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-obsidian text-ivory">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-3">
        <div>
          <p className="font-serif text-3xl tracking-[0.2em]">7 ART</p>
          <p className="mt-4 max-w-xs text-sm text-silver">Photography That Tells Your Story.</p>
        </div>
        <nav className="grid grid-cols-2 gap-3" aria-label="Footer">
          {links.map((l) => <Link key={l.to} to={l.to} className="eyebrow text-silver hover:text-ivory">{l.label}</Link>)}
          <Link to="/register" className="eyebrow text-silver hover:text-ivory">Register</Link>
          <Link to="/membership" className="eyebrow text-silver hover:text-ivory">Membership</Link>
          <Link to="/contact" className="eyebrow text-silver hover:text-ivory">Contact</Link>
        </nav>
        <p className="text-xs text-silver md:text-right">
          © 7 ART Photography
        </p>
      </div>
    </footer>
  );
}

export function PageHead({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-12 pt-40">
      <p className="eyebrow text-muted-foreground">{eyebrow}</p>
      <h1 className="mt-6 text-5xl italic md:text-7xl animate-rise">{title}</h1>
      {intro && <p className="mt-6 max-w-xl text-muted-foreground">{intro}</p>}
      <div className="mt-12 h-px bg-border" />
    </section>
  );
}
