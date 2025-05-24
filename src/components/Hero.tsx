
import { useEffect, useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';
import { useSiteConfig } from '@/hooks/useSiteConfig';
import AnimatedPyramid from '@/components/3d/AnimatedPyramid';

const Hero = () => {
  const { config, isLoading, error } = useSiteConfig();
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!config || isLoading) return;

    // Simple CSS-based animations instead of anime.js for now
    const elements = [
      ...(textRef.current?.children || []),
      imageRef.current,
      ...(buttonsRef.current?.children || [])
    ].filter(Boolean);

    elements.forEach((element, index) => {
      if (element) {
        const htmlElement = element as HTMLElement;
        htmlElement.style.opacity = '0';
        htmlElement.style.transform = 'translateY(20px)';
        htmlElement.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        
        setTimeout(() => {
          htmlElement.style.opacity = '1';
          htmlElement.style.transform = 'translateY(0)';
        }, 100 + index * 150);
      }
    });

    // Add subtle animations to blobs
    const blobs = imageRef.current?.querySelectorAll('.hero-blob');
    blobs?.forEach((blob, index) => {
      const htmlBlob = blob as HTMLElement;
      htmlBlob.style.animation = `blob-float 8s ease-in-out infinite ${index * 2}s`;
    });

  }, [config, isLoading]);

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
    <>
      <style>{`
        @keyframes blob-float {
          0%, 100% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.05) rotate(2deg); }
        }
      `}</style>
      <section id="hero" className="section-container pt-24 md:pt-32 lg:pt-40 pb-16 md:pb-24 lg:pb-32" ref={heroRef}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Column: Hero Text */}
          <div className="text-center lg:text-left" ref={textRef}>
            <p className="text-lg text-foreground/70 mb-4">{heroSection.greeting}</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" dangerouslySetInnerHTML={{ __html: heroSection.title }}></h1>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto lg:mx-0 mb-8">{heroSection.description}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start" ref={buttonsRef}>
              <Button className="gap-2" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
                {heroSection.buttons.primary}
                <ArrowRight size={16} />
              </Button>
              <Button variant="secondary" onClick={handleDownloadResume}>
                {heroSection.buttons.secondary}
              </Button>
            </div>
          </div>

          {/* Right Column: Hero 3D Animation - No borders or background */}
          <div className="relative overflow-visible" ref={imageRef}>
            <div className="hero-blob absolute -top-12 -left-12 rounded-full bg-secondary/30 h-48 w-48 blur-2xl opacity-75"></div>
            <div className="hero-blob absolute -bottom-12 -right-12 rounded-full bg-primary/30 h-48 w-48 blur-2xl opacity-75"></div>
            <div className="relative overflow-visible">
              <AnimatedPyramid />
              <div className="absolute bottom-4 right-4 text-sm text-foreground/50 italic">
                <p>{heroSection.heroImageText.field1_text}</p>
                <p>{heroSection.heroImageText.field2_text}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
