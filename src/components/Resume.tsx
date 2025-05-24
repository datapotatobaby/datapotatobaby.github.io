
import { marked } from 'marked';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin, Download } from 'lucide-react';
import { Button } from "@/components/ui/button";

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
  
  const processedContent = marked(content, {
    breaks: false,
    gfm: true
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto bg-white text-gray-900 shadow-lg print:shadow-none print:max-w-none print:mx-0">
      {/* Header Section */}
      <div className="bg-slate-50 border-b border-slate-200 p-8 print:bg-white print:border-none">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              {frontmatter.name}
            </h1>
            <p className="text-xl text-slate-600 mb-4">
              {frontmatter.title}
            </p>
            <p className="text-slate-700 leading-relaxed max-w-2xl">
              {frontmatter.summary}
            </p>
          </div>
          <Button onClick={handlePrint} className="print:hidden">
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
        </div>
        
        <div className="flex flex-wrap items-center gap-6 text-sm text-slate-600">
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
      <div className="p-8">
        <div 
          className="prose prose-slate max-w-none
                   prose-headings:text-slate-900 prose-headings:font-bold
                   prose-h2:text-2xl prose-h2:mb-4 prose-h2:mt-8 prose-h2:pb-2 prose-h2:border-b prose-h2:border-slate-200
                   prose-h3:text-lg prose-h3:mb-2 prose-h3:mt-4 prose-h3:font-semibold
                   prose-h4:text-base prose-h4:mb-1 prose-h4:mt-3 prose-h4:font-medium
                   prose-p:text-slate-700 prose-p:text-sm prose-p:leading-6 prose-p:mb-3
                   prose-strong:text-slate-900 prose-strong:font-semibold
                   prose-ul:text-slate-700 prose-ol:text-slate-700
                   prose-li:text-slate-700 prose-li:text-sm prose-li:my-1 prose-li:leading-6
                   prose-ul:list-disc prose-ol:list-decimal prose-ul:pl-5 prose-ol:pl-5
                   prose-em:text-slate-600 prose-em:not-italic
                   first:prose-h2:mt-0
                   print:prose-h2:border-none"
          dangerouslySetInnerHTML={{ __html: processedContent }} 
        />
      </div>
    </div>
  );
};

export default Resume;
