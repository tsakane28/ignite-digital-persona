import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Mail, Phone, Linkedin, Github } from 'lucide-react';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/AnimatedSection';

export const AboutSection = () => {
  return (
    <section id="about" className="section-padding bg-secondary/30">
      <div className="container">
        <AnimatedSection variant="fadeUp">
          <h2 className="text-3xl font-bold mb-2 text-center gradient-text">About Me</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-12 rounded-full"></div>
        </AnimatedSection>

        <div className="max-w-4xl mx-auto">
          <AnimatedSection variant="fadeUp" delay={0.1}>
            <div className="glass-card p-8 md:p-10">
              <h3 className="text-2xl font-semibold mb-6 gradient-text">My Journey</h3>
              
              <div className="space-y-4 text-foreground/80 leading-relaxed">
                <p>
                  I'm <span className="text-primary font-medium">Tsakane Wesley Shiri</span>, a passionate Full-Stack Developer and Graphics Designer based in Zimbabwe. My journey in tech began at <span className="font-medium">Chinhoyi University of Technology</span>, where I pursued a degree in Information Technology, laying the foundation for my diverse skill set.
                </p>
                
                <p>
                  Currently, I serve as the <span className="text-primary font-medium">Lead Graphics Designer at ZINGSA</span> (Zimbabwe National Geospatial and Space Agency), where I lead branding initiatives, create compelling visual identities, and design user interfaces that bridge technology and creativity. Before stepping into this role, I completed my internship at ZINGSA, which gave me hands-on experience in real-world project delivery.
                </p>
                
                <p>
                  What sets me apart is my unique blend of <span className="font-medium">development expertise and design sensibility</span>. I don't just write code—I craft experiences. From building responsive web applications with React and Node.js to creating stunning brand identities and 3D renders in Blender, I bring a holistic approach to every project.
                </p>
                
                <p>
                  I'm driven by the belief that great technology should be both <span className="font-medium">functional and beautiful</span>. Whether it's architecting scalable backend systems, designing intuitive user interfaces, or creating motion graphics that tell a story, I'm committed to delivering excellence at every level.
                </p>
              </div>
              
              <StaggerContainer className="flex flex-wrap gap-3 mt-8" staggerDelay={0.05}>
                <StaggerItem>
                  <Button variant="outline" size="sm" asChild>
                    <a href="mailto:wesleytsakane116@gmail.com" target="_blank" rel="noopener noreferrer">
                      <Mail className="mr-2 h-4 w-4" /> Email
                    </a>
                  </Button>
                </StaggerItem>
                <StaggerItem>
                  <Button variant="outline" size="sm" asChild>
                    <a href="tel:+263776555485" target="_blank" rel="noopener noreferrer">
                      <Phone className="mr-2 h-4 w-4" /> Phone
                    </a>
                  </Button>
                </StaggerItem>
                <StaggerItem>
                  <Button variant="outline" size="sm" asChild>
                    <a href="https://linkedin.com/in/tsakane-shiri/" target="_blank" rel="noopener noreferrer">
                      <Linkedin className="mr-2 h-4 w-4" /> LinkedIn
                    </a>
                  </Button>
                </StaggerItem>
                <StaggerItem>
                  <Button variant="outline" size="sm" asChild>
                    <a href="https://github.com/tsakane28" target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" /> GitHub
                    </a>
                  </Button>
                </StaggerItem>
              </StaggerContainer>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};
