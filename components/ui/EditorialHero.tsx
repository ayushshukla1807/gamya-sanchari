import Breadcrumbs, { type BreadcrumbItem } from "@/components/layout/Breadcrumbs";
import CtaGroup from "@/components/ui/CtaGroup";
import Stamp from "@/components/ui/Stamp";

interface EditorialHeroProps {
  readonly breadcrumbs?: readonly BreadcrumbItem[];
  readonly eyebrow: string;
  readonly title: string;
  readonly summary: string;
  readonly image?: string;
  readonly primary: { readonly href: string; readonly label: string };
  readonly secondary?: { readonly href: string; readonly label: string };
}

export default function EditorialHero({ breadcrumbs, eyebrow, title, summary, image, primary, secondary }: EditorialHeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-[#081329] pb-20 pt-32 text-white sm:pb-28 sm:pt-40">
      {image ? <div aria-hidden="true" className="absolute inset-0 -z-20 bg-cover bg-center opacity-35" style={{ backgroundImage: `url(${image})` }} /> : null}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_75%_20%,rgba(24,68,239,0.4),transparent_35%),linear-gradient(90deg,rgba(8,19,41,0.98),rgba(8,19,41,0.58))]" />
      <div className="mx-auto grid max-w-[1440px] gap-7 px-5 sm:px-8 lg:px-12">
        {breadcrumbs ? <Breadcrumbs items={breadcrumbs} /> : null}
        <Stamp>{eyebrow}</Stamp>
        <h1 className="max-w-4xl text-balance text-4xl font-extrabold leading-[1.03] sm:text-6xl lg:text-7xl">{title}</h1>
        <p className="max-w-2xl text-lg leading-8 text-white/75 sm:text-xl">{summary}</p>
        <CtaGroup primary={primary} secondary={secondary} />
      </div>
    </section>
  );
}
