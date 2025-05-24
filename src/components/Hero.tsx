import { useEffect, useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';
import { useSiteConfig } from '@/hooks/useSiteConfig';
import * as anime from 'animejs';

const Hero = () => {
  const { config, isLoading, error } = useSiteConfig();
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!config || isLoading) return;

    // Set initial states
    if (textRef.current) {
      anime.set(textRef.current.children, {
        opacity: 0,
        translateY: 30
      });
    }

    if (imageRef.current) {
      anime.set(imageRef.current, {
        opacity: 0,
        scale: 0.8
      });
    }

    if (buttonsRef.current) {
      anime.set(buttonsRef.current.children, {
        opacity: 0,
        translateY: 20
      });
    }

    // Animate entrance
    const timeline = anime.timeline({
      easing: 'easeOutCubic'
    });

    // Text elements staggered animation
    timeline.add({
      targets: textRef.current?.children,
      opacity: [0, 1],
      translateY: [30, 0],
      duration: 800,
      delay: anime.stagger(150, { start: 200 })
    });

    // Hero image/emoji container
    timeline.add({
      targets: imageRef.current,
      opacity: [0, 1],
      scale: [0.8, 1],
      duration: 1000,
      offset: '-=400'
    });

    // Buttons
    timeline.add({
      targets: buttonsRef.current?.children,
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 600,
      delay: anime.stagger(100),
      offset: '-=600'
    });

    // Floating animation for the emoji
    anime({
      targets: imageRef.current?.querySelector('.hero-emoji'),
      translateY: [-8, 8],
      duration: 3000,
      direction: 'alternate',
      loop: true,
      easing: 'easeInOutSine',
      delay: 1500
    });

    // Subtle blob animations
    anime({
      targets: imageRef.current?.querySelectorAll('.hero-blob'),
      scale: [1, 1.1],
      rotate: [0, 5],
      duration: 8000,
      direction: 'alternate',
      loop: true,
      easing: 'easeInOutSine',
      delay: anime.stagger(2000)
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

        {/* Right Column: Hero Image/Icon */}
        <div className="relative" ref={imageRef}>
          <div className="hero-blob absolute -top-12 -left-12 rounded-full bg-secondary/30 h-48 w-48 blur-2xl opacity-75"></div>
          <div className="hero-blob absolute -bottom-12 -right-12 rounded-full bg-primary/30 h-48 w-48 blur-2xl opacity-75"></div>
          <div className="relative rounded-lg bg-muted p-8 shadow-lg">
            <span className="hero-emoji text-8xl block">{heroSection.heroIcon}</span>
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
