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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* About Text */}
          <AnimatedSection variant="slideLeft" delay={0.1}>
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold mb-4">My Journey</h3>
              <p className="text-foreground/80 leading-relaxed">
                I'm a passionate Full-Stack Developer with expertise in creating modern, responsive, and user-friendly web applications. With a background in Information Technology from Chinhoyi University and valuable experience from my internship at ZINGSA, I've developed a robust set of skills in both front-end and back-end development.
              </p>
              <p className="text-foreground/80 leading-relaxed">
                My approach combines technical expertise with creative problem-solving to deliver applications that not only function flawlessly but also provide exceptional user experiences. I'm constantly learning and adapting to new technologies to stay at the cutting edge of web development.
              </p>
              
              <StaggerContainer className="flex flex-wrap gap-3" staggerDelay={0.05}>
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

          {/* Skills */}
          <AnimatedSection variant="slideRight" delay={0.2}>
            <div className="glass-card p-6 md:p-8">
              <h3 className="text-2xl font-semibold mb-6">Technical Skills</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-3">Frontend Development</h4>
                  <motion.div 
                    className="flex flex-wrap gap-2"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ staggerChildren: 0.02 }}
                  >
                    {['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'Vue.js', 'Nuxt.js', 'Angular', 'Svelte', 'Solid.js', 'Qwik', 'Remix', 'Tailwind CSS', 'Bootstrap', 'Material UI', 'Ant Design', 'Chakra UI', 'Alpine.js', 'Framer Motion'].map((tech) => (
                      <motion.span 
                        key={tech} 
                        className="tag"
                        variants={{
                          hidden: { opacity: 0, scale: 0.8 },
                          visible: { opacity: 1, scale: 1 }
                        }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </motion.div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Backend Development</h4>
                  <motion.div 
                    className="flex flex-wrap gap-2"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ staggerChildren: 0.02, delayChildren: 0.1 }}
                  >
                    {['Node.js', 'Express', 'NestJS', 'Fastify', 'Laravel', 'PHP', 'MongoDB', 'PostgreSQL', 'MySQL', 'SQL', 'Prisma', 'Firebase', 'Supabase', 'Redis', 'GraphQL', 'RESTful APIs', 'WebSockets', 'Docker'].map((tech) => (
                      <motion.span 
                        key={tech} 
                        className="tag"
                        variants={{
                          hidden: { opacity: 0, scale: 0.8 },
                          visible: { opacity: 1, scale: 1 }
                        }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </motion.div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Tools & Others</h4>
                  <motion.div 
                    className="flex flex-wrap gap-2"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ staggerChildren: 0.02, delayChildren: 0.2 }}
                  >
                    {['Git', 'GitHub', 'GitLab', 'Bitbucket', 'VS Code', 'WebStorm', 'Figma', 'Postman', 'Docker', 'Kubernetes', 'AWS', 'Vercel', 'Netlify', 'Heroku', 'Firebase', 'Supabase', 'Jira', 'Slack', 'Notion', 'NPM', 'Yarn', 'pnpm', 'ESLint', 'Prettier'].map((tech) => (
                      <motion.span 
                        key={tech} 
                        className="tag"
                        variants={{
                          hidden: { opacity: 0, scale: 0.8 },
                          visible: { opacity: 1, scale: 1 }
                        }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </motion.div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};
