import { EMAIL, FULL_NAME, ROLE, SITE_DESCRIPTION, SITE_URL } from "@/data/socials";
import { getAllPosts } from "@/lib/blog";
import { getAllProjectSlugs, getProjectBySlug } from "@/lib/portfolio-data";

/**
 * A plain-text summary of the site for AI assistants that look for /llms.txt
 * before crawling. Generated from the same data the pages render from, so it
 * cannot drift out of date.
 */
export async function GET() {
  const posts = (await getAllPosts()).filter((post) => !post.draft);

  const projects = getAllProjectSlugs()
    .map(getProjectBySlug)
    .filter((project) => project !== undefined)
    .map(
      (project) =>
        `- [${project.title}](${SITE_URL}/portfolio/${project.slug}): ${project.description}`,
    );

  const sections = [
    `# ${FULL_NAME}`,
    `> ${SITE_DESCRIPTION}`,
    `${FULL_NAME} is a freelance ${ROLE} with 17 years of experience, previously at Booking.com, where his payment and checkout work produced a €35M annual conversion uplift. He designs and builds complete products on his own: web, iOS and Android, including AI-powered features. Contact: ${EMAIL}`,
    `## Services\n\n- [AI MVP development](${SITE_URL}/mvp-development): design and development of AI-powered MVPs for funded startups. Web, iOS and Android. 4 to 6 weeks on average. Projects from $15K USD, with a one-week paid scoping sprint as an entry point.`,
    `## Work\n\n${projects.join("\n")}`,
    `## About\n\n- [Testimonials](${SITE_URL}/testimonials): what clients and former colleagues say.\n- [Portfolio](${SITE_URL}/portfolio): all projects.`,
    posts.length > 0
      ? `## Writing\n\n${posts.map((post) => `- [${post.title}](${SITE_URL}/blog/${post.slug}): ${post.description}`).join("\n")}`
      : null,
  ].filter((section) => section !== null);

  return new Response(`${sections.join("\n\n")}\n`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
