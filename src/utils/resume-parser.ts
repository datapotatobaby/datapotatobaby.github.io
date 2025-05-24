
interface ResumeSection {
  type: 'experience' | 'education' | 'skills' | 'projects' | 'other';
  title: string;
  content: string;
  items: ResumeItem[];
}

interface ResumeItem {
  title?: string;
  company?: string;
  location?: string;
  date?: string;
  description: string[];
  technologies?: string[];
}

export function parseResumeContent(content: string): ResumeSection[] {
  const sections: ResumeSection[] = [];
  const lines = content.split('\n');
  let currentSection: ResumeSection | null = null;
  let currentItem: ResumeItem | null = null;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Skip empty lines
    if (!line) continue;
    
    // H2 headers (## Experience, ## Skills, etc.)
    if (line.startsWith('## ')) {
      // Save previous section
      if (currentSection && currentItem) {
        currentSection.items.push(currentItem);
      }
      if (currentSection) {
        sections.push(currentSection);
      }
      
      const title = line.replace('## ', '');
      const type = getSectionType(title);
      
      currentSection = {
        type,
        title,
        content: '',
        items: []
      };
      currentItem = null;
    }
    // H3 headers (### Job Title, ### Project Name, etc.)
    else if (line.startsWith('### ')) {
      // Save previous item
      if (currentSection && currentItem) {
        currentSection.items.push(currentItem);
      }
      
      const title = line.replace('### ', '');
      currentItem = {
        title,
        description: [],
        technologies: []
      };
    }
    // Bold text with pipes (company | date format)
    else if (line.startsWith('**') && line.includes('|')) {
      if (currentItem) {
        const parts = line.replace(/\*\*/g, '').split('|').map(p => p.trim());
        currentItem.company = parts[0];
        currentItem.date = parts[1];
      }
    }
    // Bullet points
    else if (line.startsWith('- ')) {
      if (currentItem) {
        const description = line.replace('- ', '');
        currentItem.description.push(description);
      }
    }
    // Technology lists or other content
    else if (line.startsWith('**') && line.endsWith('**')) {
      // Technology category
      const category = line.replace(/\*\*/g, '');
      if (currentSection && currentSection.type === 'skills') {
        const nextLine = lines[i + 1];
        if (nextLine && nextLine.startsWith('- ')) {
          const techs = [];
          let j = i + 1;
          while (j < lines.length && lines[j].trim().startsWith('- ')) {
            techs.push(lines[j].trim().replace('- ', ''));
            j++;
          }
          currentSection.items.push({
            title: category,
            description: techs,
            technologies: techs
          });
          i = j - 1; // Skip processed lines
        }
      }
    }
  }
  
  // Save final section and item
  if (currentSection && currentItem) {
    currentSection.items.push(currentItem);
  }
  if (currentSection) {
    sections.push(currentSection);
  }
  
  return sections;
}

function getSectionType(title: string): ResumeSection['type'] {
  const lowercaseTitle = title.toLowerCase();
  if (lowercaseTitle.includes('experience') || lowercaseTitle.includes('work')) {
    return 'experience';
  }
  if (lowercaseTitle.includes('education')) {
    return 'education';
  }
  if (lowercaseTitle.includes('skill')) {
    return 'skills';
  }
  if (lowercaseTitle.includes('project')) {
    return 'projects';
  }
  return 'other';
}
