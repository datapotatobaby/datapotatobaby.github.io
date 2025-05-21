
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github, ExternalLink } from 'lucide-react';

type ProjectType = {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string[];
  tech: string[];
  github?: string;
  liveLink?: string;
};

const Projects = () => {
  const projects: ProjectType[] = [
    {
      id: 1,
      title: "Home Automation Dashboard",
      description: "A centralized dashboard for controlling and monitoring smart home devices using Node-RED, MQTT, and Grafana for data visualization.",
      image: "placeholder.svg",
      category: ["Homelab", "Automation"],
      tech: ["Docker", "Node-RED", "MQTT", "Grafana", "InfluxDB"],
      github: "https://github.com",
      liveLink: "#"
    },
    {
      id: 2,
      title: "Inventory Management System",
      description: "Full-stack inventory tracking solution with barcode scanning capabilities for small businesses, complete with reporting and analytics.",
      image: "placeholder.svg",
      category: ["Business", "Web Development"],
      tech: ["React", "Express", "MongoDB", "Node.js", "ChartJS"],
      github: "https://github.com"
    },
    {
      id: 3, 
      title: "Personal Media Server",
      description: "Self-hosted media server with automated content acquisition, metadata scraping, and transcoding for various devices.",
      image: "placeholder.svg",
      category: ["Homelab", "Self-hosting"],
      tech: ["Docker", "Plex", "Sonarr", "Radarr", "Nginx"],
      github: "https://github.com"
    },
    {
      id: 4,
      title: "ETL Data Pipeline",
      description: "Automated data extraction, transformation, and loading pipeline for business analytics with scheduled processing and alerts.",
      image: "placeholder.svg",
      category: ["Data Engineering", "Automation"],
      tech: ["Python", "Airflow", "PostgreSQL", "Pandas", "AWS S3"],
      github: "https://github.com"
    },
    {
      id: 5,
      title: "Network Monitoring Solution",
      description: "Comprehensive monitoring system for home/small business networks with alerting and historical performance metrics.",
      image: "placeholder.svg",
      category: ["Homelab", "Networking"],
      tech: ["Prometheus", "Grafana", "SNMP", "Docker", "Python"],
      github: "https://github.com"
    },
    {
      id: 6,
      title: "Customer Analytics Dashboard",
      description: "Interactive dashboard for analyzing customer behavior and sales patterns to drive business decisions.",
      image: "placeholder.svg",
      category: ["Data Engineering", "Business"],
      tech: ["React", "D3.js", "Python", "Flask", "PostgreSQL"],
      github: "https://github.com"
    }
  ];

  const allCategories = Array.from(
    new Set(projects.flatMap((project) => project.category))
  );
  
  const [activeFilter, setActiveFilter] = useState("All");
  
  const filteredProjects = activeFilter === "All" 
    ? projects 
    : projects.filter(project => project.category.includes(activeFilter));

  return (
    <section id="projects" className="section-container bg-gradient-to-b from-background to-slate-50/40 dark:to-slate-900/40">
      <div className="text-center mb-12">
        <h2 className="section-title">My Projects</h2>
        <p className="text-lg text-foreground/70 max-w-3xl mx-auto">
          Explore my portfolio of technical projects spanning homelab setups, self-hosted solutions, data engineering, and business automation.
        </p>
        
        <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
          <Button 
            variant={activeFilter === "All" ? "default" : "outline"}
            className="rounded-full"
            onClick={() => setActiveFilter("All")}
          >
            All
          </Button>
          {allCategories.map((category) => (
            <Button
              key={category}
              variant={activeFilter === category ? "default" : "outline"}
              className="rounded-full"
              onClick={() => setActiveFilter(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="project-card card-hover">
            <div className="h-48 bg-secondary flex items-center justify-center">
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
            <CardHeader>
              <CardTitle>{project.title}</CardTitle>
              <div className="flex flex-wrap gap-2 mt-2">
                {project.category.map((cat) => (
                  <Badge key={cat} variant="outline" className="bg-primary/10">
                    {cat}
                  </Badge>
                ))}
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-foreground/70 text-base">
                {project.description}
              </CardDescription>
              <div className="flex flex-wrap gap-2 mt-4">
                {project.tech.map((tech) => (
                  <span key={tech} className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">
                    {tech}
                  </span>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between mt-auto pt-4">
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors">
                  <Github size={16} />
                  <span>Code</span>
                </a>
              )}
              {project.liveLink && (
                <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors">
                  <ExternalLink size={16} />
                  <span>Live Demo</span>
                </a>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Button variant="outline">
          <Github className="mr-2 h-4 w-4" />
          See More on GitHub
        </Button>
      </div>
    </section>
  );
};

export default Projects;
