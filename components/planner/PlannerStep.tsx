export default function PlannerStep({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return <section aria-labelledby="planner-step-title"><h2 className="text-3xl font-extrabold text-[#0b1633] sm:text-4xl" id="planner-step-title">{title}</h2><p className="mt-3 max-w-2xl leading-7 text-[#566073]">{description}</p><div className="mt-8 grid gap-6">{children}</div></section>;
}
