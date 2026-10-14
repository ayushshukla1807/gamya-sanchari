import Image from "next/image";
import Link from "next/link";

import type { JournalArticle } from "@/types/travel";

export default function ArticleCard({ article }: { article: JournalArticle }) {
  return (
    <article className="group overflow-hidden rounded-[2rem] bg-white shadow-[var(--shadow-soft)]">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          alt={article.alt}
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          src={article.image}
        />
      </div>
      <div className="grid gap-4 p-6 sm:p-7">
        <p className="eyebrow text-[#f06619]">{article.readingTime}</p>
        <h2 className="text-2xl font-extrabold leading-tight text-[#0b1633]">
          <Link
            className="rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1844ef]"
            href={`/journal/${article.slug}/`}
          >
            {article.title}
          </Link>
        </h2>
        <p className="leading-7 text-[#566073]">{article.excerpt}</p>
        <span aria-hidden="true" className="font-extrabold text-[#1844ef]">
          Read the guide →
        </span>
      </div>
    </article>
  );
}
