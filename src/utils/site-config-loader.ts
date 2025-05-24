
import { SiteConfig } from '@/types/site-config';

let cachedConfig: SiteConfig | null = null;

export async function getSiteConfig(): Promise<SiteConfig> {
  if (cachedConfig) {
    return cachedConfig;
  }

  try {
    const response = await fetch('/site-config.json');
    if (!response.ok) {
      throw new Error(`Failed to load site config: ${response.statusText}`);
    }
    
    const config = await response.json();
    cachedConfig = config;
    return config;
  } catch (error) {
    console.error('Error loading site configuration:', error);
    throw error;
  }
}

// Helper function to get user info specifically
export async function getUserInfo() {
  const config = await getSiteConfig();
  return config.userInfo;
}

// Helper function to get hero section specifically  
export async function getHeroSection() {
  const config = await getSiteConfig();
  return config.heroSection;
}

// Helper function to get about sections specifically
export async function getAboutSections() {
  const config = await getSiteConfig();
  return {
    sections: config.aboutMeSections,
    content: config.aboutMeContent
  };
}

// Helper function to get technical skills specifically
export async function getTechnicalSkills() {
  const config = await getSiteConfig();
  return config.technicalSkillsAndExpertiseSection;
}

// Helper function to get contact info specifically
export async function getContactInfo() {
  const config = await getSiteConfig();
  return config.contactSection;
}
