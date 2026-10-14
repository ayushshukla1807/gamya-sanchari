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
    <div className={centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className={`eyebrow ${inverse ? "text-[#ffad7d]" : "text-[#f06619]"}`}>
        {eyebrow}
      </p>
      <h2
        className={`mt-4 text-balance text-3xl font-extrabold leading-tight tracking-[-0.035em] sm:text-5xl ${inverse ? "text-white" : "text-[#212121]"}`}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`mt-5 text-base leading-7 sm:text-lg ${inverse ? "text-white/70" : "text-[#656565]"}`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
