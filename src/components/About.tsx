
import { Card, CardContent } from "@/components/ui/card";
import { User, Briefcase, Code, FileCode, Terminal } from 'lucide-react';

const About = () => {
  const skills = [
    { category: "Programming", items: ["Python", "JavaScript", "TypeScript", "SQL", "Bash"] },
    { category: "Technologies", items: ["Docker", "Kubernetes", "AWS", "Linux", "Git"] },
    { category: "Data & Analytics", items: ["ETL pipelines", "Data visualization", "Business intelligence", "PostgreSQL", "MongoDB"] },
    { category: "Business", items: ["Project management", "Team leadership", "Strategic planning", "Process optimization", "Client relations"] }
  ];

  return (
    <section id="about" className="section-container bg-gradient-to-br from-secondary/50 to-background">
      <div className="max-w-4xl mx-auto">
        <h2 className="section-title text-center">About Me</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="card-hover">
            <CardContent className="flex flex-col items-center text-center pt-6">
              <div className="bg-primary/10 p-3 rounded-full mb-4">
                <User className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Tech Enthusiast</h3>
              <p className="text-foreground/70">
                Passionate about building and exploring new technologies through personal projects and continuous learning.
              </p>
            </CardContent>
          </Card>
          
          <Card className="card-hover">
            <CardContent className="flex flex-col items-center text-center pt-6">
              <div className="bg-primary/10 p-3 rounded-full mb-4">
                <Briefcase className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Business Background</h3>
              <p className="text-foreground/70">
                Small business owner with experience in operations, strategy, and management ready to transition to tech.
              </p>
            </CardContent>
          </Card>
          
          <Card className="card-hover">
            <CardContent className="flex flex-col items-center text-center pt-6">
              <div className="bg-primary/10 p-3 rounded-full mb-4">
                <Code className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Problem Solver</h3>
              <p className="text-foreground/70">
                Combine technical skills with business acumen to create innovative solutions to complex problems.
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="mb-12">
          <p className="mb-4 text-lg">
            As a small business owner with a deep passion for technology, I've spent years developing my technical skills through hands-on projects, self-hosting services, and automating business processes. I've built a homelab environment where I experiment with various technologies and continuously expand my knowledge.
          </p>
          <p className="text-lg">
            My unique combination of business experience and technical skills allows me to bridge the gap between business needs and technical implementation. I'm now looking to leverage these skills in a technology role where I can make a bigger impact and continue growing professionally.
          </p>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold mb-6">Technical Skills & Expertise</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {skills.map((skill) => (
              <Card key={skill.category} className="card-hover">
                <CardContent className="pt-6">
                  <h4 className="text-lg font-medium mb-3 flex items-center">
                    {skill.category === "Programming" ? <Terminal className="mr-2 h-4 w-4 text-accent" /> : 
                     skill.category === "Business" ? <Briefcase className="mr-2 h-4 w-4 text-accent" /> : 
                     <FileCode className="mr-2 h-4 w-4 text-accent" />}
                    {skill.category}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {skill.items.map((item) => (
                      <span key={item} className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm">
                        {item}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
