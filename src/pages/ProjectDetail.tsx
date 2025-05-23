
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Github, ExternalLink } from 'lucide-react';
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Project } from '@/types/content';
import { getProjectBySlug } from '@/utils/content-loader';

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProject = async () => {
      try {
        setIsLoading(true);
        if (!slug) {
          setError('No project slug provided');
          return;
        }
        
        const projectData = await getProjectBySlug(slug);
        if (!projectData) {
          setError('Project not found');
          return;
        }
        
        setProject(projectData);
      } catch (error) {
        console.error('Error loading project:', error);
        setError('Failed to load project');
      } finally {
        setIsLoading(false);
      }
    };

    loadProject();
  }, [slug]);

  const renderContent = () => {
    if (isLoading) {
      return <div className="text-center py-20">Loading...</div>;
    }

    if (error) {
      return (
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold text-red-500 mb-4">{error}</h2>
          <Button asChild>
            <Link to="/#projects">Back to Projects</Link>
          </Button>
        </div>
      );
    }

    if (!project) {
      return (
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold mb-4">Project not found</h2>
          <Button asChild>
            <Link to="/#projects">Back to Projects</Link>
          </Button>
        </div>
      );
    }

    // Simple renderer for Markdown content - just for demonstration
    const lines = project.content.split('\n').map((line, i) => {
      if (line.startsWith('# ')) {
        return <h1 key={i} className="text-4xl font-bold mb-6">{line.substring(2)}</h1>;
      } else if (line.startsWith('## ')) {
        return <h2 key={i} className="text-3xl font-bold mb-4 mt-8">{line.substring(3)}</h2>;
      } else if (line.startsWith('### ')) {
        return <h3 key={i} className="text-2xl font-bold mb-3 mt-6">{line.substring(4)}</h3>;
      } else if (line === '') {
        return <br key={i} />;
      } else {
        return <p key={i} className="mb-4">{line}</p>;
      }
    });

    return (
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{project.title}</h1>
        
        <div className="flex flex-wrap gap-3 mb-6">
          {project.category.map(cat => (
            <Badge key={cat} variant="outline" className="bg-primary/10">
              {cat}
            </Badge>
          ))}
        </div>

        {project.image && (
          <div className="my-8">
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full max-h-96 object-cover rounded-lg"
            />
          </div>
        )}
        
        <div className="flex flex-wrap gap-2 mb-8">
          {project.tech.map(tech => (
            <span key={tech} className="text-xs bg-secondary text-secondary-foreground px-3 py-1.5 rounded">
              {tech}
            </span>
          ))}
        </div>

        <div className="flex gap-4 mb-8">
          {project.github && (
            <Button asChild size="sm" variant="outline">
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <Github size={16} />
                View Code
              </a>
            </Button>
          )}
          {project.liveLink && (
            <Button asChild size="sm">
              <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <ExternalLink size={16} />
                Live Demo
              </a>
            </Button>
          )}
        </div>
        
        <div className="mt-8">{lines}</div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <NavBar />
      
      <main className="flex-grow container max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-8 hover:bg-transparent p-0">
            <Link to="/#projects" className="flex items-center gap-2 text-foreground/70 hover:text-foreground">
              <ArrowLeft size={16} />
              Back to all projects
            </Link>
          </Button>
        </div>
        
        {renderContent()}
      </main>
      
      <Footer />
    </div>
  );
};

export default ProjectDetail;
