import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { getSite, getVideos } from "@/lib/cms";
import { VideoBlogJsonLd } from "@/components/seo/JsonLd";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata(
  {
    title: "Video Blog | Mortgage Tips & Market Guidance | Green Street Capital",
    description:
      "Watch Green Street Capital video guides on mortgage programs, homebuying, refinance, and working with our licensed loan officers. NMLS #2066586.",
    keywords: [
      "mortgage video blog",
      "homebuying tips",
      "mortgage education",
      "Green Street Capital YouTube",
    ],
  },
  { path: "/video-blog" }
);

export default function VideoBlogPage() {
  const { items, youtubeChannel } = getVideos();
  const site = getSite();

  return (
    <div className="w-full">
      <VideoBlogJsonLd videos={items} />
      <div className="bg-gradient-to-br from-gray-50 to-white py-24 text-center">
        <div className="mx-auto max-w-4xl px-4">
          <h1 className="mb-6 font-montserrat text-4xl font-bold text-foreground md:text-5xl">
            Video Blog
          </h1>
          <p className="text-xl text-muted-foreground">
            Expert guidance, market updates, and valuable resources for your home buying journey
          </p>
        </div>
      </div>

      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            {items.map((video) => (
              <div key={video.videoId} className="group">
                <div className="relative aspect-video overflow-hidden rounded-2xl bg-black shadow-lg">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.videoId}`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="h-full w-full"
                  />
                </div>
                <div className="mt-6">
                  <h2 className="mb-3 text-2xl font-bold text-foreground transition-colors group-hover:text-primary">
                    {video.title}
                  </h2>
                  <p className="text-lg leading-relaxed text-muted-foreground">
                    {video.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <a href={youtubeChannel} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg">
                View All Videos on YouTube <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      <section className="bg-muted py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-6 font-montserrat text-3xl font-bold text-foreground md:text-4xl">
            Ready to Start Your Mortgage Journey?
          </h2>
          <p className="mb-8 text-xl text-muted-foreground">
            Our team is here to guide you through every step of the process.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link href={site.applyPath}>
              <Button size="lg" className="w-full sm:w-auto">
                Apply Now
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
