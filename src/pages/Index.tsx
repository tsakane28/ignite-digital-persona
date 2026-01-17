import { useState, useEffect } from "react";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/hooks/useAuth";
import { LoadingScreen } from "@/components/LoadingScreen";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { DesignPortfolioSection } from "@/components/DesignPortfolioSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Preload critical images
    const images = [
      '/tickets.png',
      '/rsrvd.png',
      '/alien.png',
      '/swartfontain.png',
      '/kuyasa.png',
      '/rollmine.png',
    ];

    let loadedCount = 0;
    const totalImages = images.length;

    const checkAllLoaded = () => {
      loadedCount++;
      if (loadedCount >= totalImages) {
        // All images preloaded
      }
    };

    images.forEach(src => {
      const img = new Image();
      img.onload = checkAllLoaded;
      img.onerror = checkAllLoaded;
      img.src = src;
    });
  }, []);

  const handleLoadComplete = () => {
    setIsLoading(false);
    setTimeout(() => setShowContent(true), 100);
  };

  return (
    <ThemeProvider>
      <AuthProvider>
        {isLoading && <LoadingScreen onLoadComplete={handleLoadComplete} />}
        <div className={isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-300'}>
          <Navbar />
          <main className="min-h-screen">
            <HeroSection />
            <AboutSection />
            <ProjectsSection />
            <DesignPortfolioSection />
            <ExperienceSection />
            <ContactSection />
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default Index;
