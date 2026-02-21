import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/footer";
import { ContactFormTrigger } from "@/components/contact-form/contact-form-trigger";
import { Testimonial } from "@/components/testimonial";
import { PortfolioCover } from "@/components/portfolio-cover";
import { ZoomableImage } from "@/components/zoomable-image";
import type { PortfolioProject, ImageBlock } from "@/lib/portfolio-data";
import { getImageDimensions } from "@/lib/image-dimensions";

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
          <h1 className="mb-2 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            {project.title}
          </h1>
          <p className="mb-8 max-w-xl text-lg text-muted-foreground">
            {project.descriptionRich ?? project.description}
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
            {project.liveUrl && (
              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground opacity-60">
                  Website
                </span>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium transition hover:opacity-70"
                >
                  {new URL(project.liveUrl).hostname} ↗
                </a>
              </div>
            )}
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
          <ContactFormTrigger />
        </section>
      </main>

      <Footer />
    </>
  );
}

function isVideo(src: string) {
  return /\.(mp4|webm|mov)(\?.*)?$/i.test(src);
}

function getYouTubeId(src: string): string | null {
  const match = src.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
  return match ? match[1] : null;
}

function MediaItem({ image, width }: { image: { src: string; alt: string; caption?: string }; width: number }) {
  const youtubeId = getYouTubeId(image.src);
  if (youtubeId) {
    return (
      <div className="relative overflow-hidden rounded-lg border border-border bg-muted">
        <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}?rel=0`}
            title={image.alt}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        </div>
      </div>
    );
  }

  if (isVideo(image.src)) {
    return (
      <div className="relative overflow-hidden rounded-lg border border-border bg-muted">
        {image.caption && (
          <span className="absolute top-0 left-0 m-3 z-10 text-xs font-medium bg-white/70 text-black px-2 py-1 rounded backdrop-blur-sm border border-black/10">
            {image.caption}
          </span>
        )}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-auto"
        >
          <source src={image.src} type={`video/${image.src.split('.').pop()?.split('?')[0]}`} />
        </video>
      </div>
    );
  }

  const dims = getImageDimensions(image.src);
  return (
    <div className="relative overflow-hidden rounded-lg border border-border bg-muted">
      {image.caption && (
        <span className="absolute top-0 left-0 m-3 text-xs font-medium bg-white/70 text-black px-2 py-1 rounded backdrop-blur-sm border border-black/10">
          {image.caption}
        </span>
      )}
      <Image
        src={image.src}
        alt={image.alt}
        width={dims?.width ?? width}
        height={dims?.height ?? 0}
        quality={100}
        className="w-full h-auto"
      />
    </div>
  );
}

function ImageBlockRenderer({ block }: { block: ImageBlock }) {
  if (block.layout === "full") {
    return (
      <div className="flex flex-col gap-4">
        {block.images.map((image, index) => (
          <MediaItem key={index} image={image} width={1600} />
        ))}
      </div>
    );
  }

  if (block.layout === "grid-2") {
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {block.images.map((image, index) => {
          if (isVideo(image.src) || getYouTubeId(image.src) || !image.zoomable) {
            return <MediaItem key={index} image={image} width={600} />;
          }
          const dims = getImageDimensions(image.src);
          return (
            <ZoomableImage
              key={index}
              src={image.src}
              alt={image.alt}
              width={dims?.width ?? 600}
              height={dims?.height}
              caption={image.caption}
            />
          );
        })}
      </div>
    );
  }

  if (block.layout === "grid-2-fluid") {
    return (
      <div className="flex flex-col gap-4 md:flex-row">
        {block.images.map((image, index) => {
          const dims = getImageDimensions(image.src);
          const aspect = dims ? dims.width / dims.height : 1;
          if (isVideo(image.src) || getYouTubeId(image.src) || !image.zoomable) {
            return (
              <div key={index} className="min-w-0 basis-0" style={{ flexGrow: aspect }}>
                <MediaItem image={image} width={600} />
              </div>
            );
          }
          return (
            <div key={index} className="min-w-0 basis-0" style={{ flexGrow: aspect }}>
              <ZoomableImage
                src={image.src}
                alt={image.alt}
                width={dims?.width ?? 600}
                height={dims?.height}
                caption={image.caption}
              />
            </div>
          );
        })}
      </div>
    );
  }

  if (block.layout === "grid-3") {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {block.images.map((image, index) => {
          if (isVideo(image.src) || getYouTubeId(image.src) || !image.zoomable) {
            return <MediaItem key={index} image={image} width={400} />;
          }
          const dims = getImageDimensions(image.src);
          return (
            <ZoomableImage
              key={index}
              src={image.src}
              alt={image.alt}
              width={dims?.width ?? 400}
              height={dims?.height}
              caption={image.caption}
            />
          );
        })}
      </div>
    );
  }

  if (block.layout === "grid-3-fluid") {
    return (
      <div className="flex flex-col gap-4 md:flex-row">
        {block.images.map((image, index) => {
          const dims = getImageDimensions(image.src);
          const aspect = dims ? dims.width / dims.height : 1;
          if (isVideo(image.src) || getYouTubeId(image.src) || !image.zoomable) {
            return (
              <div key={index} className="min-w-0 basis-0" style={{ flexGrow: aspect }}>
                <MediaItem image={image} width={400} />
              </div>
            );
          }
          return (
            <div key={index} className="min-w-0 basis-0" style={{ flexGrow: aspect }}>
              <ZoomableImage
                src={image.src}
                alt={image.alt}
                width={dims?.width ?? 400}
                height={dims?.height}
                caption={image.caption}
              />
            </div>
          );
        })}
      </div>
    );
  }

  return null;
}
