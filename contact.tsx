import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { PageHead } from "@/components/SiteChrome";
import { Field, Notice } from "@/components/FormBits";
import { categories } from "@/lib/data";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  category: z.string().min(1, "Choose a category"),
  date: z.string().min(1, "Choose a date"),
  message: z.string().trim().min(10, "Tell us a little more (10+ characters)").max(1000),
});

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [
    { title: "Contact — 7 ART Photography" },
    { name: "description", content: "Send an inquiry to 7 ART Photography." },
    { property: "og:title", content: "Contact — 7 ART Photography" },
    { property: "og:description", content: "Tell us about your event." },
  ] }),
  component: Contact,
});

function Contact() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const r = schema.safeParse(Object.fromEntries(new FormData(e.currentTarget)));
    if (!r.success) { setErrors(Object.fromEntries(r.error.issues.map((i) => [i.path[0], i.message]))); return; }
    setErrors({}); setSent(true);
  }
  return (
    <>
      <PageHead eyebrow="Contact" title="Tell us about your event." />
      <section className="mx-auto max-w-2xl px-6 pb-28">
        {sent ? <Notice>Thank you — your inquiry was validated. Saving inquiries to our records arrives with the backend step.</Notice> : (
          <form onSubmit={submit} noValidate className="space-y-8">
            <Field label="Name" error={errors["name"]}><input name="name" className="field" /></Field>
            <Field label="Email" error={errors["email"]}><input name="email" type="email" className="field" /></Field>
            <div className="grid gap-8 md:grid-cols-2">
              <Field label="Event category" error={errors["category"]}>
                <select name="category" className="field" defaultValue=""><option value="" disabled>Select</option>{categories.map((c) => <option key={c}>{c}</option>)}</select>
              </Field>
              <Field label="Event date" error={errors["date"]}><input name="date" type="date" className="field" /></Field>
            </div>
            <Field label="Message" error={errors["message"]}><textarea name="message" rows={5} className="field" /></Field>
            <button className="btn-ink">Send Inquiry</button>
          </form>
        )}
      </section>
    </>
  );
}
