
import { Button } from '@/components/ui/button';
import { Mail, Phone, Linkedin, Github } from 'lucide-react';

export const AboutSection = () => {
  return (
    <section id="about" className="section-padding bg-secondary/30">
      <div className="container">
        <h2 className="text-3xl font-bold mb-2 text-center gradient-text">About Me</h2>
        <div className="w-20 h-1 bg-primary mx-auto mb-12 rounded-full"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* About Text */}
          <div className="space-y-6 animate-fade-in-up">
            <h3 className="text-2xl font-semibold mb-4">My Journey</h3>
            <p className="text-foreground/80 leading-relaxed">
              I'm a passionate Full-Stack Developer with expertise in creating modern, responsive, and user-friendly web applications. With a background in computer science from Chinhoyi University and valuable experience from my internship at ZINGSA, I've developed a robust set of skills in both front-end and back-end development.
            </p>
            <p className="text-foreground/80 leading-relaxed">
              My approach combines technical expertise with creative problem-solving to deliver applications that not only function flawlessly but also provide exceptional user experiences. I'm constantly learning and adapting to new technologies to stay at the cutting edge of web development.
            </p>
            
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" size="sm" asChild>
                <a href="mailto:wesleytsakane116@gmail.com" target="_blank" rel="noopener noreferrer">
                  <Mail className="mr-2 h-4 w-4" /> Email
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a href="tel:+263776555485" target="_blank" rel="noopener noreferrer">
                  <Phone className="mr-2 h-4 w-4" /> Phone
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a href="https://linkedin.com/in/tsakane-shiri/" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="mr-2 h-4 w-4" /> LinkedIn
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a href="https://github.com/tsakane28" target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" /> GitHub
                </a>
              </Button>
            </div>
          </div>

          {/* Skills */}
          <div className="glass-card p-6 md:p-8 animate-fade-in-up">
            <h3 className="text-2xl font-semibold mb-6">Technical Skills</h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-medium mb-3">Frontend Development</h4>
                <div className="flex flex-wrap gap-2">
                <span className="tag">HTML5</span>
<span className="tag">CSS3</span>
<span className="tag">JavaScript</span>
<span className="tag">TypeScript</span>
<span className="tag">React</span>
<span className="tag">Next.js</span>
<span className="tag">Vue.js</span>
<span className="tag">Nuxt.js</span>
<span className="tag">Angular</span>
<span className="tag">Svelte</span>
<span className="tag">Solid.js</span>
<span className="tag">Qwik</span>
<span className="tag">Remix</span>
<span className="tag">Tailwind CSS</span>
<span className="tag">Bootstrap</span>
<span className="tag">Material UI</span>
<span className="tag">Ant Design</span>
<span className="tag">Chakra UI</span>
<span className="tag">Alpine.js</span>
<span className="tag">Framer Motion</span>

                </div>
              </div>

              <div>
              <h4 className="font-medium mb-3">Backend Development</h4>
<div className="flex flex-wrap gap-2">
  <span className="tag">Node.js</span>
  <span className="tag">Express</span>
  <span className="tag">NestJS</span>
  <span className="tag">Fastify</span>
  <span className="tag">Laravel</span>
  <span className="tag">PHP</span>
  <span className="tag">MongoDB</span>
  <span className="tag">PostgreSQL</span>
  <span className="tag">MySQL</span>
  <span className="tag">SQL</span>
  <span className="tag">Prisma</span>
  <span className="tag">Firebase</span>
  <span className="tag">Supabase</span>
  <span className="tag">Redis</span>
  <span className="tag">GraphQL</span>
  <span className="tag">RESTful APIs</span>
  <span className="tag">WebSockets</span>
  <span className="tag">Docker</span>
</div>

              </div>

              <div>
              <h4 className="font-medium mb-3">Tools & Others</h4>
<div className="flex flex-wrap gap-2">
  <span className="tag">Git</span>
  <span className="tag">GitHub</span>
  <span className="tag">GitLab</span>
  <span className="tag">Bitbucket</span>
  <span className="tag">VS Code</span>
  <span className="tag">WebStorm</span>
  <span className="tag">Figma</span>
  <span className="tag">Postman</span>
  <span className="tag">Docker</span>
  <span className="tag">Kubernetes</span>
  <span className="tag">AWS</span>
  <span className="tag">Vercel</span>
  <span className="tag">Netlify</span>
  <span className="tag">Heroku</span>
  <span className="tag">Firebase</span>
  <span className="tag">Supabase</span>
  <span className="tag">Jira</span>
  <span className="tag">Slack</span>
  <span className="tag">Notion</span>
  <span className="tag">NPM</span>
  <span className="tag">Yarn</span>
  <span className="tag">pnpm</span>
  <span className="tag">ESLint</span>
  <span className="tag">Prettier</span>
</div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
