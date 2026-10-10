import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { PageHead } from "@/components/SiteChrome";
import { artists, lkr, packages } from "@/lib/data";

export const Route = createFileRoute("/book")({
  validateSearch: z.object({ package: z.string().optional(), artist: z.string().optional() }),
  head: () => ({ meta: [
    { title: "Book a Session — 7 ART Photography" },
    { name: "description", content: "Choose a package and artist to book 7 ART Photography." },
    { property: "og:title", content: "Book a Session — 7 ART Photography" },
    { property: "og:description", content: "Start your booking." },
  ] }),
  component: Book,
});

function Book() {
  const s = Route.useSearch();
  const pkg = packages.find((p) => p.id === s.package);
  const artist = artists.find((a) => a.id === s.artist);
  return (
    <>
      <PageHead eyebrow="Booking" title="Book a Session" intro="Your selection is saved below. Booking submission requires an account." />
      <section className="mx-auto max-w-3xl space-y-10 px-6 pb-28">
        <div className="grid gap-px bg-border md:grid-cols-2">
          <div className="bg-card p-8">
            <p className="eyebrow text-muted-foreground">Package</p>
            <p className="mt-3 font-serif text-3xl italic">{pkg?.name ?? "Not selected"}</p>
            {pkg && <p className="mt-2 text-sm text-muted-foreground">{pkg.hours} · from {lkr(pkg.price)} (estimate)</p>}
            <Link to="/services" className="eyebrow mt-6 inline-block border-b border-foreground pb-1">{pkg ? "Change" : "Choose package"}</Link>
          </div>
          <div className="bg-card p-8">
            <p className="eyebrow text-muted-foreground">Artist</p>
            <p className="mt-3 font-serif text-3xl italic">{artist?.name.replace("Demo Artist — ", "") ?? "Any available"}</p>
            <Link to="/photographers" className="eyebrow mt-6 inline-block border-b border-foreground pb-1">Choose artist</Link>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">The full booking form (date, location, duration, review and submission to the request queue) is coming in the next build step.</p>
        <div className="flex gap-6">
          <Link to="/login" className="btn-ink">Sign In to Continue</Link>
          <Link to="/register" className="eyebrow self-center border-b border-foreground pb-1">Create Account</Link>
        </div>
      </section>
    </>
  );
}
