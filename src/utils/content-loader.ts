
import { BlogPost, Project } from "@/types/content";

// Import MDX content directly
const blogModules = import.meta.glob('/public/content/blog/*/index.mdx', { as: 'raw', eager: true });
const projectModules = import.meta.glob('/public/content/projects/*/index.mdx', { as: 'raw', eager: true });

// Function to extract frontmatter from raw MDX content
function extractFrontmatter(content: string) {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    return { frontmatter: {}, content: content };
  }
  
  const [, frontmatterStr, bodyContent] = match;
  const frontmatter: Record<string, any> = {};
  
  // Parse YAML-like frontmatter
  frontmatterStr.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim();
      let value: any = line.substring(colonIndex + 1).trim();
      
      // Remove quotes if present
      if ((value.startsWith('"') && value.endsWith('"')) || 
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      
      // Handle arrays (basic support for tech arrays)
      if (value.startsWith('[') && value.endsWith(']')) {
        value = value.slice(1, -1).split(',').map((item: string) => item.trim().replace(/['"]/g, ''));
      }
      
      frontmatter[key] = value;
    }
  });
  
  return { frontmatter, content: bodyContent };
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const posts: BlogPost[] = [];
  
  Object.entries(blogModules).forEach(([path, content]) => {
    const slug = path.match(/\/public\/content\/blog\/([^\/]+)\/index\.mdx$/)?.[1];
    if (!slug) return;
    
    const { frontmatter } = extractFrontmatter(content as string);
    
    posts.push({
      slug,
      title: frontmatter.title || 'Untitled',
      excerpt: frontmatter.excerpt || '',
      date: frontmatter.date || '',
      readTime: frontmatter.readTime || '',
      category: Array.isArray(frontmatter.category) ? frontmatter.category[0] : (frontmatter.category || 'Uncategorized'),
      image: frontmatter.image?.replace('./images/', `/content/blog/${slug}/images/`) || '/placeholder.svg',
      content: content as string
    });
  });
  
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getProjects(): Promise<Project[]> {
  const projects: Project[] = [];
  
  Object.entries(projectModules).forEach(([path, content]) => {
    const slug = path.match(/\/public\/content\/projects\/([^\/]+)\/index\.mdx$/)?.[1];
    if (!slug) return;
    
    const { frontmatter } = extractFrontmatter(content as string);
    
    projects.push({
      slug,
      title: frontmatter.title || 'Untitled',
      description: frontmatter.description || '',
      image: frontmatter.image?.replace('./images/', `/content/projects/${slug}/images/`) || '/placeholder.svg',
      category: Array.isArray(frontmatter.category) ? frontmatter.category : [frontmatter.category || 'Other'],
      tech: Array.isArray(frontmatter.tech) ? frontmatter.tech : [],
      github: frontmatter.github,
      liveLink: frontmatter.liveLink,
      content: content as string
    });
  });
  
  return projects;
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const posts = await getBlogPosts();
  return posts.find(post => post.slug === slug);
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  const projects = await getProjects();
  return projects.find(project => project.slug === slug);
}
