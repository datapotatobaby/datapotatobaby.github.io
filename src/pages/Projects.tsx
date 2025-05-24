import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github, ExternalLink, Search } from 'lucide-react';
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Project } from '@/types/content';
import { getProjects } from '@/utils/content-loader';
import { Input } from '@/components/ui/input';

const ProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const projectsData = await getProjects();
        setProjects(projectsData);
        setFilteredProjects(projectsData);
      } catch (error) {
        console.error('Error loading projects:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProjects();
  }, []);

  useEffect(() => {
    let result = projects;
    
    // Filter by category
    if (activeCategory !== 'All') {
      result = result.filter(project => project.category.includes(activeCategory));
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(project => 
        project.title.toLowerCase().includes(query) || 
        project.description.toLowerCase().includes(query) ||
        project.tech.some(tech => tech.toLowerCase().includes(query))
      );
    }
    
    setFilteredProjects(result);
  }, [searchQuery, activeCategory, projects]);

  const categories = ['All', ...Array.from(new Set(projects.flatMap(project => project.category)))];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <NavBar />
        <main className="container max-w-6xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold mb-8 text-center">Projects</h1>
          <div className="text-center py-20">Loading...</div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      
      <main className="container max-w-6xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-4 text-center">My Projects</h1>
        <p className="text-lg text-foreground/70 max-w-3xl mx-auto text-center mb-12">
          Explore my portfolio of technical projects spanning homelab setups, self-hosted solutions, data engineering, and business automation.
        </p>
        
        <div className="flex flex-col md:flex-row gap-6 justify-between mb-10">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
              <Input 
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <Button 
                key={category}
                variant={activeCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveCategory(category)}
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
        
        {filteredProjects.length === 0 ? (
          <div className="text-center py-20">
            <h3 className="text-xl mb-2">No projects found</h3>
            <p className="text-muted-foreground mb-6">Try a different search term or category</p>
            <Button onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}>
              Reset filters
            </Button>
          </div>
        ) : (
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
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default ProjectsPage;
