
import { Github, Linkedin, Mail } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-secondary py-8">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-foreground/70 text-sm">
              © {currentYear} Tsakane Shiri. All rights reserved.
            </p>
          </div>
          
          <div className="flex space-x-4">
            <a 
              href="https://github.com/tsakane28" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-foreground/70 hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a 
              href="https://www.linkedin.com/in/tsakane-shiri/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-foreground/70 hover:text-foreground transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a 
              href="mailto:wesleytsakane116@gmail.com"
              className="text-foreground/70 hover:text-foreground transition-colors"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-foreground/50 text-xs">
            Made with React, TypeScript, and Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};
