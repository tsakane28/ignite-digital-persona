
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type Experience = {
  id: number;
  title: string;
  company?: string;
  institution?: string;
  location: string;
  period: string;
  type: 'work' | 'education';
  description: string;
  skills?: string[];
  link?: string;
};

const experiences: Experience[] = [
  {
    id: 1,
    title: 'Software Development Intern',
    company: 'ZINGSA',
    location: 'Cape Town, South Africa',
    period: 'Jan 2023 - Dec 2023',
    type: 'work',
    description: 'Contributed to full-stack development of web applications, working with React, Node.js, and MongoDB. Implemented responsive UI components and assisted in API development.',
    skills: ['React', 'Node.js', 'MongoDB', 'Git', 'Agile'],
    link: 'https://zingsa.co.za',
  },
  {
    id: 2,
    title: 'BSc in Computer Science',
    institution: 'Chinhoyi University of Technology',
    location: 'Chinhoyi, Zimbabwe',
    period: '2019 - 2023',
    type: 'education',
    description: 'Specialized in software engineering with focus on web development, databases, and system design. Final year project involved developing a ticket reservation platform.',
    link: 'https://cut.ac.zw',
  },
  {
    id: 3,
    title: 'Frontend Development Certification',
    institution: 'freeCodeCamp',
    location: 'Online',
    period: '2021',
    type: 'education',
    description: 'Completed comprehensive certification covering HTML, CSS, JavaScript, and responsive web design principles.',
    link: 'https://www.freecodecamp.org',
  },
];

export const ExperienceSection = () => {
  return (
    <section id="experience" className="section-padding bg-secondary/30">
      <div className="container">
        <h2 className="text-3xl font-bold mb-2 text-center gradient-text">Experience & Education</h2>
        <div className="w-20 h-1 bg-primary mx-auto mb-12 rounded-full"></div>

        <div className="max-w-3xl mx-auto relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border transform md:-translate-x-px"></div>

          {/* Timeline items */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={exp.id}
                className={cn(
                  'relative flex flex-col md:flex-row',
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                )}
              >
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 w-7 h-7 rounded-full border-4 border-primary bg-background transform md:-translate-x-3 -translate-y-1"></div>
                
                {/* Content */}
                <div className="w-full md:w-1/2 pl-10 md:pl-0 md:pr-12 pb-8 md:pb-0 animate-fade-in-up">
                  <div className={cn(
                    'glass-card p-6',
                    index % 2 === 0 ? 'md:ml-12' : 'md:mr-12'
                  )}>
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-bold text-lg">{exp.title}</h3>
                        <p className="text-primary font-medium">
                          {exp.company || exp.institution}
                        </p>
                      </div>
                      <Badge variant={exp.type === 'work' ? 'default' : 'secondary'} className="mt-1">
                        {exp.type === 'work' ? 'Work' : 'Education'}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center text-sm text-foreground/70 mb-3">
                      <span>{exp.location}</span>
                      <span className="mx-2">•</span>
                      <span>{exp.period}</span>
                    </div>
                    
                    <p className="text-sm text-foreground/80 mb-3">{exp.description}</p>
                    
                    {exp.skills && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        {exp.skills.map((skill) => (
                          <span key={skill} className="tag text-xs">{skill}</span>
                        ))}
                      </div>
                    )}
                    
                    {exp.link && (
                      <a 
                        href={exp.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs text-primary hover:underline"
                      >
                        Visit Website
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
