const STEP_NAMES = ["Where", "Who", "When", "What matters", "Contact", "Review"] as const;

export default function PlannerProgress({ step }: { step: number }) {
  return (
    <div>
      <p aria-live="polite" className="text-sm font-extrabold text-[#1844ef]">Step {step + 1} of {STEP_NAMES.length}: {STEP_NAMES[step]}</p>
      <ol aria-label="Trip planner progress" className="mt-4 grid grid-cols-6 gap-2">
        {STEP_NAMES.map((name, index) => <li aria-current={index === step ? "step" : undefined} className={`h-1.5 rounded-full ${index <= step ? "bg-[#1844ef]" : "bg-[#d8dfeb]"}`} key={name}><span className="sr-only">{name}</span></li>)}
      </ol>
    </div>
  );
}
