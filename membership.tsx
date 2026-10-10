import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHead } from "@/components/SiteChrome";

const tiers = [
  { n: "Member", d: "Free account. Track bookings and invoices.", off: "0%" },
  { n: "Silver", d: "After 2 completed bookings.", off: "5%" },
  { n: "Gold", d: "After 5 completed bookings.", off: "10%" },
];

export const Route = createFileRoute("/membership")({
  head: () => ({ meta: [
    { title: "Membership — 7 ART Photography" },
    { name: "description", content: "Membership tiers and booking discounts at 7 ART Photography." },
    { property: "og:title", content: "Membership — 7 ART Photography" },
    { property: "og:description", content: "Member, Silver and Gold tiers." },
  ] }),
  component: () => (
    <>
      <PageHead eyebrow="Membership" title="Membership" intro="Sample tiers and discounts for the demonstration." />
      <section className="mx-auto grid max-w-7xl gap-px bg-border px-6 md:grid-cols-3">
        {tiers.map((t) => (
          <div key={t.n} className="bg-background p-10">
            <h3 className="text-4xl italic">{t.n}</h3>
            <p className="mt-4 text-sm text-muted-foreground">{t.d}</p>
            <p className="mt-8 font-serif text-3xl">{t.off} off</p>
          </div>
        ))}
      </section>
      <div className="py-20 text-center"><Link to="/register" className="btn-ink">Create Account</Link></div>
    </>
  ),
});
