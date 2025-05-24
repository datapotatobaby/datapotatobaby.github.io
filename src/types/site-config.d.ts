
export interface SiteConfig {
  userInfo: {
    name: string;
    email: string;
    phone: string;
    location: string;
    links: {
      github: string;
      linkedin: string;
    };
    resumeFileName: string;
  };
  heroSection: {
    greeting: string;
    title: string;
    description: string;
    heroIcon: string;
    heroImageText: {
      field1_text: string;
      field2_text: string;
    };
    buttons: {
      primary: string;
      secondary: string;
    };
  };
  aboutMeSections: Array<{
    icon: string;
    title: string;
    text: string;
  }>;
  aboutMeContent: string;
  technicalSkillsAndExpertiseSection: Array<{
    icon: string;
    title: string;
    tags: string[];
  }>;
  contactSection: Array<{
    icon: string;
    title: string;
    text: string;
  }>;
}
