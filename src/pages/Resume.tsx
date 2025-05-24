
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Resume from "@/components/Resume";

interface ResumeData {
  frontmatter: {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    summary: string;
  };
  content: string;
}

const ResumePage = () => {
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const loadResume = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/content/resume/index.mdx');
        if (!response.ok) {
          throw new Error('Resume not found');
        }
        
        const content = await response.text();
        
        // Extract frontmatter
        const frontmatterRegex = /^\s*---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/;
        const match = content.match(frontmatterRegex);
        
        if (!match) {
          throw new Error('Invalid resume format');
        }
        
        const [, frontmatterStr, bodyContent] = match;
        const frontmatter: any = {};
        
        frontmatterStr.split(/\r?\n/).forEach(line => {
          const colonIndex = line.indexOf(':');
          if (colonIndex > 0) {
            const key = line.substring(0, colonIndex).trim();
            let value = line.substring(colonIndex + 1).trim();
            
            if ((value.startsWith('"') && value.endsWith('"')) || 
                (value.startsWith("'") && value.endsWith("'"))) {
              value = value.slice(1, -1);
            }
            
            frontmatter[key] = value;
          }
        });
        
        setResumeData({ frontmatter, content: bodyContent });
      } catch (error) {
        console.error('Error loading resume:', error);
        setError('Failed to load resume');
      } finally {
        setIsLoading(false);
      }
    };

    loadResume();
  }, []);

  const renderContent = () => {
    if (isLoading) {
      return <div className="text-center py-20">Loading resume...</div>;
    }

    if (error) {
      return (
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold text-red-500 mb-4">{error}</h2>
        </div>
      );
    }

    if (!resumeData) {
      return (
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold mb-4">Resume not found</h2>
        </div>
      );
    }

    return <Resume resumeData={resumeData} />;
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <NavBar />
      <main className="flex-grow container mx-auto px-4 py-12">
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
};

export default ResumePage;
