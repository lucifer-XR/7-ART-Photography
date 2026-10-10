import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { artists } from "@/lib/data";

export const Route = createFileRoute("/photographers/$id")({
  loader: ({ params }) => {
    const a = artists.find((x) => x.id === params.id);
    if (!a) throw notFound();
    return a;
  },
  head: ({ loaderData }) => {
    const t = loaderData ? `${loaderData.name.replace("Demo Artist — ", "")} — 7 ART Photography` : "Artist not found";
    return { meta: [
      { title: t },
      { name: "description", content: loaderData?.bio ?? "" },
      { property: "og:title", content: t },
      { property: "og:description", content: loaderData?.bio ?? "" },
    ] };
  },
  notFoundComponent: () => <div className="pt-40 text-center font-serif text-3xl italic">Artist not found.</div>,
  component: ArtistPage,
});

function ArtistPage() {
  const a = Route.useLoaderData();
  const short = a.name.replace("Demo Artist — ", "");
  return (
    <section className="mx-auto max-w-7xl px-6 pb-28 pt-40">
      <Link to="/photographers" className="eyebrow text-muted-foreground">← All artists</Link>
      <div className="mt-10 grid gap-12 md:grid-cols-2">
        <img src={a.samples[0]} alt={`Work by ${short}`} className="w-full grayscale" />
        <div>
          <p className="eyebrow text-champagne">Demo profile · {a.discipline}</p>
          <h1 className="mt-4 text-6xl italic">{short}</h1>
          <dl className="mt-10 grid grid-cols-2 gap-6 border-y py-6 text-sm">
            <div><dt className="eyebrow text-muted-foreground">Specialty</dt><dd className="mt-1">{a.specialization}</dd></div>
            <div><dt className="eyebrow text-muted-foreground">Experience</dt><dd className="mt-1">{a.years} years</dd></div>
            <div><dt className="eyebrow text-muted-foreground">Rating</dt><dd className="mt-1">{a.rating.toFixed(1)} / 5 (demo)</dd></div>
            <div><dt className="eyebrow text-muted-foreground">Availability</dt><dd className="mt-1">{a.availability}</dd></div>
          </dl>
          <p className="mt-8 text-muted-foreground">{a.bio}</p>
          <Link to="/book" search={{ artist: a.id }} className="btn-ink mt-10">Book {short.split(" ")[0]}</Link>
        </div>
      </div>
      <h2 className="mt-24 text-3xl uppercase tracking-[0.15em]">Work Samples</h2>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {a.samples.map((s, i) => <img key={i} src={s} alt="" loading="lazy" className="w-full grayscale" />)}
      </div>
    </section>
  );
}
