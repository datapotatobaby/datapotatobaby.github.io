
import { Code } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-slate-900 text-white py-10">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Code className="text-accent" />
            <span className="font-bold text-xl">John Doe</span>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <p className="text-slate-300 text-sm">
              © {currentYear} John Doe. All rights reserved.
            </p>
            <p className="text-slate-400 text-xs mt-1">
              Business Professional & Tech Enthusiast
            </p>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-slate-800">
          <nav className="flex flex-wrap justify-center gap-6 text-sm">
            <a href="#about" className="text-slate-300 hover:text-white transition-colors">About</a>
            <a href="#projects" className="text-slate-300 hover:text-white transition-colors">Projects</a>
            <a href="#blog" className="text-slate-300 hover:text-white transition-colors">Blog</a>
            <a href="#contact" className="text-slate-300 hover:text-white transition-colors">Contact</a>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
