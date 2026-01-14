import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/hooks/useAuth";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { DesignPortfolioSection } from "@/components/DesignPortfolioSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
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
      </AuthProvider>
    </ThemeProvider>
  );
};

export default Index;
