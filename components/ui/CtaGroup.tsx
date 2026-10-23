import Link from "next/link";

interface Cta {
  readonly href: string;
  readonly label: string;
}

export default function CtaGroup({ primary, secondary }: { primary: Cta; secondary?: Cta }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
      <Link className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#a63d24] px-6 font-extrabold text-white shadow-lg shadow-[#a63d24]/20 transition hover:-translate-y-0.5 hover:bg-[#f06619] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#a63d24]" href={primary.href}>
        {primary.label}
      </Link>
      {secondary ? (
        <Link className="inline-flex min-h-12 items-center justify-center rounded-full border border-current/20 bg-white/10 px-6 font-extrabold transition hover:-translate-y-0.5 hover:bg-white hover:text-[#3f2a20] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4" href={secondary.href}>
          {secondary.label}
        </Link>
      ) : null}
    </div>
  );
}
