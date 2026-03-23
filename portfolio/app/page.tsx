import HeroCanvas from "../components/HeroCanvas";

const sections = [
  { id: "services", label: "Services" },
  { id: "portfolio", label: "Projects" },
  { id: "testimonials", label: "Testimonials" },
  { id: "contact", label: "Contact" }
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-night via-night-soft to-slate-950 text-slate-100">
      <header className="sticky top-0 z-40 border-b border-slate-800/60 bg-night/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-construction-yellow text-slate-950 font-extrabold shadow-[0_0_30px_rgba(250,204,21,0.6)]">
              T
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold tracking-[0.18em] text-construction-yellow-soft uppercase">
                Trackify Builds
              </span>
              <span className="text-xs text-slate-400">
                Modern construction portfolio
              </span>
            </div>
          </div>
          <nav className="hidden gap-6 text-sm font-medium text-slate-300 md:flex">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="relative transition-colors hover:text-construction-yellow"
              >
                {s.label}
                <span className="absolute inset-x-0 -bottom-1 h-px scale-x-0 bg-construction-yellow transition-transform duration-200 group-hover:scale-x-100" />
              </a>
            ))}
          </nav>
          <a
            href="#contact"
            className="hidden rounded-full border border-construction-yellow/80 bg-construction-yellow px-4 py-1.5 text-xs font-semibold text-slate-950 shadow-[0_0_35px_rgba(250,204,21,0.7)] transition hover:-translate-y-0.5 hover:bg-construction-yellow-soft md:inline-flex"
          >
            Request a quote
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 pb-24 pt-10 sm:px-6 sm:pt-16">
        {/* Hero */}
        <section className="grid items-center gap-10 pb-20 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:pb-24">
          <div className="space-y-7 section-fade">
            <p className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-200 shadow-[0_0_30px_rgba(34,197,94,0.45)]">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              On time. On budget. On brand.
            </p>
            <div className="space-y-4">
              <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
                <span className="text-slate-100">
                  Modern builds for{" "}
                  <span className="bg-gradient-to-r from-construction-yellow via-amber-300 to-sky-400 bg-clip-text text-transparent">
                    ambitious
                  </span>{" "}
                  teams.
                </span>
              </h1>
              <p className="max-w-xl text-balance text-sm text-slate-400 sm:text-base">
                We design and deliver high‑performance commercial and residential
                projects with complete transparency, digital tracking, and
                premium craftsmanship.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#portfolio"
                className="inline-flex items-center gap-2 rounded-full bg-construction-yellow px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-[0_0_40px_rgba(250,204,21,0.9)] transition hover:-translate-y-0.5 hover:bg-construction-yellow-soft"
              >
                View our work
              </a>
              <a
                href="#services"
                className="inline-flex items-center gap-2 rounded-full border border-slate-700/80 bg-slate-900/40 px-5 py-2.5 text-sm font-medium text-slate-200 transition hover:-translate-y-0.5 hover:border-construction-yellow/70 hover:bg-slate-900/70"
              >
                Explore services
              </a>
            </div>
            <dl className="grid max-w-md grid-cols-3 gap-4 text-xs text-slate-400 sm:text-sm">
              <div>
                <dt className="font-medium text-slate-200">+120k m²</dt>
                <dd>Delivered across commercial and residential builds.</dd>
              </div>
              <div>
                <dt className="font-medium text-slate-200">98% on-time</dt>
                <dd>Projects completed with live milestone tracking.</dd>
              </div>
              <div>
                <dt className="font-medium text-slate-200">4.9 / 5</dt>
                <dd>Average client rating over the last 3 years.</dd>
              </div>
            </dl>
          </div>
          <div className="section-fade md:translate-y-2">
            <HeroCanvas />
          </div>
        </section>

        {/* Services */}
        <section id="services" className="section-fade scroll-mt-24 pb-20">
          <div className="flex items-baseline justify-between gap-4 pb-6">
            <div>
              <h2 className="text-xl font-semibold text-slate-100 sm:text-2xl">
                Services
              </h2>
              <p className="mt-1 text-sm text-slate-400">
                From first sketch to final handover, we stay accountable.
              </p>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Design & Planning",
                body: "Architectural design, value engineering, structural planning, and permitting support.",
                badge: "Pre‑construction"
              },
              {
                title: "General Contracting",
                body: "Full‑scope construction management with vetted subcontractors and transparent reporting.",
                badge: "Execution"
              },
              {
                title: "Renovations & Fit‑outs",
                body: "High‑impact interior upgrades, adaptive reuse, and brand‑aligned office fit‑outs.",
                badge: "Upgrade"
              }
            ].map((card) => (
              <article
                key={card.title}
                className="group relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-950/40 p-5 shadow-[0_18px_45px_rgba(15,23,42,0.9)] transition hover:-translate-y-1 hover:border-construction-yellow/60 hover:shadow-[0_24px_70px_rgba(8,47,73,1)]"
              >
                <div className="pointer-events-none absolute -left-10 top-0 h-32 w-24 rotate-12 bg-gradient-to-b from-construction-yellow/40 via-amber-300/15 to-transparent blur-2 opacity-0 transition group-hover:opacity-100" />
                <p className="inline-flex rounded-full bg-slate-900/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-construction-yellow-soft">
                  {card.badge}
                </p>
                <h3 className="mt-3 text-base font-semibold text-slate-100">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm text-slate-400">{card.body}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Portfolio */}
        <section id="portfolio" className="section-fade scroll-mt-24 pb-20">
          <div className="flex items-baseline justify-between gap-4 pb-6">
            <div>
              <h2 className="text-xl font-semibold text-slate-100 sm:text-2xl">
                Portfolio
              </h2>
              <p className="mt-1 text-sm text-slate-400">
                A snapshot of recent work across sectors.
              </p>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                name: "Skyline Office Hub",
                tag: "Commercial",
                meta: "12‑storey HQ, 18k m²",
                accent: "from-sky-500/40 via-sky-300/10 to-transparent"
              },
              {
                name: "Harborfront Residences",
                tag: "Residential",
                meta: "146 units, A‑rated",
                accent: "from-emerald-400/40 via-emerald-300/10 to-transparent"
              },
              {
                name: "Forge Industrial Park",
                tag: "Industrial",
                meta: "Logistics & light manufacturing",
                accent: "from-amber-400/40 via-amber-300/10 to-transparent"
              }
            ].map((project) => (
              <article
                key={project.name}
                className="group relative overflow-hidden rounded-2xl border border-slate-800/80 bg-gradient-to-b from-slate-950/60 via-slate-950/40 to-slate-950/20 p-5 shadow-[0_18px_45px_rgba(15,23,42,0.9)] transition hover:-translate-y-1.5 hover:border-construction-yellow/70 hover:shadow-[0_26px_80px_rgba(15,23,42,1)]"
              >
                <div
                  className={`pointer-events-none absolute -inset-x-10 -top-16 h-32 bg-gradient-to-b ${project.accent} blur-2 opacity-60`}
                />
                <div className="relative space-y-3">
                  <p className="inline-flex rounded-full bg-slate-900/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-300">
                    {project.tag}
                  </p>
                  <h3 className="text-base font-semibold text-slate-50">
                    {project.name}
                  </h3>
                  <p className="text-xs text-slate-400">{project.meta}</p>
                  <p className="text-xs text-slate-500">
                    Delivered with phased scheduling, noise‑aware planning, and
                    live budget tracking integrated into Trackify.
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section
          id="testimonials"
          className="section-fade scroll-mt-24 pb-20 md:pb-24"
        >
          <div className="flex items-baseline justify-between gap-4 pb-6">
            <div>
              <h2 className="text-xl font-semibold text-slate-100 sm:text-2xl">
                Testimonials
              </h2>
              <p className="mt-1 text-sm text-slate-400">
                Teams that trust us with their most important spaces.
              </p>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                quote:
                  "Their reporting was clearer than any construction partner we’ve worked with. Every milestone was visible and aligned.",
                name: "Amira Chen",
                role: "VP Operations, Northline",
                meta: "Skyline Office Hub"
              },
              {
                quote:
                  "They delivered ahead of schedule without compromising quality. The team felt like an extension of our own.",
                name: "Luis Ortega",
                role: "Founder, Harborfront Collective",
                meta: "Harborfront Residences"
              },
              {
                quote:
                  "Trackify’s live dashboards changed the way we think about risk and coordination across sites.",
                name: "Priya Singh",
                role: "Director of Capital Projects, Forge Group",
                meta: "Forge Industrial Park"
              }
            ].map((t) => (
              <figure
                key={t.name}
                className="relative flex flex-col gap-4 rounded-2xl border border-slate-800/80 bg-slate-950/40 p-5 shadow-[0_18px_45px_rgba(15,23,42,0.9)] transition hover:-translate-y-1 hover:border-construction-yellow/60 hover:shadow-[0_24px_70px_rgba(8,47,73,1)]"
              >
                <div className="pointer-events-none absolute right-6 top-4 text-5xl text-construction-yellow/20">
                  ”
                </div>
                <blockquote className="text-sm text-slate-300">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-auto space-y-1 text-xs">
                  <p className="font-semibold text-slate-100">{t.name}</p>
                  <p className="text-slate-400">{t.role}</p>
                  <p className="text-slate-500">{t.meta}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section
          id="contact"
          className="section-fade scroll-mt-24 rounded-3xl border border-slate-800/80 bg-gradient-to-br from-slate-950 via-slate-950/95 to-slate-950/80 p-6 shadow-[0_22px_80px_rgba(15,23,42,1)] md:p-8"
        >
          <div className="grid gap-8 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-slate-100 sm:text-2xl">
                Let’s walk your site.
              </h2>
              <p className="text-sm text-slate-400 sm:text-base">
                Share a few details about your project and we’ll follow up with
                a focused, no‑fluff proposal—typically within one business day.
              </p>
              <dl className="grid max-w-md grid-cols-2 gap-4 text-xs text-slate-400 sm:text-sm">
                <div>
                  <dt className="font-medium text-slate-200">
                    Typical project size
                  </dt>
                  <dd>€500k – €12M</dd>
                </div>
                <div>
                  <dt className="font-medium text-slate-200">
                    Regions we serve
                  </dt>
                  <dd>EU & UK, remote coordination globally</dd>
                </div>
              </dl>
            </div>

            <form className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label
                    htmlFor="name"
                    className="text-xs font-medium text-slate-200"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    className="w-full rounded-xl border border-slate-700/80 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 outline-none ring-0 transition placeholder:text-slate-500 focus:border-construction-yellow focus:ring-2 focus:ring-construction-yellow/40"
                    placeholder="Alex Rossi"
                  />
                </div>
                <div className="space-y-1.5">
                  <label
                    htmlFor="email"
                    className="text-xs font-medium text-slate-200"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="w-full rounded-xl border border-slate-700/80 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 outline-none ring-0 transition placeholder:text-slate-500 focus:border-construction-yellow focus:ring-2 focus:ring-construction-yellow/40"
                    placeholder="you@company.com"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label
                  htmlFor="project-type"
                  className="text-xs font-medium text-slate-200"
                >
                  Project type
                </label>
                <select
                  id="project-type"
                  name="projectType"
                  className="w-full rounded-xl border border-slate-700/80 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 outline-none ring-0 transition focus:border-construction-yellow focus:ring-2 focus:ring-construction-yellow/40"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select an option
                  </option>
                  <option>New build</option>
                  <option>Renovation / fit‑out</option>
                  <option>Expansion</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label
                  htmlFor="message"
                  className="text-xs font-medium text-slate-200"
                >
                  Project overview
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full resize-none rounded-xl border border-slate-700/80 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 outline-none ring-0 transition placeholder:text-slate-500 focus:border-construction-yellow focus:ring-2 focus:ring-construction-yellow/40"
                  placeholder="Timeline, budget range, site location, and any key constraints."
                />
              </div>
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-construction-yellow px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-[0_0_40px_rgba(250,204,21,0.9)] transition hover:-translate-y-0.5 hover:bg-construction-yellow-soft"
              >
                Send project brief
              </button>
              <p className="text-[11px] text-slate-500">
                By submitting, you agree to be contacted about this inquiry.
              </p>
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-800/70 bg-night-soft/90 py-5 text-center text-xs text-slate-500">
        <p>
          © {new Date().getFullYear()} Trackify Studio. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

