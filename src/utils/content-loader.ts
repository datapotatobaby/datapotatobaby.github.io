
import { BlogPost, Project } from "@/types/content";
import matter from "gray-matter";

// This function would be used in a real implementation to load content from files
// In a client-side only app, we're using a mock implementation
export async function getBlogPosts(): Promise<BlogPost[]> {
  // This would normally read from the filesystem, but in a client-side app 
  // we'll return mock data that simulates reading from files
  return [
    {
      slug: "getting-started-with-homelab",
      title: "Setting Up a Homelab: A Beginner's Guide",
      excerpt: "Learn how to build your first homelab from selecting hardware to deploying your first services.",
      date: "May 12, 2025",
      readTime: "8 min read",
      category: "Homelab",
      image: "placeholder.svg",
      content: "# Setting Up a Homelab\n\nIn this guide, we'll walk through everything you need to know about setting up your first homelab..."
    },
    {
      slug: "data-engineering-for-small-businesses",
      title: "Data Engineering for Small Businesses",
      excerpt: "How small businesses can leverage data engineering practices to make better decisions.",
      date: "May 05, 2025",
      readTime: "6 min read",
      category: "Data Engineering",
      image: "placeholder.svg",
      content: "# Data Engineering for Small Businesses\n\nData engineering isn't just for big tech companies. Small businesses can benefit too..."
    },
    {
      slug: "automating-business-processes",
      title: "Automating Business Processes with Python",
      excerpt: "Step-by-step guide to automating repetitive business tasks using Python scripts.",
      date: "April 28, 2025",
      readTime: "10 min read",
      category: "Automation",
      image: "placeholder.svg",
      content: "# Automating Business Processes with Python\n\nIn this tutorial, we'll explore how to automate common business tasks using Python..."
    }
  ];
}

export async function getProjects(): Promise<Project[]> {
  // Similar mock implementation for projects
  return [
    {
      slug: "home-automation-dashboard",
      title: "Home Automation Dashboard",
      description: "A centralized dashboard for controlling and monitoring smart home devices using Node-RED, MQTT, and Grafana for data visualization.",
      image: "placeholder.svg",
      category: ["Homelab", "Automation"],
      tech: ["Docker", "Node-RED", "MQTT", "Grafana", "InfluxDB"],
      github: "https://github.com",
      liveLink: "#",
      content: "# Home Automation Dashboard\n\nThis project provides a central interface for controlling all smart home devices..."
    },
    {
      slug: "inventory-management-system",
      title: "Inventory Management System",
      description: "Full-stack inventory tracking solution with barcode scanning capabilities for small businesses, complete with reporting and analytics.",
      image: "placeholder.svg",
      category: ["Business", "Web Development"],
      tech: ["React", "Express", "MongoDB", "Node.js", "ChartJS"],
      github: "https://github.com",
      content: "# Inventory Management System\n\nA comprehensive solution for tracking inventory in small businesses..."
    },
    {
      slug: "personal-media-server",
      title: "Personal Media Server",
      description: "Self-hosted media server with automated content acquisition, metadata scraping, and transcoding for various devices.",
      image: "placeholder.svg",
      category: ["Homelab", "Self-hosting"],
      tech: ["Docker", "Plex", "Sonarr", "Radarr", "Nginx"],
      github: "https://github.com",
      content: "# Personal Media Server\n\nThis project showcases how to build a fully-featured media server at home..."
    },
    {
      slug: "etl-data-pipeline",
      title: "ETL Data Pipeline",
      description: "Automated data extraction, transformation, and loading pipeline for business analytics with scheduled processing and alerts.",
      image: "placeholder.svg",
      category: ["Data Engineering", "Automation"],
      tech: ["Python", "Airflow", "PostgreSQL", "Pandas", "AWS S3"],
      github: "https://github.com",
      content: "# ETL Data Pipeline\n\nIn this project, I built a robust ETL pipeline for processing business data..."
    },
    {
      slug: "network-monitoring-solution",
      title: "Network Monitoring Solution",
      description: "Comprehensive monitoring system for home/small business networks with alerting and historical performance metrics.",
      image: "placeholder.svg",
      category: ["Homelab", "Networking"],
      tech: ["Prometheus", "Grafana", "SNMP", "Docker", "Python"],
      github: "https://github.com",
      content: "# Network Monitoring Solution\n\nA detailed look at my network monitoring setup using open-source tools..."
    },
    {
      slug: "customer-analytics-dashboard",
      title: "Customer Analytics Dashboard",
      description: "Interactive dashboard for analyzing customer behavior and sales patterns to drive business decisions.",
      image: "placeholder.svg",
      category: ["Data Engineering", "Business"],
      tech: ["React", "D3.js", "Python", "Flask", "PostgreSQL"],
      github: "https://github.com",
      content: "# Customer Analytics Dashboard\n\nThis dashboard provides deep insights into customer behavior..."
    }
  ];
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const posts = await getBlogPosts();
  return posts.find(post => post.slug === slug);
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  const projects = await getProjects();
  return projects.find(project => project.slug === slug);
}
