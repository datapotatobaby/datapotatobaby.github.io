
interface SkillsItem {
  title?: string;
  description: string[];
  technologies?: string[];
}

interface SkillsSectionProps {
  title: string;
  items: SkillsItem[];
}

const SkillsSection = ({ title, items }: SkillsSectionProps) => {
  return (
    <section className="mb-6 print:mb-4">
      <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200 print:border-b print:border-black">
        {title}
      </h2>
      {items.map((item, index) => (
        <div key={index} className="mb-3 print:mb-2">
          {item.title && (
            <h3 className="text-base font-medium text-slate-900 mb-1">
              {item.title}
            </h3>
          )}
          <ul className="list-disc list-outside ml-5 space-y-0.5">
            {item.description.map((skill, skillIndex) => (
              <li key={skillIndex} className="text-sm text-slate-700 print:text-black">
                {skill}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
};

export default SkillsSection;
