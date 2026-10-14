import Link from "next/link";

export interface BreadcrumbItem {
  readonly label: string;
  readonly href?: string;
}

export default function Breadcrumbs({ items }: { items: readonly BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2 text-sm font-bold text-current/70">
        {items.map((item, index) => (
          <li className="flex items-center gap-2" key={`${item.label}-${index}`}>
            {index ? <span aria-hidden="true">/</span> : null}
            {item.href ? (
              <Link className="rounded hover:text-current focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4" href={item.href}>
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-current">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
