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
      title: 'Lead Graphics Designer',
      company: 'Zimbabwe National Geospatial and Space Agency (ZINGSA)',
      location: 'Harare, Zimbabwe',
      period: 'Jun 2025 - Present',
      type: 'work',
      description:
        'Led branding and marketing across digital, print, and 3D platforms. Produce 3D models and CAD designs for visualization projects. Manage social media campaigns and website optimization. Contribute to software projects with front-end/UI design.',
      skills: [
        '3D Modeling',
        'CAD',
        'Branding',
        'Social Media',
        'UI/UX Design',
        'Adobe Creative Suite'
      ],
      link: 'https://zingsa.ac.zw/'
    },
    {
      id: 2,
      title: 'ICT Intern',
      company: 'Zimbabwe National Geospatial and Space Agency (ZINGSA)',
      location: 'Harare, Zimbabwe',
      period: 'Jun 2023 - Jul 2024',
      type: 'work',
      description:
        'Contributed to backend development (Node.js, MongoDB) for the agency website, improving SEO and user engagement. Automated HR workflows with Python, orchestrated AWS cloud deployments, and configured Docker-based CI/CD pipelines. Managed server environments, network security, VoIP systems, and wireless networks.',
      skills: [
        'Node.js',
        'MongoDB',
        'Python',
        'AWS',
        'Docker',
        'Git',
        'Sophos Firewall',
        'Linux',
        'Windows Server'
      ],
      link: 'https://zingsa.ac.zw/'
    },
    {
      id: 3,
      title: 'Web Developer',
      company: 'Reserved Digital Solutions',
      location: 'Harare, Zimbabwe',
      period: 'Jan 2022 - Present',
      type: 'work',
      description:
        'Lead developer on multiple web design and branding projects for clients. Built responsive websites and web apps using React, Node.js, and Firebase. Emphasized SEO optimization, user experience, and performance across platforms.',
      skills: ['React', 'Next.js', 'Tailwind CSS', 'Node.js', 'Firebase'],
      link: 'https://reserveddigitalbranding.com'
    },
    {
      id: 4,
      title: 'Frontend Developer',
      company: 'Freelance',
      location: 'Remote',
      period: 'Jun 2020 - Dec 2021',
      type: 'work',
      description:
        'Designed and developed websites for small businesses and non-profits. Specialized in responsive, accessible interfaces using WordPress, Bootstrap, and JavaScript.',
      skills: ['JavaScript', 'HTML5', 'CSS3', 'Bootstrap', 'WordPress']
    },
    {
      id: 5,
      title: 'BSc in Information Technology',
      institution: 'Chinhoyi University of Technology',
      location: 'Chinhoyi, Zimbabwe',
      period: 'Oct 2021 - Aug 2025',
      type: 'education',
      description:
        'Focused on software engineering, cloud computing, and secure systems. Recognized for innovation in creating a cloud-based student attendance system. Top contributor to open-source projects in Zimbabwe.',
      link: 'https://cut.ac.zw'
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
