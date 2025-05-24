
import { Mail, Phone, MapPin, Download } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { parseResumeContent } from "@/utils/resume-parser";
import ExperienceSection from "@/components/resume/ExperienceSection";
import SkillsSection from "@/components/resume/SkillsSection";
import ProjectsSection from "@/components/resume/ProjectsSection";
import GenericSection from "@/components/resume/GenericSection";

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

interface ResumeProps {
  resumeData: ResumeData;
}

const Resume = ({ resumeData }: ResumeProps) => {
  const { frontmatter, content } = resumeData;
  
  const sections = parseResumeContent(content);

  const handlePrint = () => {
    window.print();
  };

  const renderSection = (section: any, index: number) => {
    switch (section.type) {
      case 'experience':
        return <ExperienceSection key={index} title={section.title} items={section.items} />;
      case 'skills':
        return <SkillsSection key={index} title={section.title} items={section.items} />;
      case 'projects':
        return <ProjectsSection key={index} title={section.title} items={section.items} />;
      case 'education':
      case 'other':
      default:
        return <GenericSection key={index} title={section.title} items={section.items} />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white text-gray-900 shadow-lg print:shadow-none print:max-w-none print:mx-0">
      {/* Header Section */}
      <div className="bg-slate-50 border-b border-slate-200 p-8 print:bg-white print:border-none">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2 print:text-black">
              {frontmatter.name}
            </h1>
            <p className="text-xl text-slate-600 mb-4 print:text-black">
              {frontmatter.title}
            </p>
            <p className="text-slate-700 leading-relaxed max-w-2xl print:text-black">
              {frontmatter.summary}
            </p>
          </div>
          <Button onClick={handlePrint} className="print:hidden">
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
        </div>
        
        <div className="flex flex-wrap items-center gap-6 text-sm text-slate-600 print:text-black print:gap-4">
          <div className="flex items-center gap-2 whitespace-nowrap">
            <Mail className="w-4 h-4 flex-shrink-0" />
            <span>{frontmatter.email}</span>
          </div>
          <div className="flex items-center gap-2 whitespace-nowrap">
            <Phone className="w-4 h-4 flex-shrink-0" />
            <span>{frontmatter.phone}</span>
          </div>
          <div className="flex items-center gap-2 whitespace-nowrap">
            <MapPin className="w-4 h-4 flex-shrink-0" />
            <span>{frontmatter.location}</span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-8 print:p-6">
        {sections.map((section, index) => renderSection(section, index))}
      </div>
    </div>
  );
};

export default Resume;
