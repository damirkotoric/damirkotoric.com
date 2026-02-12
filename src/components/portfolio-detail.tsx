import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/footer";
import { Testimonial } from "@/components/testimonial";
import { PortfolioCover } from "@/components/portfolio-cover";
import type { PortfolioProject, ImageBlock } from "@/lib/portfolio-data";

type PortfolioDetailProps = {
  project: PortfolioProject;
  nextProject: PortfolioProject;
};

export function PortfolioDetail({ project, nextProject }: PortfolioDetailProps) {
  return (
    <>
      <main>
        {/* Breadcrumb + Header */}
        <header className="px-6 pt-16 lg:px-16 lg:pt-20 2xl:px-40 3xl:px-80">
          <nav className="mb-2 flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link href="/" className="transition hover:text-foreground">
              Home
            </Link>
            <span className="opacity-50">/</span>
            <Link href="/portfolio" className="transition hover:text-foreground">
              Portfolio
            </Link>
            <span className="opacity-50">/</span>
          </nav>
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            {project.title}
          </h1>
          <p className="mb-8 max-w-xl text-lg text-muted-foreground">
            {project.description}
          </p>

          {/* Meta row */}
          <div className="flex flex-wrap gap-8 text-sm">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground opacity-60">
                Role
              </span>
              <span className="font-medium">{project.role}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground opacity-60">
                Year
              </span>
              <span className="font-medium">{project.year}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground opacity-60">
                Client
              </span>
              <span className="font-medium">{project.client}</span>
            </div>
          </div>
        </header>

        {/* Cover */}
        <section className="px-6 py-12 lg:px-16 2xl:px-40 3xl:px-80">
          <PortfolioCover slug={project.slug} coverImage={project.coverImage} />
        </section>

        {/* Testimonial */}
        {project.testimonial && (
          <section className="px-6 py-12 lg:px-16 2xl:px-40 3xl:px-80">
            <div className="pb-12">
              <Testimonial
                quote={project.testimonial.quote}
                highlight={project.testimonial.highlight}
                name={project.testimonial.name}
                role={project.testimonial.role}
                image={project.testimonial.image}
                linkedIn={project.testimonial.linkedIn}
                variant="featured"
              />
            </div>
          </section>
        )}

        {/* Content Sections */}
        {project.sections.map((section, index) => (
          <section
            key={section.heading}
            className="px-6 py-16 lg:px-16 lg:py-20 2xl:px-40 3xl:px-80"
          >
            <div
              className={
                index < project.sections.length - 1
                  ? "border-b border-border pb-16 lg:pb-20"
                  : ""
              }
            >
              <h2 className="mb-4 text-2xl font-bold tracking-tight">
                {section.heading}
              </h2>
              <p className="mb-8 max-w-xl text-muted-foreground leading-relaxed">
                {section.description}
              </p>
              <div className="flex flex-col gap-4">
                {section.imageBlocks.map((block, blockIndex) => (
                  <ImageBlockRenderer key={blockIndex} block={block} />
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* Next Project */}
        <section className="px-6 py-16 lg:px-16 lg:py-20 2xl:px-40 3xl:px-80">
          <div className="border-t border-border pt-16 lg:pt-20">
            <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground opacity-60 mb-2">
              Next project
            </div>
            <Link
              href={`/portfolio/${nextProject.slug}`}
              className="group inline-flex items-center gap-3 text-2xl font-bold tracking-tight transition-opacity hover:opacity-70 sm:text-3xl"
            >
              {nextProject.title}
              <span className="text-xl transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-6 rounded-xl bg-muted px-6 py-24 text-center lg:mx-16 lg:py-32 2xl:mx-40 3xl:mx-80">
          <h2 className="mb-8 text-3xl font-bold sm:text-4xl">
            Ready to work together?
          </h2>
          <Button asChild size="lg">
            <Link href="#">Start the conversation</Link>
          </Button>
        </section>
      </main>

      <Footer />
    </>
  );
}

function ImageBlockRenderer({ block }: { block: ImageBlock }) {
  if (block.layout === "full") {
    return (
      <div className="flex flex-col gap-4">
        {block.images.map((image, index) => (
          <div key={index} className="overflow-hidden rounded-lg bg-muted">
            <Image
              src={image.src}
              alt={image.alt}
              width={1600}
              height={0}
              className="w-full h-auto"
            />
          </div>
        ))}
      </div>
    );
  }

  if (block.layout === "grid-2") {
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {block.images.map((image, index) => (
          <div key={index} className="overflow-hidden rounded-lg bg-muted">
            <Image
              src={image.src}
              alt={image.alt}
              width={600}
              height={0}
              className="w-full h-auto"
            />
          </div>
        ))}
      </div>
    );
  }

  if (block.layout === "grid-3") {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {block.images.map((image, index) => (
          <div key={index} className="overflow-hidden rounded-lg bg-muted">
            <Image
              src={image.src}
              alt={image.alt}
              width={400}
              height={0}
              className="w-full h-auto"
            />
          </div>
        ))}
      </div>
    );
  }

  return null;
}
