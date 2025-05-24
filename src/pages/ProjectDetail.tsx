
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Github, ExternalLink } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Project } from '@/types/content';
import { getProjects } from '@/utils/content-loader';
import { marked } from 'marked';

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [processedContent, setProcessedContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  // Scroll to top when component mounts or slug changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    const loadProject = async () => {
      if (!slug) return;
      
      try {
        setIsLoading(true);
        const projectsData = await getProjects();
        const foundProject = projectsData.find(p => p.slug === slug);
        
        if (foundProject) {
          setProject(foundProject);
          
          // Configure marked options for better parsing
          marked.setOptions({
            breaks: true,
            gfm: true
          });
          
          // Process the markdown content to HTML
          const htmlContent = await marked(foundProject.content);
          setProcessedContent(htmlContent);
        } else {
          setProject(null);
        }
      } catch (error) {
        console.error('Error loading project:', error);
        setProject(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadProject();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <NavBar />
        <main className="container max-w-4xl mx-auto px-4 py-16">
          <div className="text-center py-20">Loading project...</div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-background">
        <NavBar />
        <main className="container max-w-4xl mx-auto px-4 py-16">
          <div className="text-center py-20">
            <h1 className="text-2xl font-bold mb-4">Project not found</h1>
            <Button asChild>
              <Link to="/projects">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Projects
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      
      <main className="container max-w-4xl mx-auto px-4 py-16">
        <Button variant="outline" className="mb-8" asChild>
          <Link to="/projects">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Link>
        </Button>

        <article className="prose prose-lg max-w-none dark:prose-invert">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {project.category.map((cat) => (
                <Badge key={cat} variant="outline" className="bg-primary/10">
                  {cat}
                </Badge>
              ))}
            </div>

            <p className="text-xl text-foreground/70 mb-6">{project.description}</p>

            <div className="flex flex-wrap gap-4 mb-8">
              {project.github && (
                <Button variant="outline" asChild>
                  <a href={project.github} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    View Code
                  </a>
                </Button>
              )}
              {project.liveLink && (
                <Button asChild>
                  <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Live Demo
                  </a>
                </Button>
              )}
            </div>

            <div className="mb-8">
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-3">Technologies Used</h3>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span key={tech} className="text-sm bg-secondary text-secondary-foreground px-3 py-1 rounded-full">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div 
            className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-h4:text-lg prose-p:text-base prose-p:leading-7 prose-li:text-base prose-strong:font-semibold prose-ul:list-disc prose-ol:list-decimal prose-ul:pl-6 prose-ol:pl-6 prose-li:ml-0 prose-pre:bg-secondary prose-pre:p-4 prose-pre:rounded-lg prose-code:bg-secondary prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm"
            dangerouslySetInnerHTML={{ __html: processedContent }} 
          />
        </article>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProjectDetail;
