import { buildPlannerSummary } from "@/lib/planner";
import type { PlannerDraft } from "@/types/travel";

const editSteps = ["Where", "Who", "When", "What matters", "Contact"];

export default function PlannerReview({ draft, onEdit }: { draft: PlannerDraft; onEdit: (step: number) => void }) {
  return <div><div className="rounded-[1.5rem] bg-[#f2e8d8] p-6"><pre className="whitespace-pre-wrap font-sans text-sm leading-7 text-[#3f2a20]">{buildPlannerSummary(draft)}</pre><div className="mt-6 border-t border-[#3f2a20]/10 pt-5 text-sm leading-7"><p><strong>Name:</strong> {draft.name}</p><p><strong>Phone:</strong> {draft.phone}</p>{draft.email ? <p><strong>Email:</strong> {draft.email}</p> : null}</div></div><div className="mt-5 flex flex-wrap gap-2">{editSteps.map((label, index) => <button className="min-h-11 rounded-full border border-[#3f2a20]/15 bg-white px-4 text-sm font-extrabold text-[#a63d24]" key={label} onClick={() => onEdit(index)} type="button">Edit {label}</button>)}</div></div>;
}
