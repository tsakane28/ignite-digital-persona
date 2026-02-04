import { useState, useEffect, useCallback } from "react";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/hooks/useAuth";
import { LoadingScreen } from "@/components/LoadingScreen";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { SkillsSection } from "@/components/SkillsSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { DesignPortfolioSection } from "@/components/DesignPortfolioSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { CertificationsSection } from "@/components/CertificationsSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";

const CRITICAL_IMAGES = [
  '/tickets.png',
  '/rsrvd.png',
  '/alien.png',
  '/swartfontain.png',
  '/kuyasa.png',
  '/rollmine.png',
];

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);

  const preloadImages = useCallback(() => {
    let loadedCount = 0;
    const totalImages = CRITICAL_IMAGES.length;

    return new Promise<void>((resolve) => {
      if (totalImages === 0) {
        setLoadProgress(100);
        resolve();
        return;
      }

      CRITICAL_IMAGES.forEach((src) => {
        const img = new Image();
        
        const handleLoad = () => {
          loadedCount++;
          setLoadProgress(Math.round((loadedCount / totalImages) * 100));
          if (loadedCount >= totalImages) {
            resolve();
          }
        };

        img.onload = handleLoad;
        img.onerror = handleLoad; // Count errors as loaded to avoid hanging
        img.src = src;
      });
    });
  }, []);

  useEffect(() => {
    const loadSite = async () => {
      // Wait for DOM to be ready
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Wait for critical images to load
      await preloadImages();
      
      // Small delay after images load for smooth transition
      await new Promise(resolve => setTimeout(resolve, 300));
    };

    loadSite();
  }, [preloadImages]);

  const handleLoadComplete = () => {
    setIsLoading(false);
  };

  return (
    <ThemeProvider>
      <AuthProvider>
        {isLoading && (
          <LoadingScreen 
            onLoadComplete={handleLoadComplete} 
            progress={loadProgress}
          />
        )}
        <div className={isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-300'}>
          <Navbar />
          <main className="min-h-screen">
            <HeroSection />
            <AboutSection />
            <SkillsSection />
            <ProjectsSection />
            <DesignPortfolioSection />
            <ExperienceSection />
            <CertificationsSection />
            <ContactSection />
          </main>
          <Footer />
          <ScrollToTop />
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default Index;
