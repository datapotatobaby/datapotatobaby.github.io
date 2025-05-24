
interface ExperienceItem {
  title?: string;
  company?: string;
  date?: string;
  description: string[];
}

interface ExperienceSectionProps {
  title: string;
  items: ExperienceItem[];
}

const ExperienceSection = ({ title, items }: ExperienceSectionProps) => {
  return (
    <section className="mb-6 print:mb-4">
      <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200 print:border-b print:border-black">
        {title}
      </h2>
      {items.map((item, index) => (
        <div key={index} className="mb-4 print:mb-3">
          {item.title && (
            <h3 
              className="text-lg font-semibold text-slate-900 mb-1"
              dangerouslySetInnerHTML={{ __html: item.title }}
            />
          )}
          {item.company && item.date && (
            <p className="text-sm text-slate-600 mb-2 print:text-black whitespace-nowrap">
              <span dangerouslySetInnerHTML={{ __html: item.company }} />
              <span className="mx-2 inline-block">•</span>
              <span dangerouslySetInnerHTML={{ __html: item.date }} />
            </p>
          )}
          {item.description.length > 0 && (
            <ul className="list-disc list-outside ml-5 space-y-1 print:space-y-0.5">
              {item.description.map((desc, descIndex) => (
                <li 
                  key={descIndex} 
                  className="text-sm text-slate-700 leading-relaxed print:text-black print:leading-tight"
                  dangerouslySetInnerHTML={{ __html: desc }}
                />
              ))}
            </ul>
          )}
        </div>
      ))}
    </section>
  );
};

export default ExperienceSection;
