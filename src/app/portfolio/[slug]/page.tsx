import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortfolioDetail } from "@/components/portfolio-detail";
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

  return {
    title: `${project.title} • Damir Kotorić`,
    description: project.description,
    openGraph: {
      title: `${project.title} • Damir Kotorić`,
      description: project.description,
      images: [
        {
          url: project.coverImage.src,
          width: 1200,
          height: 680,
          alt: project.coverImage.alt,
        },
      ],
    },
    twitter: {
      images: [project.coverImage.src],
    },
  };
}

export default async function PortfolioProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const nextProject = getNextProject(slug);

  return <PortfolioDetail project={project} nextProject={nextProject} />;
}
