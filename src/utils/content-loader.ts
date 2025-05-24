import { BlogPost, Project } from "@/types/content";

// Import MDX content directly
const blogModules = import.meta.glob('/public/content/blog/*/index.mdx', { as: 'raw', eager: true });
const projectModules = import.meta.glob('/public/content/projects/*/index.mdx', { as: 'raw', eager: true });

// Function to format date strings consistently
function formatDate(dateInput: string): string {
  if (!dateInput) return '';
  
  try {
    // Try to parse the date - handles ISO strings, regular date strings, etc.
    const date = new Date(dateInput);
    
    // Check if the date is valid
    if (isNaN(date.getTime())) {
      console.warn('Invalid date format:', dateInput);
      return dateInput; // Return original if can't parse
    }
    
    // Format to a readable format: "May 24, 2025"
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch (error) {
    console.warn('Error parsing date:', dateInput, error);
    return dateInput; // Return original if error occurs
  }
}

// Function to extract frontmatter from raw MDX content
function extractFrontmatter(content: string) {
  console.log('Raw content received:', content.substring(0, 200) + '...');
  
  // Updated regex to handle leading whitespace/newlines before frontmatter
  const frontmatterRegex = /^\s*---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    console.log('No frontmatter match found');
    return { frontmatter: {}, content: content };
  }
  
  const [, frontmatterStr, bodyContent] = match;
  console.log('Frontmatter string:', frontmatterStr);
  console.log('Body content preview:', bodyContent.substring(0, 100) + '...');
  
  const frontmatter: Record<string, any> = {};
  
  // Parse YAML-like frontmatter
  frontmatterStr.split(/\r?\n/).forEach(line => {
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
  
  console.log('Parsed frontmatter:', frontmatter);
  return { frontmatter, content: bodyContent };
}

// Function to get a proper image URL or fallback to placeholder
function getImageUrl(imagePath: string, type: 'blog' | 'project', slug: string): string {
  if (!imagePath) {
    return '/placeholder.svg';
  }
  
  // If it's a relative path starting with ./images/
  if (imagePath.startsWith('./images/')) {
    // Use a placeholder image from unsplash for now since the actual images don't exist
    const placeholders = [
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop'
    ];
    
    // Use slug hash to consistently pick the same placeholder for the same content
    const hash = slug.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    
    return placeholders[Math.abs(hash) % placeholders.length];
  }
  
  // If it's already a full URL, use it as-is
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  
  // Fallback to placeholder
  return '/placeholder.svg';
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const posts: BlogPost[] = [];
  
  console.log('Loading blog posts...');
  console.log('Blog modules found:', Object.keys(blogModules));
  
  Object.entries(blogModules).forEach(([path, content]) => {
    console.log('Processing path:', path);
    const slug = path.match(/\/public\/content\/blog\/([^\/]+)\/index\.mdx$/)?.[1];
    if (!slug) {
      console.log('No slug found for path:', path);
      return;
    }
    
    console.log('Processing slug:', slug);
    const { frontmatter, content: bodyContent } = extractFrontmatter(content as string);
    
    const post = {
      slug,
      title: frontmatter.title || 'Untitled',
      excerpt: frontmatter.excerpt || '',
      date: formatDate(frontmatter.date || ''),
      readTime: frontmatter.readTime || '',
      category: Array.isArray(frontmatter.category) ? frontmatter.category[0] : (frontmatter.category || 'Uncategorized'),
      image: getImageUrl(frontmatter.image, 'blog', slug),
      content: bodyContent
    };
    
    console.log('Created post:', post);
    posts.push(post);
  });
  
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getProjects(): Promise<Project[]> {
  const projects: Project[] = [];
  
  Object.entries(projectModules).forEach(([path, content]) => {
    const slug = path.match(/\/public\/content\/projects\/([^\/]+)\/index\.mdx$/)?.[1];
    if (!slug) return;
    
    const { frontmatter, content: bodyContent } = extractFrontmatter(content as string);
    
    projects.push({
      slug,
      title: frontmatter.title || 'Untitled',
      description: frontmatter.description || '',
      image: getImageUrl(frontmatter.image, 'project', slug),
      category: Array.isArray(frontmatter.category) ? frontmatter.category : [frontmatter.category || 'Other'],
      tech: Array.isArray(frontmatter.tech) ? frontmatter.tech : [],
      github: frontmatter.github,
      liveLink: frontmatter.liveLink,
      content: bodyContent
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
