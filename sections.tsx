import { Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Star } from "lucide-react";
import { artists, bubbleSortByRating, categories, featuredFirst, lkr, packages, works, type Artist } from "@/lib/data";

export function WorkGrid({ limit }: { limit?: number }) {
  const [cat, setCat] = useState<string>("All");
  const list = works.filter((w) => cat === "All" || w.category === cat).slice(0, limit);
  return (
    <div>
      {!limit && (
        <div className="mb-10 flex flex-wrap gap-2" role="group" aria-label="Filter by category">
          {["All", ...categories].map((c) => (
            <button key={c} onClick={() => setCat(c)} aria-pressed={cat === c}
              className={`eyebrow border px-4 py-2 transition ${cat === c ? "bg-primary text-primary-foreground" : "hover:border-foreground"}`}>{c}</button>
          ))}
        </div>
      )}
      {list.length === 0 ? (
        <p className="py-20 text-center font-serif text-2xl italic text-muted-foreground">No work in this category yet.</p>
      ) : (
        <div className="columns-1 gap-6 md:columns-2 lg:columns-3">
          {list.map((w) => {
            const a = artists.find((x) => x.id === w.artistId)!;
            return (
              <figure key={w.id} className="group mb-6 break-inside-avoid">
                <div className="overflow-hidden">
                  <img src={w.img} alt={w.title} width={w.w} height={w.h} loading="lazy"
                    className="h-auto w-full grayscale transition duration-1000 group-hover:scale-105" />
                </div>
                <figcaption className="mt-3 flex items-baseline justify-between gap-4">
                  <span className="font-serif text-xl italic">{w.title}</span>
                  <span className="eyebrow text-muted-foreground">{w.category}</span>
                </figcaption>
                <p className="mt-1 text-xs text-muted-foreground">
                  {w.details} · <Link to="/photographers/$id" params={{ id: a.id }} className="underline underline-offset-4">{a.name.replace("Demo Artist — ", "")}</Link>
                </p>
              </figure>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function ArtistCard({ a }: { a: Artist }) {
  const short = a.name.replace("Demo Artist — ", "");
  return (
    <article className="group border bg-card">
      <div className="relative aspect-[4/5] overflow-hidden">
        <img src={a.samples[0]} alt={`Sample work by ${short}`} loading="lazy" className="h-full w-full object-cover grayscale transition duration-1000 group-hover:scale-105" />
        <span className="eyebrow absolute left-3 top-3 bg-background px-2 py-1">Demo profile</span>
      </div>
      <div className="p-6">
        <p className="eyebrow text-muted-foreground">{a.discipline} · {a.specialization}</p>
        <h3 className="mt-2 text-3xl">{short}</h3>
        <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
          <span>{a.years} yrs</span>
          <span className="flex items-center gap-1"><Star size={13} className="fill-champagne text-champagne" /> {a.rating.toFixed(1)} / 5</span>
        </div>
        <div className="mt-6 flex gap-4">
          <Link to="/photographers/$id" params={{ id: a.id }} className="eyebrow border-b border-foreground pb-1">View Profile</Link>
          <Link to="/work" className="eyebrow pb-1 text-muted-foreground hover:text-foreground">Portfolio</Link>
        </div>
      </div>
    </article>
  );
}

export function ArtistListing() {
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<"featured" | "rating">("featured");
  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    const filtered = artists.filter((a) => !s || a.name.toLowerCase().includes(s) || a.specialization.toLowerCase().includes(s) || a.discipline.toLowerCase().includes(s));
    return sort === "rating" ? bubbleSortByRating(filtered) : featuredFirst(filtered);
  }, [q, sort]);
  return (
    <div>
      <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <label className="block md:w-80">
          <span className="eyebrow text-muted-foreground">Search name or specialty</span>
          <input className="field" value={q} onChange={(e) => setQ(e.target.value)} placeholder="e.g. Weddings" />
        </label>
        <label className="block md:w-64">
          <span className="eyebrow text-muted-foreground">Sort</span>
          <select className="field eyebrow cursor-pointer" value={sort} onChange={(e) => setSort(e.target.value as "featured" | "rating")}>
            <option value="featured">Featured First</option>
            <option value="rating">Highest Rated (Bubble Sort)</option>
          </select>
        </label>
      </div>
      <p className="mb-6 text-xs text-muted-foreground" aria-live="polite">{list.length} of {artists.length} artists</p>
      {list.length === 0 ? (
        <p className="py-20 text-center font-serif text-2xl italic text-muted-foreground">No artists match “{q}”.</p>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">{list.map((a) => <ArtistCard key={a.id} a={a} />)}</div>
      )}
    </div>
  );
}

export function Packages() {
  return (
    <div className="grid gap-px bg-border md:grid-cols-3">
      {packages.map((p, i) => (
        <div key={p.id} className={`flex flex-col p-10 ${i === 1 ? "bg-primary text-primary-foreground" : "bg-background"}`}>
          <p className="eyebrow opacity-70">{p.hours}</p>
          <h3 className="mt-4 text-5xl italic">{p.name}</h3>
          <p className="mt-4 text-sm opacity-80">{p.desc}</p>
          <ul className="mt-8 space-y-2 text-sm">{p.deliverables.map((d) => <li key={d}>— {d}</li>)}</ul>
          <p className="eyebrow mt-6 opacity-60">Extras: {p.extras.join(", ")}</p>
          <p className="mt-10 font-serif text-3xl">{lkr(p.price)}</p>
          <p className="text-xs opacity-60">Sample price</p>
          <Link to="/book" search={{ package: p.id }} className={`mt-8 ${i === 1 ? "btn-line" : "btn-ink"}`}>Book This</Link>
        </div>
      ))}
    </div>
  );
}

export const services = [
  { n: "01", t: "Event Photography", d: "Unobtrusive, editorial coverage of ceremonies, conferences and celebrations." },
  { n: "02", t: "Event Videography", d: "Cinematic films and highlight reels with clean sound and natural grading." },
  { n: "03", t: "Photography + Videography", d: "A unified team telling one story in stills and motion." },
];

export function Services() {
  return (
    <div className="grid border-y md:grid-cols-3 md:divide-x">
      {services.map((s) => (
        <div key={s.n} className="p-10">
          <p className="eyebrow text-champagne">{s.n}</p>
          <h3 className="mt-6 text-3xl">{s.t}</h3>
          <p className="mt-4 text-sm text-muted-foreground">{s.d}</p>
        </div>
      ))}
    </div>
  );
}
