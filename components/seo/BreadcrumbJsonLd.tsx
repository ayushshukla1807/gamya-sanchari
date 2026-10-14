import { buildBreadcrumbSchema } from "@/lib/metadata";

export default function BreadcrumbJsonLd({ items }: { items: readonly { readonly name: string; readonly path: string }[] }) {
  return (
    <script
      dangerouslySetInnerHTML={{ __html: JSON.stringify(buildBreadcrumbSchema(items)).replace(/</g, "\\u003c") }}
      type="application/ld+json"
    />
  );
}
