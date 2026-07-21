import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getHomepage, getSite } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Success Stories | Real Clients, Real Solutions",
  description:
    "Placeholder success stories from Green Street Capital clients: truck drivers, self-employed borrowers, first-time buyers, and investors. Results vary.",
  alternates: { canonical: "/success-stories" },
};

export default function SuccessStoriesPage() {
  const home = getHomepage();
  const site = getSite();
  const stories = home.successStories.items;

  return (
    <div className="w-full pb-24">
      <div className="border-b border-gray-200 bg-white py-16 text-center">
        <div className="mx-auto max-w-3xl px-4">
          <h1 className="mb-4 font-montserrat text-4xl font-bold text-foreground md:text-5xl">
            {home.successStories.heading}
          </h1>
          <p className="text-lg text-muted-foreground">
            {home.successStories.subtitle}
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            Illustrative scenarios. Specific rates, credit scores, and outcomes are not
            guarantees and will be updated when approved client stories are provided.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl space-y-12 px-4 py-16 sm:px-6 lg:px-8">
        {stories.map((story) => (
          <article
            key={story.slug}
            id={story.slug}
            className="scroll-mt-28 rounded-2xl border border-gray-100 bg-white p-8 shadow-sm"
          >
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              {story.clientType}
            </span>
            <h2 className="mt-4 mb-6 font-montserrat text-2xl font-bold text-foreground">
              {story.title}
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <div>
                <h3 className="mb-1 font-semibold text-foreground">Problem</h3>
                <p>{story.problem}</p>
              </div>
              <div>
                <h3 className="mb-1 font-semibold text-foreground">Solution</h3>
                <p>{story.solution}</p>
              </div>
              <div>
                <h3 className="mb-1 font-semibold text-foreground">Result</h3>
                <p>{story.result}</p>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mx-auto max-w-3xl px-4 text-center">
        <h2 className="mb-4 font-montserrat text-2xl font-bold">
          Ready to write your own story?
        </h2>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link href={site.applyPath}>
            <Button size="lg">Apply Now</Button>
          </Link>
          <Link href={site.teamPath}>
            <Button size="lg" variant="outline">
              Meet Our Team
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
