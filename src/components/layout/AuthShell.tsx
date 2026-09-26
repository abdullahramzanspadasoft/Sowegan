import { Logo } from "@/components/ui/Logo";

export function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen page-grid lg:grid-cols-[1.05fr_0.95fr]">
      <section className="relative hidden overflow-hidden border-r border-border px-10 py-12 lg:flex lg:flex-col">
        <Logo />
        <div className="relative z-10 my-auto max-w-xl space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent">
            Sowegan Markets
          </p>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight xl:text-5xl">
            A quieter, sharper way to read the markets.
          </h1>
          <p className="max-w-lg text-base leading-7 text-muted">
            Sign in to a professional workspace with live-looking market boards,
            portfolio context, and a dashboard designed for serious decision-making.
          </p>
          <dl className="grid grid-cols-3 gap-4 pt-4">
            {[
              ["120+", "Instruments"],
              ["4", "Asset classes"],
              ["24/5", "Coverage"],
            ].map(([value, label]) => (
              <div key={label} className="rounded-2xl border border-border bg-surface/70 p-4">
                <dt className="text-xs uppercase tracking-wider text-subtle">{label}</dt>
                <dd className="mt-2 text-2xl font-semibold">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
      <section className="flex items-center px-4 py-10 sm:px-8">
        <div className="mx-auto w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <Logo />
          </div>
          <div className="mb-8 space-y-3">
            <h2 className="text-3xl font-semibold tracking-tight">{title}</h2>
            <p className="text-sm leading-6 text-muted">{subtitle}</p>
          </div>
          {children}
        </div>
      </section>
    </div>
  );
}
