import Breadcrumbs, { type BreadcrumbItem } from "@/components/layout/Breadcrumbs";
import MotionReveal from "@/components/MotionReveal";
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
    <section className="relative isolate overflow-hidden bg-[#27372c] pb-20 pt-32 text-white sm:pb-28 sm:pt-40" data-motion="editorial-hero">
      {image ? <div aria-hidden="true" className="absolute inset-0 -z-20 bg-cover bg-center opacity-35" style={{ backgroundImage: `url(${image})` }} /> : null}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_75%_20%,rgba(166,61,36,0.4),transparent_35%),linear-gradient(90deg,rgba(63,42,32,0.98),rgba(63,42,32,0.58))]" />
      <div className="mx-auto grid max-w-[1440px] gap-7 px-5 sm:px-8 lg:px-12">
        {breadcrumbs ? <MotionReveal direction="left"><Breadcrumbs items={breadcrumbs} /></MotionReveal> : null}
        <MotionReveal delay={0.04} direction="left"><Stamp>{eyebrow}</Stamp></MotionReveal>
        <MotionReveal delay={0.1}><h1 className="max-w-4xl text-balance text-4xl font-extrabold leading-[1.03] sm:text-6xl lg:text-7xl">{title}</h1></MotionReveal>
        <MotionReveal delay={0.16}><p className="max-w-2xl text-lg leading-8 text-white/75 sm:text-xl">{summary}</p></MotionReveal>
        <MotionReveal delay={0.22} direction="scale"><CtaGroup primary={primary} secondary={secondary} /></MotionReveal>
      </div>
    </section>
  );
}
