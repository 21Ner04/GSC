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
  getSpecialtyAsync,
  getSpecialtySlugsAsync,
} from "@/lib/cms";
import { buildPageMetadata } from "@/lib/seo/metadata";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getSpecialtySlugsAsync();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await getSpecialtyAsync(slug);
  if (!page) {
    return buildPageMetadata(
      {
        title: "Program not found | Green Street Capital",
        description: "This specialty program page is unavailable.",
      },
      { path: `/specialties/${slug}`, noIndex: true }
    );
  }
  return buildPageMetadata(page.seo, {
    path: `/specialties/${slug}`,
    image: "/MAIN PAGE PIC.jpg",
    imageAlt: page.hero.heading,
  });
}

export default async function SpecialtyPage({ params }: Props) {
  const { slug } = await params;
  const page = await getSpecialtyAsync(slug);
  if (!page) notFound();

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Specialties", href: "/specialties" },
    { name: page.hero.heading },
  ];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Specialties", path: "/specialties" },
          { name: page.hero.heading, path: `/specialties/${slug}` },
        ]}
      />
      <WebPageJsonLd
        name={page.seo.title}
        description={page.seo.description}
        path={`/specialties/${slug}`}
      />
      <FaqJsonLd faqs={page.faqs} />
      <LandingServiceJsonLd page={page} />
      <Breadcrumbs items={crumbs} />
      <LandingPage page={page} />
    </>
  );
}
