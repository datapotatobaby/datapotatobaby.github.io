
import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Code, FileCode, Menu, X } from 'lucide-react';

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Determine if we're on the homepage
  const isHomepage = location.pathname === '/';
  const isBlogSection = location.pathname.startsWith('/blog');

  // Navigation link helper function
  const getNavLink = (section: string) => {
    if (isHomepage) {
      return `#${section}`;
    } else {
      return `/#${section}`;
    }
  };

  // Blog link helper function
  const getBlogLink = () => {
    if (isBlogSection) {
      return '/blog';
    } else if (isHomepage) {
      return '#blog';
    } else {
      return '/#blog';
    }
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-background/95 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'}`}>
      <div className="container flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold">
          <Code className="text-accent" />
          <span>John Doe</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <a href={getNavLink('about')} className="text-foreground/80 hover:text-foreground transition-colors">About</a>
          <a href={getNavLink('projects')} className="text-foreground/80 hover:text-foreground transition-colors">Projects</a>
          {isBlogSection ? (
            <Link to="/blog" className="text-foreground/80 hover:text-foreground transition-colors">Blog</Link>
          ) : (
            <a href={getBlogLink()} className="text-foreground/80 hover:text-foreground transition-colors">Blog</a>
          )}
          <a href={getNavLink('contact')} className="text-foreground/80 hover:text-foreground transition-colors">Contact</a>
          <Button variant="default">
            <FileCode className="mr-2 h-4 w-4" /> Resume
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-foreground p-2" 
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-background/95 backdrop-blur-md shadow-md py-4 md:hidden animate-fade-in">
            <nav className="flex flex-col items-center gap-4">
              <a href={getNavLink('about')} className="text-foreground/80 hover:text-foreground transition-colors py-2" onClick={toggleMobileMenu}>About</a>
              <a href={getNavLink('projects')} className="text-foreground/80 hover:text-foreground transition-colors py-2" onClick={toggleMobileMenu}>Projects</a>
              {isBlogSection ? (
                <Link to="/blog" className="text-foreground/80 hover:text-foreground transition-colors py-2" onClick={toggleMobileMenu}>Blog</Link>
              ) : (
                <a href={getBlogLink()} className="text-foreground/80 hover:text-foreground transition-colors py-2" onClick={toggleMobileMenu}>Blog</a>
              )}
              <a href={getNavLink('contact')} className="text-foreground/80 hover:text-foreground transition-colors py-2" onClick={toggleMobileMenu}>Contact</a>
              <Button variant="default" className="w-11/12 mt-2">
                <FileCode className="mr-2 h-4 w-4" /> Resume
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default NavBar;
