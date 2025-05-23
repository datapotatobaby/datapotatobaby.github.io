
import { BlogPost, Project } from "@/types/content";
import matter from "gray-matter";

// Function to dynamically import MDX content
async function importMDXContent(path: string) {
  try {
    // In a real Vite build, this would use dynamic imports
    // For now, we'll simulate reading the content structure
    const response = await fetch(`/content/${path}/index.mdx`);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${path}`);
    }
    const content = await response.text();
    return matter(content);
  } catch (error) {
    console.error(`Error loading content from ${path}:`, error);
    return null;
  }
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  // In a real implementation, this would scan the content/blog directory
  // For now, we'll manually define the blog posts we created
  const blogSlugs = [
    'getting-started-with-homelab',
    'data-engineering-for-small-businesses'
  ];

  const posts: BlogPost[] = [];

  for (const slug of blogSlugs) {
    try {
      // Import the MDX file content
      const mdxContent = await importMDXContent(`blog/${slug}`);
      
      if (mdxContent) {
        const { data: frontmatter, content } = mdxContent;
        
        posts.push({
          slug,
          title: frontmatter.title,
          excerpt: frontmatter.excerpt,
          date: frontmatter.date,
          readTime: frontmatter.readTime,
          category: frontmatter.category,
          image: frontmatter.image,
          content
        });
      }
    } catch (error) {
      console.error(`Error loading blog post ${slug}:`, error);
      // Fallback to mock data for development
      if (slug === 'getting-started-with-homelab') {
        posts.push({
          slug,
          title: "Setting Up a Homelab: A Beginner's Guide",
          excerpt: "Learn how to build your first homelab from selecting hardware to deploying your first services.",
          date: "May 12, 2025",
          readTime: "8 min read",
          category: "Homelab",
          image: "/content/blog/getting-started-with-homelab/images/homelab-setup.jpg",
          content: "# Setting Up a Homelab\n\nBuilding a homelab is one of the most rewarding projects you can undertake as a tech enthusiast..."
        });
      } else if (slug === 'data-engineering-for-small-businesses') {
        posts.push({
          slug,
          title: "Data Engineering for Small Businesses",
          excerpt: "How small businesses can leverage data engineering practices to make better decisions.",
          date: "May 05, 2025",
          readTime: "6 min read",
          category: "Data Engineering",
          image: "/content/blog/data-engineering-for-small-businesses/images/data-dashboard.jpg",
          content: "# Data Engineering for Small Businesses\n\nData engineering isn't just for big tech companies..."
        });
      }
    }
  }

  return posts;
}

export async function getProjects(): Promise<Project[]> {
  // In a real implementation, this would scan the content/projects directory
  const projectSlugs = [
    'home-automation-dashboard',
    'inventory-management-system'
  ];

  const projects: Project[] = [];

  for (const slug of projectSlugs) {
    try {
      // Import the MDX file content
      const mdxContent = await importMDXContent(`projects/${slug}`);
      
      if (mdxContent) {
        const { data: frontmatter, content } = mdxContent;
        
        projects.push({
          slug,
          title: frontmatter.title,
          description: frontmatter.description,
          image: frontmatter.image,
          category: frontmatter.category,
          tech: frontmatter.tech,
          github: frontmatter.github,
          liveLink: frontmatter.liveLink,
          content
        });
      }
    } catch (error) {
      console.error(`Error loading project ${slug}:`, error);
      // Fallback to mock data for development
      if (slug === 'home-automation-dashboard') {
        projects.push({
          slug,
          title: "Home Automation Dashboard",
          description: "A centralized dashboard for controlling and monitoring smart home devices using Node-RED, MQTT, and Grafana for data visualization.",
          image: "/content/projects/home-automation-dashboard/images/dashboard-screenshot.jpg",
          category: ["Homelab", "Automation"],
          tech: ["Docker", "Node-RED", "MQTT", "Grafana", "InfluxDB"],
          github: "https://github.com/yourusername/home-automation",
          liveLink: "https://demo.yourdomain.com",
          content: "# Home Automation Dashboard\n\nThis project provides a central interface for controlling all smart home devices..."
        });
      } else if (slug === 'inventory-management-system') {
        projects.push({
          slug,
          title: "Inventory Management System",
          description: "Full-stack inventory tracking solution with barcode scanning capabilities for small businesses, complete with reporting and analytics.",
          image: "/content/projects/inventory-management-system/images/inventory-interface.jpg",
          category: ["Business", "Web Development"],
          tech: ["React", "Express", "MongoDB", "Node.js", "ChartJS"],
          github: "https://github.com/yourusername/inventory-system",
          content: "# Inventory Management System\n\nA comprehensive solution for tracking inventory in small businesses..."
        });
      }
    }
  }

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
