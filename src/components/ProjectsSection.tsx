import { ExternalLink, Github, Code } from 'lucide-react';
import { cn } from '@/lib/utils';

type Project = {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  demoLink: string;
  githubLink?: string;
  featured?: boolean;
};

const projects: Project[] = [
  {
    id: 1,
    title: 'Reserved Tickets Platform',
    description: 'A full-featured ticket reservation platform with secure payment processing and real-time seat selection.',
    image: '/tickets.png',
    technologies: ['Git', 'Node.js', 'CSS3', 'Tailwind CSS', 'Firebase'],
    demoLink: 'https://rsrvdtickets.vercel.app/',
    githubLink: 'https://github.com/your-username/reserved-tickets',
    featured: true,
  },
  {
    id: 2,
    title: 'Reserved Digital Branding',
    description: 'A branding website showcasing digital services with a modern UI design and smooth animations.',
    image: '/rsrvd.png',
    technologies: ['Next.js', 'Tailwind CSS', 'Framer Motion'],
    demoLink: 'https://reserveddigitalbranding.com/',
    githubLink: 'https://github.com/your-username/digital-branding',
  },
  {
    id: 3,
    title: 'Alien Shooter Game',
    description: 'An interactive browser-based shooter game with multiple levels and high-score tracking.',
    image: '/alien.png',
    technologies: ['JavaScript','HTML5', 'CSS3'],
    demoLink: 'https://tsakane28.github.io/AlienShooterGame/',
    githubLink: 'https://github.com/tsakane28/AlienShooterGame',
    featured: true,
  },
  {
    id: 4,
    title: 'Swartfontein Website',
    description: 'A responsive website for a hospitality business with booking functionality and photo gallery.',
    image: '/swartfontain.png',
    technologies: ['JavaScript', 'Bootstrap', 'CSS3', 'HTML5'],
    demoLink: 'https://tsakane28.github.io/Swartfontein_final/',
    githubLink: 'https://github.com/tsakane28/Swartfontein_final',
  },
  {
    id: 5,
    title: 'Kuyasa UP',
    description: 'A community organization website featuring event scheduling and member management.',
    image: '/kuyasa.png',
    technologies: ['JavaScript', 'Bootstrap', 'CSS3', 'HTML5'],
    demoLink: 'https://tsakane28.github.io/kuyasaup/',
    githubLink: 'https://github.com/tsakane28/kuyasaup',
  },
  {
    id: 6,
    title: 'Roll Mine Corporate Site',
    description: 'Corporate website with interactive elements and detailed service information.',
    image: '/rollmine.png',
    technologies: ['HTML', 'SCSS', 'JavaScript', 'JQuery'],
    demoLink: 'https://tsakane28.github.io/rollmine/',
    githubLink: 'https://github.com/tsakane28/rollmine',
  },
];

export const ProjectsSection = () => {
  return (
    <section id="projects" className="section-padding bg-background">
      <div className="container">
        <h2 className="text-3xl font-bold mb-2 text-center gradient-text">My Projects</h2>
        <div className="w-20 h-1 bg-primary mx-auto mb-6 rounded-full"></div>
        <p className="text-center text-foreground/70 max-w-2xl mx-auto mb-12">
          Explore my portfolio of web development projects, from interactive applications to responsive websites.
        </p>

        {/* Featured Projects */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {projects
            .filter((project) => project.featured)
            .map((project) => (
              <div
                key={project.id}
                className="glass-card overflow-hidden hover-lift"
              >
                <div className="h-60 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold">{project.title}</h3>
                    <div className="flex gap-2">
                      {project.githubLink && (
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-foreground/70 hover:text-foreground transition-colors"
                          aria-label={`Github repository for ${project.title}`}
                        >
                          <Github className="h-5 w-5" />
                        </a>
                      )}
                      <a
                        href={project.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground/70 hover:text-foreground transition-colors"
                        aria-label={`Live demo for ${project.title}`}
                      >
                        <ExternalLink className="h-5 w-5" />
                      </a>
                    </div>
                  </div>
                  <p className="text-foreground/70 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Regular Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects
            .filter((project) => !project.featured)
            .map((project) => (
              <div
                key={project.id}
                className="glass-card overflow-hidden hover-lift"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold">{project.title}</h3>
                    <div className="flex gap-2">
                      {project.githubLink && (
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-foreground/70 hover:text-foreground transition-colors"
                          aria-label={`Github repository for ${project.title}`}
                        >
                          <Github className="h-4 w-4" />
                        </a>
                      )}
                      <a
                        href={project.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground/70 hover:text-foreground transition-colors"
                        aria-label={`Live demo for ${project.title}`}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                  <p className="text-foreground/70 text-sm mb-3 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span key={tech} className="tag text-xs">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="tag text-xs">+{project.technologies.length - 3}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};
