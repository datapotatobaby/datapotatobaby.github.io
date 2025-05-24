
interface ProjectItem {
  title?: string;
  description: string[];
  technologies?: string[];
}

interface ProjectsSectionProps {
  title: string;
  items: ProjectItem[];
}

const ProjectsSection = ({ title, items }: ProjectsSectionProps) => {
  return (
    <section className="mb-6 print:mb-4">
      <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200 print:border-b print:border-black">
        {title}
      </h2>
      {items.map((item, index) => (
        <div key={index} className="mb-4 print:mb-3">
          {item.title && (
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              {item.title}
            </h3>
          )}
          <ul className="list-disc list-outside ml-5 space-y-1 print:space-y-0.5">
            {item.description.map((desc, descIndex) => (
              <li key={descIndex} className="text-sm text-slate-700 leading-relaxed print:text-black print:leading-tight">
                {desc}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
};

export default ProjectsSection;
