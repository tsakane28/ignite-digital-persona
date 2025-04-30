import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Download } from 'lucide-react';

const roles = ['Full-Stack Developer', 'UI/UX Designer', 'Web Developer'];

export const HeroSection = () => {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    const current = roles[currentRoleIndex];
    
    if (isDeleting) {
      if (displayedText === '') {
        setIsDeleting(false);
        setCurrentRoleIndex((prevIndex) => (prevIndex + 1) % roles.length);
        setTypingSpeed(100);
      } else {
        const timeout = setTimeout(() => {
          setDisplayedText(current.substring(0, displayedText.length - 1));
        }, 50);
        return () => clearTimeout(timeout);
      }
    } else {
      if (displayedText === current) {
        const timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 2000);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setDisplayedText(current.substring(0, displayedText.length + 1));
        }, typingSpeed);
        return () => clearTimeout(timeout);
      }
    }
  }, [displayedText, currentRoleIndex, isDeleting, typingSpeed]);

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-background/90 relative overflow-hidden pt-16"
    >
      {/* Background gradient elements */}
      <div className="absolute top-1/2 -left-24 w-64 h-64 rounded-full bg-portfolio-purple/20 blur-3xl"></div>
      <div className="absolute bottom-1/3 -right-24 w-80 h-80 rounded-full bg-portfolio-blue/20 blur-3xl"></div>
      
      <div className="container z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-lg font-medium text-primary mb-2 animate-fade-in">Hello, I'm</h2>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 gradient-text animate-fade-in">
            Tsakane Shiri
          </h1>
          <div className="h-8">
            <p className="text-xl md:text-2xl font-medium text-foreground/80 mb-6">
              I'm a <span className="text-primary">{displayedText}</span>
              <span className="animate-pulse">|</span>
            </p>
          </div>
          <p className="text-lg text-foreground/70 mb-8 max-w-2xl mx-auto animate-fade-in">
            I create engaging, responsive web applications with modern tech stacks and clean code.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-4 animate-fade-in">
            <Button size="lg" className="px-6 py-6" asChild>
              <a href="/TsakaneMWS_CV.pdf" download>
                <Download className="mr-2 h-4 w-4" /> Download CV
              </a>
            </Button>
            <Button variant="outline" size="lg" className="px-6 py-6" asChild>
              <a href="#projects">
                View My Projects <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
          
          <div className="mt-16 animate-bounce">
            <a href="#about" className="text-foreground/50 hover:text-foreground">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mx-auto"
              >
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
