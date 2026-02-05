import { motion } from 'framer-motion';
import { Award, Trophy, Medal, Star, ExternalLink, Shield, Network } from 'lucide-react';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/AnimatedSection';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface Certification {
  id: number;
  title: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  icon: 'award' | 'trophy' | 'medal' | 'star' | 'shield' | 'network';
  type: 'certification' | 'achievement';
  skills?: string[];
}

const certifications: Certification[] = [
  {
    id: 1,
    title: 'Introduction to Cybersecurity',
    issuer: 'Cisco',
    date: 'Jan 2025',
    icon: 'shield',
    type: 'certification',
    credentialUrl: 'https://www.credly.com/badges/bf821901-27c4-4372-9301-f9eca527c896/public_url',
    skills: ['Cybersecurity', 'Threat Detection', 'Network Security']
  },
  {
    id: 2,
    title: 'Network Addressing and Basic Troubleshooting',
    issuer: 'Cisco',
    date: 'Jul 2024',
    icon: 'network',
    type: 'certification',
    credentialUrl: 'https://www.credly.com/badges/46e4232b-a206-49bd-a97e-86f211bdb916/public_url',
    skills: ['IP Addressing', 'Subnetting', 'Network Troubleshooting']
  },
  {
    id: 3,
    title: 'A2A Protocol Training',
    issuer: 'DevTown',
    date: '2024',
    icon: 'award',
    type: 'certification',
    credentialUrl: 'https://www.cert.devtown.in/verify/qhTSu',
    skills: ['AI Agents', 'Protocol Design', 'API Integration']
  },
  {
    id: 4,
    title: 'DevTown Certification',
    issuer: 'DevTown',
    date: '2024',
    icon: 'medal',
    type: 'certification',
    credentialUrl: 'https://www.cert.devtown.in/verify/ZlAhmG',
    skills: ['Web Development', 'JavaScript', 'React']
  },
  {
    id: 5,
    title: 'DevTown Training Program',
    issuer: 'DevTown',
    date: '2024',
    icon: 'award',
    type: 'certification',
    credentialUrl: 'https://www.cert.devtown.in/verify/3NrVU',
    skills: ['Full-Stack', 'Node.js', 'Database']
  },
  {
    id: 6,
    title: 'DevTown Technical Certification',
    issuer: 'DevTown',
    date: '2024',
    icon: 'award',
    type: 'certification',
    credentialUrl: 'https://www.cert.devtown.in/verify/Z2wxbRw',
    skills: ['TypeScript', 'REST APIs', 'Cloud Services']
  },
  {
    id: 7,
    title: 'Cloud Attendance System Innovation',
    issuer: 'Chinhoyi University of Technology',
    date: '2024',
    icon: 'trophy',
    type: 'achievement',
    skills: ['Innovation', 'Cloud Computing', 'IoT']
  },
  {
    id: 8,
    title: 'Lead Graphics Designer',
    issuer: 'ZINGSA',
    date: '2025',
    icon: 'star',
    type: 'achievement',
    skills: ['Branding', 'UI Design', '3D Modeling']
  }
];

const iconMap = {
  award: Award,
  trophy: Trophy,
  medal: Medal,
  star: Star,
  shield: Shield,
  network: Network
};

const iconColors = {
  award: 'text-blue-500',
  trophy: 'text-yellow-500',
  medal: 'text-orange-500',
  star: 'text-purple-500',
  shield: 'text-green-500',
  network: 'text-cyan-500'
};

export const CertificationsSection = () => {
  const certificationItems = certifications.filter(c => c.type === 'certification');
  const achievementItems = certifications.filter(c => c.type === 'achievement');

  return (
    <section id="certifications" className="section-padding bg-background">
      <div className="container">
        <AnimatedSection variant="fadeUp">
          <h2 className="text-3xl font-bold mb-2 text-center gradient-text">
            Certifications & Achievements
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-12 rounded-full"></div>
        </AnimatedSection>

        <div className="max-w-5xl mx-auto">
          {/* Certifications */}
          <AnimatedSection variant="fadeUp" delay={0.1}>
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              Professional Certifications
            </h3>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {certificationItems.map((cert) => {
              const IconComponent = iconMap[cert.icon];
              return (
                <StaggerItem key={cert.id}>
                  <motion.div
                    className="glass-card p-5 h-full group hover:border-primary/30 transition-all duration-300"
                    whileHover={{ y: -4, scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-start gap-4">
                      <div className={cn(
                        "p-2.5 rounded-xl bg-muted/50 shrink-0",
                        "group-hover:bg-primary/10 transition-colors"
                      )}>
                        <IconComponent className={cn("h-6 w-6", iconColors[cert.icon])} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm leading-tight mb-1 group-hover:text-primary transition-colors">
                          {cert.title}
                        </h4>
                        <p className="text-xs text-muted-foreground mb-2">{cert.issuer}</p>
                        {cert.skills && (
                          <div className="flex flex-wrap gap-1 mb-2">
                            {cert.skills.map((skill) => (
                              <Badge key={skill} variant="secondary" className="text-[10px] px-1.5 py-0 h-4">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        )}
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-primary font-medium">{cert.date}</span>
                          {cert.credentialUrl && (
                            <a
                              href={cert.credentialUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors"
                            >
                              View <ExternalLink className="h-3 w-3" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>

          {/* Achievements */}
          <AnimatedSection variant="fadeUp" delay={0.2}>
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              Notable Achievements
            </h3>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievementItems.map((achievement) => {
              const IconComponent = iconMap[achievement.icon];
              return (
                <StaggerItem key={achievement.id}>
                  <motion.div
                    className="glass-card p-6 h-full group hover:border-primary/30 transition-all duration-300 relative overflow-hidden"
                    whileHover={{ y: -4, scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Background decoration */}
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    <div className="flex items-start gap-4 relative z-10">
                      <div className={cn(
                        "p-3 rounded-xl bg-gradient-to-br from-yellow-500/20 to-orange-500/10 shrink-0",
                        "group-hover:from-yellow-500/30 group-hover:to-orange-500/20 transition-all"
                      )}>
                        <IconComponent className={cn("h-7 w-7", iconColors[achievement.icon])} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                          {achievement.title}
                        </h4>
                        <p className="text-sm text-muted-foreground mb-2">{achievement.issuer}</p>
                        {achievement.skills && (
                          <div className="flex flex-wrap gap-1 mb-2">
                            {achievement.skills.map((skill) => (
                              <Badge key={skill} variant="secondary" className="text-[10px] px-1.5 py-0.5">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        )}
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                          {achievement.date}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
};
