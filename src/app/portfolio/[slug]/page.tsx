import type { Metadata } from "next";
import { pageMetadata } from "@/lib/page-metadata";
import { notFound } from "next/navigation";
import { PortfolioDetail } from "@/components/portfolio-detail";
import { FULL_NAME, PERSON_ID, SITE_URL } from "@/data/socials";
import {
  getProjectBySlug,
  getNextProject,
  getAllProjectSlugs,
} from "@/lib/portfolio-data";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = getAllProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  const title = `${project.seoTitle} • ${FULL_NAME}`;

  return pageMetadata({
    title,
    description: project.description,
    path: `/portfolio/${project.slug}`,
    image: {
      url: project.ogImage.src,
      width: 1200,
      height: 680,
      alt: project.ogImage.alt,
    },
  });
}

export default async function PortfolioProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const nextProject = getNextProject(slug);
  const url = `${SITE_URL}/portfolio/${project.slug}`;

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        "@id": `${url}#case-study`,
        name: project.title,
        headline: project.seoTitle,
        description: project.description,
        url,
        image: `${SITE_URL}${project.ogImage.src}`,
        creator: { "@id": PERSON_ID },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: "Portfolio",
            item: `${SITE_URL}/portfolio`,
          },
          { "@type": "ListItem", position: 3, name: project.title, item: url },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <PortfolioDetail project={project} nextProject={nextProject} />
    </>
  );
}
