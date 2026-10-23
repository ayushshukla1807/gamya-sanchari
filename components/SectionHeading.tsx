import KineticText from "@/components/motion/KineticText";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  inverse?: boolean;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  inverse = false,
}: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <div
      className={centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}
      data-material="editorial-heading"
    >
      <div
        aria-hidden="true"
        className={`mb-5 flex items-center gap-3 ${centered ? "justify-center" : ""}`}
        data-material="accent-line"
      >
        <span className="h-px w-10 bg-gradient-to-r from-[#a63d24] to-[#f06619]" />
        <span className="size-1.5 rounded-full bg-[#f5ad56] shadow-[0_0_14px_rgba(245,173,86,0.72)]" />
      </div>
      <p className={`eyebrow ${inverse ? "text-[#ffad7d]" : "text-[#f06619]"}`}>
        {eyebrow}
      </p>
      <KineticText
        as="h2"
        className={`mt-4 text-balance text-3xl font-extrabold leading-tight tracking-[-0.035em] sm:text-5xl ${inverse ? "text-white" : "text-[#3f2a20]"}`}
        text={title}
      />
      {description ? (
        <p
          className={`mt-5 text-base leading-7 sm:text-lg ${inverse ? "text-white/70" : "text-[#6a594b]"}`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
