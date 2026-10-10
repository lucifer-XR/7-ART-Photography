import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/hero.png.asset.json";
import { ArtistListing, Packages, Services, WorkGrid } from "@/components/sections";
import { images } from "@/lib/data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "7 ART Photography — Photography That Tells Your Story" },
      { name: "description", content: "Editorial event photography and videography. Book a session with 7 ART Photography." },
      { property: "og:title", content: "7 ART Photography" },
      { property: "og:description", content: "Photography That Tells Your Story." },
    ],
  }),
  component: Index,
});

function Section({ eyebrow, title, children, link }: { eyebrow: string; title: string; children: React.ReactNode; link?: { to: "/work" | "/services" | "/photographers" | "/about"; label: string } }) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-28">
      <div className="mb-14 flex items-end justify-between gap-6 border-b pb-6">
        <div>
          <p className="eyebrow text-muted-foreground">{eyebrow}</p>
          <h2 className="mt-4 text-4xl uppercase tracking-[0.15em] md:text-5xl">{title}</h2>
        </div>
        {link && <Link to={link.to} className="eyebrow hidden border-b border-foreground pb-1 md:inline">{link.label}</Link>}
      </div>
      {children}
    </section>
  );
}

function Index() {
  return (
    <>
      <section className="grain relative h-[100svh] min-h-[600px] overflow-hidden bg-obsidian text-ivory">
        <img src={hero.url} alt="Editorial portrait (supplied demo image)" className="absolute inset-0 h-full w-full object-cover object-[30%_center] grayscale contrast-110 md:object-center" />
        <div className="hero-overlay absolute inset-0" />
        <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-20">
          <h1 className="max-w-4xl text-6xl italic leading-[0.95] md:text-8xl animate-rise">Photography That Tells Your Story.</h1>
          <p className="eyebrow mt-8 text-silver animate-rise [animation-delay:0.3s]">7 ART Photography — Captured with intention.</p>
          <div className="mt-10 flex items-center gap-10 animate-rise [animation-delay:0.5s]">
            <Link to="/book" className="btn-line">Book a Session</Link>
          </div>
        </div>
        <div className="absolute bottom-8 right-8 flex flex-col items-center gap-3" aria-hidden>
          <span className="eyebrow [writing-mode:vertical-rl]">Scroll</span>
          <span className="h-12 w-px bg-ivory animate-drip" />
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-32 text-center">
        <p className="eyebrow text-champagne">The Studio</p>
        <p className="mt-8 font-serif text-3xl italic leading-snug md:text-5xl">
          “We believe the moments worth remembering deserve to be captured with intention.”
        </p>
      </section>

      <Section eyebrow="Portfolio" title="Selected Work" link={{ to: "/work", label: "View all work" }}>
        <WorkGrid limit={6} />
      </Section>

      <Section eyebrow="What we do" title="Services" link={{ to: "/services", label: "All services" }}>
        <Services />
      </Section>

      <Section eyebrow="The artists" title="Meet the Artists" link={{ to: "/photographers", label: "Full listing" }}>
        <ArtistListing />
      </Section>

      <Section eyebrow="Investment" title="Packages" link={{ to: "/services", label: "Details & FAQ" }}>
        <Packages />
      </Section>

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-28 md:grid-cols-2">
        <img src={images.portrait} alt="Studio portrait" loading="lazy" width={768} height={1024} className="w-full grayscale" />
        <div>
          <p className="eyebrow text-muted-foreground">About</p>
          <h2 className="mt-4 text-5xl italic">Quiet craft, honest images.</h2>
          <p className="mt-6 text-muted-foreground">7 ART Photography is a small collective of photographers and filmmakers documenting university and private events with an editorial eye.</p>
          <Link to="/about" className="eyebrow mt-8 inline-block border-b border-foreground pb-1">Our story</Link>
        </div>
      </section>

      <section className="bg-obsidian py-32 text-center text-ivory">
        <p className="eyebrow text-champagne">Your event</p>
        <h2 className="mx-auto mt-6 max-w-3xl px-6 text-5xl italic md:text-7xl">Let's tell your story.</h2>
        <Link to="/book" className="btn-line mt-12">Book Now</Link>
      </section>
    </>
  );
}
