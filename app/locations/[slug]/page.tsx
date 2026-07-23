import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LandingPage } from "@/components/cms/LandingPage";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import {
  BreadcrumbJsonLd,
  FaqJsonLd,
  LandingServiceJsonLd,
  WebPageJsonLd,
} from "@/components/seo/JsonLd";
import {
  getLocationAsync,
  getLocationSlugsAsync,
} from "@/lib/cms";
import { buildPageMetadata } from "@/lib/seo/metadata";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getLocationSlugsAsync();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await getLocationAsync(slug);
  if (!page) {
    return buildPageMetadata(
      {
        title: "Location not found | Green Street Capital",
        description: "This location page is unavailable.",
      },
      { path: `/locations/${slug}`, noIndex: true }
    );
  }
  return buildPageMetadata(page.seo, {
    path: `/locations/${slug}`,
    image: "/MAIN PAGE PIC.jpg",
    imageAlt: page.hero.heading,
  });
}

export default async function LocationPage({ params }: Props) {
  const { slug } = await params;
  const page = await getLocationAsync(slug);
  if (!page) notFound();

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Locations", href: "/locations" },
    { name: page.hero.heading },
  ];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Locations", path: "/locations" },
          { name: page.hero.heading, path: `/locations/${slug}` },
        ]}
      />
      <WebPageJsonLd
        name={page.seo.title}
        description={page.seo.description}
        path={`/locations/${slug}`}
      />
      <FaqJsonLd faqs={page.faqs} />
      <LandingServiceJsonLd page={page} />
      <Breadcrumbs items={crumbs} />
      <LandingPage page={page} />
    </>
  );
}
