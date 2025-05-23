
export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  content: string;
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  image: string;
  category: string[];
  tech: string[];
  github?: string;
  liveLink?: string;
  content: string;
}
