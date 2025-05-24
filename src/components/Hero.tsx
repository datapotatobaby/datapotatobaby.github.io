import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';
import { useSiteConfig } from '@/hooks/useSiteConfig';

const Hero = () => {
  const { config, isLoading, error } = useSiteConfig();

  if (isLoading || !config) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const { heroSection } = config;

  const handleDownloadResume = () => {
    if (config?.userInfo?.resumeFileName) {
      // Navigate to the resume page instead of downloading a PDF
      window.open(`/resume`, '_blank');
    }
  };

  return (
    <section id="hero" className="section-container pt-24 md:pt-32 lg:pt-40 pb-16 md:pb-24 lg:pb-32">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Column: Hero Text */}
        <div className="text-center lg:text-left">
          <p className="text-lg text-foreground/70 mb-4">{heroSection.greeting}</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" dangerouslySetInnerHTML={{ __html: heroSection.title }}></h1>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto lg:mx-0 mb-8">{heroSection.description}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button className="gap-2" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
              {heroSection.buttons.primary}
              <ArrowRight size={16} />
            </Button>
            <Button variant="secondary" onClick={handleDownloadResume}>
              {heroSection.buttons.secondary}
            </Button>
          </div>
        </div>

        {/* Right Column: Hero Image/Icon */}
        <div className="relative">
          <div className="absolute -top-12 -left-12 rounded-full bg-secondary/30 h-48 w-48 blur-2xl opacity-75"></div>
          <div className="absolute -bottom-12 -right-12 rounded-full bg-primary/30 h-48 w-48 blur-2xl opacity-75"></div>
          <div className="relative rounded-lg bg-muted p-8 shadow-lg">
            <span className="text-8xl">{heroSection.heroIcon}</span>
            <div className="absolute bottom-4 right-4 text-sm text-foreground/50 italic">
              <p>{heroSection.heroImageText.field1_text}</p>
              <p>{heroSection.heroImageText.field2_text}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
