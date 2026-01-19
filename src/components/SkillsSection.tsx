import { motion } from 'framer-motion';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/AnimatedSection';
import { Code, Server, Wrench, Palette, Database, Cloud } from 'lucide-react';

const skillCategories = [
  {
    title: 'Frontend Development',
    icon: Code,
    skills: ['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'Vue.js', 'Nuxt.js', 'Angular', 'Tailwind CSS', 'Framer Motion', 'Material UI'],
    color: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Backend Development',
    icon: Server,
    skills: ['Node.js', 'Express', 'NestJS', 'Laravel', 'PHP', 'Python', 'RESTful APIs', 'GraphQL', 'WebSockets'],
    color: 'from-green-500 to-emerald-500',
  },
  {
    title: 'Databases',
    icon: Database,
    skills: ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Prisma', 'Firebase', 'Supabase'],
    color: 'from-orange-500 to-amber-500',
  },
  {
    title: 'Design & Creative',
    icon: Palette,
    skills: ['Figma', 'Adobe Photoshop', 'Adobe Illustrator', 'Blender 3D', 'UI/UX Design', 'Branding', 'Motion Graphics'],
    color: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Cloud & DevOps',
    icon: Cloud,
    skills: ['AWS', 'Vercel', 'Netlify', 'Docker', 'Kubernetes', 'CI/CD', 'GitHub Actions'],
    color: 'from-indigo-500 to-violet-500',
  },
  {
    title: 'Tools & Workflow',
    icon: Wrench,
    skills: ['Git', 'GitHub', 'VS Code', 'Postman', 'Jira', 'Notion', 'NPM', 'ESLint', 'Prettier'],
    color: 'from-rose-500 to-red-500',
  },
];

export const SkillsSection = () => {
  return (
    <section id="skills" className="section-padding bg-background">
      <div className="container">
        <AnimatedSection variant="fadeUp">
          <h2 className="text-3xl font-bold mb-2 text-center gradient-text">Skills & Expertise</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-4 rounded-full"></div>
          <p className="text-center text-foreground/70 max-w-2xl mx-auto mb-12">
            A comprehensive toolkit spanning development, design, and deployment
          </p>
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.1}>
          {skillCategories.map((category, index) => (
            <StaggerItem key={category.title}>
              <motion.div
                className="glass-card p-6 h-full group hover:shadow-lg transition-all duration-300"
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${category.color} text-white`}>
                    <category.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold">{category.title}</h3>
                </div>
                
                <motion.div 
                  className="flex flex-wrap gap-2"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ staggerChildren: 0.03, delayChildren: index * 0.1 }}
                >
                  {category.skills.map((skill) => (
                    <motion.span 
                      key={skill} 
                      className="tag text-sm"
                      variants={{
                        hidden: { opacity: 0, scale: 0.8 },
                        visible: { opacity: 1, scale: 1 }
                      }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};
