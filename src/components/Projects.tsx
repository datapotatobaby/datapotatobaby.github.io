
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Project } from "@/types/content";
import { getProjects } from "@/utils/content-loader";

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");
  
  useEffect(() => {
    const loadProjects = async () => {
      try {
        const projectsData = await getProjects();
        setProjects(projectsData);
      } catch (error) {
        console.error("Error loading projects:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProjects();
  }, []);

  const allCategories = Array.from(
    new Set(projects.flatMap((project) => project.category))
  );
  
  const filteredProjects = activeFilter === "All" 
    ? projects 
    : projects.filter(project => project.category.includes(activeFilter));

  if (isLoading) {
    return (
      <section id="projects" className="section-container bg-gradient-to-b from-background to-slate-50/40 dark:to-slate-900/40">
        <div className="text-center mb-12">
          <h2 className="section-title">My Projects</h2>
          <p className="text-lg text-foreground/70 max-w-3xl mx-auto">
            Loading projects...
          </p>
        </div>
      </section>
    );
  }

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
          <Card key={project.slug} className="project-card card-hover">
            <div className="h-48 bg-secondary flex items-center justify-center">
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
            <CardHeader>
              <CardTitle>
                <Link to={`/project/${project.slug}`} className="hover:text-primary transition-colors">
                  {project.title}
                </Link>
              </CardTitle>
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
        <Button variant="outline" asChild>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">
            <Github className="mr-2 h-4 w-4" />
            See More on GitHub
          </a>
        </Button>
      </div>
    </section>
  );
};

export default Projects;
