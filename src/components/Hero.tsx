
import { Button } from "@/components/ui/button";
import { ArrowDown, FileCode, Github, Linkedin } from 'lucide-react';

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen flex items-center pt-16 bg-gradient-to-b from-background to-slate-50/30 dark:to-slate-900/30">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 space-y-6 text-center md:text-left">
            <div className="space-y-2">
              <h2 className="text-lg md:text-xl font-medium text-accent">Hi, I'm John Doe</h2>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Business Professional & <span className="gradient-text">Tech Enthusiast</span>
              </h1>
              <p className="mt-4 text-lg md:text-xl text-foreground/70 max-w-2xl">
                Transforming business operations through technology. Specializing in homelab setup, 
                self-hosting, code development, data engineering, and automation solutions.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <Button size="lg" onClick={() => scrollToSection('projects')}>
                View My Projects
              </Button>
              <Button variant="outline" size="lg">
                <FileCode className="mr-2 h-4 w-4" />
                Download Resume
              </Button>
            </div>
            
            <div className="flex items-center gap-4 justify-center md:justify-start">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-foreground/70 hover:text-foreground transition-colors">
                <Github size={22} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-foreground/70 hover:text-foreground transition-colors">
                <Linkedin size={22} />
              </a>
            </div>
          </div>
          
          <div className="flex-1 flex justify-center">
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-tr from-primary to-accent/70 flex items-center justify-center relative">
              <div className="w-60 h-60 md:w-76 md:h-76 rounded-full bg-background/90 backdrop-blur flex items-center justify-center">
                <div className="text-7xl">👨‍💻</div>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-card border border-border shadow-lg rounded-lg p-3 text-sm">
                <code className="text-accent">const passion = "tech";</code>
              </div>
              <div className="absolute -top-2 -left-2 bg-card border border-border shadow-lg rounded-lg p-3 text-sm">
                <code className="text-primary">while(true) learn();</code>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-10 flex justify-center">
          <a href="#about" className="animate-bounce bg-card shadow-lg p-3 rounded-full border">
            <ArrowDown className="text-accent" size={20} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
