import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { images } from "@/lib/data";

export function AuthShell({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="grid min-h-screen md:grid-cols-2">
      <div className="relative hidden md:block">
        <img src={images.portrait} alt="" className="absolute inset-0 h-full w-full object-cover grayscale" />
      </div>
      <div className="flex items-center px-6 pb-16 pt-32">
        <div className="mx-auto w-full max-w-md">
          <p className="font-serif text-2xl tracking-[0.2em]">7 ART</p>
          <h1 className="mt-10 text-5xl italic">{title}</h1>
          <div className="mt-10">{children}</div>
          <Link to="/" className="eyebrow mt-12 inline-block text-muted-foreground hover:text-foreground">← Back to Home</Link>
        </div>
      </div>
    </section>
  );
}
